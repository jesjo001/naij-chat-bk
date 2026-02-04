🚀 COMPLETE GROQ INTEGRATION + TEMPLATE SYSTEM IMPLEMENTATION
I'll build the entire production-ready system with Groq API, template engine, caching, and optimizations.

📦 PROJECT STRUCTURE
naijagpt-storyteller/
├── server/
│   ├── config/
│   │   ├── groq.js
│   │   ├── redis.js
│   │   └── constants.js
│   ├── services/
│   │   ├── groqService.js
│   │   ├── templateEngine.js
│   │   ├── storyGenerationService.js
│   │   ├── cachingService.js
│   │   └── optimizationService.js
│   ├── models/
│   │   ├── Story.js
│   │   ├── Template.js
│   │   └── CachedElement.js
│   ├── controllers/
│   │   └── storytellerController.js
│   ├── routes/
│   │   └── storyteller.js
│   ├── templates/
│   │   ├── tricksterTale.js
│   │   ├── heroJourney.js
│   │   ├── loveStory.js
│   │   └── index.js
│   ├── utils/
│   │   ├── tokenCounter.js
│   │   └── logger.js
│   └── jobs/
│       └── storyGenerationJob.js
└── package.json

1. PACKAGE.JSON
json{
  "name": "naijagpt-storyteller",
  "version": "1.0.0",
  "description": "AI-Powered Nigerian Storytelling Platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "groq-sdk": "^0.3.1",
    "redis": "^4.6.10",
    "ioredis": "^5.3.2",
    "bull": "^4.11.5",
    "dotenv": "^16.3.1",
    "joi": "^17.11.0",
    "winston": "^3.11.0",
    "tiktoken": "^1.0.10",
    "handlebars": "^4.7.8",
    "lodash": "^4.17.21",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0"
  }
}

2. ENVIRONMENT VARIABLES (.env)
bash# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/naijagpt
REDIS_URL=redis://localhost:6379

# Groq API
GROQ_API_KEY=gsk_your_groq_api_key_here

# OpenAI (for premium polish only)
OPENAI_API_KEY=sk_your_openai_key_here

# Costs (for tracking)
GROQ_COST_PER_1K_TOKENS=0.00059
OPENAI_GPT4_MINI_INPUT_COST=0.00015
OPENAI_GPT4_MINI_OUTPUT_COST=0.00060

# Feature Flags
ENABLE_CACHING=true
ENABLE_TEMPLATES=true
ENABLE_BATCH_PROCESSING=true

3. CONFIG FILES
config/groq.js
javascriptconst Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Model configurations
const MODELS = {
  FAST_SMALL: 'llama-3.1-8b-instant',      // For outlines, quick tasks
  STANDARD: 'llama-3.1-70b-versatile',     // Main story generation
  LARGE: 'llama-3.2-90b-text-preview'      // Premium quality (if needed)
};

// Default generation parameters
const DEFAULT_PARAMS = {
  temperature: 0.8,        // Creative but controlled
  max_tokens: 4096,        // Maximum per call
  top_p: 0.9,
  frequency_penalty: 0.3,  // Reduce repetition
  presence_penalty: 0.1
};

module.exports = {
  groq,
  MODELS,
  DEFAULT_PARAMS
};

config/redis.js
javascriptconst Redis = require('ioredis');
const logger = require('../utils/logger');

const redis = new Redis(process.env.REDIS_URL, {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
});

redis.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  logger.error('❌ Redis error:', err);
});

// Cache TTL configurations (in seconds)
const CACHE_TTL = {
  TEMPLATE: 60 * 60 * 24 * 30,     // 30 days (rarely changes)
  SETTING: 60 * 60 * 24 * 7,       // 7 days
  CHARACTER_ARCHETYPE: 60 * 60 * 24 * 7,
  PRODUCTION_NOTES: 60 * 60 * 24 * 30,
  STORY_OUTLINE: 60 * 60,          // 1 hour (user-specific)
  FULL_STORY: 60 * 60 * 24         // 24 hours
};

module.exports = {
  redis,
  CACHE_TTL
};

config/constants.js
javascriptmodule.exports = {
  // Story types
  STORY_TYPES: {
    FOLKTALE: 'folktale',
    MODERN_NIGERIAN: 'modern_nigerian',
    CHILDREN: 'children',
    MARKETING: 'marketing',
    FILM: 'film',
    ANIMATION: 'animation_script'
  },

  // Languages
  LANGUAGES: {
    PIDGIN: 'pidgin',
    YORUBA: 'yoruba',
    IGBO: 'igbo',
    HAUSA: 'hausa',
    ENGLISH: 'english',
    BILINGUAL: 'bilingual'
  },

  // Animation styles
  ANIMATION_STYLES: {
    PIXAR_3D: 'pixar_3d',
    DISNEY_2D: 'disney_2d',
    ANIME: 'anime',
    AFRICAN_ART: 'african_art',
    REALISTIC: 'realistic',
    STOP_MOTION: 'stop_motion'
  },

  // Cultural settings
  CULTURAL_SETTINGS: {
    TRADITIONAL_VILLAGE: 'traditional_village',
    ANCIENT_KINGDOM: 'ancient_kingdom',
    MODERN_LAGOS: 'modern_lagos',
    UNIVERSITY_CAMPUS: 'university_campus',
    MARKETPLACE: 'marketplace',
    FANTASY_REALM: 'fantasy_realm'
  },

  // Generation costs (Naira)
  COSTS: {
    GROQ_PER_1K_TOKENS: 0.885,           // ₦0.885 per 1K tokens
    GPT4_MINI_INPUT_PER_1K: 0.225,       // ₦0.225 per 1K
    GPT4_MINI_OUTPUT_PER_1K: 0.90,       // ₦0.90 per 1K
    STORAGE_PER_MB: 0.05                  // S3/R2 storage
  },

  // Pricing tiers
  PRICING: {
    QUICK_STORY: 500,        // ₦500 (3-5 min)
    STANDARD_STORY: 1500,    // ₦1,500 (10 min)
    PREMIUM_STORY: 2500,     // ₦2,500 (10 min, polished)
    FEATURE_STORY: 5000      // ₦5,000 (30 min)
  },

  // Token estimates
  TOKEN_ESTIMATES: {
    QUICK_STORY: 8000,
    STANDARD_STORY: 18000,
    PREMIUM_STORY: 18000,
    FEATURE_STORY: 45000
  }
};

4. CORE SERVICES
services/groqService.js
javascriptconst { groq, MODELS, DEFAULT_PARAMS } = require('../config/groq');
const logger = require('../utils/logger');
const { countTokens } = require('../utils/tokenCounter');

class GroqService {
  
  /**
   * Generate completion using Groq API
   */
  async generateCompletion({
    prompt,
    systemPrompt = '',
    model = MODELS.STANDARD,
    temperature = DEFAULT_PARAMS.temperature,
    maxTokens = DEFAULT_PARAMS.max_tokens,
    options = {}
  }) {
    try {
      const startTime = Date.now();
      
      const messages = [];
      
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt
        });
      }
      
      messages.push({
        role: 'user',
        content: prompt
      });
      
      logger.info(`🤖 Groq API Call - Model: ${model}`);
      
      const completion = await groq.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: options.top_p || DEFAULT_PARAMS.top_p,
        frequency_penalty: options.frequency_penalty || DEFAULT_PARAMS.frequency_penalty,
        presence_penalty: options.presence_penalty || DEFAULT_PARAMS.presence_penalty
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const result = {
        content: completion.choices[0].message.content,
        usage: {
          promptTokens: completion.usage.prompt_tokens,
          completionTokens: completion.usage.completion_tokens,
          totalTokens: completion.usage.total_tokens
        },
        model: completion.model,
        duration,
        finishReason: completion.choices[0].finish_reason
      };
      
      // Calculate cost
      const costPerToken = parseFloat(process.env.GROQ_COST_PER_1K_TOKENS);
      result.cost = {
        usd: (result.usage.totalTokens / 1000) * costPerToken,
        ngn: (result.usage.totalTokens / 1000) * costPerToken * 1500 // USD to NGN
      };
      
      logger.info(`✅ Groq completed in ${duration}ms - Tokens: ${result.usage.totalTokens} - Cost: ₦${result.cost.ngn.toFixed(2)}`);
      
      return result;
      
    } catch (error) {
      logger.error('❌ Groq API Error:', error);
      throw new Error(`Groq generation failed: ${error.message}`);
    }
  }
  
  /**
   * Generate story outline (fast, cheap)
   */
  async generateOutline(userInput) {
    const systemPrompt = `You are an expert Nigerian storyteller. Create concise story outlines.`;
    
    const prompt = `Create a story outline for:
    
Type: ${userInput.storyType}
Theme: ${userInput.theme}
Duration: ${userInput.duration} minutes
Language: ${userInput.language}

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
      model: MODELS.FAST_SMALL,  // Use cheaper model for outlines
      maxTokens: 1000,
      temperature: 0.7
    });
    
    try {
      // Parse JSON response
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      logger.error('Failed to parse outline JSON:', error);
      // Return structured error
      return {
        title: 'Parsing Error',
        error: error.message,
        rawContent: result.content
      };
    }
  }
  
  /**
   * Generate character profiles
   */
  async generateCharacters(outline, userInput) {
    const systemPrompt = `You are an expert character designer for ${userInput.animationStyle} animation. Create detailed, culturally authentic Nigerian characters.`;
    
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
      model: MODELS.STANDARD,  // Use standard model for quality
      maxTokens: 3000,
      temperature: 0.8
    });
    
    try {
      const jsonMatch = result.content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      logger.error('Failed to parse characters JSON:', error);
      return [];
    }
  }
  
  /**
   * Generate full script
   */
  async generateScript(outline, characters, userInput) {
    const systemPrompt = `You are an expert Nigerian screenwriter. Write screenplays in proper format with authentic ${userInput.language} dialogue.`;
    
    const characterList = characters.map(c => `${c.name} (${c.role})`).join(', ');
    
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

Make it ${Math.ceil(userInput.duration / 2)} scenes.`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.STANDARD,
      maxTokens: 4096,  // Maximum for detailed script
      temperature: 0.85
    });
    
    return this.parseScript(result.content);
  }
  
  /**
   * Parse screenplay into structured format
   */
  parseScript(rawScript) {
    const scenes = [];
    const scenePattern = /(INT\.|EXT\.)\s+([A-Z\s]+)\s+-\s+([A-Z\s]+)/g;
    
    let match;
    let currentIndex = 0;
    
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
      
      if (!nextMatch) break;
    }
    
    return {
      format: 'screenplay',
      totalScenes: scenes.length,
      scenes,
      rawScript
    };
  }
  
  /**
   * Generate production notes
   */
  async generateProductionNotes(userInput) {
    const systemPrompt = `You are a film production expert specializing in ${userInput.animationStyle} animation.`;
    
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
    
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { rawNotes: result.content };
    } catch (error) {
      return { rawNotes: result.content };
    }
  }
  
}

