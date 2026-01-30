import { logger } from '../utils/logger';
import { MarketingResponse, ProductDescription } from '../types/index';

export class HustleHubService {
  constructor() {}

  /**
   * Generate customer service responses with multiple tone options
   */
  async generateCustomerResponse(
    scenario: string,
    productName: string,
    customerTone: 'upset' | 'curious' | 'demanding' = 'curious'
  ): Promise<MarketingResponse[]> {
    try {
      logger.info(`Generating customer service responses for: ${productName}`);

      const responses: MarketingResponse[] = [
        this.generateProfessionalPidgin(scenario, productName, customerTone),
        this.generateFormalEnglish(scenario, productName, customerTone),
        this.generateCasualFriendly(scenario, productName, customerTone)
      ];

      logger.info(`Generated ${responses.length} customer service responses`);
      return responses;
    } catch (error) {
      logger.error('Customer response generation failed:', error);
      throw new Error('Failed to generate customer responses');
    }
  }

  /**
   * Generate product descriptions with platform variants
   */
  async generateProductDescription(
    productName: string,
    category: string,
    features: string[],
    price: number,
    targetAudience: string
  ): Promise<ProductDescription> {
    try {
      logger.info(`Generating product description for: ${productName}`);

      const description: ProductDescription = {
        productName,
        category,
        features,
        price,
        targetAudience,
        shortVersion: this.generateShortDescription(productName, features),
        mediumVersion: this.generateMediumDescription(productName, category, features, price),
        longVersion: this.generateLongDescription(productName, category, features, price, targetAudience),
        platforms: {
          instagram: this.generateInstagramContent(productName, features),
          jumia: this.generateJumiaContent(productName, features, price),
          jiji: this.generateJijiContent(productName, features, price),
          konga: this.generateKongaContent(productName, features, price),
          facebook: this.generateFacebookContent(productName, features),
          whatsapp: this.generateWhatsappContent(productName, features, price)
        },
        createdAt: new Date()
      };

      logger.info(`Product description generated successfully`);
      return description;
    } catch (error) {
      logger.error('Product description generation failed:', error);
      throw new Error('Failed to generate product description');
    }
  }

  // ============== CUSTOMER SERVICE RESPONSES ==============

  private generateProfessionalPidgin(scenario: string, productName: string, tone: string): MarketingResponse {
    let response = '';

    switch (tone) {
      case 'upset':
        response = `Eh eh! My sister/brother, we done hear you well well. Na we we sorry for that one. 
The ${productName} thing go do wetin we promise am, no be so. 
Let us refund your money sharp sharp or give you better product. We no dey play with customer trust.
Send us the details now, we go sort am quick quick. 😊`;
        break;
      case 'demanding':
        response = `Abi you vex? 😄 No shaking. The ${productName} no do your expectations? 
That one pain us well. Dat na why we get refund policy wey no get condition. 
You get 30 days money-back guarantee. That one na our promise to you.
What exact solution you want? Replacement or refund? We go do am today today. `;
        break;
      default:
        response = `Hello my guy/girl! Thanks much for choosing our ${productName}! 
We happy say you dey check am out. This product pack serious quality and value.
If you get any questions or need anything, we here 24/7. No be lie, we respond fast fast.
Anything else you want know about this product? Fire your questions! 🔥`;
    }

    return {
      title: 'Professional Pidgin Response',
      language: 'Pidgin',
      tone: 'Professional yet approachable',
      content: response,
      characterCount: response.length
    };
  }

  private generateFormalEnglish(scenario: string, productName: string, tone: string): MarketingResponse {
    let response = '';

    switch (tone) {
      case 'upset':
        response = `Dear Valued Customer,

We sincerely apologize for the inconvenience you have experienced with your ${productName} purchase. Your satisfaction is our highest priority, and we are committed to making this right.

We would like to offer you either a full refund or a replacement product at no additional cost. Please provide us with the necessary details so we can expedite the resolution process.

Thank you for your patience and continued support.

Best regards,
Customer Care Team`;
        break;
      case 'demanding':
        response = `Dear Customer,

Thank you for reaching out regarding your ${productName}. We appreciate your feedback and take all concerns seriously.

As per our customer satisfaction guarantee, you are entitled to a full refund or product replacement within 30 days of purchase, no questions asked. 

Please let us know your preferred option, and we will process it immediately.

Warm regards,
Customer Support Team`;
        break;
      default:
        response = `Good day,

Thank you for choosing our ${productName}. We are delighted to serve you and confident that you will find excellent value in this product.

Should you have any questions, require additional information, or need technical support, our dedicated customer care team is available 24/7 to assist you.

We look forward to your positive experience.

Best regards,
Customer Relations Team`;
    }

    return {
      title: 'Formal English Response',
      language: 'English',
      tone: 'Professional and formal',
      content: response,
      characterCount: response.length
    };
  }

