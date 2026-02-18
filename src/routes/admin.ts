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

router.get(
  '/users',
  verifyToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.getAllUsers(req, res);
  })
);

router.get(
  '/users/:id',
  verifyToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.getUserById(req, res);
  })
);

router.patch(
  '/users/:id/role',
  verifyToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.updateUserRole(req, res);
  })
);

router.patch(
  '/users/:id/subscription',
  verifyToken,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.updateUserSubscription(req, res);
  })
);

export default router;