module.exports = new GroqService();

services/cachingService.js
javascriptconst { redis, CACHE_TTL } = require('../config/redis');
const logger = require('../utils/logger');
const crypto = require('crypto');

class CachingService {
  
  /**
   * Generate cache key from input parameters
   */
  generateCacheKey(prefix, params) {
    const paramsString = JSON.stringify(params);
    const hash = crypto.createHash('md5').update(paramsString).digest('hex');
    return `${prefix}:${hash}`;
  }
  
  /**
   * Get from cache
   */
  async get(key) {
    try {
      const cached = await redis.get(key);
      if (cached) {
        logger.info(`✅ Cache HIT: ${key}`);
        return JSON.parse(cached);
      }
      logger.info(`❌ Cache MISS: ${key}`);
      return null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }
  
  /**
   * Set to cache
   */
  async set(key, value, ttl = CACHE_TTL.FULL_STORY) {
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
      logger.info(`💾 Cached: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }
  
  /**
   * Delete from cache
   */
  async del(key) {
    try {
      await redis.del(key);
      logger.info(`🗑️ Deleted cache: ${key}`);
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  }
  
  /**
   * Get cached setting (village, marketplace, etc.)
   */
  async getCachedSetting(settingType) {
    const key = `setting:${settingType}`;
    return await this.get(key);
  }
  
  /**
   * Cache setting
   */
  async cacheSetting(settingType, settingData) {
    const key = `setting:${settingType}`;
    return await this.set(key, settingData, CACHE_TTL.SETTING);
  }
  
  /**
   * Get cached character archetype
   */
  async getCachedArchetype(archetypeType) {
    const key = `archetype:${archetypeType}`;
    return await this.get(key);
  }
  
  /**
   * Cache character archetype
   */
  async cacheArchetype(archetypeType, archetypeData) {
    const key = `archetype:${archetypeType}`;
    return await this.set(key, archetypeData, CACHE_TTL.CHARACTER_ARCHETYPE);
  }
  
  /**
   * Get cache statistics
   */
  async getStats() {
    try {
      const info = await redis.info('stats');
      const lines = info.split('\r\n');
      const stats = {};
      
      lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          stats[key] = value;
        }
      });
      
      return {
        hits: parseInt(stats.keyspace_hits) || 0,
        misses: parseInt(stats.keyspace_misses) || 0,
        hitRate: stats.keyspace_hits && stats.keyspace_misses 
          ? (parseInt(stats.keyspace_hits) / (parseInt(stats.keyspace_hits) + parseInt(stats.keyspace_misses)) * 100).toFixed(2) + '%'
          : '0%'
      };
    } catch (error) {
      logger.error('Failed to get cache stats:', error);
      return null;
    }
  }
  
}

module.exports = new CachingService();

services/templateEngine.js
javascriptconst Handlebars = require('handlebars');
const logger = require('../utils/logger');
const templates = require('../templates');

class TemplateEngine {
  
  constructor() {
    this.templates = templates;
    this.compiledTemplates = {};
    this.compileAllTemplates();
  }
  
  /**
   * Compile all templates on startup
   */
  compileAllTemplates() {
    Object.keys(this.templates).forEach(templateName => {
      const template = this.templates[templateName];
      
      // Compile Handlebars templates
      if (template.outline) {
        this.compiledTemplates[`${templateName}_outline`] = Handlebars.compile(template.outline);
      }
      if (template.characterTemplate) {
        this.compiledTemplates[`${templateName}_character`] = Handlebars.compile(template.characterTemplate);
      }
      if (template.sceneTemplate) {
        this.compiledTemplates[`${templateName}_scene`] = Handlebars.compile(template.sceneTemplate);
      }
      
      logger.info(`✅ Compiled template: ${templateName}`);
    });
  }
  
  /**
   * Check if template exists for story type
   */
  hasTemplate(storyType) {
    return !!this.templates[storyType];
  }
  
  /**
   * Get template structure
   */
  getTemplate(storyType) {
    return this.templates[storyType] || null;
  }
  
  /**
   * Fill template with user data
   */
  async fillTemplate(templateName, userData) {
    const template = this.templates[templateName];
    
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }
    
    logger.info(`📝 Filling template: ${templateName}`);
    
    // Create context for Handlebars
    const context = {
      ...userData,
      ...template.defaults
    };
    
    const filled = {
      title: this.compiledTemplates[`${templateName}_outline`] 
        ? this.compiledTemplates[`${templateName}_outline`](context)
        : template.title,
      
      structure: template.structure,
      
      characters: template.characterArchetypes.map((archetype, index) => {
        const charContext = { ...context, characterIndex: index, ...archetype };
        return this.compiledTemplates[`${templateName}_character`]
          ? JSON.parse(this.compiledTemplates[`${templateName}_character`](charContext))
          : archetype;
      }),
      
      scenes: template.structure.scenes.map((scene, index) => {
        const sceneContext = { ...context, sceneIndex: index, ...scene };
        return this.compiledTemplates[`${templateName}_scene`]
          ? this.compiledTemplates[`${templateName}_scene`](sceneContext)
          : scene;
      })
    };
    
    return filled;
  }
  
  /**
   * Get all available templates
   */
  getAvailableTemplates() {
    return Object.keys(this.templates).map(key => ({
      id: key,
      name: this.templates[key].name,
      description: this.templates[key].description,
      category: this.templates[key].category,
      estimatedDuration: this.templates[key].estimatedDuration,
      difficulty: this.templates[key].difficulty
    }));
  }
  
}

module.exports = new TemplateEngine();

5. STORY TEMPLATES
templates/tricksterTale.js
javascriptmodule.exports = {
  id: 'trickster_tale',
  name: 'The Trickster\'s Tale',
  description: 'A clever protagonist uses wit to outsmart a more powerful opponent',
  category: 'folktale',
  difficulty: 'beginner',
  basedOn: 'Anansi the Spider / Tortoise stories',
  estimatedDuration: '5-10 minutes',
  
  defaults: {
    protagonist: 'Clever Tortoise',
    antagonist: 'Proud King',
    setting: 'Ancient African Kingdom',
    moral: 'Wisdom triumphs over strength and pride'
  },
  
  outline: `{{protagonist}} and the {{antagonist}}'s Challenge`,
  
  structure: {
    act1: {
      description: 'Introduction and Challenge',
      beats: [
        'Establish the kingdom and {{antagonist}}\'s pride',
        '{{antagonist}} declares challenge',
        '{{protagonist}} accepts despite seeming disadvantage'
      ]
    },
    act2: {
      description: 'Three Tests',
      beats: [
        'Test 1: {{protagonist}} uses intelligence',
        'Test 2: {{protagonist}} shows patience',
        'Test 3: {{protagonist}} teaches lesson'
      ]
    },
    act3: {
      description: 'Resolution and Moral',
      beats: [
        '{{antagonist}} learns humility',
        '{{protagonist}} becomes advisor',
        'Kingdom celebrates wisdom'
      ]
    },
    scenes: [
      {
        sceneNumber: 1,
        heading: 'EXT. PALACE COURTYARD - MORNING',
        purpose: 'Establish setting and introduce {{antagonist}}',
        keyMoments: [
          '{{antagonist}} makes proclamation',
          'Crowd reacts',
          '{{protagonist}} observes'
        ]
      },
      {
        sceneNumber: 2,
        heading: 'EXT. VILLAGE SQUARE - DAY',
        purpose: '{{protagonist}} accepts challenge',
        keyMoments: [
          '{{protagonist}} steps forward',
          '{{antagonist}} mocks {{protagonist}}',
          'Stakes are set'
        ]
      },
      {
        sceneNumber: 3,
        heading: 'INT. THRONE ROOM - DAY',
        purpose: 'First test (riddle)',
        keyMoments: [
          '{{protagonist}} poses riddle',
          '{{antagonist}} struggles',
          '{{protagonist}} reveals answer'
        ]
      },
      {
        sceneNumber: 4,
        heading: 'EXT. RIVER - MIDDAY',
        purpose: 'Second test (impossible task)',
        keyMoments: [
          '{{antagonist}} sets impossible task',
          '{{protagonist}} finds clever solution',
          '{{antagonist}} reluctantly admits defeat'
        ]
      },
      {
        sceneNumber: 5,
        heading: 'INT. PALACE - EVENING',
        purpose: 'Third test and lesson',
        keyMoments: [
          '{{antagonist}} desperate for final test',
          '{{protagonist}} tells story',
          '{{antagonist}} kneels and learns humility'
        ]
      },
      {
        sceneNumber: 6,
        heading: 'EXT. PALACE - SUNSET',
        purpose: 'Celebration and resolution',
        keyMoments: [
          '{{antagonist}} makes {{protagonist}} advisor',
          'Kingdom celebrates',
          'Moral lesson shared'
        ]
      },
      {
        sceneNumber: 7,
        heading: 'EXT. VILLAGE SQUARE - MONTHS LATER',
        purpose: 'Epilogue',
        keyMoments: [
          'Show kingdom thriving',
          '{{protagonist}} and {{antagonist}} as friends',
          'Final message to audience'
        ]
      }
    ]
  },
  
  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Tortoise',
      personalityTraits: ['clever', 'humble', 'patient', 'wise'],
      voiceTone: 'warm, grandfatherly'
    },
    {
      role: 'antagonist',
      species: 'Human (King)',
      personalityTraits: ['proud', 'loud', 'dramatic', 'learns humility'],
      voiceTone: 'deep, booming'
    },
    {
      role: 'supporting',
      species: 'Human (Wise Advisor)',
      personalityTraits: ['patient', 'observant', 'supportive'],
      voiceTone: 'calm, motherly'
    },
    {
      role: 'supporting',
      species: 'Rabbit (Friend)',
      personalityTraits: ['energetic', 'loyal', 'doubting'],
      voiceTone: 'fast-talking, enthusiastic'
    }
  ],
  
  characterTemplate: `{
    "name": "{{characterName}}",
    "role": "{{role}}",
    "species": "{{species}}",
    "personality": {{json personalityTraits}},
    "voiceProfile": {
      "tone": "{{voiceTone}}",
      "accent": "{{language}} accent"
    }
  }`,
  
  sceneTemplate: `SCENE {{sceneNumber}}: {{heading}}
  
PURPOSE: {{purpose}}

{{#each keyMoments}}
- {{this}}
{{/each}}`,
  
  dialogueSamples: {
    pidgin: {
      protagonist_intro:Continue3:43 AM"My pikin, sometimes the smallest person fit teach the biggest person big lesson. Na wisdom wey dey matter, no be size.",
antagonist_boast: "Make una hear me well well! I be the wisest king for this land!",
moral: "Remember o - no matter how small you be, you fit make big difference!"
},
yoruba: {
protagonist_intro: "Ọmọ mi, àìmọ̀ kan kò ju àìmọ̀ méjì lọ. (My child, ignorance cannot teach ignorance.)",
antagonist_boast: "Ẹ gbọ́ tèmi dáadáa! Èmi ni ọba tó mọ̀ jù lọ! (Listen to me well! I am the wisest king!)"
}
}
};

---

### **templates/index.js**
```javascript
const tricksterTale = require('./tricksterTale');
const heroJourney = require('./heroJourney');
const loveStory = require('./loveStory');

module.exports = {
  trickster_tale: tricksterTale,
  hero_journey: heroJourney,
  love_story: loveStory
  // Add more templates here
};
```

---

### **templates/heroJourney.js**
```javascript
module.exports = {
  id: 'hero_journey',
  name: 'The Hero\'s Journey (African Context)',
  description: 'Classic hero\'s journey adapted for Nigerian storytelling',
  category: 'adventure',
  difficulty: 'intermediate',
  basedOn: 'Joseph Campbell + African folklore',
  estimatedDuration: '15-20 minutes',
  
  defaults: {
    hero: 'Young Warrior',
    mentor: 'Village Elder',
    villain: 'Dark Spirit',
    setting: 'Mystical African Village',
    moral: 'Courage and self-belief overcome any obstacle'
  },
  
  structure: {
    act1: {
      description: 'Ordinary World & Call to Adventure',
      beats: [
        'Introduce hero in ordinary life',
        'Disturbance/threat to village',
        'Hero initially refuses call',
        'Mentor appears and encourages hero'
      ]
    },
    act2: {
      description: 'Trials and Transformation',
      beats: [
        'Hero leaves village',
        'Faces first challenge',
        'Meets allies',
        'Faces major setback',
        'Discovers inner strength'
      ]
    },
    act3: {
      description: 'Climax and Return',
      beats: [
        'Final confrontation with villain',
        'Hero uses learned lessons',
        'Victory and transformation',
        'Return to village as changed person'
      ]
    }
  },
  
  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Human',
      personalityTraits: ['brave', 'uncertain', 'growing', 'determined'],
      voiceTone: 'young, earnest, evolving confidence'
    },
    {
      role: 'mentor',
      species: 'Human (Elder)',
      personalityTraits: ['wise', 'patient', 'mystical', 'caring'],
      voiceTone: 'aged, knowing, gentle'
    },
    {
      role: 'antagonist',
      species: 'Spirit/Supernatural',
      personalityTraits: ['menacing', 'powerful', 'ancient'],
      voiceTone: 'deep, echoing, ominous'
    }
  ]
};
```

---

### **templates/loveStory.js**
```javascript
module.exports = {
  id: 'love_story',
  name: 'Lagos Love Story',
  description: 'Modern Nigerian romance in urban setting',
  category: 'romance',
  difficulty: 'intermediate',
  basedOn: 'Contemporary Nollywood romance',
  estimatedDuration: '10-15 minutes',
  
  defaults: {
    lead1: 'Career-Focused Woman',
    lead2: 'Charming Entrepreneur',
    setting: 'Lagos (VI, Lekki, Ikeja)',
    obstacle: 'Family Expectations',
    moral: 'True love requires compromise and understanding'
  },
  
  structure: {
    act1: {
      description: 'Meet-Cute',
      beats: [
        'Introduce lead1 in daily life',
        'Introduce lead2 in daily life',
        'Unexpected meeting',
        'Initial attraction despite differences'
      ]
    },
    act2: {
      description: 'Romance & Conflict',
      beats: [
        'Growing relationship',
        'Family/societal pressure',
        'Misunderstanding/conflict',
        'Temporary separation'
      ]
    },
    act3: {
      description: 'Resolution',
      beats: [
        'Realization of true feelings',
        'Grand gesture',
        'Overcoming obstacles together',
        'Happy ending'
      ]
    }
  },
  
  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Human',
      personalityTraits: ['ambitious', 'independent', 'guarded', 'passionate'],
      voiceTone: 'confident, modern Nigerian accent'
    },
    {
      role: 'love_interest',
      species: 'Human',
      personalityTraits: ['charming', 'persistent', 'sincere', 'humorous'],
      voiceTone: 'warm, playful, Lagos accent'
    }
  ]
};
```

---

## **6. MAIN GENERATION SERVICE**

### **services/storyGenerationService.js**
```javascript
const groqService = require('./groqService');
const templateEngine = require('./templateEngine');
const cachingService = require('./cachingService');
const logger = require('../utils/logger');
const { COSTS, TOKEN_ESTIMATES } = require('../config/constants');

class StoryGenerationService {
  
  /**
   * Main story generation orchestrator
   */
  async generateStory(userInput, options = {}) {
    const startTime = Date.now();
    logger.info('🎬 Starting story generation...', { userInput });
    
    try {
      let totalCost = 0;
      let totalTokens = 0;
      const generationSteps = [];
      
      // Step 1: Check if we can use template (80% faster, 95% cheaper)
      const useTemplate = this.shouldUseTemplate(userInput);
      
      if (useTemplate && templateEngine.hasTemplate(userInput.storyType)) {
        logger.info('📋 Using template-based generation');
        return await this.generateFromTemplate(userInput);
      }
      
      // Step 2: Generate outline (fast model)
      logger.info('📝 Step 1/5: Generating outline...');
      const outline = await groqService.generateOutline(userInput);
      totalCost += outline.cost?.ngn || 0;
      totalTokens += outline.usage?.totalTokens || 0;
      generationSteps.push({ step: 'outline', tokens: outline.usage?.totalTokens, cost: outline.cost?.ngn });
      
      // Step 3: Check cache for similar characters
      logger.info('👥 Step 2/5: Generating characters...');
      const characters = await this.generateCharactersWithCache(outline, userInput);
      if (characters.cost) {
        totalCost += characters.cost;
        totalTokens += characters.tokens;
        generationSteps.push({ step: 'characters', tokens: characters.tokens, cost: characters.cost });
      }
      
      // Step 4: Generate script
      logger.info('🎬 Step 3/5: Writing screenplay...');
      const scriptResult = await groqService.generateScript(outline, characters.data, userInput);
      totalCost += scriptResult.cost?.ngn || 0;
      totalTokens += scriptResult.usage?.totalTokens || 0;
      generationSteps.push({ step: 'script', tokens: scriptResult.usage?.totalTokens, cost: scriptResult.cost?.ngn });
      
      // Step 5: Generate production notes (cached if possible)
      logger.info('🎨 Step 4/5: Creating production notes...');
      const productionNotes = await this.getProductionNotesWithCache(userInput);
      if (productionNotes.cost) {
        totalCost += productionNotes.cost;
        totalTokens += productionNotes.tokens;
      }
      
      // Step 6: (Optional) Premium polish with GPT-4 Mini
      let polishedDialogue = null;
      if (options.premiumPolish && userInput.tier === 'professional') {
        logger.info('✨ Step 5/5: Premium dialogue polish...');
        // Implement GPT-4 Mini polish here if needed
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const story = {
        title: outline.title,
        type: userInput.storyType,
        metadata: {
          language: userInput.language,
          duration: userInput.duration,
          animationStyle: userInput.animationStyle,
          targetAudience: userInput.targetAudience
        },
        overview: {
          logline: outline.logline,
          synopsis: outline.synopsis,
          moral: userInput.advancedOptions?.moral || 'Wisdom and perseverance lead to success'
        },
        characters: characters.data,
        script: scriptResult.content,
        productionNotes: productionNotes.data,
        generation: {
          totalTokens,
          totalCost: totalCost.toFixed(2),
          duration,
          steps: generationSteps,
          model: 'groq-llama-3.1-70b',
          useTemplate: false
        }
      };
      
      // Cache the complete story
      const cacheKey = cachingService.generateCacheKey('story', userInput);
      await cachingService.set(cacheKey, story);
      
      logger.info(`✅ Story generation complete in ${duration}ms - Cost: ₦${totalCost.toFixed(2)}`);
      
      return story;
      
    } catch (error) {
      logger.error('❌ Story generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Generate from template (fast + cheap)
   */
  async generateFromTemplate(userInput) {
    const startTime = Date.now();
    logger.info('📋 Template-based generation started');
    
    try {
      // Get template
      const template = templateEngine.getTemplate(userInput.storyType);
      
      if (!template) {
        throw new Error(`Template not found for: ${userInput.storyType}`);
      }
      
      // Fill template with user data
      const filledTemplate = await templateEngine.fillTemplate(userInput.storyType, {
        protagonist: userInput.protagonistName || template.defaults.protagonist,
        antagonist: userInput.antagonistName || template.defaults.antagonist,
        setting: userInput.culturalSetting || template.defaults.setting,
        language: userInput.language,
        characterName: userInput.protagonistName || template.defaults.protagonist
      });
      
      // Only use AI to customize dialogue and specific details
      logger.info('🤖 Customizing template with AI...');
      
      const customizationPrompt = `Customize this story for Nigerian ${userInput.language} audience:

Theme: ${userInput.theme}
Setting: ${userInput.culturalSetting}

Add authentic ${userInput.language} dialogue and cultural details to make it feel genuine.
Keep it brief - only provide the customized elements.`;

      const customization = await groqService.generateCompletion({
        prompt: customizationPrompt,
        model: require('../config/groq').MODELS.FAST_SMALL,
        maxTokens: 1000
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const story = {
        title: filledTemplate.title,
        type: userInput.storyType,
        metadata: {
          language: userInput.language,
          duration: userInput.duration,
          animationStyle: userInput.animationStyle,
          targetAudience: userInput.targetAudience
        },
        overview: {
          logline: `A ${template.description.toLowerCase()}`,
          synopsis: template.structure.act1.description + ' ' + template.structure.act2.description + ' ' + template.structure.act3.description,
          moral: userInput.advancedOptions?.moral || template.defaults.moral
        },
        characters: filledTemplate.characters,
        script: {
          format: 'screenplay',
          totalScenes: filledTemplate.scenes.length,
          scenes: filledTemplate.scenes
        },
        productionNotes: await this.getProductionNotesWithCache(userInput),
        generation: {
          totalTokens: customization.usage?.totalTokens || 0,
          totalCost: (customization.cost?.ngn || 0).toFixed(2),
          duration,
          model: 'template + groq-llama-8b',
          usedTemplate: true,
          templateName: template.name
        }
      };
      
      logger.info(`✅ Template story generated in ${duration}ms - Cost: ₦${story.generation.totalCost}`);
      
      return story;
      
    } catch (error) {
      logger.error('❌ Template generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Generate characters with caching
   */
  async generateCharactersWithCache(outline, userInput) {
    const characters = [];
    let totalCost = 0;
    let totalTokens = 0;
    
    for (const characterName of outline.characterNames) {
      // Check cache for similar character archetype
      const archetypeKey = this.identifyArchetype(characterName, outline.synopsis);
      const cachedArchetype = await cachingService.getCachedArchetype(archetypeKey);
      
      if (cachedArchetype) {
        logger.info(`✅ Using cached archetype: ${archetypeKey}`);
        characters.push({
          ...cachedArchetype,
          name: characterName // Personalize name
        });
      } else {
        // Generate new character
        const generated = await groqService.generateCharacters(
          { ...outline, characterNames: [characterName] },
          userInput
        );
        
        if (generated.length > 0) {
          characters.push(generated[0]);
          
          // Cache for future use
          await cachingService.cacheArchetype(archetypeKey, generated[0]);
          
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
  
  /**
   * Get production notes with caching
   */
  async getProductionNotesWithCache(userInput) {
    const cacheKey = `production:${userInput.animationStyle}`;
    const cached = await cachingService.get(cacheKey);
    
    if (cached) {
      logger.info('✅ Using cached production notes');
      return { data: cached, cost: 0, tokens: 0 };
    }
    
    const result = await groqService.generateProductionNotes(userInput);
    await cachingService.set(cacheKey, result.content, require('../config/redis').CACHE_TTL.PRODUCTION_NOTES);
    
    return {
      data: result.content,
      cost: result.cost?.ngn || 0,
      tokens: result.usage?.totalTokens || 0
    };
  }
  
  /**
   * Determine if template should be used
   */
  shouldUseTemplate(userInput) {
    // Use template if:
    // 1. User explicitly selected template
    // 2. Story type has template available
    // 3. User is on free/creator tier (to save costs)
    
    if (userInput.templateId) return true;
    if (userInput.tier === 'free' || userInput.tier === 'creator') return true;
    if (!userInput.theme || userInput.theme.length < 20) return true; // Generic request
    
    return false;
  }
  
  /**
   * Identify character archetype for caching
   */
  identifyArchetype(name, synopsis) {
    const lowerName = name.toLowerCase();
    const lowerSynopsis = synopsis.toLowerCase();
    
    // Simple archetype detection (can be enhanced with ML)
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
  
  /**
   * Calculate estimated cost before generation
   */
  calculateEstimatedCost(userInput) {
    const tokenEstimate = TOKEN_ESTIMATES[`${userInput.duration <= 5 ? 'QUICK' : userInput.duration <= 10 ? 'STANDARD' : userInput.duration <= 20 ? 'PREMIUM' : 'FEATURE'}_STORY`] || 18000;
    
    const costPerToken = COSTS.GROQ_PER_1K_TOKENS / 1000;
    const estimatedCost = tokenEstimate * costPerToken;
    
    return {
      tokens: tokenEstimate,
      cost: estimatedCost.toFixed(2),
      currency: 'NGN'
    };
  }
  
}

module.exports = new StoryGenerationService();
```

---
🚀 COMPLETE GROQ INTEGRATION + TEMPLATE SYSTEM IMPLEMENTATION
I'll build the entire production-ready system with Groq API, template engine, caching, and optimizations.

📦 PROJECT STRUCTURE
naijagpt-storyteller/
├── server/
│   ├── config/
│   │   ├── groq.js
│   │   ├── redis.js
│   │   └── constants.js
│   ├── services/
│   │   ├── groqService.js
│   │   ├── templateEngine.js
│   │   ├── storyGenerationService.js
│   │   ├── cachingService.js
│   │   └── optimizationService.js
│   ├── models/
│   │   ├── Story.js
│   │   ├── Template.js
│   │   └── CachedElement.js
│   ├── controllers/
│   │   └── storytellerController.js
│   ├── routes/
│   │   └── storyteller.js
│   ├── templates/
│   │   ├── tricksterTale.js
│   │   ├── heroJourney.js
│   │   ├── loveStory.js
│   │   └── index.js
│   ├── utils/
│   │   ├── tokenCounter.js
│   │   └── logger.js
│   └── jobs/
│       └── storyGenerationJob.js
└── package.json

1. PACKAGE.JSON
json{
  "name": "naijagpt-storyteller",
  "version": "1.0.0",
  "description": "AI-Powered Nigerian Storytelling Platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.3",
    "groq-sdk": "^0.3.1",
    "redis": "^4.6.10",
    "ioredis": "^5.3.2",
    "bull": "^4.11.5",
    "dotenv": "^16.3.1",
    "joi": "^17.11.0",
    "winston": "^3.11.0",
    "tiktoken": "^1.0.10",
    "handlebars": "^4.7.8",
    "lodash": "^4.17.21",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0"
  }
}

