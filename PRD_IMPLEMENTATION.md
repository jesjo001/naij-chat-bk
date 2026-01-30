# Naija Sabi Chat - PRD Implementation Guide

## Overview

This document outlines the complete PRD-compliant implementation of the Naija Sabi Chat backend with the Storyteller Studio, AI Personalities, Financial Planning, and Hustle Hub modules.

## Features Implemented

### 1. Storyteller Studio 🎬

The Storyteller Service generates culturally-rich, engaging Nigerian/African stories with production-ready scripts, storyboards, and character designs.

#### Capabilities:
- **Story Generation**: Create stories in 6 types:
  - African folktales with traditional wisdom
  - Modern Nigerian narratives
  - Children's educational stories
  - Marketing/advertising stories
  - Film scripts (Nollywood-ready)
  - Animation scripts

#### Story Parameters:
```typescript
POST /api/storyteller/generate
{
  "storyType": "folktale" | "modern" | "children" | "marketing" | "film" | "animation",
  "theme": "string",                    // Main story theme
  "targetAudience": "string",           // e.g., "Children 5-8", "Young Adults", "Marketers"
  "storyLength": 5-30,                  // Duration in minutes
  "language": "pidgin" | "yoruba" | "igbo" | "hausa" | "english" | "bilingual",
  "culturalSetting": "string",          // e.g., "Traditional Village", "Modern Lagos"
  "animationStyle": "string",           // Animation/visual style
  "moral": "string",                    // (optional) Story moral
  "includeProverbs": boolean,           // Include cultural proverbs
  "includeSongs": boolean               // Include traditional songs
}
```

#### Character Generation:
- **Endpoint**: `POST /api/storyteller/characters`
- Generates 3-8 characters per story with:
  - Character name, role, and age
  - Personality traits and quirks
  - Appearance description
  - Character arc and background
  - Voice profile and dialogue style

#### Script Generation:
- **Endpoint**: `POST /api/storyteller/script`
- Screenplay format with:
  - Scene-by-scene breakdowns
  - Dialogue with character action notes
  - Camera angles and movement instructions
  - Sound cues and ambient elements
  - Frame notes for animators

#### Storyboard Generation:
- **Endpoint**: `POST /api/storyteller/storyboard`
- Visual descriptions for each scene including:
  - Camera composition (rule of thirds, deep focus, etc.)
  - Color palettes adapted to setting
  - Character positioning
  - Animation notes specific to chosen style
  - Sound design specification

### 2. AI Personalities 🎭

Five distinct AI personality profiles, each optimized for different use cases with culturally-appropriate language, tone, and expertise.

#### Available Personalities:

**Lagos Hustler** (🏙️)
- **Tone**: Street-smart, business-focused, energetic
- **Language**: Heavy Pidgin with business slang
- **Best For**: Business advice, entrepreneurship, side hustles, networking
- **Phrases**: "My guy", "Fire", "No go dull", "Blow your account", "Level up"

**Iya Osun** (👵)
- **Tone**: Wise, motherly, proverb-rich, nurturing
- **Language**: Yoruba-infused Pidgin
- **Best For**: Life advice, cultural wisdom, conflict resolution, spiritual guidance
- **Phrases**: "E kaaro o", "Ase o", Uses Yoruba proverbs extensively

**Alhaji** (🕌)
- **Tone**: Respectful, Islamic wisdom, patient, business-minded
- **Language**: Formal Pidgin with Hausa/Arabic phrases
- **Best For**: Trade advice, Islamic guidance, business ethics, community relations
- **Phrases**: "As-salamu alaykum", "Mashallah", "Alhamdulillah", Islamic principles

**Igbo Businessman** (💼)
- **Tone**: Entrepreneurial, investment-focused, pragmatic, results-oriented
- **Language**: Professional Pidgin with Igbo business philosophy
- **Best For**: Business strategy, investment analysis, wealth building, financial planning
- **Phrases**: "Ego na-amụ ego", Direct and action-oriented

**Pastor** (⛪)
- **Tone**: Encouraging, faith-based, compassionate, inspirational
- **Language**: Biblical references, inspirational Pidgin
- **Best For**: Spiritual guidance, life challenges, hope and encouragement
- **Phrases**: "Receive it in Jesus name!", "Grace and peace", Scripture references

#### Personality Endpoints:
```typescript
GET /api/personality/profiles           // List all personalities
POST /api/personality/select             // Set active personality
  { "personalityId": "lagos_hustler" }
GET /api/personality/:id                // Get specific personality details
```

### 3. Financial Freedom 💰

Comprehensive financial planning tools tailored for Nigerian income levels and cost of living.

