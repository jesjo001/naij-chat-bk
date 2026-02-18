import crypto from 'crypto';
import { getRedisClient, CACHE_TTL } from '../config/redis.js';
import { logger } from '../utils/logger.js';
import { inMemoryCache } from '../utils/inMemoryCache.js';

class CachingService {
  private isEnabled(): boolean {
    return process.env.ENABLE_CACHING !== 'false';
  }

  generateCacheKey(prefix: string, params: Record<string, unknown>): string {
    const paramsString = JSON.stringify(params);
    const hash = crypto.createHash('md5').update(paramsString).digest('hex');
    return `${prefix}:${hash}`;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isEnabled()) {
      return null;
    }

    try {
      // Try Redis first
      const client = getRedisClient();
      if (client) {
        const cached = await client.get(key);
        if (cached) {
          logger.info(`Redis Cache HIT: ${key}`);
          return JSON.parse(cached) as T;
        }
      }

      // Fallback to in-memory cache
      const memCached = inMemoryCache.get<T>(key);
      if (memCached) {
        logger.info(`Memory Cache HIT: ${key}`);
        return memCached;
      }

      logger.info(`Cache MISS: ${key}`);
      return null;
    } catch (error) {
      logger.error('Cache get error:', error);
      // Try in-memory cache as final fallback
      return inMemoryCache.get<T>(key);
    }
  }

  async set(key: string, value: unknown, ttl: number = CACHE_TTL.FULL_STORY): Promise<boolean> {
    if (!this.isEnabled()) {
      return false;
    }

    let success = false;

    try {
      // Try to cache in Redis
      const client = getRedisClient();
      if (client) {
        await client.set(key, JSON.stringify(value), {
          EX: ttl
        });
        logger.info(`Redis Cached: ${key} (TTL: ${ttl}s)`);
        success = true;
      }
    } catch (error) {
      logger.warn('Redis cache set error, using in-memory fallback:', error);
    }

    // Always cache in memory as well for speed and redundancy
    try {
      inMemoryCache.set(key, value, ttl);
      logger.info(`Memory Cached: ${key} (TTL: ${ttl}s)`);
      success = true;
    } catch (error) {
      logger.error('In-memory cache set error:', error);
    }

    return success;
  }

  async del(key: string): Promise<boolean> {
    if (!this.isEnabled()) {
      return false;
    }

    let success = false;

    try {
      const client = getRedisClient();
      if (client) {
        await client.del(key);
        logger.info(`Deleted Redis cache: ${key}`);
        success = true;
      }
    } catch (error) {
      logger.warn('Redis cache delete error:', error);
    }

    // Delete from in-memory cache as well
    if (inMemoryCache.delete(key)) {
      logger.info(`Deleted memory cache: ${key}`);
      success = true;
    }

    return success;
  }

  async getCachedSetting<T>(settingType: string): Promise<T | null> {
    return this.get<T>(`setting:${settingType}`);
  }

  async cacheSetting(settingType: string, settingData: unknown): Promise<boolean> {
    return this.set(`setting:${settingType}`, settingData, CACHE_TTL.SETTING);
  }

  async getCachedArchetype<T>(archetypeType: string): Promise<T | null> {
    return this.get<T>(`archetype:${archetypeType}`);
  }

  async cacheArchetype(archetypeType: string, archetypeData: unknown): Promise<boolean> {
    return this.set(`archetype:${archetypeType}`, archetypeData, CACHE_TTL.CHARACTER_ARCHETYPE);
  }

  async getStats(): Promise<{ hits: number; misses: number; hitRate: string; source: string } | null> {
    if (!this.isEnabled()) {
      return null;
    }

    try {
      // Try to get Redis stats
      const client = getRedisClient();
      if (client) {
        try {
          const info = await client.info('stats');
          const lines = info.split('\r\n');
          const stats: Record<string, string> = {};

          lines.forEach((line) => {
            const [key, value] = line.split(':');
            if (key && value) {
              stats[key] = value;
            }
          });

          const hits = parseInt(stats.keyspace_hits || '0', 10);
          const misses = parseInt(stats.keyspace_misses || '0', 10);
          const hitRate = hits + misses > 0 ? ((hits / (hits + misses)) * 100).toFixed(2) + '%' : '0%';

          return { hits, misses, hitRate, source: 'redis' };
        } catch (error) {
          logger.warn('Redis stats unavailable, using in-memory stats:', error);
        }
      }

      // Fallback to in-memory cache stats
      const memStats = inMemoryCache.getStats();
      return {
        hits: memStats.hits,
        misses: memStats.misses,
        hitRate: memStats.hitRate,
        source: 'memory'
      };
    } catch (error) {
      logger.error('Failed to get cache stats:', error);
      return null;
    }
  }
}

export const cachingService = new CachingService();
export default CachingService;