2. ENVIRONMENT VARIABLES (.env)
bash# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/naijagpt
REDIS_URL=redis://localhost:6379

# Groq API
GROQ_API_KEY=gsk_your_groq_api_key_here

# OpenAI (for premium polish only)
OPENAI_API_KEY=sk_your_openai_key_here

# Costs (for tracking)
GROQ_COST_PER_1K_TOKENS=0.00059
OPENAI_GPT4_MINI_INPUT_COST=0.00015
OPENAI_GPT4_MINI_OUTPUT_COST=0.00060

# Feature Flags
ENABLE_CACHING=true
ENABLE_TEMPLATES=true
ENABLE_BATCH_PROCESSING=true

3. CONFIG FILES
config/groq.js
javascriptconst Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Model configurations
const MODELS = {
  FAST_SMALL: 'llama-3.1-8b-instant',      // For outlines, quick tasks
  STANDARD: 'llama-3.1-70b-versatile',     // Main story generation
  LARGE: 'llama-3.2-90b-text-preview'      // Premium quality (if needed)
};

// Default generation parameters
const DEFAULT_PARAMS = {
  temperature: 0.8,        // Creative but controlled
  max_tokens: 4096,        // Maximum per call
  top_p: 0.9,
  frequency_penalty: 0.3,  // Reduce repetition
  presence_penalty: 0.1
};

