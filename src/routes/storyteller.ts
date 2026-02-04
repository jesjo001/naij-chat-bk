import { Router } from 'express';
import { asyncHandler, validateStoryRequest } from '../middleware/index';
import { StorytellerController } from '../controllers/StorytellerController';

const router = Router();
const storytellerController = new StorytellerController();

/**
 * POST /api/storyteller/generate
 * Generate a complete story with theme, length, and style
 */
router.post('/generate', validateStoryRequest, asyncHandler(storytellerController.generateStory));

/**
 * POST /api/storyteller/characters
 * Generate characters for a story
 */
router.post('/characters', asyncHandler(storytellerController.generateCharacters));

/**
 * POST /api/storyteller/script
 * Generate a screenplay/script
 */
router.post('/script', asyncHandler(storytellerController.generateScript));

/**
 * POST /api/storyteller/storyboard
 * Generate visual storyboard descriptions
 */
router.post('/storyboard', asyncHandler(storytellerController.generateStoryboard));

export default router;
