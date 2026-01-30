import { logger } from '../utils/logger';
import { BudgetTemplate, BudgetBreakdown, BudgetCategory } from '../types/index';

export class FinancialService {
  constructor() {}

  /**
   * Generate a personalized budget template based on income and lifestyle
   */
  async generateBudgetTemplate(
    monthlyIncome: number,
    location: string,
    familySize: number,
    lifestyleType: 'basic' | 'moderate' | 'comfortable'
  ): Promise<BudgetTemplate> {
    try {
      logger.info(`Generating budget template: ${monthlyIncome} income, ${location}, family size ${familySize}`);

      const breakdown = this.calculateBreakdown(monthlyIncome, location, familySize, lifestyleType);
      const categories = this.generateCategories(monthlyIncome, location, familySize, lifestyleType);

      const template: BudgetTemplate = {
        monthlyIncome,
        location,
        familySize,
        lifestyleType,
        totalAllocated: breakdown.totalAllocated,
        remainingAmount: monthlyIncome - breakdown.totalAllocated,
        breakdown,
        categories,
        recommendations: this.generateRecommendations(monthlyIncome, location, lifestyleType),
        savingsGoals: this.generateSavingsGoals(monthlyIncome),
        investmentOpportunities: this.generateInvestmentOpportunities(monthlyIncome, location),
        costCuttingStrategies: this.generateCostCuttingStrategies(location),
        createdAt: new Date()
      };

      logger.info(`Budget template generated successfully`);
      return template;
    } catch (error) {
      logger.error('Budget generation failed:', error);
      throw new Error('Failed to generate budget template');
    }
  }

  /**
   * Calculate budget breakdown using Nigerian-adapted 50/30/20 rule
   */
  private calculateBreakdown(
    monthlyIncome: number,
    location: string,
    familySize: number,
    _lifestyleType: string
  ): BudgetBreakdown {
    // Adapt percentages based on Nigerian living costs and location
    let essentialsPercent = 50;
    let discretionaryPercent = 30;
    let savingsPercent = 20;

    // Adjust for location cost of living
    if (location.toLowerCase().includes('lagos') || location.toLowerCase().includes('abuja')) {
      essentialsPercent = 52; // Higher costs in major cities
      discretionaryPercent = 28;
      savingsPercent = 20;
    } else if (location.toLowerCase().includes('tier 2')) {
      essentialsPercent = 48;
      discretionaryPercent = 32;
      savingsPercent = 20;
    }

    // Adjust for family size
    if (familySize > 4) {
      essentialsPercent += 3;
      discretionaryPercent -= 3;
    }

    const essentialsAmount = monthlyIncome * (essentialsPercent / 100);
    const discretionaryAmount = monthlyIncome * (discretionaryPercent / 100);
    const savingsAmount = monthlyIncome * (savingsPercent / 100);

    return {
      essentials: {
        amount: essentialsAmount,
        percentage: essentialsPercent,
        description: 'Housing, food, utilities, transportation'
      },
      discretionary: {
        amount: discretionaryAmount,
        percentage: discretionaryPercent,
        description: 'Entertainment, dining, shopping, hobbies'
      },
      savings: {
        amount: savingsAmount,
        percentage: savingsPercent,
        description: 'Emergency fund, retirement, investments'
      },
      totalAllocated: essentialsAmount + discretionaryAmount + savingsAmount
    };
  }

