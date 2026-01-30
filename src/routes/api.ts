import { Router } from 'express';
import {
  validateStoryRequest,
  validateBudgetRequest,
  validateProductDescriptionRequest,
  validateMarketingStrategyRequest,
  asyncHandler,
} from '../middleware/index';
import { DataController } from '../controllers/DataController';
import { StorytellerController } from '../controllers/StorytellerController';
import { PersonalityController } from '../controllers/PersonalityController';
import { FinancialController } from '../controllers/FinancialController';
import { HustleHubController } from '../controllers/HustleHubController';

const router = Router();

// Initialize controllers
const dataController = new DataController();
const storytellerController = new StorytellerController();
const personalityController = new PersonalityController();
const financialController = new FinancialController();
const hustleHubController = new HustleHubController();

// ============================================================
// DATA COLLECTION ENDPOINTS (Street Oracle)
// ============================================================

/**
 * GET /api/data/exchange-rates
 * Get current exchange rates for major currencies
 */
router.get('/data/exchange-rates', asyncHandler(dataController.getExchangeRates));

/**
 * GET /api/data/fuel-prices
 * Get fuel prices across Nigerian states
 */
router.get('/data/fuel-prices', asyncHandler(dataController.getFuelPrices));

/**
 * GET /api/data/nepa-status
 * Get current NEPA/EEDC power status
 */
router.get('/data/nepa-status', asyncHandler(dataController.getNepaStatus));

/**
 * GET /api/data/news
 * Get latest news from Nigeria
 */
router.get('/data/news', asyncHandler(dataController.getNews));

/**
 * GET /api/data/flights
 * Get flight prices and availability
 */
router.get('/data/flights', asyncHandler(dataController.getFlightPrices));

/**
 * GET /api/data/food-prices
 * Get food commodity prices across Nigeria
 */
router.get('/data/food-prices', asyncHandler(dataController.getFoodPrices));

/**
 * GET /api/data/stocks
 * Get Nigerian stock market data (NGX)
 */
router.get('/data/stocks', asyncHandler(dataController.getStockMarketInfo));

// ============================================================
// STORYTELLER STUDIO ENDPOINTS
// ============================================================

/**
 * POST /api/storyteller/generate
 * Generate a complete story with theme, length, and style
 */
router.post(
  '/storyteller/generate',
  validateStoryRequest,
  asyncHandler(storytellerController.generateStory)
);

/**
 * POST /api/storyteller/characters
 * Generate characters for a story
 */
router.post(
  '/storyteller/characters',
  asyncHandler(storytellerController.generateCharacters)
);

/**
 * POST /api/storyteller/script
 * Generate a screenplay/script
 */
router.post(
  '/storyteller/script',
  asyncHandler(storytellerController.generateScript)
);

/**
 * POST /api/storyteller/storyboard
 * Generate visual storyboard descriptions
 */
router.post(
  '/storyteller/storyboard',
  asyncHandler(storytellerController.generateStoryboard)
);

// ============================================================
// AI PERSONALITIES ENDPOINTS
// ============================================================

/**
 * GET /api/personality/profiles
 * Get all available AI personalities
 */
router.get(
  '/personality/profiles',
  asyncHandler(personalityController.getProfiles)
);

/**
 * GET /api/personality/:id
 * Get a specific personality by ID
 */
router.get(
  '/personality/:id',
  asyncHandler(personalityController.getById)
);

/**
 * POST /api/personality/select
 * Select an AI personality for the session
 */
router.post(
  '/personality/select',
  asyncHandler(personalityController.selectPersonality)
);

/**
 * GET /api/personality/:id/introduction
 * Get introduction from a specific personality
 */
router.get(
  '/personality/:id/introduction',
  asyncHandler(personalityController.getIntroduction)
);

/**
 * GET /api/personality/:id/prompt
 * Get system prompt for AI integration
 */
router.get(
  '/personality/:id/prompt',
  asyncHandler(personalityController.getSystemPrompt)
);

// ============================================================
// FINANCIAL PLANNING ENDPOINTS
// ============================================================

/**
 * POST /api/finance/budget
 * Generate personalized budget template
 */
router.post(
  '/finance/budget',
  validateBudgetRequest,
  asyncHandler(financialController.generateBudget)
);

/**
 * POST /api/finance/health-score
 * Calculate financial health score
 */
router.post(
  '/finance/health-score',
  asyncHandler(financialController.calculateHealthScore)
);

/**
 * GET /api/finance/investments
 * Get investment recommendations
 */
router.post(
  '/finance/investments',
  asyncHandler(financialController.getInvestmentRecommendations)
);

/**
 * GET /api/finance/cost-cutting
 * Get cost-cutting strategies
 */
router.post(
  '/finance/cost-cutting',
  asyncHandler(financialController.getCostCuttingStrategies)
);

// ============================================================
// HUSTLE HUB ENDPOINTS
// ============================================================

/**
 * POST /api/hustle/customer-response
 * Generate customer service responses with personality tone
 */
router.post(
  '/hustle/customer-response',
  asyncHandler(hustleHubController.generateCustomerResponse)
);

/**
 * POST /api/hustle/product-description
 * Generate multi-platform product descriptions
 */
router.post(
  '/hustle/product-description',
  validateProductDescriptionRequest,
  asyncHandler(hustleHubController.generateProductDescription)
);

/**
 * POST /api/hustle/marketing-strategy
 * Generate a complete marketing strategy
 */
router.post(
  '/hustle/marketing-strategy',
  validateMarketingStrategyRequest,
  asyncHandler(hustleHubController.generateMarketingStrategy)
);

/**
 * GET /api/hustle/platform-recommendations
 * Get platform-specific marketing recommendations
 */
router.get(
  '/hustle/platform-recommendations',
  asyncHandler(hustleHubController.getPlatformRecommendations)
);

// ============================================================
// AGGREGATED DATA ENDPOINT
// ============================================================

/**
 * GET /api/all
 * Get all aggregated data (all data sources combined)
 */
router.get('/all', asyncHandler(dataController.getAllData));

// ============================================================
// HEALTH & STATUS ENDPOINT
// ============================================================

/**
 * GET /health
 * Health check endpoint
 */
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Naija Sabi API is running',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
  });
});

export default router;
