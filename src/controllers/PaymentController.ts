import { Request, Response } from 'express';
import axios from 'axios';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import { logger } from '../utils/logger.js';
import { sendPaymentStatusEmail } from '../utils/mailer.js';

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';

// Pricing configuration matching frontend
const PRICING_CONFIG = {
  'naija-plus': { monthly: 2500, yearly: 25500 },
  business: { monthly: 10000, yearly: 102000 },
  enterprise: { monthly: 50000, yearly: 510000 },
};

const notifyPaymentStatus = (payment: any, status: 'pending' | 'successful' | 'failed') => {
  void sendPaymentStatusEmail({
    status,
    transactionRef: payment.transactionRef,
    amount: payment.amount,
    currency: payment.currency,
    subscriptionTier: payment.subscriptionTier,
    subscriptionPeriod: payment.subscriptionPeriod,
    customerEmail: payment.customerEmail,
    userId: payment.userId?.toString(),
  });
};

export class PaymentController {
  /**
   * Initialize payment - create payment record and return transaction reference
   */
  static async initiatePayment(req: any, res: Response): Promise<Response | void> {
    try {
      const { subscriptionTier, subscriptionPeriod = 'monthly' } = req.body;

      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      // Validate subscription tier
      const validTiers = ['naija-plus', 'business', 'enterprise'];
      if (!validTiers.includes(subscriptionTier)) {
        res.status(400).json({ message: 'Invalid subscription tier' });
        return;
      }

      // Validate subscription period
      if (!['monthly', 'yearly'].includes(subscriptionPeriod)) {
        res.status(400).json({ message: 'Invalid subscription period' });
        return;
      }

      // Get pricing
      const amount = PRICING_CONFIG[subscriptionTier as keyof typeof PRICING_CONFIG][
        subscriptionPeriod as 'monthly' | 'yearly'
      ];

      // Generate unique transaction reference
      const transactionRef = `NaijaGBT-${subscriptionTier}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Create payment record
      const payment = await Payment.create({
        userId: req.user.userId,
        transactionRef,
        amount,
        currency: 'NGN',
        status: 'pending',
        subscriptionTier,
        subscriptionPeriod,
        customerEmail: req.user.email,
      });

      logger.info('Payment initiated', { paymentId: payment._id, transactionRef });
      notifyPaymentStatus(payment, 'pending');

      res.status(200).json({
        success: true,
        data: {
          transactionRef,
          amount,
          currency: 'NGN',
          paymentId: payment._id,
        },
      });
    } catch (error) {
      logger.error('Error initiating payment:', error);
      res.status(500).json({ message: 'Failed to initiate payment' });
    }
  }

  /**
   * Verify payment with Flutterwave and update user subscription
   */
  static async verifyPayment(req: any, res: Response): Promise<Response | void> {
    try {
      const { transactionId, transactionRef } = req.body;

      if (!transactionId || !transactionRef) {
        res.status(400).json({ message: 'Transaction ID and reference are required' });
        return;
      }

      if (!FLUTTERWAVE_SECRET_KEY) {
        logger.error('FLUTTERWAVE_SECRET_KEY not configured');
        res.status(500).json({ message: 'Payment verification not configured' });
        return;
      }

      // Find payment record
      const payment = await Payment.findOne({ transactionRef });
      if (!payment) {
        res.status(404).json({ message: 'Payment record not found' });
        return;
      }

      // Verify with Flutterwave
      const verifyResponse = await axios.get(
        `${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          },
        }
      );

      const verificationData = verifyResponse.data;

      if (verificationData.status !== 'success') {
        logger.warn('Flutterwave verification failed', { transactionId, data: verificationData });
        payment.status = 'failed';
        await payment.save();
        notifyPaymentStatus(payment, 'failed');
        res.status(400).json({ message: 'Payment verification failed' });
        return;
      }

      const txData = verificationData.data;

      // Verify amount matches
      if (txData.amount !== payment.amount || txData.currency !== payment.currency) {
        logger.error('Payment amount mismatch', {
          expected: payment.amount,
          received: txData.amount,
          currency: txData.currency,
        });
        payment.status = 'failed';
        await payment.save();
        notifyPaymentStatus(payment, 'failed');
        res.status(400).json({ message: 'Payment amount mismatch' });
        return;
      }

      // Verify status is successful
      if (txData.status !== 'successful') {
        payment.status = 'failed';
        await payment.save();
        notifyPaymentStatus(payment, 'failed');
        res.status(400).json({ message: 'Payment was not successful' });
        return;
      }

      // Update payment record
      payment.status = 'successful';
      payment.flutterwaveId = txData.id.toString();
      payment.paymentMethod = txData.payment_type;
      payment.metadata = txData;
      await payment.save();

