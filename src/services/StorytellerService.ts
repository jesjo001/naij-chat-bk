import { logger } from '../utils/logger';
import {
  Story,
  StoryRequest,
  Character,
  Script,
  Scene,
  DialogueLine,
  Storyboard,
  PersonalityProfile,
  StoryGenerationInput
} from '../types/index';
import { storyGenerationService } from './storyGenerationService';

export class StorytellerService {
  private personalities: Map<string, PersonalityProfile> = new Map();

  constructor() {
    this.initializePersonalities();
  }

  private initializePersonalities(): void {
    this.personalities = new Map([
      [
        'lagos_hustler',
        {
          id: 'lagos_hustler',
          name: 'Lagos Hustler',
          emoji: '🏙️',
          tone: 'Street-smart, business-focused, energetic, motivational',
          useCase: ['Business advice', 'Networking tips', 'Entrepreneurship'],
          languageStyle: 'Heavy Pidgin with business slang',
          culturalElements: ['Lagos street culture', 'Business savvy', 'Motivation'],
          systemPrompt: `You are the Lagos Hustler personality. You're street-smart, business-focused, energetic, and motivational. 
You speak heavy Pidgin with business slang. Use phrases like "My guy", "Fire", "No go dull", "Blow your account". 
Always give practical, actionable business advice grounded in Nigerian market realities. Be enthusiastic and encouraging.`
        }
      ],
      [
        'iya_osun',
        {
          id: 'iya_osun',
          name: 'Iya Osun',
          emoji: '👵',
          tone: 'Wise, motherly, proverb-rich, patient, nurturing',
          useCase: ['Life advice', 'Cultural questions', 'Conflict resolution'],
          languageStyle: 'Yoruba-infused Pidgin with proverbs',
          culturalElements: ['Yoruba proverbs', 'Greetings', 'Blessings', 'Wisdom'],
          systemPrompt: `You are Iya Osun, a Yoruba Elder personality. You're wise, motherly, patient, and nurturing.
You speak Yoruba-infused Pidgin and use Yoruba proverbs frequently. Include Yoruba greetings and blessings in your response.
Always give advice grounded in traditional Yoruba wisdom and cultural values. Be nurturing and supportive.`
        }
      ],
      [
        'alhaji',
        {
          id: 'alhaji',
          name: 'Alhaji',
          emoji: '🕌',
          tone: 'Respectful, Islamic wisdom, business acumen, patient',
          useCase: ['Trade advice', 'Islamic guidance', 'Business ethics'],
          languageStyle: 'Formal Pidgin with Hausa/Arabic phrases',
          culturalElements: ['Islamic greetings', 'Quranic references', 'Northern business practices'],
          systemPrompt: `You are Alhaji, a Hausa Trader and Islamic Scholar. You're respectful, patient, and wise.
You speak formal Pidgin with Hausa and Arabic phrases. Use Islamic greetings like "As-salamu alaykum" and Islamic wisdom.
Always incorporate Islamic values in your advice, including references to the Prophet Muhammad (SAW) and Quranic principles.
Focus on business ethics, honesty, and patience ('Sabr').`
        }
      ],
      [
        'igbo_businessman',
        {
          id: 'igbo_businessman',
          name: 'Igbo Businessman',
          emoji: '💼',
          tone: 'Entrepreneurial, investment-focused, pragmatic, result-oriented',
          useCase: ['Business strategy', 'Investment analysis', 'Wealth building'],
          languageStyle: 'Professional Pidgin with Igbo business philosophy',
          culturalElements: ['Igbo proverbs about wealth', 'Investment wisdom', '"Imu ahia"'],
          systemPrompt: `You are the Igbo Businessman personality. You're entrepreneurial, pragmatic, and results-focused.
You speak professional Pidgin with Igbo business philosophy and proverbs about wealth like "Ego na-amụ ego" (Money breeds money).
Always give practical investment and business advice grounded in real-world returns. Include diversification strategies.
Be direct, action-oriented, and focused on results.`
        }
      ],
      [
        'pastor',
        {
          id: 'pastor',
          name: 'Pastor Profile',
          emoji: '⛪',
          tone: 'Encouraging, faith-based, motivational, compassionate',
          useCase: ['Spiritual guidance', 'Life challenges', 'Encouragement'],
          languageStyle: 'Biblical references, inspirational Pidgin',
          culturalElements: ['Scripture quotes', 'Prayer points', 'Christian context'],
          systemPrompt: `You are the Pastor personality. You're encouraging, compassionate, and motivational.
You speak inspirational Pidgin with frequent Biblical references and quotes. Include scripture references like "Psalm 30:5", "Jeremiah 29:11", "Romans 8:28".
Always include prayer points and declarations. Use phrases like "Receive am in Jesus name!", "Amen!", "God bless you".
Give hope, encouragement, and faith-based wisdom while acknowledging struggles.`
        }
      ]
    ]);
  }

