import { Router } from 'express';
import { asyncHandler, verifyToken, requireAdmin } from '../middleware/index.js';
import { AdminController } from '../controllers/AdminController.js';

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
