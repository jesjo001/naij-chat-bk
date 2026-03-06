module.exports = {
  apps: [
    {
      name: 'naija-sabi-api',
      script: './dist/index.js',

      // Cluster mode — use max CPUs but cap at 4 for shared VPS
      instances: process.env.PM2_INSTANCES || 'max',
      exec_mode: 'cluster',

      // Auto-restart on memory leak (lower for shared VPS)
      max_memory_restart: process.env.PM2_MAX_MEMORY || '400M',

      // Environment
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        UV_THREADPOOL_SIZE: 16, // Increase libuv thread pool for I/O
      },

      // Graceful shutdown
      kill_timeout: 8000,
      listen_timeout: 5000,
      shutdown_with_message: true,  // Send 'shutdown' message to workers

      // Crash recovery
      max_restarts: 15,
      min_uptime: '15s',
      restart_delay: 2000,
      exp_backoff_restart_delay: 100, // Exponential backoff on crash loop

      // Scheduled restart — 3am WAT daily to flush memory leaks
      cron_restart: '0 2 * * *',  // 2am UTC = 3am WAT

      // Logs
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_file: './logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      time: true,

      // Log rotation (keep last 10 files, 10MB each)
      log_type: 'json',

      // Watch — OFF in production
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git', 'dist'],

      // Node.js args for performance
      node_args: [
        '--max-old-space-size=512',  // 512MB heap limit
        '--optimize-for-size',       // Reduce memory usage
      ],
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER || 'ubuntu',
      host: process.env.DEPLOY_HOST || 'your-vps-ip',
      ref: 'origin/main',
      repo: process.env.DEPLOY_REPO || 'git@github.com:your-org/naija-gpt.git',
      path: '/var/www/naija-sabi-api',
      'pre-deploy-local': '',
      'post-deploy':
        'cd backend && npm ci --omit=dev && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