module.exports = {
  groq,
  MODELS,
  DEFAULT_PARAMS
};

config/redis.js
javascriptconst Redis = require('ioredis');
const logger = require('../utils/logger');

const redis = new Redis(process.env.REDIS_URL, {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3
});

redis.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  logger.error('❌ Redis error:', err);
});

// Cache TTL configurations (in seconds)
const CACHE_TTL = {
  TEMPLATE: 60 * 60 * 24 * 30,     // 30 days (rarely changes)
  SETTING: 60 * 60 * 24 * 7,       // 7 days
  CHARACTER_ARCHETYPE: 60 * 60 * 24 * 7,
  PRODUCTION_NOTES: 60 * 60 * 24 * 30,
  STORY_OUTLINE: 60 * 60,          // 1 hour (user-specific)
  FULL_STORY: 60 * 60 * 24         // 24 hours
};

module.exports = {
  redis,
  CACHE_TTL
};

config/constants.js
javascriptmodule.exports = {
  // Story types
  STORY_TYPES: {
    FOLKTALE: 'folktale',
    MODERN_NIGERIAN: 'modern_nigerian',
    CHILDREN: 'children',
    MARKETING: 'marketing',
    FILM: 'film',
    ANIMATION: 'animation_script'
  },

  // Languages
  LANGUAGES: {
    PIDGIN: 'pidgin',
    YORUBA: 'yoruba',
    IGBO: 'igbo',
    HAUSA: 'hausa',
    ENGLISH: 'english',
    BILINGUAL: 'bilingual'
  },

  // Animation styles
  ANIMATION_STYLES: {
    PIXAR_3D: 'pixar_3d',
    DISNEY_2D: 'disney_2d',
    ANIME: 'anime',
    AFRICAN_ART: 'african_art',
    REALISTIC: 'realistic',
    STOP_MOTION: 'stop_motion'
  },

  // Cultural settings
  CULTURAL_SETTINGS: {
    TRADITIONAL_VILLAGE: 'traditional_village',
    ANCIENT_KINGDOM: 'ancient_kingdom',
    MODERN_LAGOS: 'modern_lagos',
    UNIVERSITY_CAMPUS: 'university_campus',
    MARKETPLACE: 'marketplace',
    FANTASY_REALM: 'fantasy_realm'
  },

  // Generation costs (Naira)
  COSTS: {
    GROQ_PER_1K_TOKENS: 0.885,           // ₦0.885 per 1K tokens
    GPT4_MINI_INPUT_PER_1K: 0.225,       // ₦0.225 per 1K
    GPT4_MINI_OUTPUT_PER_1K: 0.90,       // ₦0.90 per 1K
    STORAGE_PER_MB: 0.05                  // S3/R2 storage
  },

  // Pricing tiers
  PRICING: {
    QUICK_STORY: 500,        // ₦500 (3-5 min)
    STANDARD_STORY: 1500,    // ₦1,500 (10 min)
    PREMIUM_STORY: 2500,     // ₦2,500 (10 min, polished)
    FEATURE_STORY: 5000      // ₦5,000 (30 min)
  },

  // Token estimates
  TOKEN_ESTIMATES: {
    QUICK_STORY: 8000,
    STANDARD_STORY: 18000,
    PREMIUM_STORY: 18000,
    FEATURE_STORY: 45000
  }
};

