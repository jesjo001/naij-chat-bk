# MVC Architecture Documentation

## Overview

The Naija Sabi Chat backend has been refactored to follow the **Model-Controller-Service (MCS)** architecture, which is the TypeScript/Node.js variation of the classic MVC pattern. This provides better code organization, separation of concerns, and maintainability.

---

## Architecture Layers

### 1. **Models** (Data Structures)
**Location:** `src/types/index.ts`

Models define the shape and structure of data used throughout the application. They are TypeScript interfaces that ensure type safety across the codebase.

**Key Models:**
- `ApiResponse<T>` - Standard API response wrapper
- `ExchangeRate`, `FuelPrice`, `NepaStatus` - Data collection models
- `Story`, `Character`, `Script`, `Storyboard` - Storyteller models
- `PersonalityProfile` - AI personality models
- `BudgetTemplate`, `FinancialHealthScore` - Financial planning models
- `MarketingResponse`, `ProductDescription`, `MarketingStrategy` - Marketing models

**Example:**
```typescript
export interface Story {
  id: string;
  type: string;
  title: string;
  synopsis: string;
  fullStory: string;
  themes: string[];
  characters: string[];
  moralLesson?: string;
  // ... more properties
}
```

---

### 2. **Controllers** (Request Handlers)
**Location:** `src/controllers/`

Controllers handle HTTP requests, validate input, orchestrate services, and format responses. They act as the bridge between routes and services.

**Responsibilities:**
- Extract and validate request data
- Call appropriate service methods
- Format service responses into API responses
- Handle errors and HTTP status codes
- Log request activity

**Controllers:**

#### **DataController** (`src/controllers/DataController.ts`)
Handles all data collection endpoints (Street Oracle).

**Methods:**
- `getExchangeRates()` - GET /api/data/exchange-rates
- `getFuelPrices()` - GET /api/data/fuel-prices
- `getNepaStatus()` - GET /api/data/nepa-status
- `getNews()` - GET /api/data/news
- `getFlightPrices()` - GET /api/data/flights
- `getFoodPrices()` - GET /api/data/food-prices
- `getStockMarketInfo()` - GET /api/data/stocks
- `getAllData()` - GET /api/all

```typescript
getExchangeRates = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info('Fetching exchange rates');
    const data = await this.dataScraper.getExchangeRates();
    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error fetching exchange rates', { error });
    next(error);
  }
};
```

#### **StorytellerController** (`src/controllers/StorytellerController.ts`)
Handles story generation requests.

**Methods:**
- `generateStory()` - POST /api/storyteller/generate
- `generateCharacters()` - POST /api/storyteller/characters
- `generateScript()` - POST /api/storyteller/script
- `generateStoryboard()` - POST /api/storyteller/storyboard

#### **PersonalityController** (`src/controllers/PersonalityController.ts`)
Manages AI personality endpoints.

**Methods:**
- `getProfiles()` - GET /api/personality/profiles
- `getById()` - GET /api/personality/:id
- `selectPersonality()` - POST /api/personality/select
- `getIntroduction()` - GET /api/personality/:id/introduction
- `getSystemPrompt()` - GET /api/personality/:id/prompt

#### **FinancialController** (`src/controllers/FinancialController.ts`)
Handles financial planning endpoints.

**Methods:**
- `generateBudget()` - POST /api/finance/budget
- `calculateHealthScore()` - POST /api/finance/health-score
- `getInvestmentRecommendations()` - POST /api/finance/investments
- `getCostCuttingStrategies()` - POST /api/finance/cost-cutting

#### **HustleHubController** (`src/controllers/HustleHubController.ts`)
Manages marketing and customer service endpoints.

**Methods:**
- `generateCustomerResponse()` - POST /api/hustle/customer-response
- `generateProductDescription()` - POST /api/hustle/product-description
- `generateMarketingStrategy()` - POST /api/hustle/marketing-strategy
- `getPlatformRecommendations()` - GET /api/hustle/platform-recommendations

---

### 3. **Services** (Business Logic)
**Location:** `src/services/`

Services contain the core business logic and are reusable across different controllers. They handle data processing, API calls, and complex operations.

**Services:**

#### **DataScraperService** (`src/services/DataScraperService.ts`)
Handles data collection and aggregation.

**Key Methods:**
- `getExchangeRates()` - Fetches currency exchange rates
- `getFuelPrices()` - Gets fuel prices by state
- `getNepaStatus(location)` - Gets power status for a location
- `getNigerianNews()` - Fetches latest Nigerian news
- `getFlightPrices()` - Gets flight information
- `getFoodPrices()` - Gets food commodity prices
- `getStockMarketInfo()` - Gets NGX stock data

#### **StorytellerService** (`src/services/StorytellerService.ts`)
Generates creative stories and related content.

**Key Methods:**
- `generateStory(request)` - Creates a story with given parameters
- `generateCharacters(request, count)` - Generates story characters
- `generateScript(story, characters)` - Creates screenplay format
- `generateStoryboard(story, script)` - Generates visual descriptions

#### **PersonalityService** (`src/services/PersonalityService.ts`)
Manages AI personality profiles.

