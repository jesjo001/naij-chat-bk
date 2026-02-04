import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';
import User from '../models/User';
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

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and password are required',
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
      });

      await newUser.save();

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
        message: 'Account created successfully',
        data: {
          user: {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name,
          },
          token,
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
}

