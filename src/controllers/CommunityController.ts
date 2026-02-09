import { Request, Response } from 'express';
import CommunityStory from '../models/CommunityStory';
import { logger } from '../utils/logger';

export class CommunityController {
  private mapStory(story: any) {
    if (!story) return story;
    const { _id, ...rest } = story;
    return { id: _id?.toString?.() || _id, ...rest };
  }

  /**
   * GET /api/community/stories
   * List community stories with filters and sorting
   */
  async listStories(req: Request, res: Response) {
    try {
      const { search, type, language, minDuration, maxDuration, sort } = req.query as Record<string, string>;

      const query: Record<string, unknown> = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ];
      }

      if (type && type !== 'All') {
        query.type = { $regex: `^${type}$`, $options: 'i' };
      }

      if (language && language !== 'All') {
        query.language = { $regex: `^${language}$`, $options: 'i' };
      }

      if (minDuration || maxDuration) {
        query.duration = {};
        if (minDuration) {
          (query.duration as Record<string, number>).$gte = Number(minDuration);
        }
        if (maxDuration) {
          (query.duration as Record<string, number>).$lte = Number(maxDuration);
        }
      }

      const sortMap: Record<string, Record<string, 1 | -1>> = {
        trending: { views: -1 },
        latest: { createdAt: -1 },
        top: { likes: -1 },
      };

      const sortOptions = sortMap[sort || 'trending'] || { views: -1 };

      const stories = await CommunityStory.find(query)
        .sort(sortOptions)
        .limit(200)
        .lean();

      res.json({
        success: true,
        data: stories.map((story) => this.mapStory(story)),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error listing community stories', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch community stories',
      });
    }
  }

  /**
   * GET /api/community/stories/:id
   * Get a single community story
   */
  async getStory(req: Request, res: Response) {
    try {
      const story = await CommunityStory.findById(req.params.id).lean();
      if (!story) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }
      res.json({ success: true, data: this.mapStory(story), timestamp: new Date().toISOString() });
    } catch (error) {
      logger.error('Error fetching community story', { error });
      res.status(500).json({ success: false, message: 'Failed to fetch story' });
    }
  }

  /**
   * POST /api/community/stories/:id/view
   * Increment view count
   */
  async incrementView(req: Request, res: Response) {
    try {
      const story = await CommunityStory.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      ).lean();

      if (!story) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }

      res.json({ success: true, data: this.mapStory(story), timestamp: new Date().toISOString() });
    } catch (error) {
      logger.error('Error incrementing view', { error });
      res.status(500).json({ success: false, message: 'Failed to update view count' });
    }
  }

  /**
   * POST /api/community/stories/:id/like
   * Increment like count
   */
  async likeStory(req: Request, res: Response) {
    try {
      const story = await CommunityStory.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      ).lean();

      if (!story) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }

      res.json({ success: true, data: this.mapStory(story), timestamp: new Date().toISOString() });
    } catch (error) {
      logger.error('Error liking story', { error });
      res.status(500).json({ success: false, message: 'Failed to like story' });
    }
  }

  /**
   * POST /api/community/stories/:id/save
   * Increment save count
   */
  async saveStory(req: Request, res: Response) {
    try {
      const story = await CommunityStory.findByIdAndUpdate(
        req.params.id,
        { $inc: { saves: 1 } },
        { new: true }
      ).lean();

      if (!story) {
        return res.status(404).json({ success: false, message: 'Story not found' });
      }

      res.json({ success: true, data: this.mapStory(story), timestamp: new Date().toISOString() });
    } catch (error) {
      logger.error('Error saving story', { error });
      res.status(500).json({ success: false, message: 'Failed to save story' });
    }
  }
}
