import { Router } from 'express';
import { asyncHandler, validateBudgetRequest } from '../middleware/index';
import { FinancialController } from '../controllers/FinancialController';

const router = Router();
const financialController = new FinancialController();

/**
 * POST /api/finance/budget
 * Generate personalized budget template
 */
router.post('/budget', validateBudgetRequest, asyncHandler(financialController.generateBudget));

/**
 * POST /api/finance/health-score
 * Calculate financial health score
 */
router.post('/health-score', asyncHandler(financialController.calculateHealthScore));

/**
 * GET /api/finance/investments
 * Get investment recommendations
 */
router.post('/investments', asyncHandler(financialController.getInvestmentRecommendations));

/**
 * GET /api/finance/cost-cutting
 * Get cost-cutting strategies
 */
router.post('/cost-cutting', asyncHandler(financialController.getCostCuttingStrategies));

export default router;
