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
import http from 'http';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy - essential for VPS/cPanel behind Nginx
app.set('trust proxy', process.env.TRUST_PROXY ? parseInt(process.env.TRUST_PROXY) : 1);

// Disable X-Powered-By to avoid fingerprinting
app.disable('x-powered-by');

// Add X-Response-Time header for performance monitoring.
// Must wrap res.end — headers cannot be set inside res.on('finish') because
// the finish event fires after headers have already been flushed to the client.
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();
  const originalEnd = res.end.bind(res) as typeof res.end;
  (res as any).end = (...args: Parameters<typeof res.end>) => {
    if (!res.headersSent) {
      const ms = Number(process.hrtime.bigint() - start) / 1e6;
      res.setHeader('X-Response-Time', `${ms.toFixed(2)}ms`);
    }
    return originalEnd(...args);
  };
  next();
});

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

// Body parser middleware — 2mb limit is sufficient for chat payloads
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// Request logging middleware
app.use(requestLogger);

// HTTP caching middleware
app.use(smartCache);
app.use(etagMiddleware);

// Tiered rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per 15 min per IP
  message: { success: false, error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health',
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // 15 requests/min for auth endpoints
  message: { success: false, error: 'Too many auth attempts. Try again in a minute.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30, // 30 chat requests per minute
  message: { success: false, error: 'Chat rate limit reached. Please wait.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
app.use('/api/auth/', strictLimiter);
app.use('/api/chat/', chatLimiter);

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
    path: req.path,
  });
});

// Error handling middleware — MUST be last, after all routes
app.use(errorHandler);

// Unhandled promise rejection safety net
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

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
    await connectDB();
    await initializeRedis();

    const server = http.createServer(app);

    // Keep-alive tuning — critical for VPS behind Nginx
    server.keepAliveTimeout = 65000;  // Must be > Nginx keepalive_timeout (60s)
    server.headersTimeout = 66000;    // Must be > keepAliveTimeout

    // Request timeout — kill hanging requests after 30s
    server.setTimeout(30000, (socket) => {
      logger.warn('Request timeout — closing socket');
      socket.destroy();
    });

    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
      logger.info(`❤️  Health check: http://localhost:${PORT}/health`);
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
