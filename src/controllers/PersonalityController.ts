import { Request, Response, NextFunction } from 'express';
import { PersonalityService } from '../services/PersonalityService';
import { logger } from '../utils/logger';

export class PersonalityController {
  private personalityService: PersonalityService;

  constructor() {
    this.personalityService = new PersonalityService();
  }

  /**
   * Get all personalities
   */
  getProfiles = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching all personalities');
      const personalities = this.personalityService.getAllPersonalities();
      res.json({
        success: true,
        data: personalities,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching personalities', { error });
      next(error);
    }
  };

  /**
   * Get personality by ID
   */
  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      logger.info(`Fetching personality: ${id}`);
      const personality = this.personalityService.getPersonality(id);
      
      if (!personality) {
        res.status(404).json({
          success: false,
          error: `Personality with ID ${id} not found`,
        });
        return;
      }

      res.json({
        success: true,
        data: personality,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching personality', { error });
      next(error);
    }
  };

  /**
   * Select a personality for the session
   */
  selectPersonality = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { personalityId } = req.body;
      logger.info(`Selecting personality: ${personalityId}`);

      if (!personalityId || typeof personalityId !== 'string') {
        res.status(400).json({
          success: false,
          error: 'personalityId is required and must be a string',
        });
        return;
      }

      const result = this.personalityService.setActivePersonality(personalityId);
      
      if (!result) {
        res.status(404).json({
          success: false,
          error: `Personality with ID ${personalityId} not found`,
        });
        return;
      }

      const personality = this.personalityService.getPersonality(personalityId);
      res.json({
        success: true,
        data: personality,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error selecting personality', { error });
      next(error);
    }
  };

  /**
   * Get introduction from a personality
   */
  getIntroduction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { personalityId } = req.params;
      logger.info(`Getting introduction from personality: ${personalityId}`);

      const personality = this.personalityService.getPersonality(personalityId);
      if (!personality) {
        res.status(404).json({
          success: false,
          error: `Personality with ID ${personalityId} not found`,
        });
        return;
      }

      const introduction = this.personalityService.generateIntroduction(
        personalityId
      );

      res.json({
        success: true,
        data: { introduction },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error getting introduction', { error });
      next(error);
    }
  };

  /**
   * Get system prompt for a personality
   */
  getSystemPrompt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { personalityId } = req.params;
      logger.info(`Getting system prompt for personality: ${personalityId}`);

      const personality = this.personalityService.getPersonality(personalityId);
      if (!personality) {
        res.status(404).json({
          success: false,
          error: `Personality with ID ${personalityId} not found`,
        });
        return;
      }

      const prompt = this.personalityService.getSystemPrompt(personalityId);

      res.json({
        success: true,
        data: { prompt: prompt || '' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error getting system prompt', { error });
      next(error);
    }
  };
}
