import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

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
    'children',
    'marketing',
    'film',
    'animation',
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
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default {
  errorHandler,
  validateStoryRequest,
  validateBudgetRequest,
  validateProductDescriptionRequest,
  validateMarketingStrategyRequest,
  requestLogger,
  asyncHandler,
};
