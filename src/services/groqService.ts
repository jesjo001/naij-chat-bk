import { groq, MODELS, DEFAULT_PARAMS, isGroqConfigured } from '../config/groq';
import { logger } from '../utils/logger';
import { countTokens } from '../utils/tokenCounter';
import type { StoryGenerationInput } from '../types/index';

interface GroqUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface GroqCost {
  usd: number;
  ngn: number;
}

interface GroqApiResponse {
  choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
  usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number };
  model?: string;
}

export interface GroqCompletionResult {
  content: string;
  usage: GroqUsage;
  model: string;
  duration: number;
  finishReason?: string | null;
  cost: GroqCost;
}

export interface StoryOutline {
  title: string;
  logline: string;
  synopsis: string;
  characterNames: string[];
  actStructure: {
    act1: string;
    act2: string;
    act3: string;
  };
}

export interface ParsedScript {
  format: 'screenplay';
  totalScenes: number;
  scenes: Array<{
    sceneNumber: number;
    heading: string;
    location: string;
    timeOfDay: string;
    content: string;
  }>;
  rawScript: string;
}

export interface AdditionalScene {
  sceneNumber: number;
  heading: string;
  location?: string;
  timeOfDay?: string;
  content: string;
}

class GroqService {
  private getTierQualityDirectives(tier: StoryGenerationInput['tier']) {
    switch (tier) {
      case 'studio':
        return 'Deliver cinematic, production-ready writing with rich visual detail, subtext, and precise scene beats. Include nuanced character motivation and layered emotional arcs.';
      case 'creator':
        return 'Deliver high-quality, polished writing with strong pacing, vivid visuals, and emotionally resonant dialogue.';
      case 'starter':
      default:
        return 'Keep it clear, concise, and easy to follow while staying culturally authentic.';
    }
  }

  private getTargetSceneCount(duration: number, tier: StoryGenerationInput['tier']) {
    const base = Math.max(6, Math.round(duration));
    const multiplier = tier === 'studio' ? 1.3 : tier === 'creator' ? 1.1 : 0.9;
    return Math.max(6, Math.round(base * multiplier));
  }

  private getScriptMaxTokens(duration: number, tier: StoryGenerationInput['tier']) {
    const tierBoost = tier === 'studio' ? 1200 : tier === 'creator' ? 600 : 0;
    const scaled = 2200 + duration * 200 + tierBoost;
    return Math.min(8192, Math.max(3000, Math.round(scaled)));
  }

