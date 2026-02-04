import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY || '';

export const groq = new Groq({
  apiKey
});

// Model configurations
export const MODELS = {
  FAST_SMALL: 'llama-3.1-8b-instant',
  STANDARD: 'llama-3.1-70b-versatile',
  LARGE: 'llama-3.2-90b-text-preview'
} as const;

// Default generation parameters
export const DEFAULT_PARAMS = {
  temperature: 0.8,
  max_tokens: 4096,
  top_p: 0.9,
  frequency_penalty: 0.3,
  presence_penalty: 0.1
} as const;

export const isGroqConfigured = () => Boolean(apiKey);
