import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { logger } from '../utils/logger.js';

// ============================================
// Error Handler Middleware
// ============================================

export interface CustomError extends Error {
  status?: number;
  details?: Record<string, string>;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error [${status}]: ${message}`, { 
    error: err,
    details: err.details 
  });

  res.status(status).json({
    success: false,
    error: message,
    details: err.details,
    timestamp: new Date().toISOString(),
  });
};

// ============================================
// Request Validation Middleware
// ============================================

export const validateStoryRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { storyType, theme, targetAudience } = req.body;

  const validStoryTypes = [
    'folktale',
    'modern',
    'modern_nigerian',
    'children',
    'marketing',
    'film',
    'animation',
    'animation_script'
  ];

  if (storyType && !validStoryTypes.includes(storyType)) {
    const error: CustomError = new Error('Invalid story type');
    error.status = 400;
    error.details = {
      storyType: `Must be one of: ${validStoryTypes.join(', ')}`,
    };
    return next(error);
  }

  if (theme && typeof theme !== 'string') {
    const error: CustomError = new Error('Invalid theme');
    error.status = 400;
    error.details = { theme: 'Theme must be a string' };
    return next(error);
  }

  if (targetAudience && typeof targetAudience !== 'string') {
    const error: CustomError = new Error('Invalid target audience');
    error.status = 400;
    error.details = {
      targetAudience: 'Target audience must be a string',
    };
    return next(error);
  }

  next();
};

export const validateBudgetRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { monthlyIncome, familySize, location } = req.body;

  const errors: Record<string, string> = {};

  if (!monthlyIncome || typeof monthlyIncome !== 'number' || monthlyIncome <= 0) {
    errors.monthlyIncome =
      'Monthly income is required and must be a positive number';
  }

  if (
    !familySize ||
    typeof familySize !== 'number' ||
    familySize < 1 ||
    familySize > 30
  ) {
    errors.familySize = 'Family size must be between 1 and 30';
  }

  if (!location || typeof location !== 'string') {
    errors.location = 'Location is required and must be a string';
  }

  if (Object.keys(errors).length > 0) {
    const error: CustomError = new Error('Validation failed');
    error.status = 400;
    error.details = errors;
    return next(error);
  }

  next();
};

export const validateProductDescriptionRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productName, category, features, price } = req.body;

  const errors: Record<string, string> = {};

  if (!productName || typeof productName !== 'string') {
    errors.productName = 'Product name is required and must be a string';
  }

  if (!category || typeof category !== 'string') {
    errors.category = 'Category is required and must be a string';
  }

  if (!Array.isArray(features) || features.length === 0) {
    errors.features =
      'Features must be an array with at least one item';
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    errors.price = 'Price is required and must be a positive number';
  }

  if (Object.keys(errors).length > 0) {
    const error: CustomError = new Error('Validation failed');
    error.status = 400;
    error.details = errors;
    return next(error);
  }

  next();
};

export const validateMarketingStrategyRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { businessType, targetMarket, budget, duration } = req.body;

  const errors: Record<string, string> = {};

  if (!businessType || typeof businessType !== 'string') {
    errors.businessType =
      'Business type is required and must be a string';
  }

  if (!targetMarket || typeof targetMarket !== 'string') {
    errors.targetMarket = 'Target market is required and must be a string';
  }

  if (!budget || typeof budget !== 'number' || budget <= 0) {
    errors.budget = 'Budget is required and must be a positive number';
  }

  if (!duration || typeof duration !== 'number' || duration < 1) {
    errors.duration = 'Duration is required and must be at least 1';
  }

  if (Object.keys(errors).length > 0) {
    const error: CustomError = new Error('Validation failed');
    error.status = 400;
    error.details = errors;
    return next(error);
  }

  next();
};

// ============================================
// Logging Middleware
// ============================================

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info(`${req.method} ${req.path}`, {
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};

// ============================================
// Async Error Wrapper Middleware
// ============================================

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ============================================
// Authentication Middleware
// ============================================

interface AuthenticatedRequest extends Request {
  userId?: string;
  email?: string;
  user?: {
    userId: string;
    email: string;
  };
}

  // ============================================
  // ============================================
  // JWT Authentication Middleware
  // ============================================

  export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({
          success: false,
          message: 'No token provided',
        });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        email: string;
      };

      (req as AuthenticatedRequest).user = { userId: decoded.userId, email: decoded.email };
      next();
    } catch (error) {
      logger.error('Token authentication error:', error);
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }
  };

  // ============================================
  // Subscription Check Middleware
  // ============================================

  type SubscriptionTier = 'free' | 'naija-plus' | 'business' | 'enterprise';

  export const requireSubscription = (minTier: SubscriptionTier) => {
    const tierLevels: Record<SubscriptionTier, number> = {
      free: 0,
      'naija-plus': 1,
      business: 2,
      enterprise: 3,
    };

    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authReq = req as AuthenticatedRequest;
        if (!authReq.user?.userId) {
          return res.status(401).json({
            success: false,
            message: 'Authentication required',
          });
        }

        const user = await User.findById(authReq.user.userId);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }

        // Check if subscription has expired
        const now = new Date();
        if (user.subscriptionEndDate && user.subscriptionEndDate < now && user.subscriptionTier !== 'free') {
          user.subscriptionStatus = 'expired';
          user.subscriptionTier = 'free';
          await user.save();
        }

        // Check subscription tier level
        const userTierLevel = tierLevels[user.subscriptionTier];
        const requiredTierLevel = tierLevels[minTier];

        if (userTierLevel < requiredTierLevel) {
          return res.status(403).json({
            success: false,
            message: `This feature requires ${minTier} subscription or higher`,
            currentTier: user.subscriptionTier,
            requiredTier: minTier,
          });
        }

        next();
      } catch (error) {
        logger.error('Subscription check error:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to verify subscription',
        });
      }
    };
  };

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('Verifying token:', token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const authReq = req as AuthenticatedRequest;
    authReq.userId = decoded.userId;
    authReq.email = decoded.email;

    next();
  } catch (error) {
    logger.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

/**
 * Middleware to verify email is confirmed before accessing protected resources
 */
export const requireEmailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authReq = req as AuthenticatedRequest;
    
    if (!authReq.userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const user = await User.findById(authReq.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Email verification required. Please verify your email address before accessing this resource.',
        code: 'EMAIL_NOT_VERIFIED',
        data: {
          email: user.email,
        },
      });
    }

    next();
  } catch (error) {
    logger.error('Email verification check error:', error);
    res.status(500).json({
      success: false,
      message: 'Email verification check failed',
    });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const authReq = req as AuthenticatedRequest;
  const email = authReq.email?.toLowerCase();

  if (!email || !adminEmails.includes(email)) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }

  next();
};

export default {
  errorHandler,
  validateStoryRequest,
  validateBudgetRequest,
  validateProductDescriptionRequest,
  validateMarketingStrategyRequest,
  requestLogger,
  asyncHandler,
    authenticateToken,
    requireSubscription,
  verifyToken,
  requireEmailVerification,
  requireAdmin,
};
