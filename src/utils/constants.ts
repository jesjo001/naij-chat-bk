export const CACHE_DURATIONS = {
  EXCHANGE_RATES: 5 * 60, // 5 minutes
  FUEL_PRICES: 60 * 60, // 1 hour
  NEPA_STATUS: 5 * 60, // 5 minutes
  NEWS: 15 * 60 // 15 minutes
};

export const SCRAPER_CONFIG = {
  TIMEOUT: parseInt(process.env.API_TIMEOUT || '30000'),
  USER_AGENT: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

export const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
  'FCT'
];

export const MAJOR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' }
];

export const NEWS_CATEGORIES = [
  'Business',
  'Technology',
  'Politics',
  'Entertainment',
  'Sports',
  'Health',
  'Education'
];
