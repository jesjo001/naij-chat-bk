import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { PersonalityService } from '../services/PersonalityService.js';
import { logger } from '../utils/logger.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export class ChatController {
  private personalityService = new PersonalityService();
  private personalities = ['lagos-hustler', 'yoruba-sage', 'naija-analyst', 'street-oracle'];

  /**
   * POST /api/chat/message
   * Send a message and get AI response
   */
  async sendMessage(req: Request, res: Response) {
    try {
      const { message, conversationId, language, personality } = req.body;
      const userId = (req as any).userId as string;
      const now = new Date();

      // Validate input
      if (!message || !conversationId) {
        return res.status(400).json({
          success: false,
          message: 'Message and conversationId are required',
        });
      }

      if (!Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid conversationId',
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      if (user.subscriptionEndDate && user.subscriptionEndDate < now) {
        user.subscriptionStatus = 'expired';
        user.subscriptionTier = 'free';
        await user.save();
      }

      if (user.subscriptionTier === 'free' || user.subscriptionStatus !== 'active') {
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const userMessagesToday = await Message.countDocuments({
          userId,
          role: 'user',
          timestamp: { $gte: startOfDay, $lte: endOfDay },
        });

        if (userMessagesToday >= 20) {
          return res.status(429).json({
            success: false,
            message: 'Free plan limit reached (20 messages/day). Upgrade to continue.',
          });
        }
      }

      const conversation = await Conversation.findOne({
        _id: conversationId,
        userId,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: 'Conversation not found',
        });
      }

      const userMessageDoc = await Message.create({
        userId,
        conversationId,
        role: 'user',
        content: message,
        language: language || 'pidgin',
        personality: personality || 'lagos-hustler',
        timestamp: new Date(),
      });

      // Generate AI response based on personality and language
      let aiResponse = '';
      try {
        const response = await this.personalityService.generatePersonalityResponse(
          message,
          personality || 'lagos-hustler',
          language || 'pidgin'
        );
        aiResponse = response;
      } catch (error) {
        logger.error('Personality service failed to generate response:', error);
        // Don't use dummy fallback - return error to user
        return res.status(500).json({
          success: false,
          message: 'Failed to generate AI response. Please try again.',
          error: process.env.NODE_ENV === 'development' ? String(error) : undefined
        });
      }

      const assistantMessageDoc = await Message.create({
        userId,
        conversationId,
        role: 'assistant',
        content: aiResponse,
        language: language || 'pidgin',
        personality: personality || 'lagos-hustler',
        timestamp: new Date(),
      });

      const isFirstMessage = conversation.messageCount === 0;
      if (isFirstMessage) {
        conversation.title = message.trim().slice(0, 50) || 'New Conversation';
      }

      conversation.messageCount += 2;
      conversation.lastMessageAt = assistantMessageDoc.timestamp;
      await conversation.save();

      logger.info(`Message sent by user ${userId} in conversation ${conversationId}`);

      res.status(200).json({
        success: true,
        data: {
          userMessage: {
            id: userMessageDoc._id.toString(),
            role: userMessageDoc.role,
            content: userMessageDoc.content,
            timestamp: userMessageDoc.timestamp,
          },
          assistantMessage: {
            id: assistantMessageDoc._id.toString(),
            role: assistantMessageDoc.role,
            content: assistantMessageDoc.content,
            timestamp: assistantMessageDoc.timestamp,
          },
        },
      });
    } catch (error) {
      logger.error('Send message error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process message',
      });
    }
  }

  /**
   * GET /api/chat/conversation/:conversationId
   * Get conversation history
   */
  async getConversation(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const userId = (req as any).userId as string;

      if (!Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid conversationId',
        });
      }

      const conversation = await Conversation.findOne({
        _id: conversationId,
        userId,
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: 'Conversation not found',
        });
      }

      const messages = await Message.find({
        conversationId,
        userId,
      })
        .sort({ timestamp: 1 })
        .lean();

      res.status(200).json({
        success: true,
        data: {
          conversationId,
          messages: messages.map((msg) => ({
            id: msg._id.toString(),
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp,
          })),
        },
      });
    } catch (error) {
      logger.error('Get conversation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve conversation',
      });
    }
  }

  /**
   * POST /api/chat/create
   * Create a new conversation
   */
  async createConversation(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string;

      const conversation = await Conversation.create({
        userId,
        title: 'New Conversation',
        messageCount: 0,
        lastMessageAt: null,
      });

      logger.info(`Conversation ${conversation._id.toString()} created for user ${userId}`);

      res.status(201).json({
        success: true,
        data: {
          id: conversation._id.toString(),
          title: conversation.title,
          date: conversation.createdAt,
          messageCount: 0,
        },
      });
    } catch (error) {
      logger.error('Create conversation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create conversation',
      });
    }
  }

  /**
   * GET /api/chat/conversations
   * Get all conversations for a user
   */
  async getConversations(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string;

      const conversations = await Conversation.find({ userId })
        .sort({ lastMessageAt: -1, updatedAt: -1 })
        .lean();

      const userConversations = conversations.map((conversation) => ({
        id: conversation._id.toString(),
        title: conversation.title,
        date: conversation.lastMessageAt || conversation.createdAt,
        messageCount: conversation.messageCount,
      }));

      res.status(200).json({
        success: true,
        data: {
          conversations: userConversations,
        },
      });
    } catch (error) {
      logger.error('Get conversations error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve conversations',
      });
    }
  }

  /**
   * POST /api/chat/clear
   * Clear conversation
   */
  async clearConversation(req: Request, res: Response) {
    try {
      const { conversationId } = req.body;
      const userId = (req as any).userId as string;

      if (!Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid conversationId',
        });
      }

      const conversation = await Conversation.findOne({
        _id: conversationId,
        userId,
      });

      if (!conversation) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
        });
      }

      await Message.deleteMany({ conversationId, userId });
      conversation.messageCount = 0;
      conversation.lastMessageAt = null;
      await conversation.save();

      logger.info(`Conversation ${conversationId} cleared`);

      res.status(200).json({
        success: true,
        message: 'Conversation cleared',
      });
    } catch (error) {
      logger.error('Clear conversation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to clear conversation',
      });
    }
  }

  /**
   * GET /api/chat/personalities
   * Get available personalities
   */
  async getPersonalities(req: Request, res: Response) {
    try {
      const personalities = [
        {
          id: 'lagos-hustler',
          name: 'Lagos Hustler',
          description: 'Street-smart, vibrant, uses Pidgin fluently',
          emoji: '🏙️',
        },
        {
          id: 'yoruba-sage',
          name: 'Yoruba Sage',
          description: 'Wise, traditional, speaks with proverbs',
          emoji: '👴',
        },
        {
          id: 'naija-analyst',
          name: 'Naija Analyst',
          description: 'Data-driven, analytical, professional',
          emoji: '📊',
        },
        {
          id: 'street-oracle',
          name: 'Street Oracle',
          description: 'Mystical, spiritual, connects stories',
          emoji: '🔮',
        },
      ];

      res.status(200).json({
        success: true,
        data: { personalities },
      });
    } catch (error) {
      logger.error('Get personalities error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve personalities',
      });
    }
  }

  private normalizeLanguage(language?: string): string {
    if (!language) return 'pidgin';
    const normalized = language.trim().toLowerCase();
    if (normalized === 'nigerian pidgin' || normalized === 'ng pidgin') return 'pidgin';
    if (normalized === 'en') return 'english';
    return normalized;
  }
}