  async generateStory(request: StoryRequest): Promise<Story> {
    try {
      logger.info(`Generating story: ${request.theme} in ${request.language}`);

      if (process.env.GROQ_API_KEY) {
        try {
          type GeneratedStory = {
            title?: string;
            overview?: { logline?: string; synopsis?: string; moral?: string };
            productionNotes?: Record<string, unknown> | string;
            characters?: Character[];
            script?: Record<string, unknown> | string;
            metadata?: Story['metadata'];
            generation?: Record<string, unknown>;
            type?: string;
          } & Record<string, unknown>;

          const generated = (await storyGenerationService.generateStory(
            this.mapToGenerationInput(request)
          )) as unknown as GeneratedStory;

          const story: Story = {
            title: generated.title || this.generateStoryTitle(request),
            synopsis:
              generated.overview?.synopsis || generated.overview?.logline || this.generateSynopsis(request),
            genre: this.determineGenre(request.storyType),
            duration: request.storyLength,
            language: request.language,
            targetAudience: request.targetAudience,
            animationStyle: request.animationStyle,
            moral: generated.overview?.moral || request.moral || this.generateMoral(request),
            theme: request.theme,
            culturalSetting: request.culturalSetting,
            createdAt: new Date(),
            productionNotes: generated.productionNotes,
            characters: generated.characters,
            script: generated.script,
            overview: generated.overview,
            metadata: generated.metadata,
            generation: generated.generation,
            type: generated.type
          };

          logger.info(`Groq story generated: ${story.title}`);
          return { ...generated, ...story } as Story;
        } catch (error) {
          logger.warn('Groq generation failed, falling back to local generator', { error });
        }
      }

      // Create a story structure based on the request
      const story: Story = {
        title: this.generateStoryTitle(request),
        synopsis: this.generateSynopsis(request),
        genre: this.determineGenre(request.storyType),
        duration: request.storyLength,
        language: request.language,
        targetAudience: request.targetAudience,
        animationStyle: request.animationStyle,
        moral: request.moral || this.generateMoral(request),
        createdAt: new Date()
      };

      logger.info(`Story generated: ${story.title}`);
      return story;
    } catch (error) {
      logger.error('Story generation failed:', error);
      throw new Error('Failed to generate story');
    }
  }

  private mapToGenerationInput(request: StoryRequest): StoryGenerationInput {
    return {
      storyType: request.storyType,
      theme: request.theme,
      duration: request.storyLength,
      language: request.language,
      animationStyle: request.animationStyle,
      culturalSetting: request.culturalSetting,
      targetAudience: request.targetAudience,
      tier: request.tier,
      templateId: request.templateId,
      protagonistName: request.protagonistName,
      antagonistName: request.antagonistName,
      advancedOptions: request.advancedOptions
    };
  }

  async generateCharacters(request: StoryRequest, characterCount: number = 4): Promise<Character[]> {
    try {
      logger.info(`Generating ${characterCount} characters for story`);

      const characters: Character[] = [];
      const roles: ('protagonist' | 'antagonist' | 'supporting' | 'minor')[] = ['protagonist', 'antagonist', 'supporting', 'minor'];

      for (let i = 0; i < characterCount; i++) {
        const character: Character = {
          name: this.generateCharacterName(request.language, i),
          role: roles[Math.min(i, roles.length - 1)],
          age: this.generateAge(request.targetAudience, i),
          personality: this.generatePersonality(request),
          voice: this.generateVoice(request.language),
          appearance: this.generateAppearance(request.culturalSetting),
          characterArc: this.generateCharacterArc(request),
          quirk: this.generateQuirk(),
          background: this.generateBackground(request.culturalSetting)
        };

        characters.push(character);
      }

      logger.info(`Generated ${characters.length} characters`);
      return characters;
    } catch (error) {
      logger.error('Character generation failed:', error);
      throw new Error('Failed to generate characters');
    }
  }

  async generateScript(story: Story, characters: Character[]): Promise<Script> {
    try {
      logger.info(`Generating script for story: ${story.title}`);

      const scenes: Scene[] = this.generateScenes(story, characters, Math.ceil(story.duration / 2));

      const script: Script = {
        title: `${story.title} - Screenplay`,
        storyId: story.id,
        format: 'screenplay',
        scenes: scenes,
        totalPages: Math.ceil(scenes.length * 1.5),
        duration: story.duration,
        createdAt: new Date()
      };

      logger.info(`Script generated with ${scenes.length} scenes`);
      return script;
    } catch (error) {
      logger.error('Script generation failed:', error);
      throw new Error('Failed to generate script');
    }
  }

