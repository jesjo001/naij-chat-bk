/**
 * Cluster Mode for Multi-Core Utilization
 * Spawns worker processes to maximize CPU usage
 * Provides zero-downtime restarts and crash recovery
 */

import cluster from 'cluster';
import os from 'os';
import { logger } from './utils/logger.js';

const numCPUs = os.cpus().length;
const WORKER_COUNT = process.env.WORKER_COUNT 
  ? parseInt(process.env.WORKER_COUNT, 10) 
  : Math.max(2, numCPUs - 1); // Leave 1 CPU for system

if (cluster.isPrimary) {
  logger.info(`🚀 Master process ${process.pid} starting...`);
  logger.info(`💪 Spawning ${WORKER_COUNT} worker processes`);

  // Track worker status
  const workers: { [key: number]: any } = {};

  // Fork workers
  for (let i = 0; i < WORKER_COUNT; i++) {
    const worker = cluster.fork();
    workers[worker.id] = worker;
  }

  // Handle worker events
  cluster.on('online', (worker) => {
    logger.info(`✅ Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.warn(`⚠️ Worker ${worker.process.pid} died (${signal || code})`);
    
    // Remove from tracking
    delete workers[worker.id];

    // Respawn worker
    logger.info('🔄 Spawning new worker...');
    const newWorker = cluster.fork();
    workers[newWorker.id] = newWorker;
  });

  // Graceful shutdown
  const shutdown = () => {
    logger.info('🛑 Master process shutting down...');
    
    // Tell all workers to shutdown gracefully
    for (const id in workers) {
      workers[id].send('shutdown');
    }

    // Force kill after 10 seconds
    setTimeout(() => {
      logger.warn('⚠️ Forcing shutdown...');
      process.exit(0);
    }, 10000);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  // Handle worker messages
  cluster.on('message', (worker, message) => {
    if (message === 'ready') {
      logger.info(`✅ Worker ${worker.process.pid} ready to accept connections`);
    }
  });

} else {
  // Worker process - import and start the server
  import('./index.js').then(() => {
    // Notify master that worker is ready
    process.send?.('ready');
  }).catch((error) => {
    logger.error('Failed to start worker:', error);
    process.exit(1);
  });

  // Handle shutdown message from master
  process.on('message', (msg) => {
    if (msg === 'shutdown') {
      logger.info(`Worker ${process.pid} shutting down...`);
      process.exit(0);
    }
  });
}
