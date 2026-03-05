import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY || '';

export const groq = new Groq({
  apiKey
});

// Model configurations (updated Feb 2026)
// See: https://console.groq.com/docs/deprecations
export const MODELS = {
  FAST_SMALL: 'llama-3.3-70b-versatile',
  STANDARD: 'llama-3.3-70b-versatile',
  LARGE: 'llama-3.3-70b-versatile'
} as const;

/**
 * Groq model fallback chain — tried in order when a model hits its daily
 * token limit (HTTP 429 / rate_limit_exceeded).
 *
 * llama-3.3-70b-versatile  → primary (best quality)
 * llama-3.1-8b-instant     → fast, separate TPD quota
 * gemma2-9b-it             → separate quota, good quality
 * mixtral-8x7b-32768       → larger context, separate quota
 *
 * If ALL Groq models are exhausted, PersonalityService falls back to OpenAI.
 */
export const GROQ_FALLBACK_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'gemma2-9b-it',
  'mixtral-8x7b-32768',
] as const;

// Default generation parameters
export const DEFAULT_PARAMS = {
  temperature: 0.8,
  max_tokens: 4096,
  top_p: 0.9,
  frequency_penalty: 0.3,
  presence_penalty: 0.1
} as const;

export const isGroqConfigured = () => Boolean(apiKey);
