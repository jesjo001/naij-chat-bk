import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger.js';

let redisClient: RedisClientType | null = null;

export async function initializeRedis(): Promise<RedisClientType | null> {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    logger.warn('REDIS_URL not configured. Cache features will be disabled.');
    return null;
  }

  try {
    redisClient = createClient({
      url: redisUrl,
      // Disable queuing commands when disconnected — avoids memory buildup
      disableOfflineQueue: true,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            logger.warn('Redis: max reconnect attempts reached. Disabling cache.');
            return false;
          }
          return Math.min(retries * 200, 5000); // exponential backoff up to 5s
        },
        connectTimeout: 5000,
        keepAlive: 30000,      // Send TCP keepalive every 30s
        noDelay: true,         // Disable Nagle’s algorithm for lower latency
        tls: redisUrl.startsWith('rediss://'), // Auto-enable TLS for rediss:// URLs
      },

      // Auto-pipeline read commands for throughput
      commandsQueueMaxLength: 500,
    });

    redisClient.on('error', (error) => {
      logger.warn('Redis connection error (non-fatal):', error.message);
      // Don't crash - just continue without Redis
    });

    redisClient.on('connect', () => {
      logger.info('Connected to Redis - caching enabled');
    });

    redisClient.on('ready', () => {
      logger.info('Redis client ready');
    });

    redisClient.on('reconnecting', () => {
      logger.info('Attempting to reconnect to Redis...');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    logger.warn('Failed to connect to Redis. Running without cache:', (error as Error).message);
    redisClient = null;
    return null;
  }
}

export function getRedisClient(): RedisClientType | null {
  return redisClient;
}

// Cache TTL configurations (in seconds)
export const CACHE_TTL = {
  TEMPLATE: 60 * 60 * 24 * 30,       // 30 days — rarely changes
  SETTING: 60 * 60 * 24 * 7,         // 7 days
  CHARACTER_ARCHETYPE: 60 * 60 * 24 * 7,
  PRODUCTION_NOTES: 60 * 60 * 24 * 30,
  STORY_OUTLINE: 60 * 60,             // 1 hour
  FULL_STORY: 60 * 60 * 24,           // 24 hours
  CHAT_RESPONSE: 60 * 5,              // 5 min — short, AI responses are dynamic
  USER_PROFILE: 60 * 15,              // 15 min — reduce DB reads
  EXCHANGE_RATE: 60 * 10,             // 10 min — financial data
  HEALTH: 30,                         // 30s — health check cache
};

export async function closeRedis(): Promise<void> {
  if (redisClient) {
    try {
      await redisClient.disconnect();
      logger.info('Redis connection closed');
    } catch (error) {
      logger.warn('Error closing Redis connection:', (error as Error).message);
    }
  }
}
