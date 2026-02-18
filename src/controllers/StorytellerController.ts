import { Request, Response, NextFunction } from 'express';
import { StorytellerService } from '../services/StorytellerService.js';
import { StoryRequest } from '../types/index.js';
import { logger } from '../utils/logger.js';

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
}