  /**
   * Generate detailed budget categories with Nigerian-specific costs
   */
  private generateCategories(
    monthlyIncome: number,
    location: string,
    familySize: number,
    _lifestyleType: string
  ): BudgetCategory[] {
    const categories: BudgetCategory[] = [];
    const essentialsAmount = monthlyIncome * 0.5;

    // Housing
    const housingPercent = location.toLowerCase().includes('lagos') ? 0.35 : 0.25;
    categories.push({
      name: 'Housing (Rent/Mortgage)',
      percentage: housingPercent * 100,
      amount: essentialsAmount * housingPercent,
      priority: 'critical',
      notes: `${location} avg rent: ₦${this.getAverageRent(location, familySize)} for ${familySize}-person home`
    });

    // Food & Groceries
    categories.push({
      name: 'Food & Groceries',
      percentage: 18,
      amount: essentialsAmount * 0.18,
      priority: 'critical',
      notes: 'Local market staples: rice, beans, garri, yam, vegetables, protein. Budget ₦8,000-₦12,000/week'
    });

    // Utilities & Internet
    categories.push({
      name: 'Utilities & Internet',
      percentage: 10,
      amount: essentialsAmount * 0.1,
      priority: 'critical',
      notes: 'NEPA bill, water, gas, internet (₦3,000-₦5,000/month for data)'
    });

    // Transportation
    categories.push({
      name: 'Transportation',
      percentage: 12,
      amount: essentialsAmount * 0.12,
      priority: 'high',
      notes: 'Fuel, transport fares, vehicle maintenance, occasional Uber/Bolt rides'
    });

    // Healthcare
    categories.push({
      name: 'Healthcare & Insurance',
      percentage: 8,
      amount: essentialsAmount * 0.08,
      priority: 'critical',
      notes: 'Health insurance, medications, doctor visits. HMO plans: ₦500-₦3,000/person/month'
    });

    // Personal Care & Maintenance
    categories.push({
      name: 'Personal Care & Grooming',
      percentage: 5,
      amount: essentialsAmount * 0.05,
      priority: 'medium',
      notes: 'Haircuts, toiletries, laundry, cleaning supplies'
    });

    // Entertainment & Dining
    const discretionaryAmount = monthlyIncome * 0.3;
    categories.push({
      name: 'Entertainment & Eating Out',
      percentage: 45,
      amount: discretionaryAmount * 0.45,
      priority: 'low',
      notes: 'Movies, restaurants, events, parties. Budget wisely to save more'
    });

    // Shopping & Fashion
    categories.push({
      name: 'Shopping & Fashion',
      percentage: 35,
      amount: discretionaryAmount * 0.35,
      priority: 'low',
      notes: 'Clothing, accessories, online shopping. Set monthly limits'
    });

    // Hobbies & Subscriptions
    categories.push({
      name: 'Hobbies & Subscriptions',
      percentage: 20,
      amount: discretionaryAmount * 0.2,
      priority: 'low',
      notes: 'Gym, streaming services (Netflix, Showmax), gaming, music'
    });

    // Emergency Fund (from savings)
    const savingsAmount = monthlyIncome * 0.2;
    categories.push({
      name: 'Emergency Fund',
      percentage: 50,
      amount: savingsAmount * 0.5,
      priority: 'critical',
      notes: 'Build 3-6 months of expenses. Use high-yield savings accounts'
    });

    // Retirement & Long-term Investment
    categories.push({
      name: 'Retirement & Investments',
      percentage: 30,
      amount: savingsAmount * 0.3,
      priority: 'high',
      notes: 'PenCom, ETFs, mutual funds, real estate investment'
    });

    // Debt Repayment
    categories.push({
      name: 'Debt Repayment',
      percentage: 20,
      amount: savingsAmount * 0.2,
      priority: 'high',
      notes: 'Loan repayments, credit card payments. Pay above minimum if possible'
    });

    return categories;
  }

  /**
   * Generate personalized financial recommendations
   */
  private generateRecommendations(monthlyIncome: number, location: string, lifestyleType: string): string[] {
    const recommendations: string[] = [];

    // Income level recommendations
    if (monthlyIncome < 100000) {
      recommendations.push('Focus on building emergency fund before investing. Target 3 months of expenses.');
      recommendations.push(
        'Explore side hustles to increase income. Passive income sources like freelancing or digital products.'
      );
    } else if (monthlyIncome < 300000) {
      recommendations.push('Prioritize saving 20% of income for future security and wealth building.');
      recommendations.push('Start investing in low-cost ETFs or mutual funds. Begin ₦5,000-₦10,000/month if possible.');
    } else {
      recommendations.push('Consider diversifying investments: stocks, real estate, bonds.');
      recommendations.push('Explore higher-yield investment opportunities. Target 10%+ annual returns.');
      recommendations.push('Consider business expansion or franchise opportunities.');
    }

    // Location-specific recommendations
    if (location.toLowerCase().includes('lagos')) {
      recommendations.push(
        'Real estate in Lagos is appreciating. Consider residential property as long-term investment.'
      );
      recommendations.push('Traffic impacts transportation costs. Consider remote work options to reduce commute.');
    } else if (location.toLowerCase().includes('abuja')) {
      recommendations.push('Abuja property market offers good appreciation. Invest in developing areas.');
    } else {
      recommendations.push('Explore agricultural investment in your region. High ROI with government support.');
    }

    // Lifestyle recommendations
    if (lifestyleType === 'comfortable') {
      recommendations.push('Reduce discretionary spending by 5-10% to increase savings rate.');
      recommendations.push('Automate savings transfers to make investing consistent and effortless.');
    }

    return recommendations;
  }

