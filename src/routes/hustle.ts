import { Router } from 'express';
import {
  asyncHandler,
  validateProductDescriptionRequest,
  validateMarketingStrategyRequest,
} from '../middleware/index';
import { HustleHubController } from '../controllers/HustleHubController';

const router = Router();
const hustleHubController = new HustleHubController();

/**
 * POST /api/hustle/customer-response
 * Generate customer service responses with personality tone
 */
router.post('/customer-response', asyncHandler(hustleHubController.generateCustomerResponse));

/**
 * POST /api/hustle/product-description
 * Generate multi-platform product descriptions
 */
router.post(
  '/product-description',
  validateProductDescriptionRequest,
  asyncHandler(hustleHubController.generateProductDescription)
);

/**
 * POST /api/hustle/marketing-strategy
 * Generate a complete marketing strategy
 */
router.post(
  '/marketing-strategy',
  validateMarketingStrategyRequest,
  asyncHandler(hustleHubController.generateMarketingStrategy)
);

/**
 * GET /api/hustle/platform-recommendations
 * Get platform-specific marketing recommendations
 */
router.get('/platform-recommendations', asyncHandler(hustleHubController.getPlatformRecommendations));

export default router;
