import { Router } from 'express';
import { asyncHandler } from '../middleware/index';
import { BillingController } from '../controllers/BillingController';

const router = Router();
const billingController = new BillingController();

router.post(
  '/flutterwave/initialize',
  asyncHandler(async (req, res) => {
    await billingController.initializeFlutterwave(req, res);
  })
);

router.post(
  '/flutterwave/verify',
  asyncHandler(async (req, res) => {
    await billingController.verifyFlutterwave(req, res);
  })
);

export default router;
