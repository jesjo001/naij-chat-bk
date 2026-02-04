import { Router } from 'express';
import { asyncHandler, verifyToken } from '../middleware/index';
import { ChatController } from '../controllers/ChatController';

const router = Router();
const chatController = new ChatController();

/**
 * POST /api/chat/message
 * Send a message and get AI response
 */
router.post('/message', verifyToken, asyncHandler((req, res) => chatController.sendMessage(req, res)));

/**
 * POST /api/chat/create
 * Create a new conversation
 */
router.post('/create', verifyToken, asyncHandler((req, res) => chatController.createConversation(req, res)));

/**
 * GET /api/chat/conversation/:conversationId
 * Get conversation history
 */
router.get('/conversation/:conversationId', verifyToken, asyncHandler((req, res) => chatController.getConversation(req, res)));

/**
 * GET /api/chat/conversations
 * Get all conversations for a user
 */
router.get('/conversations', verifyToken, asyncHandler((req, res) => chatController.getConversations(req, res)));

/**
 * POST /api/chat/clear
 * Clear conversation
 */
router.post('/clear', verifyToken, asyncHandler((req, res) => chatController.clearConversation(req, res)));

/**
 * GET /api/chat/personalities
 * Get available personalities
 */
router.get('/personalities', asyncHandler((req, res) => chatController.getPersonalities(req, res)));

export default router;
