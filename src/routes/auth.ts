import { Router } from 'express';
import { asyncHandler, verifyToken } from '../middleware/index';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
	'/register',
	asyncHandler(async (req, res) => {
		await authController.register(req, res);
	})
);

/**
 * POST /api/auth/login
 * Login user with email and password
 */
router.post(
	'/login',
	asyncHandler(async (req, res) => {
		await authController.login(req, res);
	})
);

/**
 * GET /api/auth/verify
 * Verify JWT token and get user info
 */
router.get(
	'/verify',
	verifyToken,
	asyncHandler(async (req, res) => {
		await authController.verify(req, res);
	})
);

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post(
	'/logout',
	verifyToken,
	asyncHandler(async (req, res) => {
		await authController.logout(req, res);
	})
);

/**
 * PATCH /api/auth/profile
 * Update user profile
 */
router.patch(
	'/profile',
	verifyToken,
	asyncHandler(async (req, res) => {
		await authController.updateProfile(req, res);
	})
);

export default router;
