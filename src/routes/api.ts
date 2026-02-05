import { Router } from 'express';
import authRouter from './auth';
import storytellerRouter from './storyteller';
import communityRouter from './community';
import adminRouter from './admin';
import billingRouter from './billing';

const router = Router();

router.use('/auth', authRouter);
router.use('/storyteller', storytellerRouter);
router.use('/community', communityRouter);
router.use('/admin', adminRouter);
router.use('/billing', billingRouter);

export default router;
