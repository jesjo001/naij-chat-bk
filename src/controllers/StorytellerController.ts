import { Request, Response, NextFunction } from 'express';
import { StorytellerService } from '../services/StorytellerService';
import { StoryRequest } from '../types/index';
import { logger } from '../utils/logger';
import StoryUsage from '../models/StoryUsage';

export class StorytellerController {
  private storytellerService: StorytellerService;

  constructor() {
    this.storytellerService = new StorytellerService();
  }

  /**
   * Generate a story
   */
  generateStory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating story', { params: req.body });
      const storyRequest: StoryRequest = req.body;

      const tier = (storyRequest.tier || 'starter').toLowerCase();
      const limits: Record<string, number> = {
        starter: 3,
        creator: 10,
        studio: Number.MAX_SAFE_INTEGER,
      };

      const limit = limits[tier] ?? limits.starter;
      const identifier = (req as any).userId || req.ip || 'anonymous';
      const now = new Date();
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

      if (tier !== 'studio') {
        const usage = await StoryUsage.findOne({ identifier, month: monthKey });
        if (usage && usage.count >= limit) {
          res.status(429).json({
            success: false,
            message: `Monthly limit reached for ${tier} plan. Upgrade to continue.`,
            data: { limit, count: usage.count, tier },
          });
          return;
        }
      }

      const story = await this.storytellerService.generateStory(storyRequest);

      await StoryUsage.findOneAndUpdate(
        { identifier, month: monthKey },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );

      res.json({
        success: true,
        data: story,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating story', { error });
      next(error);
    }
  };

  /**
   * Generate story characters
   */
  generateCharacters = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating characters', { params: req.body });
      const { count = 5, storyRequest } = req.body;
      const characters = await this.storytellerService.generateCharacters(
        storyRequest || { storyType: 'folktale', theme: 'Adventure', targetAudience: 'General' },
        count
      );
      res.json({
        success: true,
        data: characters,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating characters', { error });
      next(error);
    }
  };

  /**
   * Generate story script
   */
  generateScript = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating script', { params: req.body });
      const { story, characters } = req.body;
      const script = await this.storytellerService.generateScript(story, characters);
      res.json({
        success: true,
        data: script,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating script', { error });
      next(error);
    }
  };

  /**
   * Generate storyboard
   */
  generateStoryboard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating storyboard', { params: req.body });
      const { story, script } = req.body;
      const storyboard = await this.storytellerService.generateStoryboard(
        story,
        script
      );
      res.json({
        success: true,
        data: storyboard,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating storyboard', { error });
      next(error);
    }
  };

  /**
   * Generate additional scenes for an existing script
   */
  generateMoreScenes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating more scenes', { params: req.body });
      const { story, script, additionalScenes = 2 } = req.body;
      const updatedScript = await this.storytellerService.generateMoreScenes(
        story,
        script,
        Number(additionalScenes) || 2
      );
      res.json({
        success: true,
        data: updatedScript,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating more scenes', { error });
      next(error);
    }
  };

  /**
   * Generate story concepts
   */
  generateConcepts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Generating concepts', { params: req.body });
      const { storyRequest, count = 5 } = req.body as { storyRequest: StoryRequest; count?: number };

      if (!storyRequest) {
        res.status(400).json({
          success: false,
          message: 'storyRequest is required'
        });
        return;
      }

      const concepts = await this.storytellerService.generateConcepts(storyRequest, Number(count) || 5);
      res.json({
        success: true,
        data: concepts,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error generating concepts', { error });
      next(error);
    }
  };
}
