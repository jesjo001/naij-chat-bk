import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import 'dotenv/config';
import { logger } from './utils/logger.js';
import { initializeRedis, closeRedis } from './config/redis.js';
import { connectDB, disconnectDB } from './config/mongodb.js';
import { requestLogger, errorHandler } from './middleware/index.js';
import { smartCache, etagMiddleware } from './middleware/caching.js';
import apiRoutes from './routes/api.js';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy - important for cPanel/VPS deployments
app.set('trust proxy', 1);

// Security middleware - Enhanced helmet configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

// Data sanitization against NoSQL injection
app.use(mongoSanitize({
  replaceWith: '_',
}));

// Prevent HTTP Parameter Pollution
app.use(hpp() as any);

// Compression middleware for response compression (gzip/brotli)
app.use(
  compression({
    level: 6, // Balanced compression level
    threshold: 1024, // Only compress responses > 1KB
    filter: (req: any, res: any) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }) as any
);

// CORS configuration
const defaultOrigins = ['http://localhost:5173', 'http://localhost:8080'];
const allowedOrigins = (process.env.CORS_ORIGIN || defaultOrigins.join(','))
  .split(',')
  .map((origin) => origin.trim());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400, // Cache preflight requests for 24 hours
  })
);

// Body parser middleware with strict limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use(requestLogger);

// HTTP caching middleware
app.use(smartCache);
app.use(etagMiddleware);

// Aggressive rate limiting - Tiered approach
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute for sensitive endpoints
  message: 'Rate limit exceeded for this endpoint.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
app.use('/api/auth/', strictLimiter); // Stricter for auth endpoints

// Error handler (must be after routes)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  // Pro-mailer verification
  if (req.query.promailer_verify === '8dea13e78232dfac044bc1e1c5844497') {
    return res.status(200).send('8dea13e78232dfac044bc1e1c5844497');
  }
  
  res.json({
    message: 'Naija Sabi Backend API',
    version: '2.0.0',
    architecture: 'MVC (Model-Controller-Service)',
    endpoints: {
      health: '/health',
      data: '/api/data/*',
      storyteller: '/api/storyteller/*',
      personality: '/api/personality/*',
      finance: '/api/finance/*',
      hustleHub: '/api/hustle/*',
      all: '/api/all'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path
  });
});

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
