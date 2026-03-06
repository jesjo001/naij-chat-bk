import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connect to MongoDB with optimized connection pooling
 * Uses local MongoDB by default, can be switched to Atlas via MONGODB_URI env var
 */
export async function connectDB() {
  try {
    const mongoUri =
      process.env.MONGODB_URI as string ;

    // Optimized connection options for speed
    await mongoose.connect(mongoUri, {
      // Pool — tuned for VPS (not dedicated server — don't go above 20)
      maxPoolSize: parseInt(process.env.MONGO_POOL_MAX || '20'),
      minPoolSize: parseInt(process.env.MONGO_POOL_MIN || '5'),

      // Timeouts — fail fast rather than hanging
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000,

      // Heartbeat — detect stale connections early
      heartbeatFrequencyMS: 10000,

      // Force IPv4 to avoid IPv6 DNS issues on VPS
      family: 4,

      // Idle connection cleanup
      maxIdleTimeMS: 30000,

      // Wire compression — reduces bandwidth to MongoDB Atlas
      compressors: ['zlib'],
      zlibCompressionLevel: 4, // Level 4 = fast, good for latency-sensitive ops

      // Retry writes/reads for transient errors
      retryWrites: true,
      retryReads: true,
    });

    // Enable lean queries by default for better performance
    mongoose.set('toJSON', {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        if (ret.__v !== undefined) {
          delete ret.__v;
        }
        return ret;
      },
    });

    logger.info(`✅ MongoDB connected: ${mongoUri}`);
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    logger.info('✅ MongoDB disconnected');
  } catch (error) {
    logger.error('❌ MongoDB disconnection failed:', error);
  }
}

export default mongoose;