**Key Methods:**
- `getPersonality(id)` - Retrieves a specific personality
- `getAllPersonalities()` - Returns all available personalities
- `setActivePersonality(id)` - Sets the active personality
- `getSystemPrompt(id)` - Gets AI system prompt for a personality
- `generateIntroduction(id)` - Creates personality introduction

**Personalities:**
1. **Lagos Hustler** (🏙️) - Business-focused, entrepreneurial
2. **Iya Osun** (👵) - Wise elder, cultural wisdom
3. **Alhaji** (🕌) - Islamic principles, trading wisdom
4. **Igbo Businessman** (💼) - Finance and investment focus
5. **Pastor** (⛪) - Spiritual guidance, faith-based

#### **FinancialService** (`src/services/FinancialService.ts`)
Provides financial planning and analysis.

**Key Methods:**
- `generateBudgetTemplate(income, location, family, lifestyle)` - Creates personalized budget
- `calculateFinancialHealthScore(income, savings, debts, investments)` - Scores financial health
- `generateBreakdown()` - Creates 50/30/20 budget breakdown
- `getInvestmentRecommendations()` - Suggests investment options

#### **HustleHubService** (`src/services/HustleHubService.ts`)
Supports entrepreneurship and marketing.

**Key Methods:**
- `generateCustomerResponse(scenario, product, tone)` - Creates customer responses
- `generateProductDescription(name, category, features, price, audience)` - Multi-platform product descriptions
- `generateMarketingStrategy(product, audience, budget)` - Creates marketing plans

---

### 4. **Middleware** (Cross-cutting Concerns)
**Location:** `src/middleware/index.ts`

Middleware functions handle authentication, validation, logging, and error handling.

**Key Middleware:**

#### **Error Handler**
```typescript
export const errorHandler = (err, _req, res, _next) => {
  // Centralized error handling
}
```

#### **Request Validation**
- `validateStoryRequest()` - Validates story generation requests
- `validateBudgetRequest()` - Validates budget parameters
- `validateProductDescriptionRequest()` - Validates product data
- `validateMarketingStrategyRequest()` - Validates marketing parameters

#### **Request Logger**
```typescript
export const requestLogger = (req, res, next) => {
  // Logs all incoming requests with timing
}
```

#### **Async Handler Wrapper**
```typescript
export const asyncHandler = (fn) => {
  // Wraps async route handlers for error catching
}
```

---

### 5. **Routes** (API Endpoints)
**Location:** `src/routes/api.ts`

Routes define URL patterns and link them to controller methods. They use middleware for validation and error handling.

**Route Structure:**
```typescript
import { DataController } from '../controllers/DataController';

const dataController = new DataController();
router.get('/data/exchange-rates', asyncHandler(dataController.getExchangeRates));
```

**Route Groups:**
- `/api/data/*` - Data collection endpoints
- `/api/storyteller/*` - Story generation endpoints
- `/api/personality/*` - AI personality endpoints
- `/api/finance/*` - Financial planning endpoints
- `/api/hustle/*` - Marketing/business endpoints

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT REQUEST                      │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS MIDDLEWARE                       │
│  (CORS, Helmet, Rate Limit, Request Logger)               │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    VALIDATION MIDDLEWARE                    │
│  (validateStoryRequest, validateBudgetRequest, etc)        │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                        ROUTE HANDLER                        │
│  (Maps request to controller method)                       │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      CONTROLLER                             │
│  (Extracts data, calls service, formats response)          │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       SERVICE                               │
│  (Business logic, API calls, data processing)              │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL RESOURCES                        │
│  (Redis Cache, APIs, Databases)                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    ERROR HANDLER                            │
│  (Catches and formats errors)                              │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   API RESPONSE                              │
│  { success: boolean, data?: T, error?: string, timestamp } │
└─────────────────────────────────────────────────────────────┘
```

---

## Adding a New Feature

### Example: Adding a New "Dream Interpreter" Endpoint

#### Step 1: Define the Model
Update `src/types/index.ts`:
```typescript
export interface DreamInterpretation {
  dreamDescription: string;
  culturalContext: string;
  interpretation: string;
  meanings: string[];
  culturalReferences?: string[];
}

export interface DreamRequest {
  dream: string;
  culturalBackground?: string;
  language?: string;
}
```

#### Step 2: Create the Service
Create `src/services/DreamService.ts`:
```typescript
export class DreamService {
  async interpretDream(request: DreamRequest): Promise<DreamInterpretation> {
    // Business logic here
    return {
      dreamDescription: request.dream,
      culturalContext: request.culturalBackground || 'Traditional',
      interpretation: '...',
      meanings: ['...'],
    };
  }
}
```

#### Step 3: Create the Controller
Create `src/controllers/DreamController.ts`:
```typescript
import { Request, Response, NextFunction } from 'express';
import { DreamService } from '../services/DreamService';

export class DreamController {
  private dreamService: DreamService;

  constructor() {
    this.dreamService = new DreamService();
  }

