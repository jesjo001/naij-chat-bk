import { Request, Response, NextFunction } from 'express';
import { DataScraperService } from '../services/DataScraperService';
import { logger } from '../utils/logger';

export class DataController {
  private dataScraper: DataScraperService;

  constructor() {
    this.dataScraper = new DataScraperService();
  }

  /**
   * Get exchange rates
   */
  getExchangeRates = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching exchange rates');
      const data = await this.dataScraper.getExchangeRates();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching exchange rates', { error });
      next(error);
    }
  };

  /**
   * Get fuel prices
   */
  getFuelPrices = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching fuel prices');
      const data = await this.dataScraper.getFuelPrices();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching fuel prices', { error });
      next(error);
    }
  };

  /**
   * Get NEPA status
   */
  getNepaStatus = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching NEPA status');
      const data = await this.dataScraper.getNepaStatus('Lagos');
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching NEPA status', { error });
      next(error);
    }
  };

  /**
   * Get news
   */
  getNews = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching news');
      const data = await this.dataScraper.getNigerianNews();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching news', { error });
      next(error);
    }
  };

  /**
   * Get flight prices
   */
  getFlightPrices = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching flight prices');
      const data = await this.dataScraper.getFlightPrices();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching flight prices', { error });
      next(error);
    }
  };

  /**
   * Get food prices
   */
  getFoodPrices = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching food prices');
      const data = await this.dataScraper.getFoodPrices();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching food prices', { error });
      next(error);
    }
  };

  /**
   * Get stock market data
   */
  getStockMarketInfo = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching stock market data');
      const data = await this.dataScraper.getStockMarketInfo();
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching stock market data', { error });
      next(error);
    }
  };

  /**
   * Get all data (aggregated)
   */
  getAllData = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info('Fetching all aggregated data');
      const [exchangeRates, fuelPrices, nepaStatus, news, flights, foodPrices, stocks] =
        await Promise.all([
          this.dataScraper.getExchangeRates(),
          this.dataScraper.getFuelPrices(),
          this.dataScraper.getNepaStatus('Lagos'),
          this.dataScraper.getNigerianNews(),
          this.dataScraper.getFlightPrices(),
          this.dataScraper.getFoodPrices(),
          this.dataScraper.getStockMarketInfo(),
        ]);

      const data = {
        exchangeRates,
        fuelPrices,
        nepaStatus,
        news,
        flights,
        foodPrices,
        stocks,
        timestamp: new Date().toISOString(),
      };

      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Error fetching all data', { error });
      next(error);
    }
  };
}
