export const STORY_TYPES = {
  FOLKTALE: 'folktale',
  MODERN_NIGERIAN: 'modern_nigerian',
  CHILDREN: 'children',
  MARKETING: 'marketing',
  FILM: 'film',
  ANIMATION: 'animation_script'
} as const;

export const LANGUAGES = {
  PIDGIN: 'pidgin',
  YORUBA: 'yoruba',
  IGBO: 'igbo',
  HAUSA: 'hausa',
  ENGLISH: 'english',
  BILINGUAL: 'bilingual'
} as const;

export const ANIMATION_STYLES = {
  PIXAR_3D: 'pixar_3d',
  DISNEY_2D: 'disney_2d',
  ANIME: 'anime',
  AFRICAN_ART: 'african_art',
  REALISTIC: 'realistic',
  STOP_MOTION: 'stop_motion'
} as const;

export const CULTURAL_SETTINGS = {
  TRADITIONAL_VILLAGE: 'traditional_village',
  ANCIENT_KINGDOM: 'ancient_kingdom',
  MODERN_LAGOS: 'modern_lagos',
  UNIVERSITY_CAMPUS: 'university_campus',
  MARKETPLACE: 'marketplace',
  FANTASY_REALM: 'fantasy_realm'
} as const;

export const COSTS = {
  GROQ_PER_1K_TOKENS: 0.885,
  GPT4_MINI_INPUT_PER_1K: 0.225,
  GPT4_MINI_OUTPUT_PER_1K: 0.9,
  STORAGE_PER_MB: 0.05
} as const;

export const PRICING = {
  QUICK_STORY: 500,
  STANDARD_STORY: 1500,
  PREMIUM_STORY: 2500,
  FEATURE_STORY: 5000
} as const;

export const TOKEN_ESTIMATES = {
  QUICK_STORY: 8000,
  STANDARD_STORY: 18000,
  PREMIUM_STORY: 18000,
  FEATURE_STORY: 45000
} as const;