4. CORE SERVICES
services/groqService.js
javascriptconst { groq, MODELS, DEFAULT_PARAMS } = require('../config/groq');
const logger = require('../utils/logger');
const { countTokens } = require('../utils/tokenCounter');

class GroqService {
  
  /**
   * Generate completion using Groq API
   */
  async generateCompletion({
    prompt,
    systemPrompt = '',
    model = MODELS.STANDARD,
    temperature = DEFAULT_PARAMS.temperature,
    maxTokens = DEFAULT_PARAMS.max_tokens,
    options = {}
  }) {
    try {
      const startTime = Date.now();
      
      const messages = [];
      
      if (systemPrompt) {
        messages.push({
          role: 'system',
          content: systemPrompt
        });
      }
      
      messages.push({
        role: 'user',
        content: prompt
      });
      
      logger.info(`🤖 Groq API Call - Model: ${model}`);
      
      const completion = await groq.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        top_p: options.top_p || DEFAULT_PARAMS.top_p,
        frequency_penalty: options.frequency_penalty || DEFAULT_PARAMS.frequency_penalty,
        presence_penalty: options.presence_penalty || DEFAULT_PARAMS.presence_penalty
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const result = {
        content: completion.choices[0].message.content,
        usage: {
          promptTokens: completion.usage.prompt_tokens,
          completionTokens: completion.usage.completion_tokens,
          totalTokens: completion.usage.total_tokens
        },
        model: completion.model,
        duration,
        finishReason: completion.choices[0].finish_reason
      };
      
      // Calculate cost
      const costPerToken = parseFloat(process.env.GROQ_COST_PER_1K_TOKENS);
      result.cost = {
        usd: (result.usage.totalTokens / 1000) * costPerToken,
        ngn: (result.usage.totalTokens / 1000) * costPerToken * 1500 // USD to NGN
      };
      
      logger.info(`✅ Groq completed in ${duration}ms - Tokens: ${result.usage.totalTokens} - Cost: ₦${result.cost.ngn.toFixed(2)}`);
      
      return result;
      
    } catch (error) {
      logger.error('❌ Groq API Error:', error);
      throw new Error(`Groq generation failed: ${error.message}`);
    }
  }
  