  /**
   * Generate savings goals with timelines
   */
  private generateSavingsGoals(monthlyIncome: number) {
    const savingsAmount = monthlyIncome * 0.2;

    return {
      shortTerm: {
        goal: 'Emergency Fund',
        target: monthlyIncome * 3,
        monthlyContribution: savingsAmount * 0.5,
        timelineMonths: Math.ceil((monthlyIncome * 3) / (savingsAmount * 0.5)),
        description: 'Build 3-month emergency fund for unexpected expenses'
      },
      mediumTerm: {
        goal: 'Business/Education Investment',
        target: monthlyIncome * 6,
        monthlyContribution: savingsAmount * 0.25,
        timelineMonths: Math.ceil((monthlyIncome * 6) / (savingsAmount * 0.25)),
        description: 'Invest in skills, education, or small business opportunity'
      },
      longTerm: {
        goal: 'Retirement & Wealth',
        target: monthlyIncome * 120, // 10 years of income
        monthlyContribution: savingsAmount * 0.25,
        timelineMonths: 120,
        description: 'Build ₦10M+ retirement corpus through consistent investing'
      }
    };
  }

  /**
   * Generate investment opportunities based on income level and location
   */
  private generateInvestmentOpportunities(monthlyIncome: number, location: string) {
    const opportunities = [];

    // Low-risk investments
    opportunities.push({
      type: 'High-Yield Savings',
      platforms: ['FirmoAI', 'Piggyvest', 'Stanbic IBTC e-Wealth'],
      expectedReturn: '8-12% per annum',
      minimumInvestment: '₦1,000',
      risk: 'Low',
      recommended: true
    });

    opportunities.push({
      type: 'Government Securities',
      platforms: ['NG Treasury Bills', 'FGN Bonds'],
      expectedReturn: '10-15% per annum',
      minimumInvestment: '₦10,000',
      risk: 'Very Low',
      recommended: monthlyIncome > 150000
    });

    // Medium-risk investments
    opportunities.push({
      type: 'Stock Market (ETFs & Blue Chips)',
      platforms: ['NGX', 'Stanbic IBTC', 'Meristem', 'Coronation'],
      expectedReturn: '15-25% per annum',
      minimumInvestment: '₦5,000',
      risk: 'Medium',
      recommended: monthlyIncome > 100000
    });

    opportunities.push({
      type: 'Mutual Funds',
      platforms: ['Meristem', 'Coronation', 'Stanbic IBTC'],
      expectedReturn: '12-18% per annum',
      minimumInvestment: '₦1,000',
      risk: 'Medium',
      recommended: true
    });

    // Real estate
    if (location.toLowerCase().includes('lagos') || location.toLowerCase().includes('abuja')) {
      opportunities.push({
        type: 'Real Estate Investment',
        platforms: ['Jumia House', 'PropertyPro', 'Flat Finder'],
        expectedReturn: '10-20% appreciation annually',
        minimumInvestment: '₦500,000',
        risk: 'Medium-High',
        recommended: monthlyIncome > 200000
      });
    }

    // High-risk, high-reward investments
    opportunities.push({
      type: 'Cryptocurrency',
      platforms: ['Luno', 'Binance', 'Coinbase'],
      expectedReturn: '50%+ or -50% (highly volatile)',
      minimumInvestment: '₦1,000',
      risk: 'High',
      recommended: false,
      note: 'Only invest what you can afford to lose'
    });

    return opportunities;
  }

