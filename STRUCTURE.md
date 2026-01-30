# Backend Project Structure

## Complete File Tree

```
naija-sabi-chat/backend/
│
├── 📁 src/                          # Source code
│   ├── 📄 index.ts                  # Main server entry point
│   │
│   ├── 📁 config/
│   │   └── 📄 redis.ts              # Redis client & connection
│   │
│   ├── 📁 services/
│   │   └── 📄 DataScraperService.ts # Core business logic
│   │       ├── getExchangeRates()
│   │       ├── getFuelPrices()
│   │       ├── getNepaStatus()
│   │       └── getNigerianNews()
│   │
│   ├── 📁 routes/
│   │   └── 📄 api.ts                # API endpoints
│   │       ├── GET /exchange-rates
│   │       ├── GET /fuel-prices
│   │       ├── GET /nepa-status
│   │       ├── GET /news
│   │       └── GET /all
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts              # TypeScript interfaces
│   │       ├── ExchangeRate
│   │       ├── FuelPrice
│   │       ├── NepaStatus
│   │       ├── News
│   │       └── ApiResponse
│   │
│   ├── 📁 utils/
│   │   ├── 📄 logger.ts             # Winston logger setup
│   │   └── 📄 constants.ts          # App constants & config
│   │
│   └── 📁 test/
│       └── 📄 api.test.ts           # Integration tests
│
├── 📁 dist/                          # Compiled JavaScript (generated)
│
├── 📁 logs/                          # Application logs (generated)
│   ├── combined.log
│   └── error.log
│
├── 📁 node_modules/                  # Dependencies (generated)
│
├── 📄 package.json                   # Dependencies & scripts
├── 📄 package-lock.json              # Dependency lock file
├── 📄 tsconfig.json                  # TypeScript configuration
│
├── 📄 .env.example                   # Environment template
├── 📄 .env                           # Local environment (DO NOT COMMIT)
├── 📄 .gitignore                     # Git ignore rules
├── 📄 .eslintrc.js                   # ESLint configuration
│
├── 📄 README.md                      # Quick start guide
├── 📄 DEPLOYMENT.md                  # cPanel & VPS setup guide
├── 📄 API.md                         # Complete API documentation
├── 📄 ENV.md                         # Environment variables guide
├── 📄 IMPLEMENTATION.md              # Implementation summary
│
├── 📄 ecosystem.config.js            # PM2 process manager config
├── 📄 vitest.config.ts               # Vitest configuration
├── 📄 docker-compose.yml             # Docker Compose setup
├── 📄 Dockerfile                     # Docker image definition
├── 📄 .cpanel.yml                    # cPanel deployment config
│
├── 📄 setup.sh                       # Linux/Mac quick start script
└── 📄 setup.bat                      # Windows quick start script
```

---

## Key Files Explained

### Entry Point

**`src/index.ts`**
- Express server initialization
- Middleware setup (helmet, CORS, rate limiting)
- Route registration
- Graceful shutdown handling
- Redis initialization

### Services

**`src/services/DataScraperService.ts`**
- Main business logic
- Web scraping logic for exchange rates
- Fuel price retrieval
- NEPA status aggregation
- News fetching
- Cache management

### Routes

**`src/routes/api.ts`**
- RESTful API endpoints
- Request validation
- Error handling
- Response formatting

### Configuration

**`src/config/redis.ts`**
- Redis connection initialization
- Connection pooling
- Error handling and reconnection

### Utilities

**`src/utils/logger.ts`**
- Winston logger setup
- Log file management
- Log rotation
- Multi-transport logging

**`src/utils/constants.ts`**
- Cache duration constants
- Configuration values
- Nigerian states list
- Currency mappings

### Types

**`src/types/index.ts`**
- TypeScript interfaces
- Type definitions
- API response types

### Configuration Files

**`package.json`**
- Project metadata
- Dependencies (production)
- DevDependencies
- NPM scripts

**`tsconfig.json`**
- TypeScript compiler options
- Target ES version
- Module resolution

**`.env.example`**
- Template for environment variables
- Documentation of each variable

**`ecosystem.config.js`**
- PM2 process management
- Cluster configuration
- Memory limits
- Log files

**`docker-compose.yml`**
- Multi-container setup
- API service
- Redis service
- Volume management

---

## Module Dependencies

### Production Dependencies

```
express
├── body-parser (built-in)
├── cors
└── helmet

axios
├── Node HTTP client
└── Used for web scraping

cheerio
├── jQuery-like HTML parsing
└── Extract data from web pages

redis
├── Redis client
└── Caching layer

winston
├── Logger
└── File rotation

express-rate-limit
└── Rate limiting middleware
```

### Development Dependencies

```
typescript
└── Type checking

tsx
└── TypeScript execution

vitest
└── Testing framework

eslint
└── Code linting
```

