import crypto from 'crypto';
import { getRedisClient, CACHE_TTL } from '../config/redis';
import { logger } from '../utils/logger';

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
      const client = getRedisClient();
      if (!client) {
        return null;
      }

      const cached = await client.get(key);
      if (cached) {
        logger.info(`Cache HIT: ${key}`);
        return JSON.parse(cached) as T;
      }
      logger.info(`Cache MISS: ${key}`);
      return null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl: number = CACHE_TTL.FULL_STORY): Promise<boolean> {
    if (!this.isEnabled()) {
      return false;
    }

    try {
      const client = getRedisClient();
      if (!client) {
        return false;
      }

      await client.set(key, JSON.stringify(value), {
        EX: ttl
      });
      logger.info(`Cached: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.isEnabled()) {
      return false;
    }

    try {
      const client = getRedisClient();
      if (!client) {
        return false;
      }

      await client.del(key);
      logger.info(`Deleted cache: ${key}`);
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
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

  async getStats(): Promise<{ hits: number; misses: number; hitRate: string } | null> {
    if (!this.isEnabled()) {
      return null;
    }

    try {
      const client = getRedisClient();
      if (!client) {
        return null;
      }

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

      return { hits, misses, hitRate };
    } catch (error) {
      logger.error('Failed to get cache stats:', error);
      return null;
    }
  }
}

export const cachingService = new CachingService();
export default CachingService;