      // Update user subscription
      const user = await User.findById(payment.userId);
      if (!user) {
        logger.error('User not found for payment', { userId: payment.userId });
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const now = new Date();
      const subscriptionEndDate = new Date(now);

      // Add subscription period to end date
      if (payment.subscriptionPeriod === 'monthly') {
        subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      } else {
        subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
      }

      user.subscriptionTier = payment.subscriptionTier;
      user.subscriptionStatus = 'active';
      user.subscriptionStartDate = now;
      user.subscriptionEndDate = subscriptionEndDate;
      user.paymentHistory.push(payment._id.toString());
      await user.save();

      logger.info('Payment verified and subscription updated', {
        userId: user._id,
        tier: payment.subscriptionTier,
        endDate: subscriptionEndDate,
      });

      notifyPaymentStatus(payment, 'successful');

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          subscriptionTier: user.subscriptionTier,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionEndDate: user.subscriptionEndDate,
        },
      });
    } catch (error) {
      logger.error('Error verifying payment:', error);
      res.status(500).json({ message: 'Failed to verify payment' });
    }
  }

  /**
   * Handle Flutterwave webhook for payment notifications
   */
  static async handleWebhook(req: Request, res: Response): Promise<Response | void> {
    try {
      const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET;
      const signature = req.headers['verif-hash'];

      // Verify webhook signature if secret is configured
      if (secretHash) {
        if (signature !== secretHash) {
          logger.warn('Invalid webhook signature', { signature, expected: secretHash });
          res.status(401).json({ message: 'Unauthorized - Invalid signature' });
          return;
        }
        logger.info('Webhook signature verified');
      } else {
        logger.warn('Webhook secret not configured - processing webhook without signature verification');
      }

      const payload = req.body;

      // Only handle successful charge events
      if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
        const txRef = payload.data.tx_ref;
        const flutterwaveId = payload.data.id;

        // Find and update payment
        const payment = await Payment.findOne({ transactionRef: txRef });
        if (!payment) {
          logger.warn('Payment not found for webhook', { txRef });
          res.status(404).json({ message: 'Payment not found' });
          return;
        }

        // Only update if not already processed
        if (payment.status !== 'successful') {
          payment.status = 'successful';
          payment.flutterwaveId = flutterwaveId.toString();
          payment.webhookReceived = true;
          payment.metadata = payload.data;
          await payment.save();

          // Update user subscription
          const user = await User.findById(payment.userId);
          if (user) {
            const now = new Date();
            const subscriptionEndDate = new Date(now);

            if (payment.subscriptionPeriod === 'monthly') {
              subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
            } else {
              subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
            }

            user.subscriptionTier = payment.subscriptionTier;
            user.subscriptionStatus = 'active';
            user.subscriptionStartDate = now;
            user.subscriptionEndDate = subscriptionEndDate;
            
            // Add to payment history if not already there
            if (!user.paymentHistory.includes(payment._id.toString())) {
              user.paymentHistory.push(payment._id.toString());
            }
            
            await user.save();

            logger.info('Webhook processed: subscription updated', { userId: user._id });

            notifyPaymentStatus(payment, 'successful');
          }
        }
      }

      res.status(200).json({ message: 'Webhook received' });
    } catch (error) {
      logger.error('Error processing webhook:', error);
      res.status(500).json({ message: 'Webhook processing failed' });
    }
  }

  /**
   * Get user's payment history
   */
  static async getPaymentHistory(req: any, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const payments = await Payment.find({ userId: req.user.userId })
        .sort({ createdAt: -1 })
        .select('-metadata')
        .limit(50);

      res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error) {
      logger.error('Error fetching payment history:', error);
      res.status(500).json({ message: 'Failed to fetch payment history' });
    }
  }

  /**
   * Get user's current subscription status
   */
  static async getSubscriptionStatus(req: any, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const user = await User.findById(req.user.userId).select(
        'subscriptionTier subscriptionStatus subscriptionStartDate subscriptionEndDate'
      );

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Check if subscription has expired
      const now = new Date();
      if (user.subscriptionEndDate && user.subscriptionEndDate < now) {
        user.subscriptionStatus = 'expired';
        user.subscriptionTier = 'free';
        await user.save();
      }

      res.status(200).json({
        success: true,
        data: {
          subscriptionTier: user.subscriptionTier,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionStartDate: user.subscriptionStartDate,
          subscriptionEndDate: user.subscriptionEndDate,
        },
      });
    } catch (error) {
      logger.error('Error fetching subscription status:', error);
      res.status(500).json({ message: 'Failed to fetch subscription status' });
    }
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(req: any, res: Response): Promise<Response | void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const user = await User.findById(req.user.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      user.subscriptionStatus = 'cancelled';
      await user.save();

      logger.info('Subscription cancelled', { userId: user._id });

      res.status(200).json({
        success: true,
        message: 'Subscription cancelled successfully',
      });
    } catch (error) {
      logger.error('Error cancelling subscription:', error);
      res.status(500).json({ message: 'Failed to cancel subscription' });
    }
  }
}
