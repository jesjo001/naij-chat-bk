import { Request, Response } from 'express';
import User from '../models/User.js';
import Story from '../models/Story.js';
import CommunityStory from '../models/CommunityStory.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { logger } from '../utils/logger.js';

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
        totalConversations,
        totalMessages,
        messagesToday,
      ] = await Promise.all([
        User.countDocuments({}),
        User.countDocuments({ createdAt: { $gte: startOfToday } }),
        User.countDocuments({ createdAt: { $gte: startOfMonth } }),
        Story.countDocuments({}),
        Story.countDocuments({ createdAt: { $gte: startOfToday } }),
        Story.countDocuments({ createdAt: { $gte: startOfMonth } }),
        CommunityStory.countDocuments({}),
        Conversation.countDocuments({}),
        Message.countDocuments({}),
        Message.countDocuments({ createdAt: { $gte: startOfToday } }),
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
            conversations: totalConversations,
            messages: totalMessages,
            messagesToday,
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

  /**
   * GET /api/admin/users
   * Get all users with pagination
   */
  async getAllUsers(req: Request, res: Response) {
    try {
      const { page = 1, limit = 50 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

      const total = await User.countDocuments();

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      logger.error('Error fetching users', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
      });
    }
  }

  /**
   * GET /api/admin/users/:id
   * Get user by ID
   */
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error('Error fetching user', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
      });
    }
  }

  /**
   * PATCH /api/admin/users/:id/role
   * Update user role
   */
  async updateUserRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role value',
        });
      }

      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      logger.info(`User role updated: ${id} -> ${role}`);

      res.json({
        success: true,
        message: 'User role updated successfully',
        data: user,
      });
    } catch (error) {
      logger.error('Error updating user role', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to update user role',
      });
    }
  }

  /**
   * PATCH /api/admin/users/:id/subscription
   * Update user subscription
   */
  async updateUserSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { subscriptionTier, subscriptionStatus } = req.body;

      const updateData: any = {};
      if (subscriptionTier) updateData.subscriptionTier = subscriptionTier;
      if (subscriptionStatus) updateData.subscriptionStatus = subscriptionStatus;

      const user = await User.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      logger.info(`User subscription updated: ${id}`);

      res.json({
        success: true,
        message: 'User subscription updated successfully',
        data: user,
      });
    } catch (error) {
      logger.error('Error updating user subscription', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to update user subscription',
      });
    }
  }
}
