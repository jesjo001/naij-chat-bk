import { Router, Request, Response } from 'express';
import { EnterpriseController } from '../controllers/EnterpriseController.js';
import { authenticateToken } from '../middleware/index.js';

const router = Router();

// Submit enterprise inquiry (public endpoint, but with auth context if available)
router.post('/enterprise-inquiry', (req: Request, res: Response) => {
  const authReq = req as any;
  EnterpriseController.submitInquiry(authReq, res).catch((error) => {
    res.status(500).json({ success: false, error: 'Internal server error' });
  });
});

// Get inquiries (admin only)
router.get('/enterprise-inquiries', authenticateToken, (req: Request, res: Response) => {
  const authReq = req as any;
  EnterpriseController.getInquiries(authReq, res).catch((error) => {
    res.status(500).json({ success: false, error: 'Internal server error' });
  });
});

// Update inquiry status (admin only)
router.patch('/enterprise-inquiries/:id', authenticateToken, (req: Request, res: Response) => {
  const authReq = req as any;
  EnterpriseController.updateInquiryStatus(authReq, res).catch((error) => {
    res.status(500).json({ success: false, error: 'Internal server error' });
  });
});

export default router;
