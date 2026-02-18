import { Router } from 'express';
import authRouter from './auth.js';
import chatRouter from './chat.js';
import dataRouter from './data.js';
import storytellerRouter from './storyteller.js';
import personalityRouter from './personality.js';
import financeRouter from './finance.js';
import hustleRouter from './hustle.js';
import healthRouter from './health.js';
import communityRouter from './community.js';
import adminRouter from './admin.js';
import paymentRouter from './payment.js';
import enterpriseRouter from './enterprise.js';
import voiceRouter from './voice.js';
import contactRouter from './contact.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/data', dataRouter);
router.use('/storyteller', storytellerRouter);
router.use('/personality', personalityRouter);
router.use('/finance', financeRouter);
router.use('/hustle', hustleRouter);
router.use('/health', healthRouter);
router.use('/community', communityRouter);
router.use('/admin', adminRouter);
router.use('/payment', paymentRouter);
router.use('/voice', voiceRouter);
router.use('/contact', contactRouter);
router.use('/', enterpriseRouter);

export default router;
