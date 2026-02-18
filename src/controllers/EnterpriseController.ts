import { Request, Response } from 'express';
import EnterpriseInquiry from '../models/EnterpriseInquiry.js';
import { sendEnterpriseInquiryEmail } from '../utils/mailer.js';
import { logger } from '../utils/logger.js';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export class EnterpriseController {
  static async submitInquiry(req: AuthenticatedRequest, res: Response) {
    try {
      const { name, email, company, message } = req.body;

      // Validation
      if (!name || !email || !company || !message) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required',
        });
      }

      // Create inquiry record
      const inquiry = new EnterpriseInquiry({
        name,
        email,
        company,
        message,
        userId: req.user?.id,
        status: 'new',
      });

      await inquiry.save();

      // Send email to support
      try {
        await sendEnterpriseInquiryEmail({
          name,
          email,
          company,
          message,
          inquiryId: inquiry._id.toString(),
        });
      } catch (emailError) {
        logger.error('Failed to send enterprise inquiry email:', emailError);
        // Don't fail the API call if email fails, just log it
      }

      return res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: {
          inquiryId: inquiry._id,
        },
      });
    } catch (error) {
      logger.error('Enterprise inquiry submission error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit inquiry',
      });
    }
  }

  static async getInquiries(req: AuthenticatedRequest, res: Response) {
    try {
      const { status = 'new' } = req.query;

      const inquiries = await EnterpriseInquiry.find({
        status: status || undefined,
      })
        .sort({ createdAt: -1 })
        .limit(50);

      return res.status(200).json({
        success: true,
        data: inquiries,
      });
    } catch (error) {
      logger.error('Get inquiries error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch inquiries',
      });
    }
  }

  static async updateInquiryStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['new', 'contacted', 'converted', 'rejected'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status',
        });
      }

      const inquiry = await EnterpriseInquiry.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!inquiry) {
        return res.status(404).json({
          success: false,
          error: 'Inquiry not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: inquiry,
      });
    } catch (error) {
      logger.error('Update inquiry status error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to update inquiry status',
      });
    }
  }
}
