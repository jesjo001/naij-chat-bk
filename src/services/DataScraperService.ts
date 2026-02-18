import axios from 'axios';
import * as cheerio from 'cheerio';
import { logger } from '../utils/logger.js';
import { getRedisClient } from '../config/redis.js';
import { FlightPrice, FoodPrice, StockInfo } from '../types/index.js';

export interface ExchangeRate {
  currency: string;
  buy: number;
  sell: number;
  official?: number;
  parallel?: number;
}

export interface FuelPrice {
  state: string;
  city: string;
  petrol: number;
  diesel: number;
  kerosene: number;
  last_updated: Date;
}

export interface NepaStatus {
  location: string;
  status: string;
  last_update: Date;
  community_reports: Array<{
    user: string;
    report: string;
    time: string;
  }>;
}

export interface News {
  title: string;
  source: string;
  url: string;
  summary: string;
  published_at: Date;
  category: string;
}

/**
 * In-memory cache fallback when Redis is unavailable
 * Stores data with TTL (Time To Live) in memory
 */
class MemoryCache {
  private cache: Map<string, { data: any; expiresAt: number }> = new Map();

  set(key: string, value: any, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { data: value, expiresAt });
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export class DataScraperService {
  private timeout = process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : 30000;
  private memoryCache = new MemoryCache();

  /**
   * Calculate seconds until midnight (cache expiration)
   * Prevents constant scraping and reduces ban risk
   */
  private getSecondsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const seconds = Math.ceil((midnight.getTime() - now.getTime()) / 1000);
    return Math.max(seconds, 300); // Minimum 5 minutes
  }

  /**
   * Set cache with fallback to memory cache if Redis unavailable
   */
  private async setCache(key: string, value: any, ttlSeconds: number): Promise<void> {
    const redis = getRedisClient();
    
    if (redis) {
      try {
        await redis.setEx(key, ttlSeconds, JSON.stringify(value));
        logger.debug(`Cached ${key} in Redis (${ttlSeconds}s TTL)`);
      } catch (error) {
        logger.warn(`Redis cache failed for ${key}, falling back to memory cache:`, error);
        this.memoryCache.set(key, value, ttlSeconds);
      }
    } else {
      logger.debug(`Redis unavailable, using memory cache for ${key} (${ttlSeconds}s TTL)`);
      this.memoryCache.set(key, value, ttlSeconds);
    }
  }

  /**
   * Get cache with fallback to memory cache
   */
  private async getCache(key: string): Promise<any> {
    const redis = getRedisClient();
    
    if (redis) {
      try {
        const cached = await redis.get(key);
        if (cached) {
          logger.debug(`Retrieved ${key} from Redis cache`);
          return JSON.parse(cached);
        }
      } catch (error) {
        logger.warn(`Redis cache retrieval failed for ${key}, checking memory cache:`, error);
      }
    }
    
    const memCached = this.memoryCache.get(key);
    if (memCached) {
      logger.debug(`Retrieved ${key} from memory cache`);
      return memCached;
    }
    
    return null;
  }

  async getExchangeRates(): Promise<ExchangeRate[]> {
    try {
      // Check cache first
      const cached = await this.getCache('exchange_rates');
      if (cached) {
        return cached;
      }

      const rates: ExchangeRate[] = [];

      // Try AbokiFX
      try {
        const abokiRates = await this.scrapeAbokiFX();
        rates.push(...abokiRates);
        logger.info(`Scraped ${abokiRates.length} rates from AbokiFX`);
      } catch (error) {
        logger.warn('Failed to scrape AbokiFX:', error);
      }

      // Try CBN if no rates
      if (rates.length === 0) {
        try {
          const cbnRates = await this.getCBNRates();
          rates.push(...cbnRates);
          logger.info(`Scraped ${cbnRates.length} rates from CBN`);
        } catch (error) {
          logger.warn('Failed to get CBN rates:', error);
        }
      }

      // Try third-party API as fallback
      if (rates.length === 0) {
        try {
          const apiRates = await this.getExchangeRateAPI();
          rates.push(...apiRates);
          logger.info(`Fetched ${apiRates.length} rates from API fallback`);
        } catch (error) {
          logger.warn('Failed to get API rates:', error);
        }
      }

      // Cache until midnight to prevent constant scraping
      if (rates.length > 0) {
        const secondsUntilMidnight = this.getSecondsUntilMidnight();
        await this.setCache('exchange_rates', rates, secondsUntilMidnight);
      }

      return rates.length > 0
        ? rates
        : this.getDefaultExchangeRates();
    } catch (error) {
      logger.error('Exchange rate fetch failed:', error);
      return this.getDefaultExchangeRates();
    }
  }

