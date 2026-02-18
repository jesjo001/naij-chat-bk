import { Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import ContactMessage from '../models/ContactMessage.js';

export class ContactController {
  /**
   * POST /api/contact/submit
   * Submit a contact form message
   */
  async submitContactForm(req: Request, res: Response) {
    try {
      const { name, email, phone, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and message are required fields',
        });
      }

      // Validate email format
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address',
        });
      }

      // Validate message length
      if (message.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Message must be at least 10 characters long',
        });
      }

      // Get IP address and user agent
      const ipAddress = req.ip || req.socket.remoteAddress;
      const userAgent = req.get('user-agent');

      // Create new contact message
      const contactMessage = new ContactMessage({
        name,
        email,
        phone: phone || undefined,
        subject: subject || undefined,
        message,
        ipAddress,
        userAgent,
        status: 'new',
      });

      await contactMessage.save();

      logger.info(`📧 New contact message from ${email}`);

      // TODO: Send email notification to admin
      // TODO: Send confirmation email to user

      res.status(201).json({
        success: true,
        message: 'Your message has been received! We\'ll get back to you soon.',
        data: {
          id: contactMessage._id,
          createdAt: contactMessage.createdAt,
        },
      });
    } catch (error) {
      logger.error('Error submitting contact form:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/contact/messages
   * Get all contact messages (admin only)
   */
  async getAllMessages(req: Request, res: Response) {
    try {
      const { status, page = 1, limit = 20 } = req.query;

      const query: any = {};
      if (status && typeof status === 'string') {
        query.status = status;
      }

      const skip = (Number(page) - 1) * Number(limit);

      const messages = await ContactMessage.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean();

      const total = await ContactMessage.countDocuments(query);

      res.json({
        success: true,
        data: {
          messages,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      logger.error('Error fetching contact messages:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact messages',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/contact/messages/:id
   * Get a specific contact message (admin only)
   */
  async getMessageById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const message = await ContactMessage.findById(id);

      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }

      // Mark as read if it's new
      if (message.status === 'new') {
        message.status = 'read';
        await message.save();
      }

      res.json({
        success: true,
        data: message,
      });
    } catch (error) {
      logger.error('Error fetching contact message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * PATCH /api/contact/messages/:id/status
   * Update contact message status (admin only)
   */
  async updateMessageStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['new', 'read', 'replied', 'archived'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value',
        });
      }

      const message = await ContactMessage.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }

      res.json({
        success: true,
        message: 'Message status updated successfully',
        data: message,
      });
    } catch (error) {
      logger.error('Error updating message status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update message status',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * DELETE /api/contact/messages/:id
   * Delete a contact message (admin only)
   */
  async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const message = await ContactMessage.findByIdAndDelete(id);

      if (!message) {
        return res.status(404).json({
          success: false,
          message: 'Message not found',
        });
      }

      res.json({
        success: true,
        message: 'Message deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting contact message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * GET /api/contact/stats
   * Get contact message statistics (admin only)
   */
  async getStats(req: Request, res: Response) {
    try {
      const totalMessages = await ContactMessage.countDocuments();
      const newMessages = await ContactMessage.countDocuments({ status: 'new' });
      const readMessages = await ContactMessage.countDocuments({ status: 'read' });
      const repliedMessages = await ContactMessage.countDocuments({ status: 'replied' });
      const archivedMessages = await ContactMessage.countDocuments({ status: 'archived' });

      // Get messages from last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recentMessages = await ContactMessage.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
      });

      res.json({
        success: true,
        data: {
          total: totalMessages,
          byStatus: {
            new: newMessages,
            read: readMessages,
            replied: repliedMessages,
            archived: archivedMessages,
          },
          recentMessages,
        },
      });
    } catch (error) {
      logger.error('Error fetching contact stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export default new ContactController();
