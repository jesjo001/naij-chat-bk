import { Router } from 'express';
import { asyncHandler, authenticateToken } from '../middleware/index.js';
import { AgentController } from '../controllers/AgentController.js';

const router = Router();
const agentController = new AgentController();

/**
 * GET /api/agents
 * Get all agents for the current user (protected)
 */
router.get('/', authenticateToken, asyncHandler(agentController.getUserAgents));

/**
 * GET /api/agents/public
 * Get public agents (community)
 */
router.get('/public', asyncHandler(agentController.getPublicAgents));

/**
 * GET /api/agents/:id
 * Get a specific agent by ID
 */
router.get('/:id', asyncHandler(agentController.getAgent));

/**
 * POST /api/agents
 * Create a new agent (protected)
 */
router.post('/', authenticateToken, asyncHandler(agentController.createAgent));

/**
 * PATCH /api/agents/:id
 * Update an agent (protected)
 */
router.patch('/:id', authenticateToken, asyncHandler(agentController.updateAgent));

/**
 * DELETE /api/agents/:id
 * Delete an agent (protected)
 */
router.delete('/:id', authenticateToken, asyncHandler(agentController.deleteAgent));

/**
 * POST /api/agents/:id/usage
 * Increment agent usage count (for analytics)
 */
router.post('/:id/usage', asyncHandler(agentController.incrementUsage));

export default router;