  /**
   * Generate story outline (fast, cheap)
   */
  async generateOutline(userInput) {
    const systemPrompt = `You are an expert Nigerian storyteller. Create concise story outlines.`;
    
    const prompt = `Create a story outline for:
    
Type: ${userInput.storyType}
Theme: ${userInput.theme}
Duration: ${userInput.duration} minutes
Language: ${userInput.language}

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
      model: MODELS.FAST_SMALL,  // Use cheaper model for outlines
      maxTokens: 1000,
      temperature: 0.7
    });
    
    try {
      // Parse JSON response
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      logger.error('Failed to parse outline JSON:', error);
      // Return structured error
      return {
        title: 'Parsing Error',
        error: error.message,
        rawContent: result.content
      };
    }
  }
  
  /**
   * Generate character profiles
   */
  async generateCharacters(outline, userInput) {
    const systemPrompt = `You are an expert character designer for ${userInput.animationStyle} animation. Create detailed, culturally authentic Nigerian characters.`;
    
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
      model: MODELS.STANDARD,  // Use standard model for quality
      maxTokens: 3000,
      temperature: 0.8
    });
    
    try {
      const jsonMatch = result.content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON array found');
      }
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      logger.error('Failed to parse characters JSON:', error);
      return [];
    }
  }
  
  /**
   * Generate full script
   */
  async generateScript(outline, characters, userInput) {
    const systemPrompt = `You are an expert Nigerian screenwriter. Write screenplays in proper format with authentic ${userInput.language} dialogue.`;
    
    const characterList = characters.map(c => `${c.name} (${c.role})`).join(', ');
    
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

Make it ${Math.ceil(userInput.duration / 2)} scenes.`;

    const result = await this.generateCompletion({
      prompt,
      systemPrompt,
      model: MODELS.STANDARD,
      maxTokens: 4096,  // Maximum for detailed script
      temperature: 0.85
    });
    
    return this.parseScript(result.content);
  }
  
  /**
   * Parse screenplay into structured format
   */
  parseScript(rawScript) {
    const scenes = [];
    const scenePattern = /(INT\.|EXT\.)\s+([A-Z\s]+)\s+-\s+([A-Z\s]+)/g;
    
    let match;
    let currentIndex = 0;
    
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
      
      if (!nextMatch) break;
    }
    
    return {
      format: 'screenplay',
      totalScenes: scenes.length,
      scenes,
      rawScript
    };
  }
  
  /**
   * Generate production notes
   */
  async generateProductionNotes(userInput) {
    const systemPrompt = `You are a film production expert specializing in ${userInput.animationStyle} animation.`;
    
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
    
    try {
      const jsonMatch = result.content.match(/\{[\s\S]*\}/);
      return jsonMatch ? JSON.parse(jsonMatch[0]) : { rawNotes: result.content };
    } catch (error) {
      return { rawNotes: result.content };
    }
  }
  
}

module.exports = new GroqService();

services/cachingService.js
javascriptconst { redis, CACHE_TTL } = require('../config/redis');
const logger = require('../utils/logger');
const crypto = require('crypto');

class CachingService {
  
  /**
   * Generate cache key from input parameters
   */
  generateCacheKey(prefix, params) {
    const paramsString = JSON.stringify(params);
    const hash = crypto.createHash('md5').update(paramsString).digest('hex');
    return `${prefix}:${hash}`;
  }
  