#### Budget Template Generation:
```typescript
POST /api/finance/budget
{
  "monthlyIncome": 150000,              // ₦
  "location": "Lagos",                  // Affects cost adjustments
  "familySize": 4,                      // Adjust expense categories
  "lifestyleType": "moderate"           // basic | moderate | comfortable
}

Response includes:
- 50/30/20 budget breakdown (adapted for Nigeria)
- Detailed category breakdown:
  - Housing (35% in Lagos, 25% elsewhere)
  - Food & Groceries (18%)
  - Utilities & Internet (10%)
  - Transportation (12%)
  - Healthcare & Insurance (8%)
  - Personal Care (5%)
  - Entertainment & Dining (30% of discretionary)
  - Shopping & Fashion (35% of discretionary)
  - Hobbies & Subscriptions (20% of discretionary)
  - Emergency Fund (50% of savings)
  - Investments (30% of savings)
  - Debt Repayment (20% of savings)
- Savings goals with timelines:
  - Short-term: Emergency Fund (3 months)
  - Medium-term: Business/Education Investment
  - Long-term: Retirement & Wealth (10+ years)
- Investment opportunities with expected returns
- Cost-cutting strategies specific to Nigerian context
```

#### Financial Health Score:
```typescript
POST /api/finance/health-score
{
  "monthlyIncome": 150000,
  "savings": 30000,
  "debt": 50000,
  "investmentAmount": 15000
}

Response: Score (0-100), Rating, and improvement advice
```

#### Investment Recommendations by Income:
- **Low Income (< ₦100k)**: Emergency fund priority
- **Mid Income (₦100-300k)**: ETFs, Mutual Funds (₦5-10k/month)
- **High Income (> ₦300k)**: Diversified: stocks, real estate, bonds

#### Supported Investment Platforms:
- FirmoAI, Piggyvest, Stanbic IBTC (savings)
- NGX, Meristem, Coronation (stocks & mutual funds)
- Jumia House, PropertyPro (real estate)
- Luno, Binance (crypto - high-risk)

### 4. Hustle Hub 💼

Marketing and customer service tools for entrepreneurs and SMEs.

#### Customer Service Response Generator:
```typescript
POST /api/hustle/customer-response
{
  "scenario": "Customer complaint about product quality",
  "productName": "Premium Phone Case",
  "customerTone": "upset" | "curious" | "demanding"
}

Response includes 3 versions:
1. Professional Pidgin (market-focused)
2. Formal English (corporate)
3. Casual Friendly (social media)
```

#### Product Description Generator:
```typescript
POST /api/hustle/product-description
{
  "productName": "Organic Face Serum",
  "category": "Beauty & Skincare",
  "features": ["100% natural", "No parabens", "Hydrating formula"],
  "price": 8500,
  "targetAudience": "Young professionals"
}

Response includes:
- Short (1 sentence), Medium, Long versions
- Platform-specific variants:
  - Instagram: 3 caption hooks (punchy, storytelling, urgency)
  - Jumia/Konga: Product listing format
  - Jiji: Classifieds format
  - Facebook: Community post format
  - WhatsApp: Customer inquiry response templates
```

#### Marketing Strategy Generator:
```typescript
POST /api/hustle/marketing-strategy
{
  "productName": "Organic Face Serum",
  "targetAudience": "Young professionals",
  "budget": 50000  // Marketing budget in ₦
}

Response includes:
- Recommended channels (Instagram, TikTok, Facebook, etc.)
- 4-phase campaign strategy
- Timeline and milestones
- Expected ROI calculations
```

### 5. Extended Street Oracle 📊

Expanded data aggregation for Nigerian markets and services.

#### Flight Prices:
```typescript
GET /api/data/flights

Returns:
- Airline name, route, departure/arrival times
- Price, available seats
- Direct booking URLs
- Major Nigerian airlines: Air Peace, Arik, Dana, Ibom Air, Aero

Example:
{
  "airline": "Air Peace",
  "departure": "Lagos (LOS)",
  "arrival": "Abuja (ABV)",
  "departureTime": "09:00 AM",
  "price": 25000,
  "seats": 45
}
```

#### Food Commodity Prices:
```typescript
GET /api/data/food-prices

Returns Nigerian staple prices with:
- Commodity (rice, beans, garri, yam, etc.)
- Current price in ₦
- Price per kg for consistency
- Market trend (up/down/stable)
- Last updated timestamp

Covers 15 major commodities:
Rice, Beans, Garri, Yam, Tomatoes, Onions, Palm Oil, Groundnut Oil,
Fish, Chicken, Beef, Bread, Milk, Eggs, Sugar
```

#### Stock Market Data:
```typescript
GET /api/data/stocks

Returns NGX (Nigerian Exchange) data:
- Top 8 stocks by market cap
- Sectors: Banking, Telecommunications, Consumer Goods, Oil & Gas, Construction
- Price, change, percentage change, volume
- Market capitalization

Featured stocks: DANGSUGAR, MTNN, AIRTELAFRI, GUARANTY, ZENITHBANK, BUA, NESTLE, SEPLAT
```

## API Endpoints Summary