  /**
   * Generate cost-cutting strategies specific to Nigerian context
   */
  private generateCostCuttingStrategies(location: string): string[] {
    const strategies: string[] = [
      'Buy groceries from local markets instead of supermarkets. Save 20-30% on food costs.',
      'Use public transport (BRT, Keke, Okada) instead of Uber/Bolt daily. Save ₦500-₦2,000/day.',
      'Buy airtime/data in bulk and use WhatsApp/Telegram for communication. Save ₦500/month.',
      'Cook at home instead of eating out. Home meals cost ₦500-₦1,500 vs ₦3,000-₦5,000 outside.',
      'Shop during sales and use loyalty programs. Save 15-25% on regular purchases.',
      'Group subscriptions: Netflix, Showmax with friends. Save 50-75% per person.',
      'Use free or low-cost gym alternatives: home workouts, park jogging, YouTube fitness.',
      'Negotiate monthly bills: DSTV, internet, phone plans. Often get 10-20% discounts.',
      'Buy second-hand but quality items. Save 40-60% on clothing and electronics.',
      'Use cashback and loyalty apps: Jumia, Piggyvest for shopping rewards.'
    ];

    if (location.toLowerCase().includes('lagos')) {
      strategies.push('Avoid peak-hour transport. Work flex hours or remote to reduce daily commute costs.');
      strategies.push(
        'Use bank facilities for foreign transfers instead of BDCs. Save 1-2% on exchange rates.'
      );
    }

    return strategies;
  }

  /**
   * Get average rent for a location based on family size
   */
  private getAverageRent(location: string, familySize: number): number {
    const rentData: { [key: string]: number } = {
      'Lagos Island': 200000,
      'Lekki/Ikoyi': 150000,
      'Victoria Island': 180000,
      'Mainland Lagos': 80000,
      Abuja: 120000,
      Enugu: 40000,
      'Port Harcourt': 50000,
      Ibadan: 35000,
      Kano: 30000
    };

    const baseRent = Object.values(rentData).reduce((a, b) => a + b) / Object.values(rentData).length;
    const normalizedRent = rentData[location] || baseRent;

    // Adjust for family size
    return normalizedRent + familySize * 5000;
  }

  /**
   * Calculate financial health score
   */
  calculateFinancialHealthScore(
    monthlyIncome: number,
    savings: number,
    debt: number,
    investmentAmount: number
  ): { score: number; rating: string; advice: string[] } {
    let score = 0;

    // Savings ratio (max 30 points)
    const savingsRatio = savings / monthlyIncome;
    score += Math.min(savingsRatio * 100 * 0.3, 30);

    // Investment ratio (max 20 points)
    const investmentRatio = investmentAmount / monthlyIncome;
    score += Math.min(investmentRatio * 100 * 0.2, 20);

    // Debt ratio (max 20 points) - lower is better
    const debtRatio = debt / monthlyIncome;
    if (debtRatio < 0.5) score += 20;
    else if (debtRatio < 1) score += 10;
    else if (debtRatio < 2) score += 5;

    // Emergency fund (max 15 points)
    const emergencyFundMonths = savings / monthlyIncome;
    if (emergencyFundMonths >= 6) score += 15;
    else if (emergencyFundMonths >= 3) score += 10;
    else if (emergencyFundMonths >= 1) score += 5;

    // Diversification (max 15 points)
    if (investmentAmount > 0) {
      score += 15;
    }

    const rating = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor';

    const advice: string[] = [];
    if (savingsRatio < 0.2) advice.push('Increase savings to 20% of income');
    if (investmentAmount === 0) advice.push('Start investing to build wealth');
    if (debtRatio > 1) advice.push('Prioritize debt reduction');
    if (emergencyFundMonths < 3) advice.push('Build emergency fund to 3 months');

    return { score: Math.round(score), rating, advice };
  }
}

export const financialService = new FinancialService();