  /**
   * Get from cache
   */
  async get(key) {
    try {
      const cached = await redis.get(key);
      if (cached) {
        logger.info(`✅ Cache HIT: ${key}`);
        return JSON.parse(cached);
      }
      logger.info(`❌ Cache MISS: ${key}`);
      return null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }
  
  /**
   * Set to cache
   */
  async set(key, value, ttl = CACHE_TTL.FULL_STORY) {
    try {
      await redis.setex(key, ttl, JSON.stringify(value));
      logger.info(`💾 Cached: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }
  
  /**
   * Delete from cache
   */
  async del(key) {
    try {
      await redis.del(key);
      logger.info(`🗑️ Deleted cache: ${key}`);
      return true;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  }
  
  /**
   * Get cached setting (village, marketplace, etc.)
   */
  async getCachedSetting(settingType) {
    const key = `setting:${settingType}`;
    return await this.get(key);
  }
  
  /**
   * Cache setting
   */
  async cacheSetting(settingType, settingData) {
    const key = `setting:${settingType}`;
    return await this.set(key, settingData, CACHE_TTL.SETTING);
  }
  
  /**
   * Get cached character archetype
   */
  async getCachedArchetype(archetypeType) {
    const key = `archetype:${archetypeType}`;
    return await this.get(key);
  }
  
  /**
   * Cache character archetype
   */
  async cacheArchetype(archetypeType, archetypeData) {
    const key = `archetype:${archetypeType}`;
    return await this.set(key, archetypeData, CACHE_TTL.CHARACTER_ARCHETYPE);
  }
  
  /**
   * Get cache statistics
   */
  async getStats() {
    try {
      const info = await redis.info('stats');
      const lines = info.split('\r\n');
      const stats = {};
      
      lines.forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          stats[key] = value;
        }
      });
      
      return {
        hits: parseInt(stats.keyspace_hits) || 0,
        misses: parseInt(stats.keyspace_misses) || 0,
        hitRate: stats.keyspace_hits && stats.keyspace_misses 
          ? (parseInt(stats.keyspace_hits) / (parseInt(stats.keyspace_hits) + parseInt(stats.keyspace_misses)) * 100).toFixed(2) + '%'
          : '0%'
      };
    } catch (error) {
      logger.error('Failed to get cache stats:', error);
      return null;
    }
  }
  
}

module.exports = new CachingService();

services/templateEngine.js
javascriptconst Handlebars = require('handlebars');
const logger = require('../utils/logger');
const templates = require('../templates');

class TemplateEngine {
  
  constructor() {
    this.templates = templates;
    this.compiledTemplates = {};
    this.compileAllTemplates();
  }
  
  /**
   * Compile all templates on startup
   */
  compileAllTemplates() {
    Object.keys(this.templates).forEach(templateName => {
      const template = this.templates[templateName];
      
      // Compile Handlebars templates
      if (template.outline) {
        this.compiledTemplates[`${templateName}_outline`] = Handlebars.compile(template.outline);
      }
      if (template.characterTemplate) {
        this.compiledTemplates[`${templateName}_character`] = Handlebars.compile(template.characterTemplate);
      }
      if (template.sceneTemplate) {
        this.compiledTemplates[`${templateName}_scene`] = Handlebars.compile(template.sceneTemplate);
      }
      
      logger.info(`✅ Compiled template: ${templateName}`);
    });
  }
  
  /**
   * Check if template exists for story type
   */
  hasTemplate(storyType) {
    return !!this.templates[storyType];
  }
  
  /**
   * Get template structure
   */
  getTemplate(storyType) {
    return this.templates[storyType] || null;
  }
  
  /**
   * Fill template with user data
   */
  async fillTemplate(templateName, userData) {
    const template = this.templates[templateName];
    
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }
    
    logger.info(`📝 Filling template: ${templateName}`);
    
    // Create context for Handlebars
    const context = {
      ...userData,
      ...template.defaults
    };
    
    const filled = {
      title: this.compiledTemplates[`${templateName}_outline`] 
        ? this.compiledTemplates[`${templateName}_outline`](context)
        : template.title,
      
      structure: template.structure,
      
      characters: template.characterArchetypes.map((archetype, index) => {
        const charContext = { ...context, characterIndex: index, ...archetype };
        return this.compiledTemplates[`${templateName}_character`]
          ? JSON.parse(this.compiledTemplates[`${templateName}_character`](charContext))
          : archetype;
      }),
      
      scenes: template.structure.scenes.map((scene, index) => {
        const sceneContext = { ...context, sceneIndex: index, ...scene };
        return this.compiledTemplates[`${templateName}_scene`]
          ? this.compiledTemplates[`${templateName}_scene`](sceneContext)
          : scene;
      })
    };
    
    return filled;
  }
  
  /**
   * Get all available templates
   */
  getAvailableTemplates() {
    return Object.keys(this.templates).map(key => ({
      id: key,
      name: this.templates[key].name,
      description: this.templates[key].description,
      category: this.templates[key].category,
      estimatedDuration: this.templates[key].estimatedDuration,
      difficulty: this.templates[key].difficulty
    }));
  }
  
}

module.exports = new TemplateEngine();

5. STORY TEMPLATES
templates/tricksterTale.js
javascriptmodule.exports = {
  id: 'trickster_tale',
  name: 'The Trickster\'s Tale',
  description: 'A clever protagonist uses wit to outsmart a more powerful opponent',
  category: 'folktale',
  difficulty: 'beginner',
  basedOn: 'Anansi the Spider / Tortoise stories',
  estimatedDuration: '5-10 minutes',
  
  defaults: {
    protagonist: 'Clever Tortoise',
    antagonist: 'Proud King',
    setting: 'Ancient African Kingdom',
    moral: 'Wisdom triumphs over strength and pride'
  },
  
  outline: `{{protagonist}} and the {{antagonist}}'s Challenge`,
  
  structure: {
    act1: {
      description: 'Introduction and Challenge',
      beats: [
        'Establish the kingdom and {{antagonist}}\'s pride',
        '{{antagonist}} declares challenge',
        '{{protagonist}} accepts despite seeming disadvantage'
      ]
    },
    act2: {
      description: 'Three Tests',
      beats: [
        'Test 1: {{protagonist}} uses intelligence',
        'Test 2: {{protagonist}} shows patience',
        'Test 3: {{protagonist}} teaches lesson'
      ]
    },
    act3: {
      description: 'Resolution and Moral',
      beats: [
        '{{antagonist}} learns humility',
        '{{protagonist}} becomes advisor',
        'Kingdom celebrates wisdom'
      ]
    },
    scenes: [
      {
        sceneNumber: 1,
        heading: 'EXT. PALACE COURTYARD - MORNING',
        purpose: 'Establish setting and introduce {{antagonist}}',
        keyMoments: [
          '{{antagonist}} makes proclamation',
          'Crowd reacts',
          '{{protagonist}} observes'
        ]
      },
      {
        sceneNumber: 2,
        heading: 'EXT. VILLAGE SQUARE - DAY',
        purpose: '{{protagonist}} accepts challenge',
        keyMoments: [
          '{{protagonist}} steps forward',
          '{{antagonist}} mocks {{protagonist}}',
          'Stakes are set'
        ]
      },
      {
        sceneNumber: 3,
        heading: 'INT. THRONE ROOM - DAY',
        purpose: 'First test (riddle)',
        keyMoments: [
          '{{protagonist}} poses riddle',
          '{{antagonist}} struggles',
          '{{protagonist}} reveals answer'
        ]
      },
      {
        sceneNumber: 4,
        heading: 'EXT. RIVER - MIDDAY',
        purpose: 'Second test (impossible task)',
        keyMoments: [
          '{{antagonist}} sets impossible task',
          '{{protagonist}} finds clever solution',
          '{{antagonist}} reluctantly admits defeat'
        ]
      },
      {
        sceneNumber: 5,
        heading: 'INT. PALACE - EVENING',
        purpose: 'Third test and lesson',
        keyMoments: [
          '{{antagonist}} desperate for final test',
          '{{protagonist}} tells story',
          '{{antagonist}} kneels and learns humility'
        ]
      },
      {
        sceneNumber: 6,
        heading: 'EXT. PALACE - SUNSET',
        purpose: 'Celebration and resolution',
        keyMoments: [
          '{{antagonist}} makes {{protagonist}} advisor',
          'Kingdom celebrates',
          'Moral lesson shared'
        ]
      },
      {
        sceneNumber: 7,
        heading: 'EXT. VILLAGE SQUARE - MONTHS LATER',
        purpose: 'Epilogue',
        keyMoments: [
          'Show kingdom thriving',
          '{{protagonist}} and {{antagonist}} as friends',
          'Final message to audience'
        ]
      }
    ]
  },
  
  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Tortoise',
      personalityTraits: ['clever', 'humble', 'patient', 'wise'],
      voiceTone: 'warm, grandfatherly'
    },
    {
      role: 'antagonist',
      species: 'Human (King)',
      personalityTraits: ['proud', 'loud', 'dramatic', 'learns humility'],
      voiceTone: 'deep, booming'
    },
    {
      role: 'supporting',
      species: 'Human (Wise Advisor)',
      personalityTraits: ['patient', 'observant', 'supportive'],
      voiceTone: 'calm, motherly'
    },
    {
      role: 'supporting',
      species: 'Rabbit (Friend)',
      personalityTraits: ['energetic', 'loyal', 'doubting'],
      voiceTone: 'fast-talking, enthusiastic'
    }
  ],
  
  characterTemplate: `{
    "name": "{{characterName}}",
    "role": "{{role}}",
    "species": "{{species}}",
    "personality": {{json personalityTraits}},
    "voiceProfile": {
      "tone": "{{voiceTone}}",
      "accent": "{{language}} accent"
    }
  }`,
  
  sceneTemplate: `SCENE {{sceneNumber}}: {{heading}}
  
PURPOSE: {{purpose}}

{{#each keyMoments}}
- {{this}}
{{/each}}`,
  
  dialogueSamples: {
    pidgin: {
      protagonist_intro:Continue3:43 AM"My pikin, sometimes the smallest person fit teach the biggest person big lesson. Na wisdom wey dey matter, no be size.",
antagonist_boast: "Make una hear me well well! I be the wisest king for this land!",
moral: "Remember o - no matter how small you be, you fit make big difference!"
},
yoruba: {
protagonist_intro: "Ọmọ mi, àìmọ̀ kan kò ju àìmọ̀ méjì lọ. (My child, ignorance cannot teach ignorance.)",
antagonist_boast: "Ẹ gbọ́ tèmi dáadáa! Èmi ni ọba tó mọ̀ jù lọ! (Listen to me well! I am the wisest king!)"
}
}
};

---

### **templates/index.js**
```javascript
const tricksterTale = require('./tricksterTale');
const heroJourney = require('./heroJourney');
const loveStory = require('./loveStory');

module.exports = {
  trickster_tale: tricksterTale,
  hero_journey: heroJourney,
  love_story: loveStory
  // Add more templates here
};
```

---

### **templates/heroJourney.js**
```javascript
module.exports = {
  id: 'hero_journey',
  name: 'The Hero\'s Journey (African Context)',
  description: 'Classic hero\'s journey adapted for Nigerian storytelling',
  category: 'adventure',
  difficulty: 'intermediate',
  basedOn: 'Joseph Campbell + African folklore',
  estimatedDuration: '15-20 minutes',
  
  defaults: {
    hero: 'Young Warrior',
    mentor: 'Village Elder',
    villain: 'Dark Spirit',
    setting: 'Mystical African Village',
    moral: 'Courage and self-belief overcome any obstacle'
  },
  
  structure: {
    act1: {
      description: 'Ordinary World & Call to Adventure',
      beats: [
        'Introduce hero in ordinary life',
        'Disturbance/threat to village',
        'Hero initially refuses call',
        'Mentor appears and encourages hero'
      ]
    },
    act2: {
      description: 'Trials and Transformation',
      beats: [
        'Hero leaves village',
        'Faces first challenge',
        'Meets allies',
        'Faces major setback',
        'Discovers inner strength'
      ]
    },
    act3: {
      description: 'Climax and Return',
      beats: [
        'Final confrontation with villain',
        'Hero uses learned lessons',
        'Victory and transformation',
        'Return to village as changed person'
      ]
    }
  },
  
  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Human',
      personalityTraits: ['brave', 'uncertain', 'growing', 'determined'],
      voiceTone: 'young, earnest, evolving confidence'
    },
    {
      role: 'mentor',
      species: 'Human (Elder)',
      personalityTraits: ['wise', 'patient', 'mystical', 'caring'],
      voiceTone: 'aged, knowing, gentle'
    },
    {
      role: 'antagonist',
      species: 'Spirit/Supernatural',
      personalityTraits: ['menacing', 'powerful', 'ancient'],
      voiceTone: 'deep, echoing, ominous'
    }
  ]
};
```

---

### **templates/loveStory.js**
```javascript
module.exports = {
  id: 'love_story',
  name: 'Lagos Love Story',
  description: 'Modern Nigerian romance in urban setting',
  category: 'romance',
  difficulty: 'intermediate',
  basedOn: 'Contemporary Nollywood romance',
  estimatedDuration: '10-15 minutes',
  
  defaults: {
    lead1: 'Career-Focused Woman',
    lead2: 'Charming Entrepreneur',
    setting: 'Lagos (VI, Lekki, Ikeja)',
    obstacle: 'Family Expectations',
    moral: 'True love requires compromise and understanding'
  },
  
  structure: {
    act1: {
      description: 'Meet-Cute',
      beats: [
        'Introduce lead1 in daily life',
        'Introduce lead2 in daily life',
        'Unexpected meeting',
        'Initial attraction despite differences'
      ]
    },
    act2: {
      description: 'Romance & Conflict',
      beats: [
        'Growing relationship',
        'Family/societal pressure',
        'Misunderstanding/conflict',
        'Temporary separation'
      ]
    },
    act3: {
      description: 'Resolution',
      beats: [
        'Realization of true feelings',
        'Grand gesture',
        'Overcoming obstacles together',
        'Happy ending'
      ]
    }
  },
  
  characterArchetypes: [
    {
      role: 'protagonist',
      species: 'Human',
      personalityTraits: ['ambitious', 'independent', 'guarded', 'passionate'],
      voiceTone: 'confident, modern Nigerian accent'
    },
    {
      role: 'love_interest',
      species: 'Human',
      personalityTraits: ['charming', 'persistent', 'sincere', 'humorous'],
      voiceTone: 'warm, playful, Lagos accent'
    }
  ]
};
```

---

## **6. MAIN GENERATION SERVICE**

### **services/storyGenerationService.js**
```javascript
const groqService = require('./groqService');
const templateEngine = require('./templateEngine');
const cachingService = require('./cachingService');
const logger = require('../utils/logger');
const { COSTS, TOKEN_ESTIMATES } = require('../config/constants');

class StoryGenerationService {
  
  /**
   * Main story generation orchestrator
   */
  async generateStory(userInput, options = {}) {
    const startTime = Date.now();
    logger.info('🎬 Starting story generation...', { userInput });
    
    try {
      let totalCost = 0;
      let totalTokens = 0;
      const generationSteps = [];
      
      // Step 1: Check if we can use template (80% faster, 95% cheaper)
      const useTemplate = this.shouldUseTemplate(userInput);
      
      if (useTemplate && templateEngine.hasTemplate(userInput.storyType)) {
        logger.info('📋 Using template-based generation');
        return await this.generateFromTemplate(userInput);
      }
      
      // Step 2: Generate outline (fast model)
      logger.info('📝 Step 1/5: Generating outline...');
      const outline = await groqService.generateOutline(userInput);
      totalCost += outline.cost?.ngn || 0;
      totalTokens += outline.usage?.totalTokens || 0;
      generationSteps.push({ step: 'outline', tokens: outline.usage?.totalTokens, cost: outline.cost?.ngn });
      
      // Step 3: Check cache for similar characters
      logger.info('👥 Step 2/5: Generating characters...');
      const characters = await this.generateCharactersWithCache(outline, userInput);
      if (characters.cost) {
        totalCost += characters.cost;
        totalTokens += characters.tokens;
        generationSteps.push({ step: 'characters', tokens: characters.tokens, cost: characters.cost });
      }
      
      // Step 4: Generate script
      logger.info('🎬 Step 3/5: Writing screenplay...');
      const scriptResult = await groqService.generateScript(outline, characters.data, userInput);
      totalCost += scriptResult.cost?.ngn || 0;
      totalTokens += scriptResult.usage?.totalTokens || 0;
      generationSteps.push({ step: 'script', tokens: scriptResult.usage?.totalTokens, cost: scriptResult.cost?.ngn });
      
      // Step 5: Generate production notes (cached if possible)
      logger.info('🎨 Step 4/5: Creating production notes...');
      const productionNotes = await this.getProductionNotesWithCache(userInput);
      if (productionNotes.cost) {
        totalCost += productionNotes.cost;
        totalTokens += productionNotes.tokens;
      }
      
      // Step 6: (Optional) Premium polish with GPT-4 Mini
      let polishedDialogue = null;
      if (options.premiumPolish && userInput.tier === 'professional') {
        logger.info('✨ Step 5/5: Premium dialogue polish...');
        // Implement GPT-4 Mini polish here if needed
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const story = {
        title: outline.title,
        type: userInput.storyType,
        metadata: {
          language: userInput.language,
          duration: userInput.duration,
          animationStyle: userInput.animationStyle,
          targetAudience: userInput.targetAudience
        },
        overview: {
          logline: outline.logline,
          synopsis: outline.synopsis,
          moral: userInput.advancedOptions?.moral || 'Wisdom and perseverance lead to success'
        },
        characters: characters.data,
        script: scriptResult.content,
        productionNotes: productionNotes.data,
        generation: {
          totalTokens,
          totalCost: totalCost.toFixed(2),
          duration,
          steps: generationSteps,
          model: 'groq-llama-3.1-70b',
          useTemplate: false
        }
      };
      
      // Cache the complete story
      const cacheKey = cachingService.generateCacheKey('story', userInput);
      await cachingService.set(cacheKey, story);
      
      logger.info(`✅ Story generation complete in ${duration}ms - Cost: ₦${totalCost.toFixed(2)}`);
      
      return story;
      
    } catch (error) {
      logger.error('❌ Story generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Generate from template (fast + cheap)
   */
  async generateFromTemplate(userInput) {
    const startTime = Date.now();
    logger.info('📋 Template-based generation started');
    
    try {
      // Get template
      const template = templateEngine.getTemplate(userInput.storyType);
      
      if (!template) {
        throw new Error(`Template not found for: ${userInput.storyType}`);
      }
      
      // Fill template with user data
      const filledTemplate = await templateEngine.fillTemplate(userInput.storyType, {
        protagonist: userInput.protagonistName || template.defaults.protagonist,
        antagonist: userInput.antagonistName || template.defaults.antagonist,
        setting: userInput.culturalSetting || template.defaults.setting,
        language: userInput.language,
        characterName: userInput.protagonistName || template.defaults.protagonist
      });
      
      // Only use AI to customize dialogue and specific details
      logger.info('🤖 Customizing template with AI...');
      
      const customizationPrompt = `Customize this story for Nigerian ${userInput.language} audience:

Theme: ${userInput.theme}
Setting: ${userInput.culturalSetting}

Add authentic ${userInput.language} dialogue and cultural details to make it feel genuine.
Keep it brief - only provide the customized elements.`;

      const customization = await groqService.generateCompletion({
        prompt: customizationPrompt,
        model: require('../config/groq').MODELS.FAST_SMALL,
        maxTokens: 1000
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const story = {
        title: filledTemplate.title,
        type: userInput.storyType,
        metadata: {
          language: userInput.language,
          duration: userInput.duration,
          animationStyle: userInput.animationStyle,
          targetAudience: userInput.targetAudience
        },
        overview: {
          logline: `A ${template.description.toLowerCase()}`,
          synopsis: template.structure.act1.description + ' ' + template.structure.act2.description + ' ' + template.structure.act3.description,
          moral: userInput.advancedOptions?.moral || template.defaults.moral
        },
        characters: filledTemplate.characters,
        script: {
          format: 'screenplay',
          totalScenes: filledTemplate.scenes.length,
          scenes: filledTemplate.scenes
        },
        productionNotes: await this.getProductionNotesWithCache(userInput),
        generation: {
          totalTokens: customization.usage?.totalTokens || 0,
          totalCost: (customization.cost?.ngn || 0).toFixed(2),
          duration,
          model: 'template + groq-llama-8b',
          usedTemplate: true,
          templateName: template.name
        }
      };
      
      logger.info(`✅ Template story generated in ${duration}ms - Cost: ₦${story.generation.totalCost}`);
      
      return story;
      
    } catch (error) {
      logger.error('❌ Template generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Generate characters with caching
   */
  async generateCharactersWithCache(outline, userInput) {
    const characters = [];
    let totalCost = 0;
    let totalTokens = 0;
    
    for (const characterName of outline.characterNames) {
      // Check cache for similar character archetype
      const archetypeKey = this.identifyArchetype(characterName, outline.synopsis);
      const cachedArchetype = await cachingService.getCachedArchetype(archetypeKey);
      
      if (cachedArchetype) {
        logger.info(`✅ Using cached archetype: ${archetypeKey}`);
        characters.push({
          ...cachedArchetype,
          name: characterName // Personalize name
        });
      } else {
        // Generate new character
        const generated = await groqService.generateCharacters(
          { ...outline, characterNames: [characterName] },
          userInput
        );
        
        if (generated.length > 0) {
          characters.push(generated[0]);
          
          // Cache for future use
          await cachingService.cacheArchetype(archetypeKey, generated[0]);
          
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
  
  /**
   * Get production notes with caching
   */
  async getProductionNotesWithCache(userInput) {
    const cacheKey = `production:${userInput.animationStyle}`;
    const cached = await cachingService.get(cacheKey);
    
    if (cached) {
      logger.info('✅ Using cached production notes');
      return { data: cached, cost: 0, tokens: 0 };
    }
    
    const result = await groqService.generateProductionNotes(userInput);
    await cachingService.set(cacheKey, result.content, require('../config/redis').CACHE_TTL.PRODUCTION_NOTES);
    
    return {
      data: result.content,
      cost: result.cost?.ngn || 0,
      tokens: result.usage?.totalTokens || 0
    };
  }
  
  /**
   * Determine if template should be used
   */
  shouldUseTemplate(userInput) {
    // Use template if:
    // 1. User explicitly selected template
    // 2. Story type has template available
    // 3. User is on free/creator tier (to save costs)
    
    if (userInput.templateId) return true;
    if (userInput.tier === 'free' || userInput.tier === 'creator') return true;
    if (!userInput.theme || userInput.theme.length < 20) return true; // Generic request
    
    return false;
  }
  
  /**
   * Identify character archetype for caching
   */
  identifyArchetype(name, synopsis) {
    const lowerName = name.toLowerCase();
    const lowerSynopsis = synopsis.toLowerCase();
    
    // Simple archetype detection (can be enhanced with ML)
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
  
  /**
   * Calculate estimated cost before generation
   */
  calculateEstimatedCost(userInput) {
    const tokenEstimate = TOKEN_ESTIMATES[`${userInput.duration <= 5 ? 'QUICK' : userInput.duration <= 10 ? 'STANDARD' : userInput.duration <= 20 ? 'PREMIUM' : 'FEATURE'}_STORY`] || 18000;
    
    const costPerToken = COSTS.GROQ_PER_1K_TOKENS / 1000;
    const estimatedCost = tokenEstimate * costPerToken;
    
    return {
      tokens: tokenEstimate,
      cost: estimatedCost.toFixed(2),
      currency: 'NGN'
    };
  }
  
}

module.exports = new StoryGenerationService();
```

---
