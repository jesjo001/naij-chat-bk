import Queue from 'bull';
import { storyGenerationService } from '../services/storyGenerationService';
import { logger } from '../utils/logger';
import type { StoryGenerationInput } from '../types/index';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const storyGenerationQueue = new Queue('story-generation', redisUrl, {
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: true,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  }
});

storyGenerationQueue.process(async (job) => {
  const payload = job.data as { input: StoryGenerationInput };
  logger.info('Processing story generation job', { jobId: job.id });
  return storyGenerationService.generateStory(payload.input);
});

storyGenerationQueue.on('completed', (job) => {
  logger.info('Story generation job completed', { jobId: job.id });
});

storyGenerationQueue.on('failed', (job, error) => {
  logger.error('Story generation job failed', { jobId: job?.id, error });
});

export const enqueueStoryGeneration = async (input: StoryGenerationInput) => {
  return storyGenerationQueue.add({ input });
};
