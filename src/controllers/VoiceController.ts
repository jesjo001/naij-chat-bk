import { Request, Response } from 'express';
import { logger } from '../utils/logger.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Preprocess Pidgin text for smoother TTS pronunciation.
 * OpenAI TTS reads Pidgin literally as English — these hints
 * help it pronounce common Pidgin words more naturally.
 */
function preprocessPidginText(text: string): string {
  // Common Pidgin contractions & pronunciation hints
  const replacements: [RegExp, string][] = [
    // Common words that TTS mispronounces
    [/\bwetin\b/gi, 'wettin'],
    [/\bdem\b/gi, 'dem'],
    [/\buna\b/gi, 'oona'],
    [/\bshey\b/gi, 'shay'],
    [/\babi\b/gi, 'ah-bee'],
    [/\bwahala\b/gi, 'wah-hah-lah'],
    [/\bpalaver\b/gi, 'pah-lah-vah'],
    [/\bnaim\b/gi, 'nah-eem'],
    [/\bna\s+im\b/gi, 'nah-eem'],
    [/\bno be\b/gi, 'no bee'],
    [/\bdey\b/gi, 'day'],
    [/\bpikin\b/gi, 'pee-keen'],
    [/\bchop\b/gi, 'chop'],
    [/\bsabi\b/gi, 'sah-bee'],
    [/\bwaka\b/gi, 'wah-kah'],
    [/\bowe\b/gi, 'oh-way'],
    [/\boya\b/gi, 'oh-yah'],
    [/\bsha\b/gi, 'shah'],
    [/\bsef\b/gi, 'sef'],
    [/\bjare\b/gi, 'jah-ray'],
    [/\bkomot\b/gi, 'koh-mot'],
    [/\byarns\b/gi, 'yahns'],
    [/\bgist\b/gi, 'geest'],
    [/\bnaija\b/gi, 'nai-jah'],
    [/\bbroda\b/gi, 'bro-dah'],
    [/\bsista\b/gi, 'sis-tah'],
    [/\bmake\s+we\b/gi, 'mah-keh weh'],
    [/\bHow far\b/gi, 'How fah'],
    [/\bI no know\b/gi, 'I no noh'],
  ];

  let processed = text;
  for (const [pattern, replacement] of replacements) {
    processed = processed.replace(pattern, replacement);
  }
  return processed;
}

export class VoiceController {
  /**
   * POST /api/voice/synthesize
   * Convert text to speech using OpenAI TTS
   * - Uses tts-1-hd for Pidgin/Yoruba/Igbo/Hausa for better quality
   * - Adjusts speed per language for natural feel
   * - Preprocesses Pidgin text for smoother pronunciation
   */
  async synthesize(req: Request, res: Response) {
    try {
      const { text, language } = req.body;
      const userId = (req as any).userId as string;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: 'Text is required',
        });
      }

      if (!OPENAI_API_KEY) {
        logger.error('OpenAI API key not configured');
        return res.status(500).json({
          success: false,
          message: 'Voice service not configured',
        });
      }

      // Voice selection (professional female voices)
      const voiceMap: Record<string, string> = {
        'english': 'nova',
        'pidgin':  'nova',
        'yoruba':  'shimmer',
        'igbo':    'nova',
        'hausa':   'shimmer',
        'en':      'nova',
        'pcm':     'nova',
        'yo':      'shimmer',
        'ig':      'nova',
        'ha':      'shimmer',
      };

      // Speed per language (slightly slower for non-English for clarity)
      const speedMap: Record<string, number> = {
        'english': 1.05,   // Slightly faster English
        'pidgin':  0.95,   // Slightly slower for Pidgin clarity
        'yoruba':  0.92,
        'igbo':    0.92,
        'hausa':   0.92,
      };

      // Use HD model for Nigerian languages (better pronunciation)
      const langLower = (language || 'english').toLowerCase();
      const useHD = ['pidgin', 'yoruba', 'igbo', 'hausa', 'pcm', 'yo', 'ig', 'ha'].includes(langLower);
      const model = useHD ? 'tts-1-hd' : 'tts-1';
      const voice = voiceMap[langLower] || 'nova';
      const speed = speedMap[langLower] || 1.0;

      // Preprocess Pidgin text for smoother pronunciation
      let processedText = text;
      if (langLower === 'pidgin' || langLower === 'pcm') {
        processedText = preprocessPidginText(text);
      }

      logger.info(`TTS: user=${userId}, lang=${langLower}, voice=${voice}, model=${model}, speed=${speed}, len=${processedText.length}`);

      // Call OpenAI TTS API
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          voice,
          input: processedText,
          speed,
          response_format: 'mp3',
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('OpenAI TTS API error:', error);
        return res.status(response.status).json({
          success: false,
          message: 'Failed to synthesize speech',
        });
      }

      const audioBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(audioBuffer);

      logger.info(`TTS done: ${buffer.length} bytes`);

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(buffer.length),
        'Cache-Control': 'public, max-age=3600',
      });

      res.send(buffer);
    } catch (error) {
      logger.error('Voice synthesis error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to synthesize speech',
      });
    }
  }
}
