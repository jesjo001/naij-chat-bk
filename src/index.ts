import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { logger } from './utils/logger.js';
import { initializeRedis, closeRedis } from './config/redis.js';
import { connectDB, disconnectDB } from './config/mongodb.js';
import { requestLogger, errorHandler } from './middleware/index.js';
import apiRoutes from './routes/api.js';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5055;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy - important for cPanel/VPS deployments
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const defaultOrigins = ['http://localhost:5174', 'http://localhost:8080', 'https://www.aimoviescript.online', 'https://aimoviescript.online'];
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use(requestLogger);

// Rate limiting - 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);

// Serve static files from frontend dist in production
const frontendDistPath = path.join(__dirname, '../../FRONTEND/dist');
if (NODE_ENV === 'production') {
  app.use(express.static(frontendDistPath, {
    maxAge: '1d',
    etag: false
  }));
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime()
  });
});

// API routes
app.use('/api', apiRoutes);

// SPA fallback: Serve index.html for any non-API, non-health route
// This MUST be the last middleware to catch all unhandled routes
if (NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    const indexPath = path.join(frontendDistPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        logger.error('Failed to serve index.html:', err);
        res.status(500).json({
          success: false,
          error: 'Internal server error'
        });
      }
    });
  });
} else {
  // In development, show 404 for unmatched routes
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      error: 'Not found',
      path: req.path,
      message: 'In development mode, frontend should be running separately on port 8080'
    });
  });
}

// Error handling middleware
app.use(errorHandler);

// Graceful shutdown handler
const gracefulShutdown = async () => {
  logger.info('Graceful shutdown initiated...');
  await disconnectDB();
  await closeRedis();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Initialize Redis
    await initializeRedis();

    // Start listening
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
      logger.info(`API docs: http://localhost:${PORT}/`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
