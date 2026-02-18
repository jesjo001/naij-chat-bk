import { Router } from 'express';
import { asyncHandler, verifyToken } from '../middleware/index.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();
const authController = new AuthController();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
	'/register',
	validateRegister,
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
	validateLogin,
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

/**
 * POST /api/auth/verify-email
 * Verify user email with token
 */
router.post(
	'/verify-email',
	asyncHandler(async (req, res) => {
		await authController.verifyEmail(req, res);
	})
);

/**
 * POST /api/auth/resend-verification
 * Resend verification email
 */
router.post(
	'/resend-verification',
	asyncHandler(async (req, res) => {
		await authController.resendVerification(req, res);
	})
);

/**
 * POST /api/auth/request-password-reset
 * Request password reset email
 */
router.post(
	'/request-password-reset',
	asyncHandler(async (req, res) => {
		await authController.requestPasswordReset(req, res);
	})
);

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post(
	'/reset-password',
	asyncHandler(async (req, res) => {
		await authController.resetPassword(req, res);
	})
);

export default router;
