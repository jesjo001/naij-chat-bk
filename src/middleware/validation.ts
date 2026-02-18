/**
 * Enhanced Input Validation and Sanitization Middleware
 * Uses express-validator for comprehensive request validation
 */

import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to check validation results
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
      })),
    });
  }
  next();
};

// ============================================
// Auth Validation Rules
// ============================================

export const validateRegister = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email too long'),
  body('password')
    .isLength({ min: 6, max: 100 }).withMessage('Password must be 6-100 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .matches(/^[a-zA-Z\s\-']+$/).withMessage('Name contains invalid characters'),
  body('state')
    .trim()
    .notEmpty().withMessage('State is required')
    .isLength({ max: 50 }).withMessage('State name too long'),
  body('language')
    .optional()
    .trim()
    .isIn(['pidgin', 'yoruba', 'igbo', 'hausa', 'english']).withMessage('Invalid language'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ max: 100 }).withMessage('Password too long'),
  handleValidationErrors,
];

// ============================================
// Chat Validation Rules
// ============================================

export const validateChatMessage = [
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 1, max: 5000 }).withMessage('Message must be 1-5000 characters')
    .customSanitizer(value => value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')), // Remove script tags
  body('conversationId')
    .optional()
    .isMongoId().withMessage('Invalid conversation ID'),
  body('personality')
    .optional()
    .trim()
    .isIn(['lagos-hustler', 'pidgin-philosopher', 'village-elder', 'modern-nigerian', 'professional'])
    .withMessage('Invalid personality'),
  body('language')
    .optional()
    .trim()
    .isIn(['pidgin', 'yoruba', 'igbo', 'hausa', 'english']).withMessage('Invalid language'),
  handleValidationErrors,
];

// ============================================
// Payment Validation Rules
// ============================================

export const validatePaymentInit = [
  body('tier')
    .trim()
    .notEmpty().withMessage('Subscription tier is required')
    .isIn(['naija-plus', 'business', 'enterprise']).withMessage('Invalid subscription tier'),
  body('period')
    .optional()
    .trim()
    .isIn(['monthly', 'yearly']).withMessage('Invalid subscription period'),
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  handleValidationErrors,
];

export const validatePaymentVerify = [
  query('transaction_id')
    .trim()
    .notEmpty().withMessage('Transaction ID is required')
    .isLength({ max: 100 }).withMessage('Transaction ID too long'),
  handleValidationErrors,
];

// ============================================
// Story Validation Rules
// ============================================

export const validateStoryGeneration = [
  body('storyType')
    .optional()
    .trim()
    .isIn(['folktale', 'modern', 'modern_nigerian', 'children', 'marketing', 'film', 'animation', 'animation_script'])
    .withMessage('Invalid story type'),
  body('theme')
    .trim()
    .notEmpty().withMessage('Theme is required')
    .isLength({ min: 3, max: 200 }).withMessage('Theme must be 3-200 characters'),
  body('targetAudience')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Target audience too long'),
  body('duration')
    .optional()
    .isInt({ min: 1, max: 300 }).withMessage('Duration must be 1-300 minutes'),
  body('language')
    .optional()
    .trim()
    .isIn(['pidgin', 'yoruba', 'igbo', 'hausa', 'english']).withMessage('Invalid language'),
  handleValidationErrors,
];

// ============================================
// Contact Form Validation Rules
// ============================================

export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters')
    .matches(/^[a-zA-Z\s\-']+$/).withMessage('Name contains invalid characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 3, max: 200 }).withMessage('Subject must be 3-200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters')
    .customSanitizer(value => value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')),
  handleValidationErrors,
];

// ============================================
// ID Parameter Validation
// ============================================

export const validateMongoId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  handleValidationErrors,
];

// ============================================
// Pagination Validation
// ============================================

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 10000 }).withMessage('Page must be between 1 and 10000')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt(),
  handleValidationErrors,
];
