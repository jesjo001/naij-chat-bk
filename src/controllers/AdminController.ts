import { Request, Response } from 'express';
import User from '../models/User.js';
import Story from '../models/Story.js';
import CommunityStory from '../models/CommunityStory.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import { logger } from '../utils/logger.js';
import { sendAdminBroadcastEmail, sendSubscriptionNotificationEmail } from '../utils/mailer.js';

type AudienceFilter = {
  tiers?: string[];
  statuses?: string[];
  onlyVerified?: boolean;
};

export class AdminController {
  private buildUserAudienceFilter(payload: AudienceFilter): Record<string, unknown> {
    const filter: Record<string, unknown> = {};

    if (payload.tiers && Array.isArray(payload.tiers) && payload.tiers.length > 0) {
      filter.subscriptionTier = { $in: payload.tiers };
    }

    if (payload.statuses && Array.isArray(payload.statuses) && payload.statuses.length > 0) {
      filter.subscriptionStatus = { $in: payload.statuses };
    }

    if (payload.onlyVerified !== false) {
      filter.emailVerified = true;
    }

    return filter;
  }

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

      const updateData: Record<string, unknown> = { role };
      if (role === 'admin') {
        updateData.subscriptionTier = 'enterprise';
        updateData.subscriptionStatus = 'active';
        updateData.subscriptionStartDate = new Date();
        updateData.subscriptionEndDate = undefined;
      }

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

      const updateData: Record<string, unknown> = {};
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

  /**
   * POST /api/admin/emails/broadcast
   * Send email to all users or filtered users
   */
  async sendBroadcastEmail(req: Request, res: Response) {
    try {
      const {
        subject,
        message,
        ctaUrl,
        ctaLabel,
        tiers,
        statuses,
        onlyVerified = true,
        dryRun = false,
      } = req.body as {
        subject?: string;
        message?: string;
        ctaUrl?: string;
        ctaLabel?: string;
        tiers?: string[];
        statuses?: string[];
        onlyVerified?: boolean;
        dryRun?: boolean;
      };

      if (!subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'subject and message are required',
        });
      }

      const filter = this.buildUserAudienceFilter({ tiers, statuses, onlyVerified });
      const recipients = await User.find(filter)
        .select('email name subscriptionTier subscriptionStatus')
        .lean();

      if (dryRun) {
        return res.json({
          success: true,
          message: 'Broadcast dry run completed',
          data: {
            totalRecipients: recipients.length,
            sample: recipients.slice(0, 20).map((u) => ({
              email: u.email,
              name: u.name,
              subscriptionTier: u.subscriptionTier,
              subscriptionStatus: u.subscriptionStatus,
            })),
          },
        });
      }

      const failures: Array<{ email: string; reason: string }> = [];
      const batchSize = 25;
      let sent = 0;

      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        const results = await Promise.allSettled(
          batch.map((recipient) =>
            sendAdminBroadcastEmail({
              to: recipient.email,
              name: recipient.name,
              subject,
              message,
              ctaUrl,
              ctaLabel,
            })
          )
        );

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            sent += 1;
            return;
          }

          failures.push({
            email: batch[index].email,
            reason: result.reason instanceof Error ? result.reason.message : 'Unknown error',
          });
        });
      }

      logger.info('Admin broadcast completed', {
        recipients: recipients.length,
        sent,
        failed: failures.length,
      });

      res.json({
        success: true,
        message: 'Broadcast email job completed',
        data: {
          totalRecipients: recipients.length,
          sent,
          failed: failures.length,
          failures: failures.slice(0, 50),
        },
      });
    } catch (error) {
      logger.error('Error sending broadcast email', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to send broadcast email',
      });
    }
  }

  /**
   * POST /api/admin/notifications/subscriptions
   * Send subscription reminder notifications to filtered users
   */
  async sendSubscriptionNotifications(req: Request, res: Response) {
    try {
      const {
        subject = 'Your NaijaGPT subscription update',
        message = 'Please review your subscription to keep your premium access active.',
        expiringInDays = 7,
        tiers,
        statuses = ['active'],
        onlyVerified = true,
        dryRun = false,
      } = req.body as {
        subject?: string;
        message?: string;
        expiringInDays?: number;
        tiers?: string[];
        statuses?: string[];
        onlyVerified?: boolean;
        dryRun?: boolean;
      };

      const now = new Date();
      const expiryWindow = new Date();
      expiryWindow.setDate(expiryWindow.getDate() + Math.max(1, Number(expiringInDays || 7)));

      const filter = this.buildUserAudienceFilter({ tiers, statuses, onlyVerified });
      filter.subscriptionTier = {
        ...(typeof filter.subscriptionTier === 'object' ? (filter.subscriptionTier as Record<string, unknown>) : {}),
        $ne: 'free',
      };
      filter.subscriptionEndDate = {
        $gte: now,
        $lte: expiryWindow,
      };

      const recipients = await User.find(filter)
        .select('email name subscriptionTier subscriptionEndDate')
        .lean();

      if (dryRun) {
        return res.json({
          success: true,
          message: 'Subscription notification dry run completed',
          data: {
            totalRecipients: recipients.length,
            expiringInDays: Number(expiringInDays || 7),
            sample: recipients.slice(0, 20).map((u) => ({
              email: u.email,
              name: u.name,
              subscriptionTier: u.subscriptionTier,
              subscriptionEndDate: u.subscriptionEndDate,
            })),
          },
        });
      }

      const failures: Array<{ email: string; reason: string }> = [];
      const batchSize = 25;
      let sent = 0;

      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        const results = await Promise.allSettled(
          batch.map((recipient) =>
            sendSubscriptionNotificationEmail({
              to: recipient.email,
              name: recipient.name,
              subject,
              message,
              subscriptionTier: recipient.subscriptionTier,
              subscriptionEndDate: recipient.subscriptionEndDate,
            })
          )
        );

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            sent += 1;
            return;
          }

          failures.push({
            email: batch[index].email,
            reason: result.reason instanceof Error ? result.reason.message : 'Unknown error',
          });
        });
      }

      logger.info('Subscription notification job completed', {
        recipients: recipients.length,
        sent,
        failed: failures.length,
        expiringInDays,
      });

      res.json({
        success: true,
        message: 'Subscription notification job completed',
        data: {
          totalRecipients: recipients.length,
          sent,
          failed: failures.length,
          failures: failures.slice(0, 50),
        },
      });
    } catch (error) {
      logger.error('Error sending subscription notifications', { error });
      res.status(500).json({
        success: false,
        message: 'Failed to send subscription notifications',
      });
    }
  }
}