  async generateStoryboard(story: Story, script: Script): Promise<Storyboard[]> {
    try {
      logger.info(`Generating storyboard for story: ${story.title}`);

      const storyboardFrames: Storyboard[] = [];

      script.scenes.forEach((scene) => {
        // Generate 2-4 frames per scene
        const frameCount = Math.floor(Math.random() * 3) + 2;

        for (let i = 0; i < frameCount; i++) {
          const frame: Storyboard = {
            storyId: story.id,
            sceneNumber: scene.sceneNumber,
            frameNumber: i + 1,
            visualDescription: this.generateVisualDescription(scene),
            cameraAngle: scene.cameraAngle || this.generateCameraAngle(),
            composition: this.generateComposition(),
            colorPalette: this.generateColorPalette(story.culturalSetting || 'Traditional Village'),
            characterPositions: this.generateCharacterPositions(scene),
            animationNotes: this.generateAnimationNotes(story.animationStyle),
            soundDesign: this.generateSoundDesign(scene)
          };

          storyboardFrames.push(frame);
        }
      });

      logger.info(`Generated ${storyboardFrames.length} storyboard frames`);
      return storyboardFrames;
    } catch (error) {
      logger.error('Storyboard generation failed:', error);
      throw new Error('Failed to generate storyboard');
    }
  }

  getPersonality(personalityId: string): PersonalityProfile | null {
    return this.personalities.get(personalityId) || null;
  }

  getAllPersonalities(): PersonalityProfile[] {
    return Array.from(this.personalities.values());
  }

