import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { PersonalityService } from '../services/PersonalityService.js';
import { logger } from '../utils/logger.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

// ─── Constants ────────────────────────────────────────────────
const FREE_DAILY_LIMIT      = 20;
const MAX_CONTEXT_MESSAGES  = 10;   // Last N messages sent as AI context (5 turns)
const MAX_TITLE_LENGTH      = 60;
const SSE_HEARTBEAT_MS      = 20_000;

// ─── Helpers ─────────────────────────────────────────────────

/** Sentence boundary splitter for voice-mode SSE events */
const SENTENCE_END_RE = /(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÀ-ÖØ-öø-ÿ"'])/;

function extractCompleteSentences(text: string): { sentences: string[]; remainder: string } {
  const parts = text.split(SENTENCE_END_RE);
  if (parts.length <= 1) return { sentences: [], remainder: text };
  const remainder = parts.pop()!;
  return { sentences: parts.map(s => s.trim()).filter(Boolean), remainder };
}

/** Build UTC day range for rate-limit queries (avoids server-timezone drift) */
function utcDayRange(date: Date): { start: Date; end: Date } {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);
  return { start, end };
}

/** Safe SSE writer — no-ops if the socket is already closed */
function makeSender(res: Response) {
  return (obj: object): void => {
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify(obj)}\n\n`);
    }
  };
}

// ─── Controller ───────────────────────────────────────────────
export class ChatController {
  private personalityService = new PersonalityService();

  // ─── Shared helpers ─────────────────────────────────────────

  private normalizeLanguage(language?: string): string {
    if (!language) return 'pidgin';
    const normalized = language.trim().toLowerCase();
    if (normalized === 'nigerian pidgin' || normalized === 'ng pidgin') return 'pidgin';
    if (normalized === 'en') return 'english';
    return normalized;
  }

  /** Lazily expire subscription and return the (possibly updated) user */
  private async resolveUser(userId: string, now: Date) {
    const user = await User.findById(userId);
    if (!user) return null;

    if (user.subscriptionEndDate && user.subscriptionEndDate < now) {
      user.subscriptionStatus = 'expired';
      user.subscriptionTier   = 'free';
      await user.save();
    }

    return user;
  }

  /** Check free-tier rate limit. Returns true if limit exceeded. */
  private async isRateLimited(userId: string, user: InstanceType<typeof User>, now: Date): Promise<boolean> {
    const isFree =
      user.subscriptionTier === 'free' || user.subscriptionStatus !== 'active';

    if (!isFree) return false;

    const { start, end } = utcDayRange(now);
    const count = await Message.countDocuments({
      userId,
      role:      'user',
      timestamp: { $gte: start, $lte: end },
    });

    return count >= FREE_DAILY_LIMIT;
  }

  // ─── POST /api/chat/message ──────────────────────────────────
  async sendMessage(req: Request, res: Response) {
    try {
      const { message, conversationId, language, personality } = req.body;
      const userId = (req as any).userId as string;
      const now    = new Date();

      if (!message?.trim() || !conversationId) {
        return res.status(400).json({
          success: false,
          message: 'message and conversationId are required',
        });
      }

      if (!Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({ success: false, message: 'Invalid conversationId' });
      }

      const user = await this.resolveUser(userId, now);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      if (await this.isRateLimited(userId, user, now)) {
        return res.status(429).json({
          success:    false,
          message:    `Free plan limit reached (${FREE_DAILY_LIMIT} messages/day). Upgrade to continue.`,
          upgradeUrl: '/pricing',
          resetAt:    utcDayRange(now).end.toISOString(),
        });
      }

      const conversation = await Conversation.findOne({ _id: conversationId, userId });
      if (!conversation) {
        return res.status(404).json({ success: false, message: 'Conversation not found' });
      }

      // ✅ Fetch conversation history for AI context
      const recentMessages = await Message.find({ conversationId, userId })
        .sort({ timestamp: -1 })
        .limit(MAX_CONTEXT_MESSAGES)
        .lean();

      const historyMessages = recentMessages
        .reverse()
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      const lang        = this.normalizeLanguage(language);
      const activePersonality = personality || 'lagos_hustler';

      const userMessageDoc = await Message.create({
        userId,
        conversationId,
        role:        'user',
        content:     message.trim(),
        language:    lang,
        personality: activePersonality,
        timestamp:   now,
      });

      let aiResponse = '';
      try {
        aiResponse = await this.personalityService.generatePersonalityResponse(
          message.trim(),
          activePersonality,
          lang,
          historyMessages,
          false  // text mode — sendMessage is always text
        );
      } catch (err) {
        logger.error('PersonalityService failed:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to generate AI response. Please try again.',
          error:   process.env.NODE_ENV === 'development' ? String(err) : undefined,
        });
      }

      const assistantMessageDoc = await Message.create({
        userId,
        conversationId,
        role:        'assistant',
        content:     aiResponse,
        language:    lang,
        personality: activePersonality,
        timestamp:   new Date(),
      });

      if (conversation.messageCount === 0) {
        conversation.title = message.trim().slice(0, MAX_TITLE_LENGTH) || 'New Conversation';
      }
      conversation.messageCount  += 2;
      conversation.lastMessageAt  = assistantMessageDoc.timestamp;
      await conversation.save();

      logger.info(`Message sent by user ${userId} in conversation ${conversationId}`);

      return res.status(200).json({
        success: true,
        data: {
          userMessage: {
            id:        userMessageDoc._id.toString(),
            role:      userMessageDoc.role,
            content:   userMessageDoc.content,
            timestamp: userMessageDoc.timestamp,
          },
          assistantMessage: {
            id:        assistantMessageDoc._id.toString(),
            role:      assistantMessageDoc.role,
            content:   assistantMessageDoc.content,
            timestamp: assistantMessageDoc.timestamp,
          },
        },
      });
    } catch (error) {
      logger.error('sendMessage error:', error);
      return res.status(500).json({ success: false, message: 'Failed to process message' });
    }
  }

  // ─── POST /api/chat/stream ───────────────────────────────────
  /**
   * Streams AI response via Server-Sent Events.
   *
   * Event shapes:
   *   { type: 'chunk',    text: string }                         — raw text token
   *   { type: 'sentence', text: string }                         — voice-mode: complete sentence
   *   { type: 'done',     messageId, userMessageId, fullContent } — stream finished
   *   { type: 'error',    message: string }                      — something went wrong
   *
   * Query params:
   *   ?voice=true  — emit sentence-boundary events for immediate TTS playback
   */
  async streamMessage(req: Request, res: Response) {
    const { message, conversationId, language, personality } = req.body;
    const voiceMode = req.query.voice === 'true' || req.body.voiceMode === true;
    const userId    = (req as any).userId as string;
    const now       = new Date();

    // ─── Validation (before SSE headers — we can still send JSON errors) ──
    if (!message?.trim() || !conversationId) {
      res.status(400).json({ success: false, message: 'message and conversationId are required' });
      return;
    }

    if (!Types.ObjectId.isValid(conversationId)) {
      res.status(400).json({ success: false, message: 'Invalid conversationId' });
      return;
    }

    const user = await this.resolveUser(userId, now);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (await this.isRateLimited(userId, user, now)) {
      res.status(429).json({
        success:    false,
        message:    `Free plan limit reached (${FREE_DAILY_LIMIT} messages/day). Upgrade to continue.`,
        upgradeUrl: '/pricing',
        resetAt:    utcDayRange(now).end.toISOString(),
      });
      return;
    }

    const conversation = await Conversation.findOne({ _id: conversationId, userId });
    if (!conversation) {
      res.status(404).json({ success: false, message: 'Conversation not found' });
      return;
    }

    // ─── Load conversation history for AI context ──────────────
    const recentMessages = await Message.find({ conversationId, userId })
      .sort({ timestamp: -1 })
      .limit(MAX_CONTEXT_MESSAGES)
      .lean();

    const historyMessages = recentMessages
      .reverse()
      .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));

    const lang            = this.normalizeLanguage(language);
    const activePersonality = personality || 'lagos_hustler';

    // ─── Save user message before we open the SSE stream ──────
    const userMessageDoc = await Message.create({
      userId,
      conversationId,
      role:        'user',
      content:     message.trim(),
      language:    lang,
      personality: activePersonality,
      timestamp:   now,
    });

    // ─── SSE setup ─────────────────────────────────────────────
    res.setHeader('Content-Type',      'text/event-stream');
    res.setHeader('Cache-Control',     'no-cache, no-store');
    res.setHeader('Connection',        'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const send = makeSender(res);

    // Heartbeat — prevents nginx / ALB from killing idle SSE connections.
    // (Common when live data fetching causes a processing pause before first chunk.)
    const heartbeat = setInterval(() => {
      if (!res.writableEnded) res.write(': ping\n\n');
    }, SSE_HEARTBEAT_MS);

    // Track client disconnect so we skip DB writes for a dead socket
    let clientDisconnected = false;
    req.on('close', () => {
      clientDisconnected = true;
      clearInterval(heartbeat);
    });

    let fullContent    = '';
    let sentenceBuffer = '';

    try {
      for await (const chunk of this.personalityService.generateStreamingResponse(
        message.trim(),
        activePersonality,
        lang,
        historyMessages,
        voiceMode  // thread voice flag to system prompt assembly
      )) {
        if (clientDisconnected) break;

        fullContent    += chunk;
        sentenceBuffer += chunk;

        // Always emit raw chunk (text UI rendering)
        send({ type: 'chunk', text: chunk });

        // In voice mode, also emit complete sentences as soon as they arrive
        // so the frontend can begin TTS without waiting for the full response
        if (voiceMode) {
          const { sentences, remainder } = extractCompleteSentences(sentenceBuffer);
          sentenceBuffer = remainder;
          for (const sentence of sentences) {
            send({ type: 'sentence', text: sentence });
          }
        }
      }

      // Flush any remaining partial sentence (last line may lack end-punctuation)
      if (voiceMode && sentenceBuffer.trim() && !clientDisconnected) {
        send({ type: 'sentence', text: sentenceBuffer.trim() });
      }

      if (!clientDisconnected) {
        const assistantMessageDoc = await Message.create({
          userId,
          conversationId,
          role:        'assistant',
          content:     fullContent,
          language:    lang,
          personality: activePersonality,
          timestamp:   new Date(),
        });

        if (conversation.messageCount === 0) {
          conversation.title = message.trim().slice(0, MAX_TITLE_LENGTH) || 'New Conversation';
        }
        conversation.messageCount  += 2;
        conversation.lastMessageAt  = assistantMessageDoc.timestamp;
        await conversation.save();

        send({
          type:          'done',
          messageId:     assistantMessageDoc._id.toString(),
          userMessageId: userMessageDoc._id.toString(),
          fullContent,
        });

        logger.info(`Stream complete: user=${userId} convo=${conversationId} chars=${fullContent.length}`);
      }
    } catch (error) {
      logger.error('streamMessage error:', error);
      if (!clientDisconnected) {
        send({ type: 'error', message: 'Failed to generate response. Please try again.' });
      }
    } finally {
      clearInterval(heartbeat);
      if (!res.writableEnded) res.end();
    }
  }

  // ─── GET /api/chat/conversation/:conversationId ──────────────
  async getConversation(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const userId = (req as any).userId as string;

      if (!Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({ success: false, message: 'Invalid conversationId' });
      }

      const conversation = await Conversation.findOne({ _id: conversationId, userId });
      if (!conversation) {
        return res.status(404).json({ success: false, message: 'Conversation not found' });
      }

      const messages = await Message.find({ conversationId, userId })
        .sort({ timestamp: 1 })
        .lean();

      return res.status(200).json({
        success: true,
        data: {
          conversationId,
          messages: messages.map(msg => ({
            id:        msg._id.toString(),
            role:      msg.role,
            content:   msg.content,
            timestamp: msg.timestamp,
          })),
        },
      });
    } catch (error) {
      logger.error('getConversation error:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve conversation' });
    }
  }

  // ─── POST /api/chat/create ────────────────────────────────────
  async createConversation(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string;

      const conversation = await Conversation.create({
        userId,
        title:         'New Conversation',
        messageCount:  0,
        lastMessageAt: null,
      });

      logger.info(`Conversation ${conversation._id} created for user ${userId}`);

      return res.status(201).json({
        success: true,
        data: {
          id:           conversation._id.toString(),
          title:        conversation.title,
          date:         conversation.createdAt,
          messageCount: 0,
        },
      });
    } catch (error) {
      logger.error('createConversation error:', error);
      return res.status(500).json({ success: false, message: 'Failed to create conversation' });
    }
  }

  // ─── GET /api/chat/conversations ─────────────────────────────
  async getConversations(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string;

      const conversations = await Conversation.find({ userId })
        .sort({ lastMessageAt: -1, updatedAt: -1 })
        .lean();

      return res.status(200).json({
        success: true,
        data: {
          conversations: conversations.map(c => ({
            id:           c._id.toString(),
            title:        c.title,
            date:         c.lastMessageAt || c.createdAt,
            messageCount: c.messageCount,
          })),
        },
      });
    } catch (error) {
      logger.error('getConversations error:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve conversations' });
    }
  }

  // ─── POST /api/chat/clear ─────────────────────────────────────
  async clearConversation(req: Request, res: Response) {
    try {
      const { conversationId } = req.body;
      const userId = (req as any).userId as string;

      if (!Types.ObjectId.isValid(conversationId)) {
        return res.status(400).json({ success: false, message: 'Invalid conversationId' });
      }

      const conversation = await Conversation.findOne({ _id: conversationId, userId });
      if (!conversation) {
        // Return 403, not 404 — don't leak whether the ID exists for another user
        return res.status(403).json({ success: false, message: 'Access denied' });
      }

      await Message.deleteMany({ conversationId, userId });
      conversation.messageCount  = 0;
      conversation.lastMessageAt = null;
      await conversation.save();

      logger.info(`Conversation ${conversationId} cleared by user ${userId}`);

      return res.status(200).json({ success: true, message: 'Conversation cleared' });
    } catch (error) {
      logger.error('clearConversation error:', error);
      return res.status(500).json({ success: false, message: 'Failed to clear conversation' });
    }
  }

  // ─── GET /api/chat/personalities ─────────────────────────────
  async getPersonalities(req: Request, res: Response) {
    try {
      // ✅ Delegate to PersonalityService — single source of truth
      // instead of a hardcoded list that can drift out of sync
      const personalities = this.personalityService.getPersonalityList();

      return res.status(200).json({
        success: true,
        data: { personalities },
      });
    } catch (error) {
      logger.error('getPersonalities error:', error);
      return res.status(500).json({ success: false, message: 'Failed to retrieve personalities' });
    }
  }
}