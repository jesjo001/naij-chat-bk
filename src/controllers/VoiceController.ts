import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { logger } from '../utils/logger.js';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TTS_TIMEOUT_MS = 20_000;
const TRANSCRIBE_TIMEOUT_MS = 30_000;

// ─── Language hints for Whisper ─────────────────────────────────
const WHISPER_LANGUAGE_MAP: Record<string, string> = {
  english: 'en',
  pidgin:  'en',  // Whisper handles Pidgin as English variant well
  yoruba:  'yo',
  igbo:    'ig',
  hausa:   'ha',
};

// ─── Pidgin vocabulary prompt for Whisper ───────────────────────
const PIDGIN_VOCABULARY_PROMPT = `
Nigerian Pidgin English vocabulary and phrases:
wetin, una, shey, abi, wahala, palaver, naim, na im, no be, dey, pikin, sabi, waka, oya, sha, sef, jare, komot, gist, naija, broda, sista, make we, how far, na so, e go be, we go, no wahala, e don do, abeg, chop, carry go, no vex, na today, na wa, you sabi, e dey, make I, you fit, na him, small small, plenty plenty, dem dey, I wan, e sweet, e pain, na only, no mind, na correct, e be like say, na true, e no easy, na money, na work, na me, na you, na we, na dem, e reach, e pass, na here, na there, e don, e never, na why, na how, na when, na where, na who, na which.
Common phrases: "How body?", "I dey kampe", "No wahala", "E go be", "Na so e be", "Wetin dey happen?", "Na you sabi", "Make we go", "E don do", "Abeg help me", "Na correct thing".
`.trim();

/**
 * Preprocess Pidgin text for smoother TTS pronunciation.
 * Maps Pidgin words to phonetic spellings that sound more natural.
 */
