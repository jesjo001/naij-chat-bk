import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

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
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 3) {
            logger.warn('Redis reconnection attempts exceeded. Running without cache.');
            return false; // Stop reconnecting
          }
          return Math.min(retries * 100, 3000);
        },
        connectTimeout: 5000
      }
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
  TEMPLATE: 60 * 60 * 24 * 30, // 30 days
  SETTING: 60 * 60 * 24 * 7, // 7 days
  CHARACTER_ARCHETYPE: 60 * 60 * 24 * 7, // 7 days
  PRODUCTION_NOTES: 60 * 60 * 24 * 30, // 30 days
  STORY_OUTLINE: 60 * 60, // 1 hour
  FULL_STORY: 60 * 60 * 24 // 24 hours
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
