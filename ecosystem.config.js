module.exports = {
  apps: [
    {
      name: 'naija-sabi-api',
      script: './dist/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      // Memory limit
      max_memory_restart: '500M',
      // Restart on file change (development only)
      ignore_watch: ['node_modules', 'logs', '.git'],
      // Logs
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_file: './logs/combined.log',
      time: true,
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      // Health check
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],
  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'git@github.com:your-org/naija-sabi-chat.git',
      path: '/var/www/naija-sabi-api',
      'post-deploy':
        'cd backend && npm install && npm run build && pm2 restart naija-sabi-api'
    }
  }
};
