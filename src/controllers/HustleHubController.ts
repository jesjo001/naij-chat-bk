import { Request, Response, NextFunction } from 'express';
import { HustleHubService } from '../services/HustleHubService';
import { logger } from '../utils/logger';

export class HustleHubController {
  private hustleHubService: HustleHubService;

  constructor() {
    this.hustleHubService = new HustleHubService();
  }

  /**
   * Generate customer service response
   */
  generateCustomerResponse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating customer response', { params: req.body });
      const { scenario, productName, customerTone = 'curious' } =
        req.body;

      if (!scenario || !productName) {
        res.status(400).json({
          success: false,
          error: 'scenario and productName are required',
        });
        return;
      }

      const response = await this.hustleHubService.generateCustomerResponse(
        scenario,
        productName,
        customerTone
      );

      res.json({
        success: true,
        data: response,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating customer response', { error });
      next(error);
    }
  };

  /**
   * Generate product description
   */
  generateProductDescription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating product description', { params: req.body });
      const { productName, category, features, price, targetAudience } =
        req.body;

      const description = await this.hustleHubService.generateProductDescription(
        productName,
        category,
        features,
        price,
        targetAudience
      );

      res.json({
        success: true,
        data: description,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating product description', { error });
      next(error);
    }
  };

  /**
   * Generate marketing strategy
   */
  generateMarketingStrategy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating marketing strategy', { params: req.body });
      const { productName, targetAudience = 'General Public', budget = 50000 } = req.body;

      const strategy = await this.hustleHubService.generateMarketingStrategy(
        productName,
        targetAudience,
        budget
      );

      res.json({
        success: true,
        data: strategy,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating marketing strategy', { error });
      next(error);
    }
  };

  /**
   * Get platform-specific recommendations
   */
  getPlatformRecommendations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Getting platform recommendations', { params: req.body });

      const recommendations = {
        instagram: {
          description:
            'Best for visual products and lifestyle brands. Use Reels and Stories.',
          estimatedCost: 'Low to Medium',
          engagementRate: 'High',
          targetAudience: 'Young adults 18-35',
        },
        jumia: {
          description:
            'E-commerce platform. Best for selling products online.',
          estimatedCost: 'Medium',
          engagementRate: 'High',
          targetAudience: 'All ages',
        },
        facebook: {
          description:
            'Great for community building and targeted ads. Reach older demographics.',
          estimatedCost: 'Medium',
          engagementRate: 'Medium',
          targetAudience: 'All ages, esp. 25-55',
        },
        whatsapp: {
          description:
            'Direct customer communication. Perfect for customer service and B2B.',
          estimatedCost: 'Low',
          engagementRate: 'Very High',
          targetAudience: 'Existing customers',
        },
        tiktok: {
          description:
            'Viral marketing potential. Best for entertaining, trending content.',
          estimatedCost: 'Low to Medium',
          engagementRate: 'Very High',
          targetAudience: 'Young adults 13-30',
        },
      };

      res.json({
        success: true,
        data: recommendations,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error getting platform recommendations', { error });
      next(error);
    }
  };
}
