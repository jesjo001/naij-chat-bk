# Quick Reference Card

## 🚀 Start Here

### Local Development (3 commands)
```bash
npm install              # Install dependencies
cp .env.example .env     # Create config file
npm run dev              # Start development server
```

Access at: **http://localhost:5000**

---

## 📡 API Endpoints Quick Map

| Endpoint | Purpose | Cache |
|----------|---------|-------|
| `GET /health` | Server status | None |
| `GET /api/exchange-rates` | Currency rates | 5 min |
| `GET /api/fuel-prices` | Fuel prices | 1 hour |
| `GET /api/nepa-status?location=Lagos` | Power status | 5 min |
| `GET /api/news` | Latest news | 15 min |
| `GET /api/all` | All data | Mixed |

---

## 🔧 Common Commands

```bash
npm run build          # Compile TypeScript
npm start              # Run production
npm run dev            # Development mode
npm test               # Run tests
npm run lint           # Check code style
pm2 logs               # View logs
pm2 restart all        # Restart app
pm2 stop all           # Stop app
pm2 status             # Check status
pm2 monit              # Monitor resources
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Configuration (DO NOT COMMIT) |
| `src/index.ts` | Main server file |
| `src/services/DataScraperService.ts` | Business logic |
| `src/routes/api.ts` | API endpoints |
| `ecosystem.config.js` | PM2 config |
| `package.json` | Dependencies |

---

## ⚙️ Environment Variables

```env
NODE_ENV=development              # development or production
PORT=5000                         # Server port
REDIS_URL=redis://localhost:6379  # Redis connection
LOG_LEVEL=info                    # Logging level
CORS_ORIGIN=http://localhost:5173 # Frontend URL
API_TIMEOUT=30000                 # Request timeout (ms)
```

---

## 🚀 Deployment Quick Links

### cPanel
See: `DEPLOYMENT.md` - cPanel Users section

**Quick steps:**
1. SSH into cPanel
2. Clone repo and setup
3. `npm install && npm run build`
4. `pm2 start dist/index.js`
5. Configure Apache reverse proxy

### VPS
See: `DEPLOYMENT.md` - VPS Users section

**Quick steps:**
1. Install Node.js
2. Clone repo
3. `npm install && npm run build`
4. `pm2 start dist/index.js`
5. Configure Nginx

### Docker
```bash
docker-compose up -d  # Start with Redis
```

---

## 🆘 Troubleshooting Quick Guide

### Port already in use
```bash
lsof -i :5000    # Find process
kill -9 <PID>    # Kill it
```

### CORS error
- Check CORS_ORIGIN in `.env`
- Includes protocol? (http:// or https://)
- Restart: `pm2 restart naija-sabi-api`

### Redis not connecting
```bash
redis-cli ping    # Should return PONG
```

### Server won't start
```bash
pm2 logs          # Check error messages
npm run build     # Ensure build successful
```

### High memory usage
```bash
pm2 monit         # Check what's using memory
pm2 restart all   # Restart to free memory
```

---

## 📊 Health Check

```bash
# Quick health test
curl http://localhost:5000/health

# Expected response:
{
  "status": "healthy",
  "uptime": 3600.5
}
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": [...],
  "timestamp": "2024-01-30T10:00:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-30T10:00:00Z"
}
```

---

## 🔒 Security Checklist

- [ ] `.env` file NOT in git
- [ ] CORS_ORIGIN set to frontend domain
- [ ] HTTPS/SSL enabled in production
- [ ] Rate limiting active
- [ ] Helmet security headers enabled
- [ ] Error messages don't expose paths

---

## 📚 Documentation Map

| Question | Document |
|----------|----------|
| How to start? | `README.md` |
| How to deploy? | `DEPLOYMENT.md` |
| API reference? | `API.md` |
| Environment vars? | `ENV.md` |
| Project structure? | `STRUCTURE.md` |
| Before launch? | `CHECKLIST.md` |

---

## 💡 Pro Tips

1. **Caching matters** - Hit rates improve performance 2-10x
2. **Monitor logs** - `pm2 logs` catches 90% of issues
3. **Test locally first** - Use `npm run dev` before deploying
4. **Environment separation** - Different `.env` for each environment
5. **Backup before deploy** - Always have rollback plan
6. **Monitor memory** - `pm2 monit` prevents crashes
7. **Rate limit wisely** - Balance security with usability
8. **Log rotation** - Prevents disk space issues

---

## 🔗 Integration Example

```javascript
// Frontend code to call API
const API = 'https://api.yourdomain.com';

// Get exchange rates
fetch(`${API}/api/exchange-rates`)
  .then(r => r.json())
  .then(data => console.log(data.data));

// Get fuel prices
fetch(`${API}/api/fuel-prices`)
  .then(r => r.json())
  .then(data => console.log(data.data));
```

---

## 📞 Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | OK | All good |
| 400 | Bad request | Check query parameters |
| 429 | Too many requests | Wait before retrying |
| 500 | Server error | Check `pm2 logs` |

---

## ⏱️ Cache Duration Reference

- Exchange rates: **5 minutes**
- NEPA status: **5 minutes**
- News: **15 minutes**
- Fuel prices: **1 hour**

---

## 🎯 Common Tasks

### Add new endpoint
Edit: `src/routes/api.ts`

### Change cache duration
Edit: `src/services/DataScraperService.ts`

### Modify logging
Edit: `src/utils/logger.ts`

### Update constants
Edit: `src/utils/constants.ts`

### Change environment
Edit: `.env` file

---

## 📱 Mobile-Friendly API

All endpoints return JSON with proper CORS headers:
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "ISO-8601"
}
```

Consistent error responses for easy error handling.

---

## 🎓 Learning Path

1. Read `README.md` (5 min)
2. Run local setup (10 min)
3. Test API endpoints (5 min)
4. Read `API.md` (10 min)
5. Explore code structure (15 min)
6. Choose deployment (5 min)
7. Follow deployment guide (20-60 min)

**Total: 70-125 minutes to full production deployment**

---

## 🚀 Ready to Launch?

1. ✅ Code complete
2. ✅ Documentation complete  
3. ✅ Security implemented
4. ✅ Testing ready
5. ✅ Deployment guides ready

**You are ready! Pick your deployment method and go! 🎉**

---

**For detailed information, see the appropriate documentation file!**
