import express, { Request, Response, NextFunction } from 'express';
import { PaymentController } from '../controllers/PaymentController.js';
import { authenticateToken, asyncHandler, requireEmailVerification } from '../middleware/index.js';

const router = express.Router();

/**
 * @route   POST /api/payment/initiate
 * @desc    Initialize a new payment
 * @access  Private
 */
router.post(
  '/initiate',
  authenticateToken,
  requireEmailVerification,
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await (PaymentController.initiatePayment as any)(req, res);
  })
);

/**
 * @route   POST /api/payment/verify
 * @desc    Verify payment with Flutterwave
 * @access  Private
 */
router.post(
  '/verify',
  authenticateToken,
  requireEmailVerification,
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await (PaymentController.verifyPayment as any)(req, res);
  })
);

/**
 * @route   POST /api/payment/webhook
 * @desc    Flutterwave webhook endpoint
 * @access  Public (secured by signature verification)
 */
router.post(
  '/webhook',
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await (PaymentController.handleWebhook as any)(req, res);
  })
);

/**
 * @route   GET /api/payment/history
 * @desc    Get user's payment history
 * @access  Private
 */
router.get(
  '/history',
  authenticateToken,
  requireEmailVerification,
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await (PaymentController.getPaymentHistory as any)(req, res);
  })
);

/**
 * @route   GET /api/payment/subscription
 * @desc    Get user's subscription status
 * @access  Private
 */
router.get(
  '/subscription',
  authenticateToken,
  requireEmailVerification,
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await (PaymentController.getSubscriptionStatus as any)(req, res);
  })
);

/**
 * @route   POST /api/payment/subscription/cancel
 * @desc    Cancel user's subscription
 * @access  Private
 */
router.post(
  '/subscription/cancel',
  authenticateToken,
  requireEmailVerification,
  asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    await (PaymentController.cancelSubscription as any)(req, res);
  })
);

export default router;
