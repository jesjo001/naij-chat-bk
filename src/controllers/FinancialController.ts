import { Request, Response, NextFunction } from 'express';
import { FinancialService } from '../services/FinancialService';
import { logger } from '../utils/logger';

export class FinancialController {
  private financialService: FinancialService;

  constructor() {
    this.financialService = new FinancialService();
  }

  /**
   * Generate a budget template
   */
  generateBudget = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating budget', { params: req.body });
      const { monthlyIncome, location, familySize, lifestyleType } = req.body;

      const budget = await this.financialService.generateBudgetTemplate(
        monthlyIncome,
        location,
        familySize,
        lifestyleType
      );

      res.json({
        success: true,
        data: budget,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating budget', { error });
      next(error);
    }
  };

  /**
   * Calculate financial health score
   */
  calculateHealthScore = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Calculating financial health score', { params: req.body });
      const {
        monthlyIncome,
        savings,
        debts,
        investments,
      } = req.body;

      const score = this.financialService.calculateFinancialHealthScore(
        monthlyIncome,
        savings || 0,
        debts || 0,
        investments || 0
      );

      res.json({
        success: true,
        data: score,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error calculating health score', { error });
      next(error);
    }
  };

  /**
   * Get investment recommendations
   */
  getInvestmentRecommendations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Getting investment recommendations', { params: req.body });
      const { monthlyIncome } = req.body;

      if (!monthlyIncome || typeof monthlyIncome !== 'number') {
        res.status(400).json({
          success: false,
          error: 'monthlyIncome is required and must be a number',
        });
        return;
      }

      // Generate a budget first to get investment recommendations
      const budget = await this.financialService.generateBudgetTemplate(
        monthlyIncome,
        'Lagos',
        1,
        'moderate'
      );

      const recommendations = budget.investmentOpportunities || [];

      res.json({
        success: true,
        data: recommendations,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error getting investment recommendations', { error });
      next(error);
    }
  };

  /**
   * Get cost-cutting strategies
   */
  getCostCuttingStrategies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Getting cost-cutting strategies', { params: req.body });
      const { monthlyIncome = 100000, location = 'Lagos' } = req.body;

      const budget = await this.financialService.generateBudgetTemplate(
        monthlyIncome,
        location,
        1,
        'moderate'
      );

      const strategies = budget.costCuttingStrategies || [];

      res.json({
        success: true,
        data: strategies,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error getting cost-cutting strategies', { error });
      next(error);
    }
  };
}
