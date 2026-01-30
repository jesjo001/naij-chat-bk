# API Documentation

Base URL: `https://api.yourdomain.com` or `http://localhost:5000`

## Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

Check if the API is running and healthy.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-30T10:00:00.000Z",
  "environment": "production",
  "uptime": 3600.5
}
```

**Status Codes:**
- `200` - Server is healthy

---

### 2. Exchange Rates

**Endpoint:** `GET /api/exchange-rates`

Get current exchange rates for major currencies against Nigerian Naira.

**Query Parameters:** None

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
    },
    {
      "currency": "British Pound",
      "buy": 1950.00,
      "sell": 1970.00,
      "official": 1900.00
    },
    {
      "currency": "Euro",
      "buy": 1700.00,
      "sell": 1720.00,
      "official": 1650.00
    }
  ],
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

**Notes:**
- Data cached for 5 minutes
- `buy` - Black market/parallel market buying rate
- `sell` - Black market/parallel market selling rate
- `official` - Central Bank of Nigeria official rate

---

### 3. Fuel Prices

**Endpoint:** `GET /api/fuel-prices`

Get current fuel prices across Nigerian states.

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "state": "Lagos",
      "city": "Lagos Mainland",
      "petrol": 620,
      "diesel": 900,
      "kerosene": 1200,
      "last_updated": "2024-01-30T10:00:00.000Z"
    },
    {
      "state": "Abuja",
      "city": "Central Area",
      "petrol": 650,
      "diesel": 920,
      "kerosene": 1250,
      "last_updated": "2024-01-30T10:00:00.000Z"
    }
  ],
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

**Notes:**
- Data cached for 1 hour
- Prices in Nigerian Naira (₦)
- Petrol = PMS, Diesel = AGO

---

### 4. NEPA Status

**Endpoint:** `GET /api/nepa-status`

Get power supply status for a specific location.

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `location` | string | No | Lagos | Nigerian state or city |

**Example:**
```
GET /api/nepa-status?location=Lagos
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": "Lagos",
    "status": "Power available",
    "last_update": "2024-01-30T10:00:00.000Z",
    "community_reports": [
      {
        "user": "@user1",
        "report": "Light dey here since morning",
        "time": "2 hours ago"
      },
      {
        "user": "@user2",
        "report": "Just restored now",
        "time": "1 hour ago"
      }
    ]
  },
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid location parameter
- `500` - Server error

**Notes:**
- Data cached for 5 minutes
- Status values: "Power available", "Power outage", "Intermittent supply", "Power expected soon"
- Community reports are crowdsourced updates

---

### 5. Nigerian News

**Endpoint:** `GET /api/news`

Get latest Nigerian news across various categories.

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "Naira Gains Against Dollar in Parallel Market",
      "source": "Business Day",
      "url": "https://businessday.ng/article",
      "summary": "The Naira appreciated to N890/$ in the parallel market amid improved dollar inflows...",
      "published_at": "2024-01-30T10:00:00.000Z",
      "category": "Business"
    },
    {
      "title": "Tech Startups Leading African Innovation",
      "source": "TechCrunch Africa",
      "url": "https://techcrunch.com/article",
      "summary": "Nigerian tech ecosystem continues to attract global investment and talent...",
      "published_at": "2024-01-30T08:30:00.000Z",
      "category": "Technology"
    }
  ],
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

**Notes:**
- Data cached for 15 minutes
- News sources include major Nigerian publications
- Categories: Business, Technology, Politics, Entertainment, Sports, Health, Education

---

### 6. All Data

**Endpoint:** `GET /api/all`

Get all available data in one request (exchange rates, fuel prices, and news).

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "data": {
    "exchangeRates": [ /* see exchange rates endpoint */ ],
    "fuelPrices": [ /* see fuel prices endpoint */ ],
    "news": [ /* see news endpoint */ ]
  },
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

**Notes:**
- Combines data from all endpoints
- Each data type has its own cache duration
- Useful for dashboard initialization

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": "Error message describing what went wrong",
  "timestamp": "2024-01-30T10:00:00.000Z"
}
```

### Common Error Codes
| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid parameters |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP address
- **Headers:** Include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## CORS Headers

The API supports CORS requests from configured origins:
- Development: `http://localhost:5173`, `http://localhost:3000`
- Production: Configure in `.env` `CORS_ORIGIN` variable

**Example:**
```javascript
fetch('https://api.yourdomain.com/api/exchange-rates')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## Caching Strategy

| Endpoint | Cache Duration | Key |
|----------|-----------------|-----|
| Exchange Rates | 5 minutes | `exchange_rates` |
| Fuel Prices | 1 hour | `fuel_prices` |
| NEPA Status | 5 minutes | `nepa_status:{location}` |
| News | 15 minutes | `nigerian_news` |

**Note:** Caching requires Redis. If Redis is unavailable, requests are not cached.

---

## Example Usage

### JavaScript/Fetch API
```javascript
// Get exchange rates
const rates = await fetch('https://api.yourdomain.com/api/exchange-rates')
  .then(r => r.json());

// Get fuel prices with error handling
fetch('https://api.yourdomain.com/api/fuel-prices')
  .then(res => {
    if (!res.ok) throw new Error('API Error');
    return res.json();
  })
  .then(data => console.log(data.data))
  .catch(err => console.error('Failed:', err));

// Get NEPA status for specific location
const nepaStatus = await fetch(
  'https://api.yourdomain.com/api/nepa-status?location=Abuja'
).then(r => r.json());
```

### Python
```python
import requests

# Get all data
response = requests.get('https://api.yourdomain.com/api/all')
data = response.json()

if data['success']:
    print(f"Exchange Rates: {data['data']['exchangeRates']}")
    print(f"Fuel Prices: {data['data']['fuelPrices']}")
    print(f"News: {data['data']['news']}")
```

### cURL
```bash
# Get exchange rates
curl -X GET "https://api.yourdomain.com/api/exchange-rates"

# Get NEPA status
curl -X GET "https://api.yourdomain.com/api/nepa-status?location=Lagos"

# Get all data
curl -X GET "https://api.yourdomain.com/api/all" \
  -H "Accept: application/json"
```

---

## Webhook Support (Future)

Webhooks will be available for real-time updates on data changes. Subscribe to events like:
- `exchange_rate.updated`
- `fuel_price.updated`
- `nepa_status.changed`
- `news.published`

---

## Support

For API issues or questions:
1. Check endpoint status at `/health`
2. Review logs for error details
3. Open an issue on GitHub
4. Contact: support@yourdomain.com
