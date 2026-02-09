import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config();


export class BillingController {
  /**
   * POST /api/billing/flutterwave/initialize
   * Initialize a Flutterwave payment and return payment link
   */
  async initializeFlutterwave(req: Request, res: Response) {
    try {
      const { email, name, amount, plan, redirectUrl } = req.body as {
        email: string;
        name?: string;
        amount: number;
        plan: 'creator' | 'studio';
        redirectUrl?: string;
      };
      console.log('Initializing Flutterwave payment', { email, name, amount, plan, redirectUrl }); 
      

      if (!email || !amount || !plan) {
        return res.status(400).json({
          success: false,
          message: 'Email, amount, and plan are required',
        });
      }

      const secretKey = process.env.NODE_ENV === 'development' ? process.env.FLUTTERWAVE_SECRET_TEST_KEY : process.env.FLUTTERWAVE_SECRET_KEY;
      console.log('Using Flutterwave Secret Key:', secretKey )
      
      if (!secretKey) {
        return res.status(500).json({
          success: false,
          message: 'Flutterwave secret key not configured',
        });
      }

      const tx_ref = `aimoviescript_${plan}_${Date.now()}`;

      const response = await axios.post(
        'https://api.flutterwave.com/v3/payments',
        {
          tx_ref,
          amount,
          currency: 'NGN',
          redirect_url: redirectUrl || process.env.FLUTTERWAVE_REDIRECT_URL || (process.env.NODE_ENV === 'development' ? process.env.FLUTTERWAVE_TEST_REDIRECT_URL : process.env.FLUTTERWAVE_REDIRECT_URL),
          customer: {
            email,
            name: name || email,
          },
          meta: {
            plan,
          },
          customizations: {
            title: 'AI Movie Script',
            description: `${plan.toUpperCase()} plan subscription`,
            logo: process.env.FLUTTERWAVE_LOGO_URL || undefined,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Flutterwave init response', response);

      res.json({
        success: true,
        data: response.data?.data || response.data,
      });
    } catch (error) {
      logger.error('Flutterwave init error', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to initialize payment',
      });
    }
  }

  /**
   * POST /api/billing/flutterwave/verify
   * Verify Flutterwave transaction
   */
  async verifyFlutterwave(req: Request, res: Response) {
    try {
      console.log('Verifying Flutterwave payment', req.body);
      const { transactionId } = req.body as { transactionId: string };

      if (!transactionId) {
        return res.status(400).json({
          success: false,
          message: 'transactionId is required',
        });
      }

      const secretKey = process.env.NODE_ENV === 'development' ? process.env.FLUTTERWAVE_SECRET_TEST_KEY : process.env.FLUTTERWAVE_SECRET_KEY;
      console.log('Using Flutterwave Secret Key for verification:', secretKey);

      if (!secretKey) {
        return res.status(500).json({
          success: false,
          message: 'Flutterwave secret key not configured',
        });
      }

      const response = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Flutterwave verify response', response);

      const data = response.data?.data;
      if (!data || data.status !== 'successful') {
        return res.status(400).json({
          success: false,
          message: 'Payment not successful',
          data,
        });
      }

      res.json({
        success: true,
        data: {
          status: data.status,
          amount: data.amount,
          currency: data.currency,
          tx_ref: data.tx_ref,
          plan: data.meta?.plan,
          customer: data.customer,
        },
      });
    } catch (error) {
      console.error('Flutterwave verify error', error);
      logger.error('Flutterwave verify error', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to verify payment',
      });
    }
  }
}
