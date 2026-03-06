/**
 * HTTP Caching Middleware
 * Adds cache control headers and ETag support for API responses
 */

import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * Generate ETag from response body
 */
function generateETag(body: string): string {
  return crypto.createHash('md5').update(body).digest('hex');
}

/**
 * Cache control middleware for static/immutable content
 */
export const cacheControl = (maxAge: number = 3600) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    next();
  };
};

/**
 * No cache middleware for dynamic/sensitive content
 */
export const noCache = (_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
};

/**
 * ETag middleware for conditional requests
 */
export const etagMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  res.send = function (body: any): Response {
    // Guard: never touch headers on a response that is already on the wire
    if (res.headersSent) {
      return originalSend.call(this, body);
    }

    // Generate ETag for response body
    if (body && typeof body === 'string') {
      const etag = generateETag(body);
      res.setHeader('ETag', `"${etag}"`);

      // Check if client has cached version
      const clientETag = req.headers['if-none-match'];
      if (clientETag === `"${etag}"`) {
        res.status(304).end();
        return res;
      }
    }

    return originalSend.call(this, body);
  };

  next();
};

/**
 * Smart caching middleware - applies appropriate cache headers based on route
 */
export const smartCache = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;

  // Never cache auth, user-specific, or payment endpoints
  if (path.includes('/auth') || path.includes('/user') || path.includes('/payment')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    return next();
  }

  // Never cache chat (streaming / user-specific AI responses)
  if (path.includes('/chat')) {
    res.setHeader('Cache-Control', 'no-store, private');
    return next();
  }

  // Health check — very short cache to reduce DB pings from load balancers
  if (path === '/health') {
    res.setHeader('Cache-Control', 'public, max-age=10, s-maxage=10');
    return next();
  }

  // Exchange rates / live data — 10 min cache with stale fallback
  if (path.includes('/finance') || path.includes('/data')) {
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60, stale-if-error=3600');
    return next();
  }

  // Stories, templates, static content — 1 hour with stale fallback
  if (path.includes('/story') || path.includes('/template') || path.includes('/personality')) {
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=300, stale-if-error=86400');
    return next();
  }

  // Agents / tools — 5 min
  if (path.includes('/agents') || path.includes('/tools')) {
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return next();
  }

  // Default: conservative no-cache for everything else
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');
  next();
};

/**
 * Last-Modified middleware for time-based caching
 */
export const lastModified = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body: any): Response {
    // Add Last-Modified header if data has timestamp
    if (body && (body.updatedAt || body.createdAt)) {
      const lastMod = new Date(body.updatedAt || body.createdAt);
      res.setHeader('Last-Modified', lastMod.toUTCString());

      // Check If-Modified-Since header
      const ifModifiedSince = req.headers['if-modified-since'];
      if (ifModifiedSince) {
        const clientDate = new Date(ifModifiedSince);
        if (clientDate >= lastMod) {
          res.status(304).end();
          return res;
        }
      }
    }

    return originalJson.call(this, body);
  };

  next();
};
