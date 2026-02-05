import { Request, Response } from 'express';
import User from '../models/User';
import Story from '../models/Story';
import CommunityStory from '../models/CommunityStory';
import { logger } from '../utils/logger';

export class AdminController {
  /**
   * GET /api/admin/analytics
   * Super admin analytics overview
   */
  async getAnalytics(_req: Request, res: Response) {
    try {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const [
        totalUsers,
        usersToday,
        usersThisMonth,
        totalStories,
        storiesToday,
        storiesThisMonth,
        totalCommunityStories,
      ] = await Promise.all([
        User.countDocuments({}),
        User.countDocuments({ createdAt: { $gte: startOfToday } }),
        User.countDocuments({ createdAt: { $gte: startOfMonth } }),
        Story.countDocuments({}),
        Story.countDocuments({ createdAt: { $gte: startOfToday } }),
        Story.countDocuments({ createdAt: { $gte: startOfMonth } }),
        CommunityStory.countDocuments({}),
      ]);

      res.json({
        success: true,
        data: {
          users: {
            total: totalUsers,
            today: usersToday,
            thisMonth: usersThisMonth,
          },
          stories: {
            total: totalStories,
            today: storiesToday,
            thisMonth: storiesThisMonth,
          },
          community: {
            totalStories: totalCommunityStories,
          },
          chat: {
            conversations: 0,
            messages: 0,
            messagesToday: 0,
          },
          generatedAt: now.toISOString(),
        },
        timestamp: now.toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching analytics', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch analytics',
      });
    }
  }
}
