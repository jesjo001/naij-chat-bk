import { Router } from 'express';
import { asyncHandler } from '../middleware/index';
import { PersonalityController } from '../controllers/PersonalityController';

const router = Router();
const personalityController = new PersonalityController();

/**
 * GET /api/personality/profiles
 * Get all available AI personalities
 */
router.get('/profiles', asyncHandler(personalityController.getProfiles));

/**
 * GET /api/personality/:id
 * Get a specific personality by ID
 */
router.get('/:id', asyncHandler(personalityController.getById));

/**
 * POST /api/personality/select
 * Select an AI personality for the session
 */
router.post('/select', asyncHandler(personalityController.selectPersonality));

/**
 * GET /api/personality/:id/introduction
 * Get introduction from a specific personality
 */
router.get('/:id/introduction', asyncHandler(personalityController.getIntroduction));

/**
 * GET /api/personality/:id/prompt
 * Get system prompt for AI integration
 */
router.get('/:id/prompt', asyncHandler(personalityController.getSystemPrompt));

export default router;
