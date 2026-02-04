import { createRequire } from 'module';

const require = createRequire(import.meta.url);
let encoder: { encode: (input: string) => number[] } | null = null;

try {
  const tiktoken = require('tiktoken') as { encoding_for_model: (model: string) => { encode: (input: string) => number[] } };
  encoder = tiktoken.encoding_for_model('gpt-4o-mini');
} catch {
  encoder = null;
}

export const countTokens = (text: string): number => {
  if (!text) {
    return 0;
  }

  if (encoder) {
    try {
      return encoder.encode(text).length;
    } catch {
      // Fall through to heuristic
    }
  }

  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount * 1.3);
};
