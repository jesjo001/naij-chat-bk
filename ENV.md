# Environment Variables Guide

## Required Setup

1. **Copy the template:**
   ```bash
   cp .env.example .env
   ```

2. **Update with your values:**
   ```bash
   nano .env  # or use your preferred editor
   ```

## Variables

### `NODE_ENV`
**Type:** `development | production`  
**Default:** `development`  
**Description:** Determines which environment the app runs in.
- `development` - Shows detailed errors, console logging, hot reload
- `production` - Optimized, minimal logging, error hiding

**Example:**
```env
NODE_ENV=production
```

---

### `PORT`
**Type:** `number`  
**Default:** `5000`  
**Description:** The port the Express server listens on.

**Example:**
```env
PORT=5000
```

**cPanel/VPS Notes:**
- Make sure the port is not blocked by firewall
- Use reverse proxy (Apache/Nginx) to expose on port 80/443
- If port is already in use, PM2 will fail to start

---

### `REDIS_URL`
**Type:** `string | empty`  
**Default:** `redis://localhost:6379`  
**Description:** Redis connection string for caching. Leave empty to disable caching.

**Examples:**
```env
# Local Redis
REDIS_URL=redis://localhost:6379

# With password
REDIS_URL=redis://:password@localhost:6379

# Remote Redis
REDIS_URL=redis://redis-server.example.com:6379

# Disable caching
REDIS_URL=
```

**cPanel/VPS Notes:**
- Install Redis: `sudo apt install redis-server` (Ubuntu)
- Start: `sudo systemctl start redis-server`
- Check connection: `redis-cli ping` (should return PONG)
- If unavailable, app will work but without caching

---

### `LOG_LEVEL`
**Type:** `error | warn | info | debug`  
**Default:** `info`  
**Description:** Minimum severity level for logs to be recorded.

**Levels (from lowest to highest):**
1. `error` - Only error messages
2. `warn` - Warnings and errors
3. `info` - Information, warnings, errors (recommended)
4. `debug` - All messages including debug

**Examples:**
```env
LOG_LEVEL=info      # Recommended for production
LOG_LEVEL=debug     # Development/troubleshooting
LOG_LEVEL=error     # Minimal logging
```

**Output Locations:**
- Console (terminal)
- `logs/combined.log` (all messages)
- `logs/error.log` (errors only)

---

### `CORS_ORIGIN`
**Type:** `string (comma-separated URLs)`  
**Default:** `http://localhost:5173`  
**Description:** Allowed origins for CORS requests. Multiple origins separated by commas.

**Examples:**
```env
# Development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Production
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# Multiple domains
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com,https://admin.yourdomain.com
```

**Important:**
- Must match your frontend domain exactly
- Include protocol (http/https)
- No trailing slashes
- If frontend requests are blocked, check this setting

---

### `API_TIMEOUT`
**Type:** `number (milliseconds)`  
**Default:** `30000`  
**Description:** Maximum time to wait for external API responses (exchange rates, news, etc.).

**Examples:**
```env
API_TIMEOUT=30000   # 30 seconds (default)
API_TIMEOUT=60000   # 60 seconds (slower connections)
API_TIMEOUT=10000   # 10 seconds (fast timeout)
```

**Notes:**
- Increase for unreliable/slow connections
- Decrease to fail faster on network issues
- Used for scraping AbokiFX, CBN, news sources

---

## Environment-Specific Examples

### Development
```env
NODE_ENV=development
PORT=5000
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
API_TIMEOUT=30000
```

### Staging
```env
NODE_ENV=production
PORT=5000
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
CORS_ORIGIN=https://staging.yourdomain.com
API_TIMEOUT=30000
```

### Production (cPanel)
```env
NODE_ENV=production
PORT=5000
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
API_TIMEOUT=30000
```

### Production (VPS)
```env
NODE_ENV=production
PORT=3000
REDIS_URL=redis://127.0.0.1:6379
LOG_LEVEL=warn
CORS_ORIGIN=https://yourdomain.com,https://api.yourdomain.com
API_TIMEOUT=45000
```