  private generateCasualFriendly(scenario: string, productName: string, tone: string): MarketingResponse {
    let response = '';

    switch (tone) {
      case 'upset':
        response = `OMG! We're so sorry you had that experience with ${productName}! 😟 That's definitely not what we intended for you. 

Here's the deal - we've got your back! Get your money back or we'll send you a brand new one. Your choice! 💯

Just hit us up with the details and we'll make it right ASAP. We promise! 

Can't wait to get this sorted for you! ❤️`;
        break;
      case 'demanding':
        response = `Alright, we heard you loud and clear! 📢 

We get it - you expected better from ${productName}. Fair point! Here's what we're offering:
✅ Full Refund OR
✅ Brand New Replacement (Free!)
✅ Even Extra Bonus (because we want you to give us another chance!)

What's it gonna be? Let's fix this and turn your frown upside down! 😊`;
        break;
      default:
        response = `Hey there! 👋 

So glad you picked up our ${productName}! This is gonna be *chef's kiss* 🤌 

Got questions? Curious about features? Not sure how to use something? We're here for ALL of it! 

Seriously, just slide into our DMs or hit us up - we love chatting with our customers! Let's make this awesome! 🚀`;
    }

    return {
      title: 'Casual Friendly Response',
      language: 'English (Casual)',
      tone: 'Friendly and conversational',
      content: response,
      characterCount: response.length
    };
  }

  // ============== PRODUCT DESCRIPTIONS ==============

  private generateShortDescription(productName: string, features: string[]): string {
    const topFeatures = features.slice(0, 2).join(', ');
    return `${productName} - Premium Quality. ${topFeatures}. Best value for money!`;
  }

  private generateMediumDescription(productName: string, category: string, features: string[], price: number): string {
    return `Introducing ${productName}! A ${category} product crafted for excellence.

Key Features:
${features.slice(0, 4).map((f) => `• ${f}`).join('\n')}

Quality Assured | Affordable at ₦${price.toLocaleString()} | Fast Delivery

Get yours today and experience the difference!`;
  }

  private generateLongDescription(
    productName: string,
    category: string,
    features: string[],
    price: number,
    targetAudience: string
  ): string {
    return `INTRODUCING ${productName.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━

${productName} is a premium ${category} product designed specifically for ${targetAudience} who demand quality without breaking the bank.

WHY CHOOSE ${productName}?
━━━━━━━━━━━━━━━━━━━━━━━
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

PRICING & VALUE
━━━━━━━━━━━━━━━━━━━━━━━
Price: ₦${price.toLocaleString()}
Value: Unmatched in its category
Warranty: Full customer satisfaction guarantee

DELIVERY & SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━
✓ Fast delivery across Nigeria
✓ 30-day money-back guarantee
✓ 24/7 customer support
✓ Free returns for defective items

Don't miss out on this incredible opportunity to own ${productName}. Order now and join thousands of satisfied customers!

Limited stock available. Order today! 🔥`;
  }

  // ============== PLATFORM-SPECIFIC CONTENT ==============

  private generateInstagramContent(productName: string, features: string[]) {
    return {
      captions: [
        {
          hook: 'Punchy Hook',
          caption: `🔥 THIS ${productName.toUpperCase()} CHANGES EVERYTHING! 
          
${features.slice(0, 2).map((f) => `✨ ${f}`).join('\n')}

👉 Link in bio to grab yours NOW!

#${productName.replace(/\s+/g, '')} #Quality #BestValue #ShopNow`,
          hashtags: 15
        },
        {
          hook: 'Storytelling Hook',
          caption: `When I found ${productName}, my life actually changed... 

Here's why this ${productName} is different from everything else:

${features.slice(0, 3).map((f) => `→ ${f}`).join('\n')}

And honestly? That's just the beginning! 💯

Get yours today - link in bio! 🛒

#MyJourney #${productName.replace(/\s+/g, '')} #Quality #Transformation`,
          hashtags: 12
        },
        {
          hook: 'Urgency/Scarcity',
          caption: `⏰ LAST CHANCE! ${productName} LIMITED STOCK 
          
Only a few left in stock! 🚨
${features[0]} + ${features[1]} = FIRE COMBO! 🔥

₦${(Math.random() * 50000 + 10000).toFixed(0)} only!

Link in bio - DON'T MISS OUT! 

#LimitedStock #FinalChance #${productName.replace(/\s+/g, '')}`,
          hashtags: 10
        }
      ],
      callToAction: 'Link in bio / DM us / Shop now',
      bestHashtags: ['#ShopLocal', '#QualityFirst', '#NaijaGoods', '#SupportLocal', '#BestDeal']
    };
  }

