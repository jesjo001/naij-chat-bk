import { groqService } from './groqService';
import { templateEngine } from './templateEngine';
import { cachingService } from './cachingService';
import { logger } from '../utils/logger';
import { COSTS, TOKEN_ESTIMATES } from '../config/constants';
import { CACHE_TTL } from '../config/redis';
import type { StoryGenerationInput } from '../types/index';
import type { StoryOutline } from './groqService';

type FilledTemplate = {
  title?: string;
  characters?: Record<string, unknown>[];
  scenes?: Array<Record<string, unknown> | string>;
  structure?: Record<string, unknown>;
};

class StoryGenerationService {
  async generateStory(userInput: StoryGenerationInput, options: { premiumPolish?: boolean } = {}) {
    const startTime = Date.now();
    const normalizedInput = {
      ...userInput,
      duration: userInput.duration || 10
    };

    logger.info('Starting story generation', { userInput: normalizedInput });

    let totalCost = 0;
    let totalTokens = 0;
    const generationSteps: Array<{ step: string; tokens?: number; cost?: number }> = [];

    const templateKey = normalizedInput.templateId || normalizedInput.storyType;
    const useTemplate = this.shouldUseTemplate(normalizedInput);

    if (useTemplate && templateEngine.hasTemplate(templateKey)) {
      logger.info('Using template-based generation');
      return this.generateFromTemplate({ ...normalizedInput, storyType: templateKey });
    }

    logger.info('Step 1/4: Generating outline');
    const outlineResult = await groqService.generateOutline(normalizedInput);
    const outline = outlineResult.outline as StoryOutline;
    totalCost += outlineResult.cost?.ngn || 0;
    totalTokens += outlineResult.usage?.totalTokens || 0;
    generationSteps.push({ step: 'outline', tokens: outlineResult.usage?.totalTokens, cost: outlineResult.cost?.ngn });

    logger.info('Step 2/4: Generating characters');
    const charactersResult = await this.generateCharactersWithCache(outline, normalizedInput);
    totalCost += charactersResult.cost;
    totalTokens += charactersResult.tokens;
    generationSteps.push({ step: 'characters', tokens: charactersResult.tokens, cost: charactersResult.cost });

    logger.info('Step 3/4: Writing screenplay');
    const scriptCharacters = charactersResult.data.map((character) => ({
      name: typeof character.name === 'string' ? character.name : 'Character',
      role: typeof character.role === 'string' ? character.role : undefined
    }));
    const scriptResult = await groqService.generateScript(outline, scriptCharacters, normalizedInput);
    totalCost += scriptResult.cost?.ngn || 0;
    totalTokens += scriptResult.usage?.totalTokens || 0;
    generationSteps.push({ step: 'script', tokens: scriptResult.usage?.totalTokens, cost: scriptResult.cost?.ngn });

    logger.info('Step 4/4: Creating production notes');
    const productionNotes = await this.getProductionNotesWithCache(normalizedInput);
    totalCost += productionNotes.cost;
    totalTokens += productionNotes.tokens;

    if (options.premiumPolish && normalizedInput.tier === 'professional') {
      logger.info('Premium polish step requested (not yet implemented)');
    }

    const duration = Date.now() - startTime;

    const story = {
      title: outline.title,
      type: normalizedInput.storyType,
      metadata: {
        language: normalizedInput.language,
        duration: normalizedInput.duration,
        animationStyle: normalizedInput.animationStyle,
        targetAudience: normalizedInput.targetAudience
      },
      overview: {
        logline: outline.logline,
        synopsis: outline.synopsis,
        moral: normalizedInput.advancedOptions?.moral || 'Wisdom and perseverance lead to success'
      },
      characters: charactersResult.data,
      script: scriptResult.parsedScript,
      productionNotes: productionNotes.data,
      generation: {
        totalTokens,
        totalCost: totalCost.toFixed(2),
        duration,
        steps: generationSteps,
        model: scriptResult.model,
        useTemplate: false
      }
    };

    const cacheKey = cachingService.generateCacheKey('story', normalizedInput);
    await cachingService.set(cacheKey, story);

    logger.info(`Story generation complete in ${duration}ms - Cost: ₦${totalCost.toFixed(2)}`);

    return story;
  }

