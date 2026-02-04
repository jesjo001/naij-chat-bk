import mongoose from 'mongoose';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Connect to MongoDB
 * Uses local MongoDB by default, can be switched to Atlas via MONGODB_URI env var
 */
export async function connectDB() {
  try {
    const mongoUri =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/naija-sabi';

    await mongoose.connect(mongoUri);

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
