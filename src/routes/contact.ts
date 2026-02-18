import { Router } from 'express';
import ContactController from '../controllers/ContactController.js';
import middleware from '../middleware/index.js';

const router = Router();

// Public route - Anyone can submit a contact form
router.post('/submit', ContactController.submitContactForm.bind(ContactController));

// Protected routes - Admin only (authenticated users can view their messages)
router.get('/messages', middleware.authenticateToken, ContactController.getAllMessages.bind(ContactController));
router.get('/messages/:id', middleware.authenticateToken, ContactController.getMessageById.bind(ContactController));
router.patch('/messages/:id/status', middleware.authenticateToken, ContactController.updateMessageStatus.bind(ContactController));
router.delete('/messages/:id', middleware.authenticateToken, ContactController.deleteMessage.bind(ContactController));
router.get('/stats', middleware.authenticateToken, ContactController.getStats.bind(ContactController));

export default router;
