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

  // No cache for auth and user-specific endpoints
  if (path.includes('/auth') || path.includes('/user') || path.includes('/payment')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return next();
  }

  // Short cache for data endpoints (5 minutes)
  if (path.includes('/data')) {
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    return next();
  }

  // Medium cache for stories and static content (1 hour)
  if (path.includes('/story') || path.includes('/template')) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    return next();
  }

  // Default: no cache for safety
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