  // Helper methods
  private generateStoryTitle(request: StoryRequest): string {
    const titles = [
      `The Tale of ${request.theme}`,
      `${request.theme}: A Nigerian Story`,
      `The Legend of ${request.theme}`,
      `When ${request.theme} Happened`,
      `The Wisdom of ${request.theme}`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateSynopsis(request: StoryRequest): string {
    return `A captivating ${request.language} story about ${request.theme}. 
Set in ${request.culturalSetting}, this tale is perfect for ${request.targetAudience} 
and carries the moral message: "${request.moral || 'wisdom triumphs over strength'}". 
The story unfolds in ${request.storyLength} minutes, showcasing vibrant ${request.culturalSetting} landscapes 
and rich cultural nuances that will resonate with Nigerian and African audiences.`;
  }

  private determineGenre(storyType: string): string {
    const genres: { [key: string]: string } = {
      folktale: 'African Folktale / Comedy / Family',
      modern: 'Contemporary Drama / Comedy',
      modern_nigerian: 'Contemporary Nigerian Drama / Comedy',
      children: 'Children\'s Adventure / Educational',
      marketing: 'Brand Story / Narrative Advertisement',
      film: 'Dramatic Film / Feature',
      animation: 'Animated Adventure / Family',
      animation_script: 'Animated Adventure / Family'
    };
    return genres[storyType] || 'Adventure / Drama';
  }

  private generateMoral(_request: StoryRequest): string {
    const morals = [
      'Wisdom triumphs over strength',
      'Humility leads to greatness',
      'Unity is strength',
      'Patience brings rewards',
      'Honesty is the best policy',
      'Intelligence and wit beat brute force',
      'Community values matter',
      'Respect for elders is crucial'
    ];
    return morals[Math.floor(Math.random() * morals.length)];
  }

  private generateCharacterName(language: string, index: number): string {
    const names: { [key: string]: string[] } = {
      pidgin: ['Ija', 'Kwame', 'Amina', 'Chukwu', 'Zainab', 'Tunde'],
      yoruba: ['Ọmọ', 'Adekunle', 'Folake', 'Adebayo', 'Yetunde', 'Tayo'],
      igbo: ['Chukwu', 'Obinna', 'Ngozi', 'Emeka', 'Ifeoma', 'Nnadi'],
      hausa: ['Musa', 'Fatima', 'Alhaji', 'Aisha', 'Ibrahim', 'Hauwa'],
      english: ['Character' + (index + 1), 'Hero', 'Guide', 'Companion']
    };
    const langNames = names[language] || names['english'];
    return langNames[index % langNames.length];
  }

  private generateAge(audience: string, index: number): string {
    const ages = ['Young', 'Adult', 'Elder', 'Ancient'];
    return ages[index % ages.length];
  }

  private generatePersonality(_request: StoryRequest): string[] {
    return ['Witty', 'Brave', 'Humble', 'Wise', 'Cunning', 'Compassionate'];
  }

  private generateVoice(language: string): string {
    const voices: { [key: string]: string } = {
      pidgin: 'Warm, grandfatherly Nigerian Pidgin accent',
      yoruba: 'Melodious Yoruba accent with cultural warmth',
      igbo: 'Firm, business-focused Igbo accent',
      hausa: 'Respectful, patient Hausa accent',
      english: 'Clear, professional Nigerian English'
    };
    return voices[language] || voices['english'];
  }

  private generateAppearance(setting: string): string {
    return `Distinctive character with appearance reflecting ${setting} culture and setting`;
  }

  private generateCharacterArc(_request: StoryRequest): string {
    return `Starts as an underdog, grows through challenges, emerges as hero with new wisdom`;
  }

  private generateQuirk(): string {
    const quirks = [
      'Always carries lucky charms',
      'Has a catch phrase they repeat',
      'Makes unusual hand gestures',
      'Hums a traditional tune',
      'Collects small objects',
      'Tells jokes to cope with stress'
    ];
    return quirks[Math.floor(Math.random() * quirks.length)];
  }

  private generateBackground(setting: string): string {
    return `A character rooted in ${setting} culture with deep understanding of local traditions`;
  }

  private generateScenes(story: Story, characters: Character[], sceneCount: number): Scene[] {
    const scenes: Scene[] = [];

    for (let i = 1; i <= sceneCount; i++) {
      const scene: Scene = {
        sceneNumber: i,
        heading: `SCENE ${i}: ${this.generateSceneHeading()}`,
        description: `Scene ${i} of the story, showing ${story.theme || 'adventure'}`,
        action: `Character action for scene ${i}`,
        dialogue: this.generateDialogue(characters),
        cameraAngle: this.generateCameraAngle(),
        soundCues: this.generateSoundCues(),
        frameNotes: ['Frame composition note 1', 'Frame composition note 2']
      };

      scenes.push(scene);
    }

    return scenes;
  }

  private generateSceneHeading(): string {
    const headings = [
      'THE MEETING',
      'THE CHALLENGE',
      'THE TWIST',
      'THE CLIMAX',
      'THE RESOLUTION',
      'THE LESSON'
    ];
    return headings[Math.floor(Math.random() * headings.length)];
  }

  private generateDialogue(characters: Character[]): DialogueLine[] {
    return characters.slice(0, 2).map((char) => ({
      character: char.name,
      line: `Dialogue from ${char.name}`,
      tone: 'Natural and engaging',
      action: 'Speaking with expression'
    }));
  }

  private generateCameraAngle(): string {
    const angles = ['Wide shot', 'Close-up', 'Medium shot', 'High angle', 'Low angle', 'Overhead shot'];
    return angles[Math.floor(Math.random() * angles.length)];
  }

  private generateSoundCues(): string[] {
    return [
      'Talking drum beats',
      'Afrobeats background music',
      'Natural environment sounds',
      'Character voice over'
    ];
  }

  private generateVisualDescription(scene: Scene): string {
    return `Visual representation of: ${scene.heading}`;
  }

  private generateComposition(): string {
    const compositions = [
      'Rule of thirds with character on left',
      'Central character in frame',
      'Deep focus with background action',
      'Dynamic diagonal composition'
    ];
    return compositions[Math.floor(Math.random() * compositions.length)];
  }

  private generateColorPalette(setting: string): string[] {
    const palettes: { [key: string]: string[] } = {
      'Traditional Village': ['#8B4513', '#D2B48C', '#228B22', '#FFD700'],
      'Modern Lagos': ['#FF6B35', '#004E89', '#1B9CFC', '#F5F5F5'],
      'Ancient Kingdom': ['#8B0000', '#DAA520', '#2F4F4F', '#FFD700'],
      'University Campus': ['#003366', '#FFB81C', '#FFFFFF', '#666666'],
      'Marketplace': ['#FF6B6B', '#FFE66D', '#95E1D3', '#C7B3E5']
    };
    return palettes[setting] || ['#8B4513', '#D2B48C', '#228B22', '#FFD700'];
  }

  private generateCharacterPositions(scene: Scene): string {
    return `Detailed positioning of all characters in frame for scene ${scene.sceneNumber}`;
  }

  private generateAnimationNotes(animationStyle: string): string {
    return `Animation notes for ${animationStyle} style: smooth character movements, expressive facial animations`;
  }

  private generateSoundDesign(scene: Scene): string {
    return `Layered sound design: dialogue, ambient sounds, and musical score for scene ${scene.sceneNumber}`;
  }
}

export const storytellerService = new StorytellerService();
