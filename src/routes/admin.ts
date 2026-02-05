import { Router } from 'express';
import { asyncHandler, verifyToken, requireAdmin } from '../middleware/index';
import { AdminController } from '../controllers/AdminController';

const router = Router();
const adminController = new AdminController();

router.get(
  '/analytics',
  verifyToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.getAnalytics(req, res);
  })
);

export default router;