  interpretDream = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.dreamService.interpretDream(req.body);
      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  };
}
```

#### Step 4: Add Validation Middleware
Update `src/middleware/index.ts`:
```typescript
export const validateDreamRequest = (req, res, next) => {
  const { dream } = req.body;
  if (!dream || typeof dream !== 'string') {
    const error: CustomError = new Error('Invalid dream description');
    error.status = 400;
    error.details = { dream: 'Dream must be a non-empty string' };
    return next(error);
  }
  next();
};
```

#### Step 5: Register Route
Update `src/routes/api.ts`:
```typescript
import { DreamController } from '../controllers/DreamController';
import { validateDreamRequest } from '../middleware/index';

const dreamController = new DreamController();

/**
 * POST /api/dreams/interpret
 * Interpret a dream based on cultural context
 */
router.post(
  '/dreams/interpret',
  validateDreamRequest,
  asyncHandler(dreamController.interpretDream)
);
```

---

## Benefits of This Architecture

| Benefit | Description |
|---------|-------------|
| **Separation of Concerns** | Each layer has a single responsibility |
| **Testability** | Services can be unit tested independently |
| **Reusability** | Services can be used by multiple controllers |
| **Maintainability** | Clear structure makes code easier to modify |
| **Scalability** | Easy to add new features without affecting existing code |
| **Type Safety** | TypeScript ensures compile-time type checking |
| **Error Handling** | Centralized error handling middleware |
| **Logging** | Consistent logging across all endpoints |
| **Caching** | Services can implement caching strategies |

---

## Directory Structure

```
src/
├── controllers/          # HTTP request handlers
│   ├── DataController.ts
│   ├── StorytellerController.ts
│   ├── PersonalityController.ts
│   ├── FinancialController.ts
│   └── HustleHubController.ts
├── middleware/          # Express middleware
│   └── index.ts
├── routes/             # Route definitions
│   └── api.ts
├── services/           # Business logic
│   ├── DataScraperService.ts
│   ├── StorytellerService.ts
│   ├── PersonalityService.ts
│   ├── FinancialService.ts
│   └── HustleHubService.ts
├── types/              # Type definitions & models
│   └── index.ts
├── utils/              # Utility functions
│   ├── logger.ts
│   └── constants.ts
├── config/             # Configuration files
│   └── redis.ts
└── index.ts            # Main entry point
```

---

## Best Practices

1. **Keep Controllers Thin** - Move business logic to services
2. **Use Middleware for Cross-cutting Concerns** - Auth, validation, logging
3. **Consistent Response Format** - Always use the `ApiResponse<T>` wrapper
4. **Error Handling** - Use the error handler middleware
5. **Logging** - Log important operations and errors
6. **Type Safety** - Define proper TypeScript interfaces
7. **Service Dependency Injection** - Pass dependencies to constructors
8. **Async/Await** - Use async/await instead of callbacks
9. **Request Validation** - Validate all incoming data
10. **Caching** - Use Redis for frequently accessed data

---

## Performance Considerations

- **Caching Layer**: Services use Redis to cache data
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Async Operations**: All I/O operations are asynchronous
- **Error Early Exit**: Validation fails fast to avoid unnecessary processing
- **Connection Pooling**: Redis uses connection pooling

---

## Security Considerations

- **Helmet**: Protects against common HTTP vulnerabilities
- **CORS**: Restricts cross-origin requests to allowed origins
- **Rate Limiting**: Prevents brute force and DoS attacks
- **Input Validation**: All inputs are validated before processing
- **Error Messages**: Generic error messages in production
- **Logging**: All requests and errors are logged for audit trail

---

## Testing Strategy

### Unit Tests (Services)
```typescript
describe('DataScraperService', () => {
  it('should fetch exchange rates', async () => {
    const service = new DataScraperService();
    const rates = await service.getExchangeRates();
    expect(rates).toBeInstanceOf(Array);
  });
});
```

### Integration Tests (Controllers)
```typescript
describe('DataController', () => {
  it('GET /api/data/exchange-rates should return 200', async () => {
    const response = await request(app).get('/api/data/exchange-rates');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

### End-to-End Tests (Routes)
```typescript
describe('API Endpoints', () => {
  it('should handle full request lifecycle', async () => {
    const response = await request(app)
      .post('/api/finance/budget')
      .send({ monthlyIncome: 100000, familySize: 4, location: 'Lagos' });
    expect(response.body.data.breakdown).toBeDefined();
  });
});
```

---

## Deployment

The MVC structure is production-ready for:
- **cPanel Hosting** - Compatible with Node.js applications
- **VPS Deployments** - Fully scalable architecture
- **Docker Containers** - Can be containerized for cloud deployment
- **Load Balancing** - Stateless design allows horizontal scaling
- **CI/CD Pipelines** - Easy to test and deploy

---

## Version History

- **v2.0** - MVC Architecture implementation
- **v1.0** - Initial monolithic backend

---

## Contact & Support

For questions about the MVC architecture, refer to:
- [PRD_IMPLEMENTATION.md](./PRD_IMPLEMENTATION.md)
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [QUICK_START.md](./QUICK_START.md)

---

**Status:** ✅ Production Ready
**Architecture:** MVC (Model-Controller-Service)
**Last Updated:** January 2026
