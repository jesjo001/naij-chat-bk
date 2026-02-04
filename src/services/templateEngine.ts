import { createRequire } from 'module';
import { logger } from '../utils/logger';
import templates from '../templates';

interface TemplateDefinition {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedDuration: string;
  title?: string;
  outline?: string;
  characterTemplate?: string;
  sceneTemplate?: string;
  defaults?: Record<string, unknown>;
  structure?: {
    act1?: { description?: string };
    act2?: { description?: string };
    act3?: { description?: string };
    scenes?: Array<Record<string, unknown>>;
  };
  characterArchetypes?: Array<Record<string, unknown>>;
}

type HandlebarsLike = {
  compile: (template: string) => (context: Record<string, unknown>) => string;
  registerHelper: (name: string, fn: (context: unknown) => string) => void;
};

const require = createRequire(import.meta.url);
const Handlebars = require('handlebars') as HandlebarsLike;

class TemplateEngine {
  private templates: Record<string, TemplateDefinition>;
  private compiledTemplates: Record<string, (context: Record<string, unknown>) => string>;

  constructor() {
    this.templates = templates;
    this.compiledTemplates = {};
    this.registerHelpers();
    this.compileAllTemplates();
  }

  private registerHelpers(): void {
    Handlebars.registerHelper('json', (context: unknown) => JSON.stringify(context));
  }

  private compileAllTemplates(): void {
    Object.keys(this.templates).forEach((templateName) => {
      const template = this.templates[templateName];

      if (template.outline) {
        this.compiledTemplates[`${templateName}_outline`] = Handlebars.compile(template.outline);
      }
      if (template.characterTemplate) {
        this.compiledTemplates[`${templateName}_character`] = Handlebars.compile(template.characterTemplate);
      }
      if (template.sceneTemplate) {
        this.compiledTemplates[`${templateName}_scene`] = Handlebars.compile(template.sceneTemplate);
      }

      logger.info(`Compiled template: ${templateName}`);
    });
  }

  hasTemplate(storyType: string): boolean {
    return Boolean(this.templates[storyType]);
  }

  getTemplate(storyType: string): TemplateDefinition | null {
    return this.templates[storyType] || null;
  }

  async fillTemplate(templateName: string, userData: Record<string, unknown>): Promise<Record<string, unknown>> {
    const template = this.templates[templateName];

    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    logger.info(`Filling template: ${templateName}`);

    const context = {
      ...template.defaults,
      ...userData
    };

    const scenes = template.structure?.scenes ?? [];
    const archetypes = template.characterArchetypes ?? [];

    return {
      title: this.compiledTemplates[`${templateName}_outline`]
        ? this.compiledTemplates[`${templateName}_outline`](context)
        : template.title,
      structure: template.structure,
      characters: archetypes.map((archetype: Record<string, unknown>, index: number) => {
        const charContext = { ...context, characterIndex: index, ...archetype };
        return this.compiledTemplates[`${templateName}_character`]
          ? JSON.parse(this.compiledTemplates[`${templateName}_character`](charContext))
          : archetype;
      }),
      scenes: scenes.map((scene: Record<string, unknown>, index: number) => {
        const sceneContext = { ...context, sceneIndex: index, ...scene };
        return this.compiledTemplates[`${templateName}_scene`]
          ? this.compiledTemplates[`${templateName}_scene`](sceneContext)
          : scene;
      })
    };
  }

  getAvailableTemplates(): Array<{ id: string; name: string; description: string; category: string; estimatedDuration: string; difficulty: string }> {
    return Object.keys(this.templates).map((key) => ({
      id: key,
      name: this.templates[key].name,
      description: this.templates[key].description,
      category: this.templates[key].category,
      estimatedDuration: this.templates[key].estimatedDuration,
      difficulty: this.templates[key].difficulty
    }));
  }
}

export const templateEngine = new TemplateEngine();
export default TemplateEngine;
