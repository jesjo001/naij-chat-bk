import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { VoiceController } from '../controllers/VoiceController.js';
import { authenticateToken } from '../middleware/index.js';

const router = express.Router();
const voiceController = new VoiceController();

// Configure multer for audio file uploads (memory storage for processing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max (Whisper API limit)
  },
  fileFilter: (_req, file, cb) => {
    // Accept common audio formats
    const allowedMimes = [
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'audio/flac',
      'audio/m4a',
      'audio/x-m4a',
    ];
    if (allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid audio format: ${file.mimetype}`));
    }
  },
});

// POST /api/voice/synthesize - Convert text to speech
router.post('/synthesize', authenticateToken, (req: Request, res: Response) => voiceController.synthesize(req, res));

// POST /api/voice/transcribe - Convert speech to text (Whisper API)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
router.post('/transcribe', authenticateToken, upload.single('audio') as any, (req: Request, res: Response) => voiceController.transcribe(req, res));

export default router;
