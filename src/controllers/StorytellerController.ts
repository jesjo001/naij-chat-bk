import { Request, Response, NextFunction } from 'express';
import { StorytellerService } from '../services/StorytellerService';
import { StoryRequest } from '../types/index';
import { logger } from '../utils/logger';

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
      const story = await this.storytellerService.generateStory(storyRequest);
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
}
