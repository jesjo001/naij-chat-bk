# Deployment Guide: cPanel & VPS

## Quick Start

### For cPanel Users

#### 1. SSH into Your Server
```bash
ssh username@yourdomain.com
cd ~/public_html
# or cd ~/naija-sabi-chat/backend
```

#### 2. Clone & Setup
```bash
git clone <your-repo-url> naija-sabi-backend
cd naija-sabi-backend
cp .env.example .env
```

#### 3. Edit Environment Variables
```bash
nano .env
# Update these:
# NODE_ENV=production
# PORT=5000
# REDIS_URL=redis://localhost:6379
# CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
```

#### 4. Install & Build
```bash
npm install
npm run build
```

#### 5. Start with PM2
```bash
npm install -g pm2
pm2 start dist/index.js --name "naija-sabi-api" --env production
pm2 startup
pm2 save
```

#### 6. Configure Apache Reverse Proxy
In cPanel:
1. Go to **Addon Domains** or **Parked Domains**
2. Create subdomain: `api.yourdomain.com`
3. Edit `.htaccess` in the subdomain public directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite existing files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Forward all requests to the Node.js server
  RewriteRule ^(.*)$ http://127.0.0.1:5000/$1 [P]

  # WebSocket support
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteCond %{HTTP:Connection} upgrade [NC]
  RewriteRule ^/?(.*) "ws://127.0.0.1:5000/$1" [P,L]
</IfModule>

<IfModule mod_proxy.c>
  ProxyRequests On
  ProxyPreserveHost On
  ProxyPassReverse / http://127.0.0.1:5000/
</IfModule>
```

#### 7. Enable ModRewrites (if needed)
In cPanel > MultiPHP INI Editor, ensure the domain has:
```
mod_rewrite = On
mod_proxy = On
```

---

### For VPS Users (Ubuntu/CentOS)

#### 1. SSH into Your VPS
```bash
ssh root@your-vps-ip
```

#### 2. Update System
```bash
apt update && apt upgrade -y  # For Ubuntu
# or
yum update -y  # For CentOS
```

#### 3. Install Node.js
```bash
# Using NodeSource repository (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm (all distributions)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

#### 4. Install Redis (Optional but Recommended)
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server

# CentOS
sudo yum install redis
sudo systemctl start redis
sudo systemctl enable redis
```

#### 5. Install PM2 Globally
```bash
npm install -g pm2
pm2 completion install
```

#### 6. Clone & Setup Application
```bash
mkdir -p /var/www
cd /var/www
git clone <your-repo-url> naija-sabi-backend
cd naija-sabi-backend

cp .env.example .env
# Edit .env with production settings
nano .env
```

#### 7. Build & Deploy
```bash
npm install
npm run build
pm2 start dist/index.js --name "naija-sabi-api"
pm2 startup
pm2 save
```

#### 8. Install & Configure Nginx
```bash
# Ubuntu/Debian
sudo apt install nginx

# CentOS
sudo yum install nginx
```

Create Nginx configuration at `/etc/nginx/sites-available/naija-sabi`:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.yourdomain.com;

    # SSL Certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # Proxy settings
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/naija-sabi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 9. Setup SSL with Let's Encrypt
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d api.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## Monitoring & Maintenance

### Check PM2 Status
```bash
pm2 status
pm2 logs naija-sabi-api
pm2 monit
```

### View Logs
```bash
# Application logs
cat logs/combined.log
tail -f logs/error.log

# PM2 logs
pm2 logs
```

### Update Application
```bash
cd naija-sabi-backend
git pull origin main
npm install
npm run build
pm2 restart naija-sabi-api
```

### Restart Services
```bash
# Restart application
pm2 restart naija-sabi-api

# Restart Nginx
sudo systemctl restart nginx

# Restart Redis
sudo systemctl restart redis-server
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# or
netstat -tulpn | grep 5000

# Kill process
kill -9 <PID>
```

### Redis Connection Issues
```bash
# Check if Redis is running
redis-cli ping
# Should return: PONG

# Check Redis status
sudo systemctl status redis-server
```

### Nginx 502 Bad Gateway
1. Check if Node.js app is running: `pm2 status`
2. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify proxy settings in Nginx configuration
4. Restart both PM2 and Nginx

### High Memory Usage
```bash
# Monitor memory
pm2 monit

# Restart app
pm2 restart naija-sabi-api

# Set max memory (if needed)
pm2 start dist/index.js --max-memory-restart 500M
```

---

## Performance Optimization

### Enable Caching Headers
Add to Nginx config:
```nginx
location /api {
    expires 5m;
    add_header Cache-Control "public, max-age=300";
    proxy_pass http://127.0.0.1:5000;
}
```

### Rate Limiting
Already configured in Express, but can be adjusted in `src/index.ts`

### Database Connection Pooling
Configured in Redis config with connection timeout settings

---

## Security Checklist

- [ ] Environment variables set correctly (`.env`)
- [ ] CORS_ORIGIN limited to your domains
- [ ] SSL/TLS enabled and valid
- [ ] Firewall configured to block unnecessary ports
- [ ] PM2 running with non-root user
- [ ] Regular backups enabled
- [ ] Logs monitored for suspicious activity

---

## Support

For issues, check:
1. Application logs: `logs/combined.log`
2. PM2 logs: `pm2 logs`
3. Nginx/Apache error logs
4. System logs: `journalctl -xe`