---

## Platform-Specific Setup

### cPanel Setup

1. **Access WHM/cPanel**
   - Go to Terminal/SSH
   - Or File Manager to create .env

2. **Create .env in subdirectory**
   ```
   /home/username/public_html/api/.env
   ```

3. **Set correct permissions**
   ```bash
   chmod 644 .env
   ```

4. **Verify environment variables are read**
   ```bash
   pm2 start dist/index.js --name "naija-sabi-api"
   pm2 logs
   ```

### VPS Setup

1. **SSH into VPS**
   ```bash
   ssh user@your-vps-ip
   cd /var/www/naija-sabi-backend
   ```

2. **Create .env file**
   ```bash
   nano .env
   ```

3. **Set permissions**
   ```bash
   chmod 600 .env
   chown app-user:app-group .env
   ```

4. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 logs
   ```

### Docker Setup

Docker reads environment variables from:
1. `.env` file (auto-loaded)
2. `docker-compose.yml` (overrides .env)
3. Command line: `docker run -e NODE_ENV=production`

**Example with docker-compose:**
```yaml
services:
  api:
    environment:
      NODE_ENV: production
      PORT: 5000
      REDIS_URL: redis://redis:6379
      LOG_LEVEL: info
      CORS_ORIGIN: https://yourdomain.com
```

---

## Troubleshooting

### "Cannot find module dotenv"
- Install dependencies: `npm install`
- Clear cache: `rm -rf node_modules && npm install`

### "Redis connection refused"
- Check Redis is running: `redis-cli ping`
- Start Redis: `sudo systemctl start redis-server`
- Update REDIS_URL if remote

### "CORS error from frontend"
- Verify CORS_ORIGIN matches frontend domain
- Include protocol (http/https)
- Separate multiple origins with commas
- No trailing slashes

### "Timeout errors on exchange rates"
- Increase API_TIMEOUT to 60000
- Check internet connection
- Verify scraper targets are online

### "Port already in use"
- Find process: `lsof -i :5000`
- Kill process: `kill -9 <PID>`
- Or change PORT in .env

### "Logs not appearing"
- Check LOG_LEVEL is not `error` (try `info`)
- Verify logs directory exists: `ls logs/`
- Check file permissions on logs directory

---

## Security Notes

⚠️ **IMPORTANT:**
- **Never commit .env to git** - It contains sensitive data
- **Add to .gitignore** - Already done in this project
- **Use strong passwords** - For Redis if remote
- **Limit CORS origins** - Don't use `*` in production
- **Use HTTPS** - Always in production
- **Rotate secrets** - Change values periodically

---

## Performance Tuning

### For High Traffic

```env
NODE_ENV=production
LOG_LEVEL=warn          # Reduce logging overhead
API_TIMEOUT=20000       # Faster timeout
PORT=5000
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=https://yourdomain.com
```

### For Low Bandwidth

```env
NODE_ENV=production
LOG_LEVEL=info
API_TIMEOUT=60000       # Allow slower responses
PORT=5000
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=https://yourdomain.com
```

### For Development

```env
NODE_ENV=development
LOG_LEVEL=debug         # Detailed debugging
API_TIMEOUT=30000
PORT=5000
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

---

## Quick Reference

| Variable | Type | Required | Production Default |
|----------|------|----------|-------------------|
| NODE_ENV | string | No | development |
| PORT | number | No | 5000 |
| REDIS_URL | string | No | redis://localhost:6379 |
| LOG_LEVEL | string | No | info |
| CORS_ORIGIN | string | Yes | (set to frontend URL) |
| API_TIMEOUT | number | No | 30000 |

---

## Need Help?

1. Check `.env.example` for template
2. Review logs: `tail -f logs/combined.log`
3. Test connectivity: `redis-cli ping`
4. Verify port: `netstat -tulpn | grep 5000`
5. Check PM2: `pm2 status` and `pm2 logs`