  async generateFromTemplate(userInput: StoryGenerationInput) {
    const startTime = Date.now();
    const template = templateEngine.getTemplate(userInput.storyType);

    if (!template) {
      throw new Error(`Template not found for: ${userInput.storyType}`);
    }

    const filledTemplate = (await templateEngine.fillTemplate(userInput.storyType, {
      protagonist: userInput.protagonistName || template.defaults?.protagonist,
      antagonist: userInput.antagonistName || template.defaults?.antagonist,
      setting: userInput.culturalSetting || template.defaults?.setting,
      language: userInput.language,
      characterName: userInput.protagonistName || template.defaults?.protagonist
    })) as FilledTemplate;

    const templateCharacters = Array.isArray(filledTemplate.characters) ? filledTemplate.characters : [];
    const templateScenes = Array.isArray(filledTemplate.scenes) ? filledTemplate.scenes : [];

    const customizationPrompt = `Customize this story for Nigerian ${userInput.language} audience:

Theme: ${userInput.theme}
Setting: ${userInput.culturalSetting}

Add authentic ${userInput.language} dialogue and cultural details to make it feel genuine.
Keep it brief - only provide the customized elements.`;

    const customization = await groqService.generateCompletion({
      prompt: customizationPrompt,
      model: 'llama-3.1-8b-instant',
      maxTokens: 1000
    });

    const duration = Date.now() - startTime;

    return {
      title: filledTemplate.title || template.name,
      type: userInput.storyType,
      metadata: {
        language: userInput.language,
        duration: userInput.duration,
        animationStyle: userInput.animationStyle,
        targetAudience: userInput.targetAudience
      },
      overview: {
        logline: `A ${template.description.toLowerCase()}`,
        synopsis: [
          template.structure?.act1?.description,
          template.structure?.act2?.description,
          template.structure?.act3?.description
        ]
          .filter(Boolean)
          .join(' '),
        moral: userInput.advancedOptions?.moral || template.defaults?.moral
      },
      characters: templateCharacters,
      script: {
        format: 'screenplay',
        totalScenes: templateScenes.length,
        scenes: templateScenes
      },
      productionNotes: (await this.getProductionNotesWithCache(userInput)).data,
      generation: {
        totalTokens: customization.usage?.totalTokens || 0,
        totalCost: (customization.cost?.ngn || 0).toFixed(2),
        duration,
        model: customization.model,
        usedTemplate: true,
        templateName: template.name
      }
    };
  }

  async generateCharactersWithCache(outline: StoryOutline, userInput: StoryGenerationInput) {
    const characters: Record<string, unknown>[] = [];
    let totalCost = 0;
    let totalTokens = 0;

    for (const characterName of outline.characterNames || []) {
      const archetypeKey = this.identifyArchetype(characterName, outline.synopsis || '');
      const cachedArchetype = await cachingService.getCachedArchetype<Record<string, unknown>>(archetypeKey);

      if (cachedArchetype) {
        characters.push({
          ...cachedArchetype,
          name: characterName
        });
      } else {
        const generated = await groqService.generateCharacters({ ...outline, characterNames: [characterName] }, userInput);
        const newCharacter = generated.characters?.[0] as Record<string, unknown> | undefined;
        if (newCharacter) {
          characters.push(newCharacter);
          await cachingService.cacheArchetype(archetypeKey, newCharacter);
          totalCost += generated.cost?.ngn || 0;
          totalTokens += generated.usage?.totalTokens || 0;
        }
      }
    }

    return {
      data: characters,
      cost: totalCost,
      tokens: totalTokens
    };
  }

  async getProductionNotesWithCache(userInput: StoryGenerationInput) {
    const cacheKey = `production:${userInput.animationStyle}`;
    const cached = await cachingService.get(cacheKey);

    if (cached) {
      return { data: cached, cost: 0, tokens: 0 };
    }

    const result = await groqService.generateProductionNotes(userInput);
    await cachingService.set(cacheKey, result.notes, CACHE_TTL.PRODUCTION_NOTES);

    return {
      data: result.notes,
      cost: result.cost?.ngn || 0,
      tokens: result.usage?.totalTokens || 0
    };
  }

  shouldUseTemplate(userInput: StoryGenerationInput): boolean {
    if (userInput.templateId) return true;
    if (userInput.tier === 'free' || userInput.tier === 'creator') return true;
    if (!userInput.theme || userInput.theme.length < 20) return true;
    return false;
  }

  identifyArchetype(name: string, synopsis: string): string {
    const lowerName = name.toLowerCase();
    const lowerSynopsis = synopsis.toLowerCase();

    if (lowerName.includes('king') || lowerName.includes('oba') || lowerName.includes('chief')) {
      return 'proud_ruler';
    }
    if (lowerName.includes('tortoise') || lowerName.includes('anansi') || lowerSynopsis.includes('clever')) {
      return 'clever_trickster';
    }
    if (lowerName.includes('elder') || lowerName.includes('mama') || lowerName.includes('baba')) {
      return 'wise_elder';
    }
    if (lowerName.includes('warrior') || lowerName.includes('hero')) {
      return 'brave_warrior';
    }

    return `custom_${name.toLowerCase().replace(/\s/g, '_')}`;
  }

  calculateEstimatedCost(userInput: StoryGenerationInput) {
    const duration = userInput.duration || 10;
    const estimateKey = `${duration <= 5 ? 'QUICK' : duration <= 10 ? 'STANDARD' : duration <= 20 ? 'PREMIUM' : 'FEATURE'}_STORY` as keyof typeof TOKEN_ESTIMATES;
    const tokenEstimate = TOKEN_ESTIMATES[estimateKey] || 18000;
    const costPerToken = COSTS.GROQ_PER_1K_TOKENS / 1000;

    return {
      tokens: tokenEstimate,
      cost: (tokenEstimate * costPerToken).toFixed(2),
      currency: 'NGN'
    };
  }
}

export const storyGenerationService = new StoryGenerationService();
export default StoryGenerationService;
