import { Router } from 'express';

const router = Router();

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Naija Sabi API is running',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
  });
});

export default router;
