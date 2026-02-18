import express from 'express';
import { VoiceController } from '../controllers/VoiceController.js';
import { authenticateToken } from '../middleware/index.js';

const router = express.Router();
const voiceController = new VoiceController();

// POST /api/voice/synthesize - Convert text to speech
router.post('/synthesize', authenticateToken, (req, res) => voiceController.synthesize(req, res));

export default router;