### Data Collection
- `GET /api/exchange-rates` - Currency rates
- `GET /api/fuel-prices` - Fuel prices by state
- `GET /api/nepa-status` - Power supply status
- `GET /api/news` - Nigerian news
- `GET /api/data/flights` - Flight prices
- `GET /api/data/food-prices` - Food commodity prices
- `GET /api/data/stocks` - Stock market data
- `GET /api/all` - All data aggregated

### Storyteller Studio
- `POST /api/storyteller/generate` - Generate story
- `POST /api/storyteller/characters` - Generate characters
- `POST /api/storyteller/script` - Generate screenplay
- `POST /api/storyteller/storyboard` - Generate storyboard frames

### AI Personalities
- `GET /api/personality/profiles` - List all personalities
- `POST /api/personality/select` - Set active personality
- `GET /api/personality/:id` - Get personality details with system prompt

### Financial Planning
- `POST /api/finance/budget` - Generate budget template
- `POST /api/finance/health-score` - Calculate financial health score

### Hustle Hub
- `POST /api/hustle/customer-response` - Generate customer service responses
- `POST /api/hustle/product-description` - Generate product descriptions
- `POST /api/hustle/marketing-strategy` - Generate marketing strategy

## Language Support

All services support:
- **Pidgin** (Nigerian Pidgin English) - Colloquial, accessible
- **Yoruba** - Infused with cultural wisdom and proverbs
- **Igbo** - Business and entrepreneurial focus
- **Hausa** - Islamic and northern trading traditions
- **English** - Professional and formal contexts
- **Bilingual** - Mixed language pairs for blended contexts

## Caching Strategy

**Redis Cache Durations:**
- Exchange rates: 5 minutes
- Fuel prices: 1 hour
- NEPA status: 5 minutes
- News: 15 minutes
- Flights: 1 hour
- Food prices: 24 hours
- Stock data: 30 minutes

## Error Handling

All endpoints include:
- Proper HTTP status codes (400 for bad request, 500 for server error)
- Descriptive error messages
- Request validation
- Logging of all errors to Winston logger

## Example Usage

### Generate a Storyteller Story
```bash
curl -X POST http://localhost:3000/api/storyteller/generate \
  -H "Content-Type: application/json" \
  -d '{
    "storyType": "folktale",
    "theme": "The Wisdom of Anansi",
    "targetAudience": "Children 5-10",
    "storyLength": 15,
    "language": "pidgin",
    "culturalSetting": "Traditional Village",
    "animationStyle": "Disney 2D"
  }'
```

### Get Lagos Hustler Personality
```bash
curl http://localhost:3000/api/personality/lagos_hustler
```

### Generate Budget Template
```bash
curl -X POST http://localhost:3000/api/finance/budget \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyIncome": 150000,
    "location": "Lagos",
    "familySize": 3,
    "lifestyleType": "moderate"
  }'
```

### Generate Product Description
```bash
curl -X POST http://localhost:3000/api/hustle/product-description \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Premium Wig",
    "category": "Fashion & Beauty",
    "features": ["100% Human Hair", "Comfortable Fit", "Natural Look"],
    "price": 15000,
    "targetAudience": "Women 18-45"
  }'
```

## Technology Stack

- **Framework**: Express.js 4.18
- **Language**: TypeScript 5.3
- **Caching**: Redis 4.6
- **Logging**: Winston 3.11
- **Process Manager**: PM2
- **Containerization**: Docker
- **Testing**: Vitest
- **Security**: Helmet, Express Rate Limit, CORS

## File Structure

```
src/
├── services/
│   ├── DataScraperService.ts      # Data collection
│   ├── StorytellerService.ts      # Story generation
│   ├── PersonalityService.ts      # AI personalities
│   ├── FinancialService.ts        # Financial planning
│   └── HustleHubService.ts        # Marketing tools
├── routes/
│   └── api.ts                      # All endpoints
├── config/
│   └── redis.ts                    # Redis configuration
├── types/
│   └── index.ts                    # TypeScript interfaces
├── utils/
│   ├── logger.ts                   # Winston logging
│   └── constants.ts                # App constants
└── index.ts                        # Express server entry point
```

## Performance Notes

- All GET requests support caching to reduce API calls
- Parallel data fetching for `/api/all` endpoint
- Proper timeout handling (30 seconds default)
- Rate limiting: 100 requests per 15 minutes per IP
- Connection pooling for Redis

## Future Enhancements

- AI integration for intelligent story/script generation (OpenAI API)
- Real-time data from official Nigerian APIs (CBN, NSE, PPPRA)
- User authentication and personalization
- Story publishing and monetization
- Community ratings and reviews
- Advanced analytics and insights
- Multilingual support expansion

## Support & Documentation

All services are fully typed with TypeScript for IDE autocomplete and type safety. Refer to:
- Type definitions in `src/types/index.ts`
- Service implementations for detailed logic
- API tests in `src/test/api.test.ts` for usage examples

---

**Last Updated**: 2024
**Version**: 2.0 (PRD-Compliant)
