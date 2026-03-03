import { Request, Response } from 'express';
import { logger } from '../utils/logger.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TTS_TIMEOUT_MS = 20_000; // ✅ NEW: Hard timeout on TTS requests

/**
 * Preprocess Pidgin text for smoother TTS pronunciation.
 */
function preprocessPidginText(text: string): string {
  const replacements: [RegExp, string][] = [
    [/\bwetin\b/gi,      'wettin'],
    [/\buna\b/gi,        'oona'],
    [/\bshey\b/gi,       'shay'],
    [/\babi\b/gi,        'ah-bee'],
    [/\bwahala\b/gi,     'wah-hah-lah'],
    [/\bpalaver\b/gi,    'pah-lah-vah'],
    [/\bnaim\b/gi,       'nah-eem'],
    [/\bna\s+im\b/gi,    'nah-eem'],
    [/\bno be\b/gi,      'no bee'],
    [/\bdey\b/gi,        'day'],
    [/\bpikin\b/gi,      'pee-keen'],
    [/\bsabi\b/gi,       'sah-bee'],
    [/\bwaka\b/gi,       'wah-kah'],
    [/\boya\b/gi,        'oh-yah'],
    [/\bsha\b/gi,        'shah'],
    [/\bsef\b/gi,        'sef'],
    [/\bjare\b/gi,       'jah-ray'],
    [/\bkomot\b/gi,      'koh-mot'],
    [/\bgist\b/gi,       'geest'],
    [/\bnaija\b/gi,      'nai-jah'],
    [/\bbroda\b/gi,      'bro-dah'],
    [/\bsista\b/gi,      'sis-tah'],
    [/\bmake\s+we\b/gi,  'mah-keh weh'],
    [/\bHow far\b/gi,    'How fah'],
  ];

  return replacements.reduce(
    (acc, [pattern, replacement]) => acc.replace(pattern, replacement),
    text,
  );
}

// ─── Voice & speed maps ───────────────────────────────────────
const VOICE_MAP: Record<string, string> = {
  english: 'nova',
  pidgin:  'nova',
  yoruba:  'shimmer',
  igbo:    'nova',
  hausa:   'shimmer',
  en:      'nova',
  pcm:     'nova',
  yo:      'shimmer',
  ig:      'nova',
  ha:      'shimmer',
};

const SPEED_MAP: Record<string, number> = {
  english: 1.05,
  pidgin:  0.95,
  yoruba:  0.92,
  igbo:    0.92,
  hausa:   0.92,
};

// Languages that benefit from the HD model
const HD_LANGUAGES = new Set(['pidgin', 'yoruba', 'igbo', 'hausa', 'pcm', 'yo', 'ig', 'ha']);

export class VoiceController {
  /**
   * POST /api/voice/synthesize
   */
  async synthesize(req: Request, res: Response) {
    try {
      const { text, language } = req.body;
      const userId = (req as any).userId as string;

      if (!text?.trim()) {
        return res.status(400).json({ success: false, message: 'text is required' });
      }

      // ✅ Sanitise: cap text length to avoid accidental abuse / cost overruns
      const MAX_TTS_LENGTH = 1500;
      if (text.length > MAX_TTS_LENGTH) {
        return res.status(400).json({
          success: false,
          message: `text exceeds maximum length of ${MAX_TTS_LENGTH} characters`,
        });
      }

      if (!OPENAI_API_KEY) {
        logger.error('OpenAI API key not configured');
        return res.status(500).json({ success: false, message: 'Voice service not configured' });
      }

      const langLower    = (language || 'english').toLowerCase().trim();
      const model        = HD_LANGUAGES.has(langLower) ? 'tts-1-hd' : 'tts-1';
      const voice        = VOICE_MAP[langLower]  ?? 'nova';
      const speed        = SPEED_MAP[langLower]  ?? 1.0;

      let processedText = text.trim();
      if (langLower === 'pidgin' || langLower === 'pcm') {
        processedText = preprocessPidginText(processedText);
      }

      logger.info(`TTS: user=${userId} lang=${langLower} voice=${voice} model=${model} speed=${speed} len=${processedText.length}`);

      // ✅ FIX: AbortController for hard timeout on the upstream TTS call
      const controller = new AbortController();
      const timeout    = setTimeout(() => controller.abort(), TTS_TIMEOUT_MS);

      let ttsResponse: globalThis.Response;
      try {
        ttsResponse = await fetch('https://api.openai.com/v1/audio/speech', {
          method:  'POST',
          headers: {
            Authorization:  `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body:   JSON.stringify({ model, voice, input: processedText, speed, response_format: 'mp3' }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!ttsResponse.ok) {
        const errText = await ttsResponse.text().catch(() => 'unknown');
        logger.error(`OpenAI TTS API error: ${ttsResponse.status} – ${errText}`);
        return res.status(502).json({ success: false, message: 'Failed to synthesize speech' });
      }

      if (!ttsResponse.body) {
        return res.status(502).json({ success: false, message: 'Empty TTS response body' });
      }

      // ✅ FIX: private, no-store — TTS is personalised content; never cache publicly
      res.set({
        'Content-Type':   'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Cache-Control':  'private, no-store',
        'X-Voice':        voice,
        'X-Language':     langLower,
      });

      // Stream directly from OpenAI → client, no server buffering
      const reader = (ttsResponse.body as any).getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!res.writableEnded) res.write(Buffer.from(value));
        }
      } catch (streamErr) {
        // Client likely disconnected mid-stream
        logger.warn('TTS stream interrupted:', streamErr);
      } finally {
        if (!res.writableEnded) res.end();
      }

      return;
    } catch (error: unknown) {
      if ((error as Error)?.name === 'AbortError') {
        logger.error('TTS request timed out');
        return res.status(504).json({ success: false, message: 'TTS service timed out' });
      }
      logger.error('Voice synthesis error:', error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Failed to synthesize speech' });
      }
    }
  }
}