import { Router } from 'express';
import { asyncHandler, verifyToken, requireEmailVerification } from '../middleware/index.js';
import { ChatController } from '../controllers/ChatController.js';

const router = Router();
const chatController = new ChatController();

/**
 * POST /api/chat/message
 * Send a message and get AI response
 */
router.post('/message', verifyToken, requireEmailVerification, asyncHandler((req, res) => chatController.sendMessage(req, res)));

/**
 * POST /api/chat/stream
 * Send a message and stream AI response via SSE
 */
router.post('/stream', verifyToken, requireEmailVerification, (req, res) => chatController.streamMessage(req, res));

/**
 * POST /api/chat/create
 * Create a new conversation
 */
router.post('/create', verifyToken, requireEmailVerification, asyncHandler((req, res) => chatController.createConversation(req, res)));

/**
 * GET /api/chat/conversation/:conversationId
 * Get conversation history
 */
router.get('/conversation/:conversationId', verifyToken, requireEmailVerification, asyncHandler((req, res) => chatController.getConversation(req, res)));

/**
 * GET /api/chat/conversations
 * Get all conversations for a user
 */
router.get('/conversations', verifyToken, requireEmailVerification, asyncHandler((req, res) => chatController.getConversations(req, res)));

/**
 * POST /api/chat/clear
 * Clear conversation
 */
router.post('/clear', verifyToken, requireEmailVerification, asyncHandler((req, res) => chatController.clearConversation(req, res)));

/**
 * GET /api/chat/personalities
 * Get available personalities
 */
router.get('/personalities', asyncHandler((req, res) => chatController.getPersonalities(req, res)));

export default router;
