import { logger } from '../utils/logger';
import type { StoryGenerationInput } from '../types/index';

class OptimizationService {
  normalizeInput(input: StoryGenerationInput): StoryGenerationInput {
    const duration = Math.max(3, Math.min(30, input.duration || 10));

    return {
      ...input,
      theme: input.theme?.trim() || 'Untitled Theme',
      duration,
      language: (input.language || 'english').toLowerCase()
    };
  }

  trimPrompt(prompt: string, maxLength: number = 2000): string {
    if (prompt.length <= maxLength) {
      return prompt;
    }

    logger.warn(`Prompt trimmed from ${prompt.length} to ${maxLength} characters`);
    return prompt.slice(0, maxLength);
  }
}

export const optimizationService = new OptimizationService();
export default OptimizationService;
