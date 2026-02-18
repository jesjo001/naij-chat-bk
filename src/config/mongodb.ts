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
      maxPoolSize: 50, // Maximum connection pool size
      minPoolSize: 10, // Minimum connection pool size
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      maxIdleTimeMS: 10000, // Remove a connection from pool if idle for 10s
      compressors: ['zlib'], // Enable compression
      zlibCompressionLevel: 6, // Balanced compression level
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
