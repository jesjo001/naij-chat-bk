import { Router } from 'express';
import { asyncHandler, verifyToken, requireAdmin, requireEmailVerification } from '../middleware/index.js';
import { AdminController } from '../controllers/AdminController.js';

const router = Router();
const adminController = new AdminController();

router.get(
  '/analytics',
  verifyToken,
  requireEmailVerification,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.getAnalytics(req, res);
  })
);

router.get(
  '/users',
  verifyToken,
  requireEmailVerification,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.getAllUsers(req, res);
  })
);

router.get(
  '/users/:id',
  verifyToken,
  requireEmailVerification,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.getUserById(req, res);
  })
);

router.patch(
  '/users/:id/role',
  verifyToken,
  requireEmailVerification,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.updateUserRole(req, res);
  })
);

router.patch(
  '/users/:id/subscription',
  verifyToken,
  requireEmailVerification,
  requireAdmin,
  asyncHandler(async (req, res) => {
    await adminController.updateUserSubscription(req, res);
  })
);

export default router;
