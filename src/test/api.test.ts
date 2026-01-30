import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

describe('API Tests', () => {
  beforeAll(async () => {
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  it('should return health status', async () => {
    const response = await axios.get(`${API_URL}/health`);
    expect(response.status).toBe(200);
    expect(response.data.status).toBe('healthy');
  });

  it('should return exchange rates', async () => {
    const response = await axios.get(`${API_URL}/api/exchange-rates`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  it('should return fuel prices', async () => {
    const response = await axios.get(`${API_URL}/api/fuel-prices`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  it('should return NEPA status', async () => {
    const response = await axios.get(`${API_URL}/api/nepa-status?location=Lagos`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data.location).toBe('Lagos');
  });

  it('should return news', async () => {
    const response = await axios.get(`${API_URL}/api/news`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  it('should return all data', async () => {
    const response = await axios.get(`${API_URL}/api/all`);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.data).toHaveProperty('exchangeRates');
    expect(response.data.data).toHaveProperty('fuelPrices');
    expect(response.data.data).toHaveProperty('news');
  });
});