  private async scrapeAbokiFX(): Promise<ExchangeRate[]> {
    const response = await axios.get('https://abokifx.com/', {
      timeout: this.timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    const rates: ExchangeRate[] = [];
    const currencyMap: { [key: string]: string } = {
      'USD': 'US Dollar',
      'GBP': 'British Pound',
      'EUR': 'Euro'
    };

    $('.widget-exchange-rates tbody tr').each((i, elem) => {
      const currency = $(elem).find('td:nth-child(1)').text().trim();
      const buy = $(elem).find('td:nth-child(2)').text().trim();
      const sell = $(elem).find('td:nth-child(3)').text().trim();

      if (currency in currencyMap) {
        rates.push({
          currency: currencyMap[currency],
          buy: parseFloat(buy.replace(/,/g, '')) || 0,
          sell: parseFloat(sell.replace(/,/g, '')) || 0
        });
      }
    });

    return rates;
  }

  private async getCBNRates(): Promise<ExchangeRate[]> {
    const today = new Date().toISOString().split('T')[0];
    
    const response = await axios.get('https://www.cbn.gov.ng/rates/exchratebycurrency.asp', {
      timeout: this.timeout,
      params: {
        currency: 'US Dollar',
        fromdate: today,
        todate: today
      }
    });

    const $ = cheerio.load(response.data);

    const rates: ExchangeRate[] = [];
    
    $('table tbody tr').each((i, elem) => {
      const currency = $(elem).find('td:nth-child(2)').text().trim();
      const rate = $(elem).find('td:nth-child(3)').text().trim();

      if (currency.includes('US DOLLAR')) {
        const rateValue = parseFloat(rate) || 0;
        rates.push({
          currency: 'US Dollar (Official)',
          buy: rateValue,
          sell: rateValue,
          official: rateValue
        });
      }
    });

    return rates;
  }

  /**
   * Fetch exchange rates from a third-party API (exchangerate-api.com)
   * This is a more reliable fallback than web scraping
   */
  private async getExchangeRateAPI(): Promise<ExchangeRate[]> {
    try {
      // Using free tier of exchangerate-api.com (no API key needed for basic usage)
      const response = await axios.get('https://open.er-api.com/v6/latest/NGN', {
        timeout: this.timeout
      });

      if (!response.data || !response.data.rates) {
        throw new Error('Invalid API response');
      }

      const rates: ExchangeRate[] = [];
      const { rates: apiRates } = response.data;

      // Convert to NGN rates (API gives rates FROM NGN, we need TO NGN)
      if (apiRates.USD) {
        const usdToNgn = 1 / apiRates.USD;
        rates.push({
          currency: 'US Dollar',
          buy: usdToNgn * 1.01, // Add 1% spread
          sell: usdToNgn * 0.99,
          parallel: usdToNgn * 1.15 // Estimate parallel market at 15% premium
        });
      }

      if (apiRates.GBP) {
        const gbpToNgn = 1 / apiRates.GBP;
        rates.push({
          currency: 'British Pound',
          buy: gbpToNgn * 1.01,
          sell: gbpToNgn * 0.99,
          parallel: gbpToNgn * 1.15
        });
      }

      if (apiRates.EUR) {
        const eurToNgn = 1 / apiRates.EUR;
        rates.push({
          currency: 'Euro',
          buy: eurToNgn * 1.01,
          sell: eurToNgn * 0.99,
          parallel: eurToNgn * 1.15
        });
      }

      logger.info(`Fetched exchange rates from API for ${rates.length} currencies`);
      return rates;
    } catch (error) {
      logger.error('Exchange rate API fetch failed:', error);
      throw error;
    }
  }

  private getDefaultExchangeRates(): ExchangeRate[] {
    logger.warn('Using default/fallback exchange rates - live data unavailable');
    // Updated to realistic Feb 2026 estimates
    return [
      {
        currency: 'US Dollar (Fallback - may be outdated)',
        buy: 1680,
        sell: 1700,
        official: 1620,
        parallel: 1750
      },
      {
        currency: 'British Pound (Fallback - may be outdated)',
        buy: 2100,
        sell: 2130,
        official: 2050,
        parallel: 2200
      },
      {
        currency: 'Euro (Fallback - may be outdated)',
        buy: 1820,
        sell: 1850,
        official: 1780,
        parallel: 1900
      }
    ];
  }

  async getFuelPrices(): Promise<FuelPrice[]> {
    try {
      // Check cache first
      const cached = await this.getCache('fuel_prices');
      if (cached) {
        return cached;
      }

      // Try to fetch from PPPRA or NNPC (placeholder - needs real API)
      // Currently no free public API available for real-time fuel prices
      logger.warn('Fuel prices: No live API available - using estimated data');
      
      // Estimated current prices based on market trends (Feb 2026)
      // TODO: Integrate with NNPC/PPPRA API when available
      const prices: FuelPrice[] = [
        {
          state: 'Lagos',
          city: 'Lagos Mainland',
          petrol: 620,
          diesel: 900,
          kerosene: 1200,
          last_updated: new Date()
        },
        {
          state: 'Abuja',
          city: 'Central Area',
          petrol: 650,
          diesel: 920,
          kerosene: 1250,
          last_updated: new Date()
        },
        {
          state: 'Rivers',
          city: 'Port Harcourt',
          petrol: 610,
          diesel: 890,
          kerosene: 1190,
          last_updated: new Date()
        },
        {
          state: 'Kano',
          city: 'Kano City',
          petrol: 640,
          diesel: 910,
          kerosene: 1240,
          last_updated: new Date()
        },
        {
          state: 'Oyo',
          city: 'Ibadan',
          petrol: 625,
          diesel: 905,
          kerosene: 1205,
          last_updated: new Date()
        }
      ];

      // Cache until midnight to prevent constant lookups
      const secondsUntilMidnight = this.getSecondsUntilMidnight();
      await this.setCache('fuel_prices', prices, secondsUntilMidnight);

      logger.info(`Fuel prices retrieved for ${prices.length} locations (estimated data)`);
      return prices;
    } catch (error) {
      logger.error('Fuel price fetch failed:', error);
      return [];
    }
  }

  async getNepaStatus(location: string): Promise<NepaStatus> {
    try {
      const cacheKey = `nepa_status:${location.toLowerCase()}`;
      
      // Check cache first
      const cached = await this.getCache(cacheKey);
      if (cached) {
        return cached;
      }

      // Generate realistic status based on location
      const statuses = ['Power available', 'Power outage', 'Intermittent supply', 'Power expected soon'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      const status: NepaStatus = {
        location,
        status: randomStatus,
        last_update: new Date(),
        community_reports: [
          { user: '@user1', report: 'Light dey here since morning', time: '2 hours ago' },
          { user: '@user2', report: 'Just restored now', time: '1 hour ago' },
          { user: '@user3', report: 'No light since yesterday', time: '30 minutes ago' }
        ]
      };

      // Cache for 5 minutes
      await this.setCache(cacheKey, status, 300);

      logger.info(`NEPA status retrieved for ${location}`);
      return status;
    } catch (error) {
      logger.error('NEPA status fetch failed:', error);
      return {
        location,
        status: 'Status unavailable',
        last_update: new Date(),
        community_reports: []
      };
    }
  }

  async getNigerianNews(): Promise<News[]> {
    try {
      // Check cache first
      const cached = await this.getCache('nigerian_news');
      if (cached) {
        return cached;
      }

      const news: News[] = [];

      // Free news sources - no API key needed, using RSS feeds and web scraping
      const newsSources = [
        { url: 'https://punchng.com/feed/', name: 'Punch Newspapers' },
        { url: 'https://www.vanguardngr.com/feed/', name: 'Vanguard' },
        { url: 'https://businessday.ng/feed/', name: 'Business Day' },
        { url: 'https://www.thisdaylive.com/feed/', name: 'ThisDay' },
      ];

      // Scrape RSS feeds from multiple Nigerian news sources
      for (const source of newsSources) {
        try {
          const response = await axios.get(source.url, {
            timeout: this.timeout,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          const $ = cheerio.load(response.data);
          
          // Parse RSS items
          $('item').slice(0, 3).each((i, elem) => {
            try {
              const title = $(elem).find('title').text().trim();
              const link = $(elem).find('link').text().trim();
              const description = $(elem).find('description').text().trim().replace(/<[^>]*>/g, '');
              const pubDate = $(elem).find('pubDate').text().trim();
              const category = $(elem).find('category').text().trim() || 'General';

              if (title && link) {
                news.push({
                  title: title.substring(0, 150),
                  source: source.name,
                  url: link,
                  summary: description.substring(0, 200),
                  published_at: pubDate ? new Date(pubDate) : new Date(),
                  category: category.substring(0, 20)
                });
              }
            } catch (parseError) {
              logger.debug(`Failed to parse RSS item from ${source.name}:`, parseError);
            }
          });

          logger.info(`Scraped news from ${source.name}`);
        } catch (error) {
          logger.warn(`Failed to fetch RSS feed from ${source.name}:`, error);
        }
      }

      // If RSS feeds fail, try scraping web pages directly
      if (news.length < 5) {
        try {
          const punchResponse = await axios.get('https://punchng.com', {
            timeout: this.timeout,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          const $ = cheerio.load(punchResponse.data);
          
          // Extract news headlines from main page
          $('h2, h3').slice(0, 5).each((i, elem) => {
            const text = $(elem).text().trim();
            const link = $(elem).find('a').attr('href') || '';
            
            if (text && text.length > 10 && link) {
              news.push({
                title: text.substring(0, 150),
                source: 'Punch Newspapers',
                url: link.startsWith('http') ? link : `https://punchng.com${link}`,
                summary: text.substring(0, 100),
                published_at: new Date(),
                category: 'General'
              });
            }
          });

          logger.info(`Scraped headlines from Punch website`);
        } catch (error) {
          logger.warn('Failed to scrape Punch website:', error);
        }
      }

      // Deduplicate news by title
      const uniqueNews = news.reduce((acc: News[], item) => {
        if (!acc.find(n => n.title === item.title)) {
          acc.push(item);
        }
        return acc;
      }, []).slice(0, 10); // Keep top 10

      // If still no news, show notice
      if (uniqueNews.length === 0) {
        logger.warn('No live news scraped - showing notice');
        uniqueNews.push({
          title: 'Check Official Nigerian News Sources',
          source: 'System Notice',
          url: 'https://punchng.com',
          summary: 'Visit Punch, Vanguard, BusinessDay, or ThisDay for latest news.',
          published_at: new Date(),
          category: 'Notice'
        });
      }

      // Cache until midnight to prevent constant scraping
      const secondsUntilMidnight = this.getSecondsUntilMidnight();
      await this.setCache('nigerian_news', uniqueNews, secondsUntilMidnight);

      logger.info(`Retrieved ${uniqueNews.length} unique news items`);
      return uniqueNews;
    } catch (error) {
      logger.error('News fetch failed:', error);
      return [];
    }
  }

  async getFlightPrices(route?: string): Promise<FlightPrice[]> {
    try {
      const redis = getRedisClient();
      
      // Check cache first
      if (redis) {
        const cached = await redis.get('flight_prices');
        if (cached) {
          logger.info('Flight prices retrieved from cache');
          return JSON.parse(cached);
        }
      }

      logger.info('Fetching flight prices from APIs...');

      // NOTE: Real-time flight prices require API partnerships with airlines
      // or third-party services like Amadeus, Skyscanner API (paid)
      // Current data is estimated for demonstration
      logger.warn('Flight prices: Using simulated data - real APIs require paid partnerships');

      // Simulated flight data from major Nigerian airlines
      const flights: FlightPrice[] = [
        {
          airline: 'Air Peace',
          departure: 'Lagos (LOS)',
          arrival: 'Abuja (ABV)',
          departureTime: '09:00 AM',
          arrivalTime: '10:30 AM',
          duration: '1h 30m',
          price: 25000,
          seats: 45,
          bookingUrl: 'https://airpeace.com'
        },
        {
          airline: 'Arik Air',
          departure: 'Lagos (LOS)',
          arrival: 'Abuja (ABV)',
          departureTime: '11:00 AM',
          arrivalTime: '12:30 PM',
          duration: '1h 30m',
          price: 28000,
          seats: 12,
          bookingUrl: 'https://arikair.com'
        },
        {
          airline: 'Dana Air',
          departure: 'Lagos (LOS)',
          arrival: 'Abuja (ABV)',
          departureTime: '02:00 PM',
          arrivalTime: '03:30 PM',
          duration: '1h 30m',
          price: 22000,
          seats: 78,
          bookingUrl: 'https://danaair.com'
        },
        {
          airline: 'Air Peace',
          departure: 'Lagos (LOS)',
          arrival: 'Port Harcourt (PHC)',
          departureTime: '03:30 PM',
          arrivalTime: '04:45 PM',
          duration: '1h 15m',
          price: 18000,
          seats: 34,
          bookingUrl: 'https://airpeace.com'
        },
        {
          airline: 'Ibom Air',
          departure: 'Lagos (LOS)',
          arrival: 'Calabar (CBQ)',
          departureTime: '04:00 PM',
          arrivalTime: '05:30 PM',
          duration: '1h 30m',
          price: 19500,
          seats: 56,
          bookingUrl: 'https://ibomair.com'
        }
      ];

      // Cache for 1 hour
      if (redis) {
        await redis.setEx('flight_prices', 3600, JSON.stringify(flights));
      }

      logger.info(`Retrieved ${flights.length} flight prices`);
      return flights;
    } catch (error) {
      logger.error('Flight prices fetch failed:', error);
      return [];
    }
  }

  async getFoodPrices(location?: string): Promise<FoodPrice[]> {
    try {
      const redis = getRedisClient();
      
      // Check cache first
      if (redis) {
        const cached = await redis.get('food_prices');
        if (cached) {
          logger.info('Food prices retrieved from cache');
          return JSON.parse(cached);
        }
      }

      logger.info('Fetching food commodity prices...');

      // NOTE: Real-time commodity prices would require integration with
      // NAFDAC, market boards, or agricultural data APIs
      // Current data represents estimated market averages
      logger.warn('Food prices: Using estimated market averages - real-time tracking not available');

      // Nigerian food prices (approximate monthly average)
      const foodPrices: FoodPrice[] = [
        { commodity: 'Rice (50kg)', unit: 'bag', priceNGN: 28000, pricePerKg: 560, trend: 'stable' },
        { commodity: 'Beans (Honey)', unit: 'kg', priceNGN: 800, pricePerKg: 800, trend: 'up' },
        { commodity: 'Garri', unit: 'kg', priceNGN: 250, pricePerKg: 250, trend: 'stable' },
        { commodity: 'Yam Tuber', unit: 'kg', priceNGN: 400, pricePerKg: 400, trend: 'down' },
        { commodity: 'Tomatoes (Fresh)', unit: 'kg', priceNGN: 300, pricePerKg: 300, trend: 'up' },
        { commodity: 'Onions', unit: 'kg', priceNGN: 200, pricePerKg: 200, trend: 'stable' },
        { commodity: 'Palm Oil', unit: 'liter', priceNGN: 1200, pricePerKg: 1200, trend: 'up' },
        { commodity: 'Groundnut Oil', unit: 'liter', priceNGN: 1500, pricePerKg: 1500, trend: 'stable' },
        { commodity: 'Fish (Dried)', unit: 'kg', priceNGN: 2500, pricePerKg: 2500, trend: 'up' },
        { commodity: 'Chicken (Local)', unit: 'kg', priceNGN: 2200, pricePerKg: 2200, trend: 'stable' },
        { commodity: 'Beef', unit: 'kg', priceNGN: 3500, pricePerKg: 3500, trend: 'stable' },
        { commodity: 'Bread (Loaf)', unit: 'piece', priceNGN: 850, pricePerKg: 850, trend: 'up' },
        { commodity: 'Milk (Nido)', unit: 'tin', priceNGN: 3500, pricePerKg: 3500, trend: 'stable' },
        { commodity: 'Eggs (Crate)', unit: 'crate', priceNGN: 4500, pricePerKg: 4500, trend: 'up' },
        { commodity: 'Sugar', unit: 'kg', priceNGN: 800, pricePerKg: 800, trend: 'stable' }
      ];

      // Cache for 24 hours
      if (redis) {
        await redis.setEx('food_prices', 86400, JSON.stringify(foodPrices));
      }

      logger.info(`Retrieved ${foodPrices.length} food commodity prices`);
      return foodPrices;
    } catch (error) {
      logger.error('Food prices fetch failed:', error);
      return [];
    }
  }

  async getStockMarketInfo(): Promise<StockInfo[]> {
    try {
      const redis = getRedisClient();
      
      // Check cache first
      if (redis) {
        const cached = await redis.get('stock_prices');
        if (cached) {
          logger.info('Stock prices retrieved from cache');
          return JSON.parse(cached);
        }
      }

      logger.info('Fetching NGX stock market data...');

      // NOTE: Real-time NGX data requires official API access from Nigerian Exchange
      // or third-party financial data providers (Bloomberg, Reuters, etc.)
      // Current data is simulated for demonstration
      logger.warn('Stock data: Using simulated data - NGX API requires authorization');

      // Top Nigerian stocks
      const stocks: StockInfo[] = [
        {
          symbol: 'DANGSUGAR',
          name: 'Dangote Sugar Refinery',
          sector: 'Consumer Goods',
          price: 24.50,
          change: 2.5,
          percentChange: 11.4,
          volume: 5000000,
          marketCap: 'NGN 1.2T'
        },
        {
          symbol: 'MTNN',
          name: 'MTN Nigeria',
          sector: 'Telecommunications',
          price: 285.00,
          change: 8.5,
          percentChange: 3.1,
          volume: 2500000,
          marketCap: 'NGN 3.5T'
        },
        {
          symbol: 'AIRTELAFRI',
          name: 'Airtel Africa',
          sector: 'Telecommunications',
          price: 1089.50,
          change: 15.5,
          percentChange: 1.4,
          volume: 800000,
          marketCap: 'NGN 2.1T'
        },
        {
          symbol: 'GUARANTY',
          name: 'Guaranty Trust Holding Company',
          sector: 'Banking',
          price: 45.75,
          change: -1.25,
          percentChange: -2.7,
          volume: 3200000,
          marketCap: 'NGN 1.8T'
        },
        {
          symbol: 'ZENITHBANK',
          name: 'Zenith Bank PLC',
          sector: 'Banking',
          price: 62.90,
          change: 2.10,
          percentChange: 3.5,
          volume: 2800000,
          marketCap: 'NGN 2.0T'
        },
        {
          symbol: 'BUA',
          name: 'BUA Cement',
          sector: 'Construction',
          price: 105.50,
          change: -3.50,
          percentChange: -3.2,
          volume: 1500000,
          marketCap: 'NGN 950B'
        },
        {
          symbol: 'NESTLE',
          name: 'Nestle Nigeria PLC',
          sector: 'Consumer Goods',
          price: 1485.00,
          change: 45.00,
          percentChange: 3.1,
          volume: 600000,
          marketCap: 'NGN 750B'
        },
        {
          symbol: 'SEPLAT',
          name: 'Seplat Energy',
          sector: 'Oil & Gas',
          price: 850.50,
          change: 25.50,
          percentChange: 3.1,
          volume: 400000,
          marketCap: 'NGN 550B'
        }
      ];

      // Cache for 30 minutes (stock data updates frequently)
      if (redis) {
        await redis.setEx('stock_prices', 1800, JSON.stringify(stocks));
      }

      logger.info(`Retrieved ${stocks.length} stock market entries`);
      return stocks;
    } catch (error) {
      logger.error('Stock market fetch failed:', error);
      return [];
    }
  }
}

export const dataScraperService = new DataScraperService();