---

## Data Flow

```
┌─────────────────┐
│   HTTP Request  │
│  (GET /api/*)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Express Router (api.ts)│
│  - Validation           │
│  - Rate limiting        │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ DataScraperService          │
│ 1. Check Redis Cache        │
│ 2. If miss, fetch data      │
│ 3. Parse/transform data     │
│ 4. Store in Redis           │
│ 5. Return to client         │
└────────┬───────┬────────────┘
         │       │
         ▼       ▼
    ┌─────────────────┐
    │  Redis Cache    │
    │  5m - 1hr TTL   │
    └─────────────────┘
         ▲
         │
    ┌────────────────────────┐
    │ External Data Sources: │
    │ - AbokiFX              │
    │ - CBN                  │
    │ - News APIs            │
    └────────────────────────┘
         ▲
         │
    HTTP Requests (axios)
```

---

## Request/Response Cycle

### Example: GET /api/exchange-rates

**Request:**
```
GET /api/exchange-rates HTTP/1.1
Host: api.yourdomain.com
Accept: application/json
```

**Processing:**
```
1. Rate limiter checks IP
2. CORS validation
3. Route handler (routes/api.ts)
4. Call DataScraperService.getExchangeRates()
5. Check Redis cache
6. If miss: Scrape AbokiFX or CBN
7. Cache result (5 minutes)
8. Return response
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "currency": "US Dollar",
      "buy": 1550.00,
      "sell": 1560.00,
      "official": 1500.00
    }
  ],
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

---

## Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `src/` | Source TypeScript files |
| `dist/` | Compiled JavaScript output |
| `logs/` | Application log files |
| `node_modules/` | Installed dependencies |
| Root | Configuration & documentation |

---

## File Extensions

| Extension | Purpose |
|-----------|---------|
| `.ts` | TypeScript source files |
| `.js` | JavaScript files (config) |
| `.json` | Configuration & lock files |
| `.md` | Markdown documentation |
| `.env` | Environment variables |
| `.log` | Application logs |
| `.yml` / `.yaml` | YAML configuration |

---

## Build & Compilation

```
Source Code (src/)
       │
       ▼
TypeScript Compiler (tsc)
       │
       ▼
JavaScript (dist/)
       │
       ▼
Node.js Runtime
       │
       ▼
API Server (http://localhost:5000)
```

### Generated During Build
```bash
npm run build
```
Creates:
- `dist/` directory
- Compiled `.js` files
- Source maps (optional)

### Generated at Runtime
```bash
npm run dev
# or
npm start
```
Creates:
- `logs/` directory
- `logs/combined.log` (all logs)
- `logs/error.log` (errors only)

---

## Code Organization Principles

### By Feature (src/ structure)

1. **config/** - External service connections
2. **services/** - Business logic
3. **routes/** - API endpoints
4. **types/** - Type definitions
5. **utils/** - Shared utilities

### By Layer

- **Presentation** → routes/
- **Business Logic** → services/
- **Data Access** → config/ (Redis)
- **Utilities** → utils/
- **Types** → types/

---

## Quick File Locations

| Need | Location |
|------|----------|
| Add new endpoint | `src/routes/api.ts` |
| Add new data source | `src/services/DataScraperService.ts` |
| Configure logging | `src/utils/logger.ts` |
| Change constants | `src/utils/constants.ts` |
| Add type definition | `src/types/index.ts` |
| Modify Redis | `src/config/redis.ts` |
| Update environment | `.env` |
| Configure PM2 | `ecosystem.config.js` |
| Configure TypeScript | `tsconfig.json` |
| Configure ESLint | `.eslintrc.js` |
| Deployment guide | `DEPLOYMENT.md` |
| API docs | `API.md` |
| Environment guide | `ENV.md` |

---

## Size Reference

```
Typical Project Size:
├── src/              ~5-10 KB
├── dist/            ~20-30 KB (compiled)
├── node_modules/    ~500+ MB
└── Docs             ~100 KB
```

---

## Important Notes

### Do Not Commit
- `.env` - Contains sensitive data
- `dist/` - Can be regenerated with `npm run build`
- `logs/` - Contains application logs
- `node_modules/` - Can be reinstalled with `npm install`

### Safe to Commit
- `src/` - All source code
- `.env.example` - Template
- `package.json` - Dependency list
- All `.md` files - Documentation
- `.gitignore` - Ignore rules
- All configuration files

### Auto-Generated on First Run
- `node_modules/` → `npm install`
- `dist/` → `npm run build`
- `logs/` → First API request

---

This structure ensures:
- ✅ Clear separation of concerns
- ✅ Easy to navigate
- ✅ Scalable architecture
- ✅ Type-safe codebase
- ✅ Production-ready setup
