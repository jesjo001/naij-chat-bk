import { Router } from 'express';
import authRouter from './auth';
import chatRouter from './chat';
import dataRouter from './data';
import storytellerRouter from './storyteller';
import personalityRouter from './personality';
import financeRouter from './finance';
import hustleRouter from './hustle';
import healthRouter from './health';

const router = Router();

router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/data', dataRouter);
router.use('/storyteller', storytellerRouter);
router.use('/personality', personalityRouter);
router.use('/finance', financeRouter);
router.use('/hustle', hustleRouter);
router.use('/health', healthRouter);

export default router;
