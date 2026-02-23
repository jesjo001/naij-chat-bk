import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { logger } from '../utils/logger.js';
import User from '../models/User.js';
import VerificationToken from '../models/VerificationToken.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/mailer.js';
import { isTemporaryEmail } from '../utils/tempEmailDetector.js';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
  private sessions: Map<string, { userId: string; createdAt: number }> =
    new Map();

  constructor() {
    // Initialize demo user in database on startup
    this.initializeDemoUser();
  }

  /**
   * Initialize demo user in database
   */
  private async initializeDemoUser() {
    try {
      const demoEmail = 'demo@example.com';
      const existingUser = await User.findOne({ email: demoEmail });

      if (!existingUser) {
        const demoUser = new User({
          email: demoEmail,
          password: 'password123',
          name: 'John Doe',
          state: 'Lagos',
          language: 'pidgin',
        });
        await demoUser.save();
        logger.info('✅ Demo user created in MongoDB');
      }
    } catch (error) {
      logger.error('Error initializing demo user:', error);
    }
  }

  /**
   * POST /api/auth/register
   * Register a new user with MongoDB persistence
   */
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, state, language } = req.body;
      const now = new Date();
      const trialEndDate = new Date(now);
      trialEndDate.setDate(trialEndDate.getDate() + 3);

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required',
        });
      }

      // Check for temporary email address
      const tempEmailCheck = isTemporaryEmail(email);
      if (tempEmailCheck.isTemporary) {
        return res.status(400).json({
          success: false,
          message: tempEmailCheck.reason || 'Temporary email addresses are not allowed. Please use a real email address.',
        });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered',
        });
      }

      // Create new user (password will be hashed by mongoose hook)
      const newUser = new User({
        email: email.toLowerCase(),
        password,
        name,
        state: state || 'Lagos',
        language: language || 'pidgin',
        subscriptionTier: 'naija-plus',
        subscriptionStatus: 'active',
        subscriptionStartDate: now,
        subscriptionEndDate: trialEndDate,
      });

      await newUser.save();

      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpiry = new Date();
      verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24); // 24 hours

      await VerificationToken.create({
        userId: newUser._id,
        token: verificationToken,
        type: 'email-verification',
        expiresAt: verificationTokenExpiry,
      });

      // Send verification email
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;
      
      try {
        await sendVerificationEmail({
          email: newUser.email,
          name: newUser.name,
          verificationUrl,
        });
      } catch (emailError) {
        logger.error('Failed to send verification email:', emailError);
        // Continue with registration even if email fails
      }

      // Generate JWT token
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
      const token = jwt.sign(
        { userId: newUser._id.toString(), email: newUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      logger.info(`✅ User registered: ${email}`);

      res.status(201).json({
        success: true,
        message: 'Account created successfully. Please check your email to verify your account. 3-day Pro trial activated!',
        data: {
          user: {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name,
            state: newUser.state,
            language: newUser.language,
            role: newUser.role,
            subscriptionTier: newUser.subscriptionTier,
            subscriptionStatus: newUser.subscriptionStatus,
            subscriptionStartDate: newUser.subscriptionStartDate,
            subscriptionEndDate: newUser.subscriptionEndDate,
            emailVerified: newUser.emailVerified,
          },
          token,
          trial: {
            active: true,
            tier: 'naija-plus',
            endsAt: trialEndDate,
          },
        },
      });
    } catch (error) {
      logger.error('Register error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed',
      });
    }
  }

  /**
   * POST /api/auth/login
   * Login user with email and password
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() }).select(
        '+password'
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Compare passwords
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      // Check if email is verified
      if (!user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: 'Email not verified. Please check your email for the verification link.',
          code: 'EMAIL_NOT_VERIFIED',
          data: {
            email: user.email,
          },
        });
      }

      // Generate JWT token
      const JWT_SECRET = process.env.JWT_SECRET!
      const token = jwt.sign(
        { userId: user._id.toString(), email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Store session
      this.sessions.set(token, {
        userId: user._id.toString(),
        createdAt: Date.now(),
      });

      logger.info(`✅ User logged in: ${email}`);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            state: user.state,
            language: user.language,
            role: user.role,
            subscriptionTier: user.subscriptionTier,
            subscriptionStatus: user.subscriptionStatus,
            subscriptionStartDate: user.subscriptionStartDate,
            subscriptionEndDate: user.subscriptionEndDate,
            emailVerified: user.emailVerified,
          },
          token,
        },
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
      });
    }
  }

  /**
   * GET /api/auth/verify
   * Verify JWT token and get user info
   */
  async verify(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      console.log('Verifying token:', token);
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No token provided',
        });
      }

      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
      };

      // Find user from MongoDB
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            state: user.state,
            language: user.language,
            role: user.role,
            subscriptionTier: user.subscriptionTier,
            subscriptionStatus: user.subscriptionStatus,
            subscriptionStartDate: user.subscriptionStartDate,
            subscriptionEndDate: user.subscriptionEndDate,
            emailVerified: user.emailVerified,
          },
        },
      });
    } catch (error) {
      logger.error('Token verification error:', error);
      res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
  }

  /**
   * POST /api/auth/logout
   * Logout user
   */
  async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        this.sessions.delete(token);
      }

      logger.info('✅ User logged out');

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }
  }

  /**
   * PATCH /api/auth/profile
   * Update user profile fields
   */
  async updateProfile(req: Request, res: Response) {
    try {
      const { userId } = req as Request & { userId?: string };

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const { name, state, language } = req.body as {
        name?: string;
        state?: string;
        language?: string;
      };

      const updates: Record<string, string> = {};

      if (typeof name === 'string' && name.trim().length > 0) {
        updates.name = name.trim();
      }

      if (typeof state === 'string' && state.trim().length > 0) {
        updates.state = state.trim();
      }

      if (typeof language === 'string' && language.trim().length > 0) {
        updates.language = language.trim();
      }

      if (!Object.keys(updates).length) {
        return res.status(400).json({
          success: false,
          message: 'No valid profile fields provided',
        });
      }

      const user = await User.findByIdAndUpdate(userId, updates, {
        new: true,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated',
        data: {
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            state: user.state,
            language: user.language,
          },
        },
      });
    } catch (error) {
      logger.error('Profile update error:', error);
      res.status(500).json({
        success: false,
        message: 'Profile update failed',
      });
    }
  }

  /**
   * POST /api/auth/verify-email
   * Verify user email with token
   */
  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Verification token is required',
        });
      }

      // Find verification token
      const verificationToken = await VerificationToken.findOne({
        token,
        type: 'email-verification',
        expiresAt: { $gt: new Date() },
      });

      if (!verificationToken) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired verification token',
        });
      }

      // Update user email verification status
      const user = await User.findByIdAndUpdate(
        verificationToken.userId,
        { emailVerified: true },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // Delete the verification token
      await VerificationToken.deleteOne({ _id: verificationToken._id });

      logger.info(`✅ Email verified for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        data: {
          user: {
            id: user._id.toString(),
            email: user.email,
            emailVerified: user.emailVerified,
          },
        },
      });
    } catch (error) {
      logger.error('Email verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Email verification failed',
      });
    }
  }

  /**
   * POST /api/auth/resend-verification
   * Resend verification email
   */
  async resendVerification(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      if (user.emailVerified) {
        return res.status(400).json({
          success: false,
          message: 'Email is already verified',
        });
      }

      // Delete any existing verification tokens for this user
      await VerificationToken.deleteMany({
        userId: user._id,
        type: 'email-verification',
      });

      // Generate new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationTokenExpiry = new Date();
      verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24);

      await VerificationToken.create({
        userId: user._id,
        token: verificationToken,
        type: 'email-verification',
        expiresAt: verificationTokenExpiry,
      });

      // Send verification email
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;

      await sendVerificationEmail({
        email: user.email,
        name: user.name,
        verificationUrl,
      });

      logger.info(`✅ Verification email resent to: ${email}`);

      res.status(200).json({
        success: true,
        message: 'Verification email sent successfully',
      });
    } catch (error) {
      console.log('Resend verification error:', error);
      logger.error('Resend verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to resend verification email',
      });
    }
  }

  /**
   * POST /api/auth/request-password-reset
   * Request password reset email
   */
  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });

      // Don't reveal if user exists for security
      if (!user) {
        return res.status(200).json({
          success: true,
          message: 'If an account exists with this email, a password reset link has been sent',
        });
      }

      // Delete any existing password reset tokens for this user
      await VerificationToken.deleteMany({
        userId: user._id,
        type: 'password-reset',
      });

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date();
      resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // 1 hour

      await VerificationToken.create({
        userId: user._id,
        token: resetToken,
        type: 'password-reset',
        expiresAt: resetTokenExpiry,
      });

      // Send reset email
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        resetUrl,
      });

      logger.info(`✅ Password reset email sent to: ${email}`);

      res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent',
      });
    } catch (error) {
      logger.error('Request password reset error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process password reset request',
      });
    }
  }

  /**
   * POST /api/auth/reset-password
   * Reset password with token
   */
  async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: 'Token and new password are required',
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long',
        });
      }

      // Find reset token
      const resetToken = await VerificationToken.findOne({
        token,
        type: 'password-reset',
        expiresAt: { $gt: new Date() },
      });

      if (!resetToken) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token',
        });
      }

      // Update user password
      const user = await User.findById(resetToken.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      user.password = newPassword;
      await user.save(); // Password will be hashed by pre-save hook

      // Delete the reset token
      await VerificationToken.deleteOne({ _id: resetToken._id });

      logger.info(`✅ Password reset for user: ${user.email}`);

      res.status(200).json({
        success: true,
        message: 'Password reset successfully. You can now log in with your new password.',
      });
    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Password reset failed',
      });
    }
  }
}
