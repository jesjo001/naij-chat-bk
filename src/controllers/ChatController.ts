import { Request, Response } from 'express';
import { PersonalityService } from '../services/PersonalityService';
import { logger } from '../utils/logger';

interface ChatMessage {
  id: string;
  userId: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  language: string;
  personality: string;
  timestamp: string;
}

export class ChatController {
  private personalityService = new PersonalityService();
  private conversations: Map<string, ChatMessage[]> = new Map();
  private personalities = ['lagos-hustler', 'yoruba-sage', 'naija-analyst', 'street-oracle'];

  /**
   * POST /api/chat/message
   * Send a message and get AI response
   */
  async sendMessage(req: Request, res: Response) {
    try {
      const { message, conversationId, language, personality } = req.body;
      const userId = (req as any).userId;

      // Validate input
      if (!message || !conversationId) {
        return res.status(400).json({
          success: false,
          message: 'Message and conversationId are required',
        });
      }

      // Get or create conversation
      if (!this.conversations.has(conversationId)) {
        this.conversations.set(conversationId, []);
      }

      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        userId,
        conversationId,
        role: 'user',
        content: message,
        language: language || 'pidgin',
        personality: personality || 'lagos-hustler',
        timestamp: new Date().toISOString(),
      };

      // Add user message to conversation
      this.conversations.get(conversationId)!.push(userMessage);

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
        logger.warn('Personality service error, using fallback response');
        aiResponse = this.generateFallbackResponse(
          message,
          personality || 'lagos-hustler',
          language || 'pidgin'
        );
      }

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        userId,
        conversationId,
        role: 'assistant',
        content: aiResponse,
        language: language || 'pidgin',
        personality: personality || 'lagos-hustler',
        timestamp: new Date().toISOString(),
      };

      // Add AI message to conversation
      this.conversations.get(conversationId)!.push(assistantMessage);

      logger.info(`Message sent by user ${userId} in conversation ${conversationId}`);

      res.status(200).json({
        success: true,
        data: {
          userMessage,
          assistantMessage,
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
      const userId = (req as any).userId;

      const messages = this.conversations.get(conversationId) || [];

      // Verify user has access to this conversation
      const isUserConversation = messages.some((msg) => msg.userId === userId);
      if (messages.length > 0 && !isUserConversation) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
        });
      }

      res.status(200).json({
        success: true,
        data: {
          conversationId,
          messages,
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
      const userId = (req as any).userId;
      const conversationId = `conv-${Date.now()}`;

      // Initialize empty conversation
      this.conversations.set(conversationId, []);

      logger.info(`Conversation ${conversationId} created for user ${userId}`);

      res.status(201).json({
        success: true,
        data: {
          conversationId,
          title: 'New Conversation',
          date: new Date().toISOString(),
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
      const userId = (req as any).userId;

      const userConversations = Array.from(this.conversations.entries())
        .filter(([, messages]) => messages.some((msg) => msg.userId === userId))
        .map(([conversationId, messages]) => ({
          id: conversationId,
          title: messages[0]?.content.substring(0, 50) || 'New Conversation',
          date: messages[0]?.timestamp || new Date().toISOString(),
          messageCount: messages.length,
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
      const userId = (req as any).userId;

      const messages = this.conversations.get(conversationId);
      if (!messages || !messages.some((msg) => msg.userId === userId)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied',
        });
      }

      this.conversations.delete(conversationId);

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

  private generateFallbackResponse(message: string, personality: string, language: string): string {
    const normalizedLanguage = this.normalizeLanguage(language);
    const languageResponses: Record<string, string[]> = {
      english: [
        `I hear your question about "${message.substring(0, 30)}". Let me think it through and respond clearly.`,
        `Thanks for the question on "${message.substring(0, 30)}". I'll break it down in clear English.`,
      ],
      yoruba: [
        `Mo gbọ́ ìbéèrè rẹ̀ nípa "${message.substring(0, 30)}". Jẹ́ kí n rò ó dáadáa kí n sì dá ọ lóhùn.`,
        `Ẹ ṣé fún ìbéèrè náà. Mo máa ṣàlàyé rẹ ní Yorùbá kedere.`,
      ],
      igbo: [
        `Anụrụ m ajụjụ gị banyere "${message.substring(0, 30)}". Ka m tụlee ya nke ọma wee zaa gị.`,
        `Daalụ maka ajụjụ ahụ. Aga m akọwa ya n'Igbo n'ụzọ doro anya.`,
      ],
      hausa: [
        `Na ji tambayarka game da "${message.substring(0, 30)}". Bari in yi tunani sosai sannan in amsa.`,
        `Na gode da tambayar. Zan yi bayani a Hausa cikin sauƙi.`,
      ],
    };

    if (normalizedLanguage !== 'pidgin') {
      const responses = languageResponses[normalizedLanguage] || languageResponses.english;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    const responses: Record<string, string[]> = {
      'lagos-hustler': [
        `I hear you well well! E be like say you ask something wey go make me think. Let me break am down for you in Naija style - ${message.substring(0, 30)}... no be joke sha!`,
        `Omo, you don touch the right thing there! Na true word you talk. Lemme put am to you straight - ${message.substring(0, 30)} na the way forward for real real.`,
      ],
      'yoruba-sage': [
        `Àh, àáre e, mo gbó̀ rẹ̀ dáadáa. "Oníbáàdé yó ńbá ibi, oníbáàdé yó ńbá owó" - What you say there have deep meaning, my child.`,
        `E pẹ̀ jó̀ pé o mọ̀ ókọ́. In the wisdom of our forefathers, "${message.substring(0, 30)}" speaks truth.`,
      ],
      'naija-analyst': [
        `Interesting question. Let me analyze the data on "${message.substring(0, 30)}". Based on current trends and metrics, here's what the numbers show...`,
        `That's a valid point. From an analytical perspective, the indicators suggest that "${message.substring(0, 30)}" aligns with market trends.`,
      ],
      'street-oracle': [
        `Ah, the spirits reveal something here. Your question about "${message.substring(0, 30)}" carries echoes of deeper truths waiting to be uncovered.`,
        `I see it in the cosmic patterns - "${message.substring(0, 30)}" connects to forces beyond the ordinary. Listen well, for the answer dwells in the stories of old.`,
      ],
    };

    const personalityResponses = responses[personality] || responses['lagos-hustler'];
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
  }
}
