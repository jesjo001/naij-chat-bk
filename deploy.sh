#!/bin/bash
# =============================================================
# deploy.sh — One-command deployment for Naija Sabi Chat API
# Usage:  bash deploy.sh [branch]
# =============================================================

set -euo pipefail

BRANCH="${1:-main}"
APP_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$APP_DIR/logs/deploy.log"
TIMESTAMP="$(date '+%Y-%m-%d %H:%M:%S')"

# Text colours
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

log()   { echo -e "${GREEN}[DEPLOY]${NC} $1" | tee -a "$LOG_FILE"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"  | tee -a "$LOG_FILE"; }
error() { echo -e "${RED}[ERROR]${NC} $1"     | tee -a "$LOG_FILE"; exit 1; }

mkdir -p "$APP_DIR/logs"
echo "==== Deploy started: $TIMESTAMP ====" >> "$LOG_FILE"

# ---- 1. Verify prerequisites ----
log "Checking prerequisites..."
command -v node  >/dev/null 2>&1 || error "Node.js not found"
command -v npm   >/dev/null 2>&1 || error "npm not found"
command -v pm2   >/dev/null 2>&1 || error "PM2 not found. Install: npm i -g pm2"
command -v git   >/dev/null 2>&1 || error "Git not found"

NODE_VER=$(node -e "process.exit(parseInt(process.version.slice(1)) < 18 ? 1 : 0)" 2>&1 || true)
node -e "if(parseInt(process.version.slice(1))<18){console.error('Node 18+ required');process.exit(1)}" || error "Node.js 18+ required"

# ---- 2. Pull latest code ----
log "Pulling latest code from origin/$BRANCH..."
cd "$APP_DIR"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH" || error "git pull failed"

# ---- 3. Install production dependencies ----
log "Installing dependencies (npm ci --omit=dev)..."
npm ci --omit=dev || error "npm ci failed"

# ---- 4. Build TypeScript ----
log "Compiling TypeScript..."
npm run build || error "TypeScript compilation failed"

# Check dist folder exists
[ -d "$APP_DIR/dist" ] || error "dist/ directory not found after build"
[ -f "$APP_DIR/dist/index.js" ] || error "dist/index.js not found after build"

# ---- 5. Load environment ----
if [ -f "$APP_DIR/.env.production" ]; then
    log "Loading .env.production..."
    export $(grep -v '^#' "$APP_DIR/.env.production" | xargs)
else
    warn ".env.production not found — relying on existing environment variables"
fi

# ---- 6. Reload PM2 (zero-downtime) ----
log "Reloading PM2 app (zero-downtime)..."
if pm2 describe naija-sabi-chat > /dev/null 2>&1; then
    pm2 reload ecosystem.config.js --env production --update-env
else
    log "App not running — starting fresh..."
    pm2 start ecosystem.config.js --env production
fi

# Save PM2 process list so it survives VPS reboots
pm2 save

# ---- 7. Setup PM2 startup on reboot (first deploy only) ----
if [ ! -f "$APP_DIR/.pm2_startup_done" ]; then
    log "Setting up PM2 startup script..."
    pm2 startup | tail -1 | bash || warn "Could not set PM2 startup (may need sudo)"
    touch "$APP_DIR/.pm2_startup_done"
fi

# ---- 8. Rotate logs (keep last 30 days) ----
if command -v pm2-logrotate > /dev/null 2>&1; then
    pm2 set pm2-logrotate:max_size 50M
    pm2 set pm2-logrotate:retain 7
    pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss
fi

# Clean deploy logs older than 30 days
find "$APP_DIR/logs" -name "deploy.log*" -mtime +30 -delete 2>/dev/null || true

# ---- 9. Health check ----
log "Running health check..."
sleep 3  # Give PM2 time to start workers

HEALTH_URL="http://localhost:${PORT:-5000}/health"
MAX_RETRIES=10
RETRY=0

until curl -sf "$HEALTH_URL" > /dev/null 2>&1; do
    RETRY=$((RETRY+1))
    if [ $RETRY -ge $MAX_RETRIES ]; then
        pm2 logs naija-sabi-chat --lines 50
        error "Health check failed after $MAX_RETRIES attempts — check logs above"
    fi
    log "Waiting for server... attempt $RETRY/$MAX_RETRIES"
    sleep 2
done

log "Health check passed ✓"

# ---- 10. Reload Nginx (if installed and config is valid) ----
if command -v nginx > /dev/null 2>&1; then
    if nginx -t 2>/dev/null; then
        log "Reloading Nginx..."
        sudo nginx -s reload || warn "nginx reload failed (check sudo permissions)"
    else
        warn "Nginx config test failed — skipping reload"
    fi
fi

# ---- Done ----
echo ""
log "Deployment complete!"
log "  Branch: $BRANCH"
log "  Node:   $(node -v)"
log "  PM2:    $(pm2 -v)"
echo ""
pm2 status