  private generateJumiaContent(productName: string, features: string[], price: number) {
    return {
      title: productName,
      description: `High-quality ${productName}. ${features.slice(0, 2).join(', ')}. ✓ Verified Seller ✓ Fast Delivery`,
      price: `₦${price.toLocaleString()}`,
      highlights: features.slice(0, 5),
      keyBenefits: [
        'Authentic & Verified',
        '30-Day Returns Guarantee',
        'Fast Delivery Within 24-48 Hours',
        'Secure Payment Options',
        'Excellent Customer Reviews'
      ]
    };
  }

  private generateJijiContent(productName: string, features: string[], price: number) {
    return {
      title: `${productName} - New | Premium Quality`,
      description: `Selling brand new ${productName}. Never used, still in original packaging.\n\nFeatures:\n${features.map((f) => `• ${f}`).join('\n')}\n\nPrice: ₦${price.toLocaleString()}\nLocation: Lagos/Abuja\nPayment: Cash on delivery or online transfer`,
      condition: 'Brand New',
      price: `₦${price.toLocaleString()}`,
      location: 'Multiple (Lagos, Abuja, Port Harcourt)'
    };
  }

  private generateKongaContent(productName: string, features: string[], price: number) {
    return {
      productName: productName,
      category: 'Electronics / Fashion / Home & Living',
      price: `₦${price.toLocaleString()}`,
      shortDescription: `Premium ${productName} with excellent features`,
      detailedDescription: features.slice(0, 4).map((f) => `✓ ${f}`).join('\n'),
      sellerNote: 'Genuine products, Same day dispatch, Satisfaction guaranteed',
      warranty: '30-day money-back guarantee'
    };
  }

  private generateFacebookContent(productName: string, features: string[]) {
    return {
      postText: `NEW ARRIVAL! 🎉 ${productName} is HERE!

Are you tired of subpar products? Not anymore! 

This ${productName} has EVERYTHING you need:
${features.map((f) => `✅ ${f}`).join('\n')}

👉 CLICK LINK IN COMMENTS TO ORDER NOW

Limited stock available! Don't wait! 🚀

#${productName.replace(/\s+/g, '')} #NewArrival #Quality #ShopOnline #SupportLocal`,
      engagementQuestions: [
        'Which feature excites you most?',
        'Tag someone who needs this!',
        'Share if you love quality products!'
      ]
    };
  }

  private generateWhatsappContent(productName: string, features: string[], price: number) {
    return {
      greeting: `Hi! 👋 Thanks for reaching out!\n\nWe have ${productName} in stock. Here's what you're getting:\n`,
      features: features.map((f) => `✓ ${f}`).join('\n'),
      price: `\nPrice: ₦${price.toLocaleString()}\n`,
      offer: `📦 INSTANT DELIVERY AVAILABLE\n💳 Bank Transfer | Cash on Delivery | Card\n🎁 FREE DELIVERY on orders above ₦50,000\n`,
      callToAction: `👉 Ready to order? Just confirm and we'll process ASAP!\n\nThank you! 🙏`,
      quickReply: ['Yes, I want to order', 'Tell me more', 'Price negotiable?']
    };
  }

  /**
   * Generate marketing campaign strategy
   */
  generateMarketingStrategy(
    productName: string,
    targetAudience: string,
    budget: number
  ): {
    channels: string[];
    strategy: string;
    timeline: string[];
    expectedROI: string;
  } {
    return {
      channels: [
        'Instagram (Fashion/Lifestyle)',
        'TikTok (Viral/Trending)',
        'Facebook Groups',
        'WhatsApp Business',
        'Influencer Collaborations',
        'Email Marketing'
      ],
      strategy: `For ${productName} targeting ${targetAudience}:
      
1. Phase 1 (Week 1-2): Build Hype with teaser content on Instagram/TikTok
2. Phase 2 (Week 3-4): Launch with full campaign across all platforms
3. Phase 3 (Week 5-6): Maintain momentum with customer testimonials and UGC
4. Phase 4 (Week 7-8): Seasonal promotions and loyalty programs`,
      timeline: [
        'Day 1-3: Content creation and scheduling',
        'Day 4-7: Soft launch with email subscribers',
        'Day 8-15: Full social media launch',
        'Day 16-30: Engagement and community building',
        'Day 31-60: Analytics review and optimization'
      ],
      expectedROI: `With ₦${budget.toLocaleString()} budget: 3-5x return within 60 days (conservative estimate)`
    };
  }
}

export const hustleHubService = new HustleHubService();