  async generateCompletion({
    prompt,
    systemPrompt = '',
    model = MODELS.STANDARD,
    temperature = DEFAULT_PARAMS.temperature,
    maxTokens = DEFAULT_PARAMS.max_tokens,
    options = {}
  }: {
    prompt: string;
    systemPrompt?: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
    options?: {
      top_p?: number;
      frequency_penalty?: number;
      presence_penalty?: number;
    };
  }): Promise<GroqCompletionResult> {
    if (!isGroqConfigured()) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    try {
      const startTime = Date.now();

      const messages = [] as Array<{ role: 'system' | 'user'; content: string }>;

      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }

      messages.push({ role: 'user', content: prompt });

      logger.info(`Groq API call - Model: ${model}`);

      const completion = (await groq.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: options.top_p ?? DEFAULT_PARAMS.top_p,
        frequency_penalty: options.frequency_penalty ?? DEFAULT_PARAMS.frequency_penalty,
        presence_penalty: options.presence_penalty ?? DEFAULT_PARAMS.presence_penalty
      })) as GroqApiResponse;

      const endTime = Date.now();
      const duration = endTime - startTime;

      const usageRaw = completion?.usage || {};
      const usage: GroqUsage = {
        promptTokens: usageRaw.prompt_tokens ?? countTokens(prompt),
        completionTokens: usageRaw.completion_tokens ?? 0,
        totalTokens: usageRaw.total_tokens ?? countTokens(prompt)
      };

      const costPerToken = parseFloat(process.env.GROQ_COST_PER_1K_TOKENS || '0');
      const cost: GroqCost = {
        usd: (usage.totalTokens / 1000) * costPerToken,
        ngn: (usage.totalTokens / 1000) * costPerToken * 1500
      };

      return {
        content: completion?.choices?.[0]?.message?.content ?? '',
        usage,
        model: completion?.model ?? model,
        duration,
        finishReason: completion?.choices?.[0]?.finish_reason ?? null,
        cost
      };
    } catch (error) {
      logger.error('Groq API Error:', error);
      throw new Error(`Groq generation failed: ${(error as Error).message}`);
    }
  }

  async generateOutline(userInput: StoryGenerationInput): Promise<GroqCompletionResult & { outline: StoryOutline }> {
    const tier = userInput.tier || 'starter';
    const quality = this.getTierQualityDirectives(tier);
    const systemPrompt = `You are an expert Nigerian storyteller. Create concise story outlines. Write all output in ${userInput.language}. ${quality}`;

    const prompt = `Create a story outline for:

Type: ${userInput.storyType}
Theme: ${userInput.theme}
Duration: ${userInput.duration} minutes
Language: ${userInput.language}

All fields (title, logline, synopsis, actStructure) must be written in ${userInput.language}.

Output a JSON object with:
{
  "title": "Story title",
  "logline": "One sentence pitch",
  "synopsis": "3-4 sentence summary",
  "characterNames": ["Character 1", "Character 2", ...],
  "actStructure": {
    "act1": "Setup summary",
    "act2": "Confrontation summary",
    "act3": "Resolution summary"
  }
}`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.FAST_SMALL,
      maxTokens: 1000,
      temperature: 0.7
    });

    const outline = this.extractJson(result.content) as unknown as StoryOutline;

    return {
      ...result,
      outline
    };
  }

  async generateCharacters(
    outline: StoryOutline,
    userInput: StoryGenerationInput
  ): Promise<GroqCompletionResult & { characters: Record<string, unknown>[] }> {
    const tier = userInput.tier || 'starter';
    const quality = this.getTierQualityDirectives(tier);
    const systemPrompt = `You are an expert character designer for ${userInput.animationStyle} animation. Create detailed, culturally authentic Nigerian characters. ${quality}`;

    const prompt = `Create detailed profiles for these characters in the story "${outline.title}":

Characters: ${outline.characterNames.join(', ')}
Story Context: ${outline.synopsis}
Animation Style: ${userInput.animationStyle}
Cultural Setting: ${userInput.culturalSetting}
Language: ${userInput.language}

For EACH character, output JSON:
{
  "name": "Character name",
  "role": "protagonist/antagonist/supporting",
  "species": "Human/Animal/etc",
  "age": "Age or age range",
  "personality": ["trait1", "trait2", "trait3"],
  "appearance": {
    "height": "description",
    "distinctiveFeatures": "description",
    "clothing": "description"
  },
  "voiceProfile": {
    "tone": "description",
    "accent": "Nigerian accent type",
    "pitch": "high/medium/low"
  },
  "characterArc": "Brief arc description"
}

Return as JSON array: [character1, character2, ...]`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.STANDARD,
      maxTokens: 3000,
      temperature: 0.8
    });

    const characters = this.extractJsonArray(result.content);

    return {
      ...result,
      characters
    };
  }

  async generateScript(
    outline: StoryOutline,
    characters: Array<{ name: string; role?: string }>,
    userInput: StoryGenerationInput
  ): Promise<GroqCompletionResult & { parsedScript: ParsedScript }> {
    const tier = userInput.tier || 'starter';
    const quality = this.getTierQualityDirectives(tier);
    const targetScenes = this.getTargetSceneCount(userInput.duration || 10, tier);
    const maxTokens = this.getScriptMaxTokens(userInput.duration || 10, tier);
    const systemPrompt = `You are an expert Nigerian screenwriter. Write screenplays in proper format with ALL dialogue and action text in ${userInput.language}. ${quality}`;

    const characterList = characters.map((c) => `${c.name} (${c.role || 'supporting'})`).join(', ');

    const prompt = `Write a complete screenplay for:

Title: ${outline.title}
Synopsis: ${outline.synopsis}
Characters: ${characterList}
Duration: ${userInput.duration} minutes
Language: ${userInput.language}

Structure:
${outline.actStructure.act1}
${outline.actStructure.act2}
${outline.actStructure.act3}

Format as screenplay with:
- Scene headings (INT./EXT. LOCATION - TIME)
- Action lines
- Character names in CAPS
- Dialogue in ${userInput.language}
- Camera directions
- Sound cues

Target scene count: ${targetScenes} scenes.
Keep pacing aligned to the requested duration (${userInput.duration} minutes).

IMPORTANT: Every line of dialogue and action must be written in ${userInput.language}.`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.STANDARD,
      maxTokens,
      temperature: 0.85
    });

    return {
      ...result,
      parsedScript: this.parseScript(result.content)
    };
  }

  async generateProductionNotes(userInput: StoryGenerationInput): Promise<GroqCompletionResult & { notes: Record<string, unknown> }> {
    const tier = userInput.tier || 'starter';
    const quality = this.getTierQualityDirectives(tier);
    const systemPrompt = `You are a film production expert specializing in ${userInput.animationStyle} animation. ${quality}`;

    const prompt = `Create production notes for a ${userInput.duration}-minute ${userInput.animationStyle} animated story.

Include:
1. Animation style guidelines
2. Color palette (hex codes)
3. Lighting design approach
4. Music/sound recommendations
5. Estimated production budget (Nigerian costs)

Output as JSON.`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.FAST_SMALL,
      maxTokens: 1500,
      temperature: 0.6
    });

    const notes = (this.extractJson(result.content) || { rawNotes: result.content }) as Record<string, unknown>;

    return {
      ...result,
      notes
    };
  }

  async generateAdditionalScenes(params: {
    title: string;
    synopsis: string;
    characters: Array<{ name: string; role?: string }>;
    existingScenes: Array<{ sceneNumber?: number; heading?: string; content?: string }>;
    language: string;
    count: number;
  }): Promise<GroqCompletionResult & { scenes: AdditionalScene[] }> {
    const systemPrompt = `You are an expert Nigerian screenwriter. Continue scripts in proper screenplay format with authentic ${params.language} dialogue. Deliver higher fidelity and richer detail for premium tiers.`;

    const characterList = params.characters.map((c) => `${c.name} (${c.role || 'supporting'})`).join(', ');
    const existingSummary = params.existingScenes
      .slice(-3)
      .map((scene) => `Scene ${scene.sceneNumber}: ${scene.heading}\n${scene.content}`)
      .join('\n\n');

    const prompt = `Continue the screenplay with ${params.count} NEW scenes.

Title: ${params.title}
Synopsis: ${params.synopsis}
Characters: ${characterList}
Language: ${params.language}

Recent scenes:
${existingSummary || 'No prior scenes.'}

Return a JSON array of scenes with fields:
[
  {
    "sceneNumber": number,
    "heading": "INT./EXT. LOCATION - TIME",
    "location": "LOCATION",
    "timeOfDay": "TIME",
    "content": "Full scene content with action and dialogue in ${params.language}"
  }
]

Make sure dialogue is in ${params.language}.`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.STANDARD,
      maxTokens: 2048,
      temperature: 0.85
    });

    const scenes = this.extractJsonArray(result.content) as unknown as AdditionalScene[];

    return {
      ...result,
      scenes
    };
  }

  private extractJson(content: string): Record<string, unknown> {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { rawContent: content };
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      logger.warn('Failed to parse JSON response', { error });
      return { rawContent: content };
    }
  }

  private extractJsonArray(content: string): Record<string, unknown>[] {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      logger.warn('Failed to parse JSON array response', { error });
      return [];
    }
  }

  private parseScript(rawScript: string): ParsedScript {
    const scenes: ParsedScript['scenes'] = [];
    const scenePattern = /(INT\.|EXT\.)\s+([A-Z\s]+)\s+-\s+([A-Z\s]+)/g;

    let match: RegExpExecArray | null;

    while ((match = scenePattern.exec(rawScript)) !== null) {
      const nextMatch = scenePattern.exec(rawScript);
      const sceneEnd = nextMatch ? nextMatch.index : rawScript.length;

      scenePattern.lastIndex = match.index + match[0].length;

      const sceneContent = rawScript.substring(match.index, sceneEnd).trim();

      scenes.push({
        sceneNumber: scenes.length + 1,
        heading: match[0],
        location: match[2].trim(),
        timeOfDay: match[3].trim(),
        content: sceneContent
      });

      if (!nextMatch) {
        break;
      }
    }

    return {
      format: 'screenplay',
      totalScenes: scenes.length,
      scenes,
      rawScript
    };
  }
}

export const groqService = new GroqService();
export default GroqService;
