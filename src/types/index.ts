export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface ExchangeRate {
  currency: string;
  buy: number;
  sell: number;
  official?: number;
  parallel?: number;
}

export interface FuelPrice {
  state: string;
  city: string;
  petrol: number;
  diesel: number;
  kerosene: number;
  last_updated: Date;
}

export interface NepaStatus {
  location: string;
  status: string;
  last_update: Date;
  community_reports: Array<{
    user: string;
    report: string;
    time: string;
  }>;
}

export interface News {
  title: string;
  source: string;
  url: string;
  summary: string;
  published_at: Date;
  category: string;
}

// Storyteller Types
export interface Story {
  id?: string;
  title: string;
  synopsis: string;
  genre: string;
  duration: number; // in minutes
  language: string;
  targetAudience: string;
  animationStyle: string;
  moral: string;
  theme?: string;
  culturalSetting?: string;
  createdAt?: Date;
}

export interface StoryRequest {
  storyType: 'folktale' | 'modern' | 'children' | 'marketing' | 'film' | 'animation';
  theme: string;
  targetAudience: string;
  storyLength: number; // 5-30 minutes
  language: 'pidgin' | 'yoruba' | 'igbo' | 'hausa' | 'english' | 'bilingual';
  culturalSetting: string;
  animationStyle: string;
  moral?: string;
  additionalDetails?: string;
  characterCount?: number;
  tone?: string;
  includeProverbs?: boolean;
  includeSongs?: boolean;
}

export interface Character {
  id?: string;
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
  age: string;
  personality: string[];
  voice: string;
  appearance: string;
  characterArc: string;
  quirk?: string;
  background?: string;
}

export interface Script {
  id?: string;
  storyId?: string;
  title: string;
  format: 'screenplay' | 'animatic' | 'storyboard';
  scenes: Scene[];
  totalPages?: number;
  duration?: number;
  createdAt?: Date;
}

export interface Scene {
  sceneNumber: number;
  heading: string;
  description: string;
  action: string;
  dialogue: DialogueLine[];
  cameraAngle?: string;
  soundCues?: string[];
  frameNotes?: string[];
}

export interface DialogueLine {
  character: string;
  line: string;
  tone?: string;
  action?: string;
}

export interface Storyboard {
  id?: string;
  storyId?: string;
  sceneNumber: number;
  frameNumber: number;
  visualDescription: string;
  cameraAngle: string;
  composition: string;
  colorPalette: string[];
  characterPositions: string;
  animationNotes?: string;
  soundDesign?: string;
}

export interface PersonalityProfile {
  id: string;
  name: string;
  emoji: string;
  tone: string;
  useCase: string[];
  languageStyle: string;
  culturalElements: string[];
  systemPrompt: string;
}

// Financial Types
export interface BudgetTemplate {
  monthlyIncome: number;
  location: string;
  familySize: number;
  lifestyleType: 'basic' | 'moderate' | 'comfortable';
  totalAllocated: number;
  remainingAmount: number;
  breakdown: BudgetBreakdown;
  categories: BudgetCategory[];
  recommendations: string[];
  savingsGoals: {
    shortTerm: { goal: string; target: number; monthlyContribution: number; timelineMonths: number; description: string };
    mediumTerm: { goal: string; target: number; monthlyContribution: number; timelineMonths: number; description: string };
    longTerm: { goal: string; target: number; monthlyContribution: number; timelineMonths: number; description: string };
  };
  investmentOpportunities: Array<{
    type: string;
    platforms: string[];
    expectedReturn: string;
    minimumInvestment: string;
    risk: string;
    recommended: boolean;
    note?: string;
  }>;
  costCuttingStrategies: string[];
  createdAt?: Date;
}

export interface BudgetBreakdown {
  essentials: { amount: number; percentage: number; description: string };
  discretionary: { amount: number; percentage: number; description: string };
  savings: { amount: number; percentage: number; description: string };
  totalAllocated: number;
}

export interface BudgetCategory {
  name: string;
  amount: number;
  percentage: number;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  notes?: string;
}

// Hustle Hub Types
export interface MarketingResponse {
  title: string;
  language: string;
  tone: string;
  content: string;
  characterCount: number;
}

export interface ProductDescription {
  productName: string;
  category: string;
  features: string[];
  price: number;
  targetAudience: string;
  shortVersion: string;
  mediumVersion: string;
  longVersion: string;
  platforms: {
    instagram: {
      captions: Array<{ hook: string; caption: string; hashtags: number }>;
      callToAction: string;
      bestHashtags: string[];
    };
    jumia: { title: string; description: string; price: string; highlights: string[]; keyBenefits: string[] };
    jiji: { title: string; description: string; condition: string; price: string; location: string };
    konga: { productName: string; category: string; price: string; shortDescription: string; detailedDescription: string; sellerNote: string; warranty: string };
    facebook: { postText: string; engagementQuestions: string[] };
    whatsapp: {
      greeting: string;
      features: string;
      price: string;
      offer: string;
      callToAction: string;
      quickReply: string[];
    };
  };
  createdAt?: Date;
}

// Extended Street Oracle Types
export interface FlightPrice {
  airline: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seats?: number;
  bookingUrl?: string;
}

export interface FoodPrice {
  commodity: string;
  unit: string;
  price?: number;
  priceNGN?: number;
  pricePerKg?: number;
  trend?: 'up' | 'down' | 'stable';
  market?: string;
  location?: string;
  priceChange?: number;
  lastUpdated?: Date;
}

export interface StockInfo {
  symbol: string;
  name: string;
  price: number;
  sector?: string;
  change: number;
  percentChange: number;
  volume: number;
  marketCap?: string;
  high52Week?: number;
  low52Week?: number;
}

export interface AllData {
  exchangeRates: ExchangeRate[];
  fuelPrices: FuelPrice[];
  news: News[];
  flights?: FlightPrice[];
  foodPrices?: FoodPrice[];
  stocks?: StockInfo[];
}