function preprocessPidginText(text: string): string {
  const replacements: [RegExp, string][] = [
    // Common Pidgin words
    [/\bwetin\b/gi,       'wettin'],
    [/\buna\b/gi,         'oona'],
    [/\bshey\b/gi,        'shay'],
    [/\babi\b/gi,         'ah-bee'],
    [/\bwahala\b/gi,      'wah-hah-lah'],
    [/\bpalaver\b/gi,     'pah-lah-vah'],
    [/\bnaim\b/gi,        'nah-eem'],
    [/\bna\s+im\b/gi,     'nah-eem'],
    [/\bno be\b/gi,       'no bee'],
    [/\bdey\b/gi,         'day'],
    [/\bpikin\b/gi,       'pee-keen'],
    [/\bsabi\b/gi,        'sah-bee'],
    [/\bwaka\b/gi,        'wah-kah'],
    [/\boya\b/gi,         'oh-yah'],
    [/\bsha\b/gi,         'shah'],
    [/\bsef\b/gi,         'sef'],
    [/\bjare\b/gi,        'jah-ray'],
    [/\bkomot\b/gi,       'koh-mot'],
    [/\bgist\b/gi,        'geest'],
    [/\bnaija\b/gi,       'nai-jah'],
    [/\bbroda\b/gi,       'bro-dah'],
    [/\bsista\b/gi,       'sis-tah'],
    [/\bmake\s+we\b/gi,   'mah-keh weh'],
    [/\bHow far\b/gi,     'How fah'],
    // Additional common expressions
    [/\babeg\b/gi,        'ah-beg'],
    [/\bchop\b/gi,        'chop'],
    [/\bno vex\b/gi,      'no vex'],
    [/\bna wa\b/gi,       'nah wah'],
    [/\be don do\b/gi,    'eh don do'],
    [/\bdem\b/gi,         'dem'],
    [/\bI wan\b/gi,       'I wanna'],
    [/\bwe go\b/gi,       'wee go'],
    [/\be go be\b/gi,     'eh go bee'],
    [/\bno mind\b/gi,     'no mine'],
    [/\bsmall small\b/gi, 'small small'],
    [/\bplenty plenty\b/gi, 'plenty plenty'],
    [/\bna so\b/gi,       'nah so'],
    [/\bna true\b/gi,     'nah true'],
    [/\bna me\b/gi,       'nah me'],
    [/\bna you\b/gi,      'nah you'],
    [/\be sweet\b/gi,     'eh sweet'],
    [/\be pain\b/gi,      'eh pain'],
    [/\byawa\b/gi,        'yah-wah'],
    [/\bchaii\b/gi,       'chai-ee'],
    [/\behh?\b/gi,        'ehhh'],
    [/\bshuo\b/gi,        'shu-oh'],
    // Contractions for more natural speech
    [/\bI dey\b/gi,       'I day'],
    [/\byou dey\b/gi,     'you day'],
    [/\be dey\b/gi,       'eh day'],
    [/\bwe dey\b/gi,      'wee day'],
    [/\bdem dey\b/gi,     'dem day'],
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
  pidgin:  1.05,  // was 0.95 – faster feels more natural
  yoruba:  1.0,
  igbo:    1.0,
  hausa:   1.0,
};

// tts-1-hd is ~50% slower to generate; only use it where quality matters most
// Pidgin removed – tts-1 latency is far better and quality is acceptable
const HD_LANGUAGES = new Set(['yoruba', 'igbo', 'hausa', 'yo', 'ig', 'ha']);

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

  /**
   * POST /api/voice/transcribe
   * Transcribe audio using OpenAI Whisper API.
   * Supports Safari mobile and provides better Pidgin recognition.
   */
  async transcribe(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string;
      // Multer adds the file to the request
      const file = (req as any).file as { buffer: Buffer; mimetype?: string; originalname?: string; size: number } | undefined;
      
      if (!file) {
        return res.status(400).json({ success: false, message: 'Audio file is required' });
      }

      if (!OPENAI_API_KEY) {
        logger.error('OpenAI API key not configured');
        return res.status(500).json({ success: false, message: 'Transcription service not configured' });
      }

      const language = (req.body?.language || 'english').toLowerCase().trim();
      const whisperLang = WHISPER_LANGUAGE_MAP[language] || 'en';
      
      // Build prompt for better Pidgin recognition
      const prompt = language === 'pidgin' ? PIDGIN_VOCABULARY_PROMPT : undefined;

      logger.info(`Transcribe: user=${userId} lang=${language} whisperLang=${whisperLang} size=${file.size} mime=${file.mimetype} name=${file.originalname}`);

      // Map MIME type to valid Whisper file extension
      const mimeToExtension: Record<string, string> = {
        'audio/webm': 'webm',
        'audio/webm;codecs=opus': 'webm',
        'audio/mp4': 'm4a',
        'audio/mpeg': 'mp3',
        'audio/mp3': 'mp3',
        'audio/wav': 'wav',
        'audio/wave': 'wav',
        'audio/x-wav': 'wav',
        'audio/ogg': 'ogg',
        'audio/oga': 'oga',
        'audio/flac': 'flac',
        'audio/m4a': 'm4a',
        'audio/x-m4a': 'm4a',
        'audio/aac': 'm4a',
        'audio/mp4a-latm': 'm4a',
      };
      
      // Get extension from mimetype, falling back to webm (most common from browsers)
      const baseMime = (file.mimetype || '').split(';')[0].trim().toLowerCase();
      const extension = mimeToExtension[baseMime] || mimeToExtension[file.mimetype || ''] || 'webm';
      const filename = `audio.${extension}`;

      // Write buffer to temp file - most reliable method for Whisper API
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, `whisper-${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`);
      
      try {
        // Write the audio buffer to temp file
        fs.writeFileSync(tempFilePath, file.buffer);
        
        // Create FormData with file stream (OpenAI expects this format)
        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFilePath), {
          filename: filename,
          contentType: baseMime || 'audio/webm',
        });
        formData.append('model', 'whisper-1');
        formData.append('language', whisperLang);
        formData.append('response_format', 'json');
        
        if (prompt) {
          formData.append('prompt', prompt);
        }

        // Timeout controller
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => source.cancel('Transcription timeout'), TRANSCRIBE_TIMEOUT_MS);

        try {
          const whisperResponse = await axios.post(
            'https://api.openai.com/v1/audio/transcriptions',
            formData,
            {
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                ...formData.getHeaders(),
              },
              cancelToken: source.token,
              maxBodyLength: Infinity,
              maxContentLength: Infinity,
            }
          );
          clearTimeout(timeout);

          const transcription = whisperResponse.data?.text?.trim() || '';

          logger.info(`Transcribe result: "${transcription.substring(0, 80)}${transcription.length > 80 ? '...' : ''}"`);

          return res.json({
            success: true,
            text: transcription,
            language: whisperLang,
          });
        } catch (error: unknown) {
          clearTimeout(timeout);
          
          if (axios.isCancel(error)) {
            logger.error('Transcription request timed out');
            return res.status(504).json({ success: false, message: 'Transcription service timed out' });
          }
          
          // Handle axios errors with response data
          if (axios.isAxiosError(error) && error.response) {
            const errData = JSON.stringify(error.response.data);
            logger.error(`Whisper API error: ${error.response.status} – ${errData}`);
            return res.status(502).json({ success: false, message: 'Failed to transcribe audio' });
          }
          
          logger.error('Transcription error:', error);
          if (!res.headersSent) {
            return res.status(500).json({ success: false, message: 'Failed to transcribe audio' });
          }
        }
      } finally {
        // Clean up temp file
        try {
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
          }
        } catch (cleanupErr) {
          logger.warn('Failed to cleanup temp file:', cleanupErr);
        }
      }
    } catch (error: unknown) {
      logger.error('Transcription error:', error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: 'Failed to transcribe audio' });
      }
    }
  }
}