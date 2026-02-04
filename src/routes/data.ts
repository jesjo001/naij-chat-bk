import { Router } from 'express';
import { asyncHandler } from '../middleware/index';
import { DataController } from '../controllers/DataController';

const router = Router();
const dataController = new DataController();

/**
 * GET /api/data/exchange-rates
 * Get current exchange rates for major currencies
 */
router.get('/exchange-rates', asyncHandler(dataController.getExchangeRates));

/**
 * GET /api/data/fuel-prices
 * Get fuel prices across Nigerian states
 */
router.get('/fuel-prices', asyncHandler(dataController.getFuelPrices));

/**
 * GET /api/data/nepa-status
 * Get current NEPA/EEDC power status
 */
router.get('/nepa-status', asyncHandler(dataController.getNepaStatus));

/**
 * GET /api/data/news
 * Get latest news from Nigeria
 */
router.get('/news', asyncHandler(dataController.getNews));

/**
 * GET /api/data/flights
 * Get flight prices and availability
 */
router.get('/flights', asyncHandler(dataController.getFlightPrices));

/**
 * GET /api/data/food-prices
 * Get food commodity prices across Nigeria
 */
router.get('/food-prices', asyncHandler(dataController.getFoodPrices));

/**
 * GET /api/data/stocks
 * Get Nigerian stock market data (NGX)
 */
router.get('/stocks', asyncHandler(dataController.getStockMarketInfo));

/**
 * GET /api/data/all
 * Get all aggregated data (all data sources combined)
 */
router.get('/all', asyncHandler(dataController.getAllData));

export default router;
