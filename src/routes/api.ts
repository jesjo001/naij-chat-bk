import { Router } from 'express';
import authRouter from './auth.js';
import storytellerRouter from './storyteller.js';
import communityRouter from './community.js';
import adminRouter from './admin.js';
import billingRouter from './billing.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/storyteller', storytellerRouter);
router.use('/community', communityRouter);
router.use('/admin', adminRouter);
router.use('/billing', billingRouter);

export default router;
