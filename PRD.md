📋 NaijaGPT - COMPLETE PRODUCT REQUIREMENTS DOCUMENT (PRD)

DOCUMENT CONTROL
VersionDateAuthorChanges1.0Jan 2025Product TeamInitial PRD with all core features

EXECUTIVE SUMMARY
Product Name: NaijaGPT
Tagline: "ChatGPT wey sabi Naija" - The AI that truly understands Nigeria
Vision: Build Africa's first culturally-intelligent AI platform that understands Nigerian languages, context, and business needs
Mission: Democratize AI access for 200M+ Nigerians through affordable, culturally-relevant solutions
Target Launch: Q2 2025 (MVP in 8 weeks)
Market Size: 200M+ Nigerians, 17M+ diaspora globally

1. PRODUCT OVERVIEW
1.1 Problem Statement

Generic AI tools (ChatGPT, Gemini) don't understand Nigerian Pidgin, local languages, or cultural context
Nigerian entrepreneurs lack AI-powered business tools tailored to local market realities (pricing in Naira, Nigerian business formats)
No centralized real-time data aggregation for Nigerian-specific information (exchange rates, fuel prices, NEPA status)
Financial literacy gap with no AI-powered personal finance tools considering Nigerian economic realities
Language learning platforms don't gamify Nigerian language education effectively
Enterprises need white-label AI solutions that understand Nigerian customer communication styles
Developers lack APIs for Nigerian language processing and cultural context

1.2 Solution
NaijaGPT is a comprehensive SaaS platform providing:

Culturally-Aware AI Chat - Multi-language support (Pidgin, Yoruba, Igbo, Hausa)
Street Oracle - Real-time Nigerian data intelligence (exchange rates, fuel, NEPA, traffic)
Hustle Hub - Business automation tools (invoices, pricing, customer scripts)
Financial Freedom - Personal finance management (budgets, investments, savings)
Learn & Earn - Gamified language learning with rewards
Culture Vault - Nigerian knowledge encyclopedia (proverbs, history, recipes)
NaijaGPT for Business - White-label solutions for enterprises
API Marketplace - Developer ecosystem for third-party integrations

1.3 Target Audience
Primary Users (70% of revenue):

Young Nigerians (18-35): Students, freelancers, content creators
Small business owners: Market traders, online sellers, service providers
Nigerian diaspora: Maintaining cultural connection, sending money home

Secondary Users (25% of revenue):

Enterprises: Banks, telcos, e-commerce platforms, fintechs
Developers: Building Nigerian-focused applications
Educational institutions: Teaching Nigerian languages/culture

Tertiary Users (5% of revenue):

Tourists/Expats: Learning Nigerian languages and culture
Researchers: Studying Nigerian linguistics and culture


2. DETAILED FEATURE SPECIFICATIONS

2.1 CORE CHAT SYSTEM
2.1.1 Multi-Language Support
Priority: P0 (Must-Have for MVP)
Estimated Dev Time: 2 weeks
Supported Languages:

Nigerian Pidgin (Primary - Default)
Yoruba (Secondary)
Igbo (Secondary)
Hausa (Secondary)
Nigerian English (Tertiary - with local expressions)

Capabilities:

Auto-Language Detection: Analyze first message to detect language
Mid-Conversation Switching: User can change language anytime
Code-Switching: AI understands mixed languages in single message
Contextual Tone Matching: Professional vs casual based on context

Technical Flow:
User Input: "Abeg, wetin be the meaning of 'ọmọlúàbí'?"
    ↓
[Language Detection Module]
    - Detected: Nigerian Pidgin (primary) + Yoruba word
    - Confidence: 95%
    ↓
[Context Injection]
    - System Prompt: "You are a Nigerian cultural expert. The user is asking in Pidgin about a Yoruba concept. Respond in Nigerian Pidgin with cultural sensitivity."
    ↓
[OpenAI API Call with Custom Prompt]
    ↓
[Post-Processing]
    - Validate response is in Pidgin
    - Add cultural references if needed
    ↓
Response: "Ọmọlúàbí na Yoruba word wey mean person wey get good character, respect, and integrity. E be like say na the person wey fit represent the family well well. For Yoruba culture, ọmọlúàbí na the highest praise wey dem fit give person."
UI Components:

Language Selector Dropdown (Top-right corner)

Flags: 🇳🇬 Pidgin | Yoruba | Igbo | Hausa | English


Auto-Detected Language Badge (In chat bubble)
Language Preference (Saved in user profile)
Translation Toggle (Show original + translation)

User Stories:

As a user, I want to chat in Pidgin so the AI understands my natural way of speaking
As a Yoruba speaker, I want to ask questions in Yoruba and get culturally appropriate responses
As a diaspora Nigerian, I want to learn Igbo through conversation with the AI


2.1.2 Cultural Intelligence Layer - AI Personalities
Priority: P0
Estimated Dev Time: 3 weeks
Personality Modes:
1. Lagos Hustler 🏙️

Tone: Street-smart, business-focused, energetic, motivational
Use Cases: Business advice, networking tips, entrepreneurship
Language Style: Heavy Pidgin with business slang
Sample Prompts:

"How I fit raise capital for my business?"
"Wetin be the best marketing strategy for small business?"



Sample Interaction:
User: "Guy, I wan start online business but I no get money"
Lagos Hustler: "My guy! Money no be the biggest problem for this digital age o! 
Make I school you on some zero-capital business wey dey burst brain:

1. Dropshipping: You no need buy product before you sell. Just list am online, 
when person buy, you order from supplier wey go send direct to customer.

2. Digital Products: Create templates, e-books, or courses. One-time work, 
lifetime earnings!

3. Affiliate Marketing: Promote other people product, collect commission.

Start with wetin you sabi, add small packaging, and watch your account blow! 
The real capital na your brain and consistency. You feel me?"

2. Iya Osun (Yoruba Elder) 👵

Tone: Wise, motherly, proverb-rich, patient, nurturing
Use Cases: Life advice, cultural questions, conflict resolution, family matters
Language Style: Yoruba-infused Pidgin with proverbs
Cultural Elements: Uses Yoruba proverbs, greetings, blessings

Sample Interaction:
User: "Mama, my friend betray me. I dey vex well well"
Iya Osun: "Ọmọ mi, gbọ́ ti mo bá sọ fún ọ. E kú ìbànújẹ́.

The Yoruba people dem get one proverb: 'Ìwà l'ẹwà' - Character na the real 
beauty. Your friend don show you their true character, be thankful say you see am now.

But no carry bitterness for your heart o. Bitter kola no fit spoil inside 
bitter person hand. Release the pain, learn the lesson, and move forward with wisdom.

Remember: 'A kì í fi ẹ̀jẹ̀ wẹ ẹ̀jẹ̀' - We no dey use blood wash blood. 
Vengeance go only bring more pain.

Take time heal, surround yourself with people wey get good character, and 
make this experience teach you how to choose better friends. Olódùmarè dey 
with you, my child. ❤️"

3. Alhaji (Hausa Trader/Islamic Scholar) 🕌

Tone: Respectful, Islamic wisdom, business acumen, patient
Use Cases: Trade advice, Islamic guidance, Northern culture, business ethics
Language Style: Formal Pidgin with Hausa/Arabic phrases
Cultural Elements: Islamic greetings, Quranic references, Northern business practices

Sample Interaction:
User: "Alhaji, person owe me money but e refuse pay. Wetin I go do?"
Alhaji: "As-salamu alaykum, my brother. May Allah guide us.

For business, the Prophet Muhammad (SAW) teach us say patience and good 
character na the key. But you still get right to collect your money.

Here na wetin I go advise:

1. First Approach - Gentle Reminder: Call the person, remind am with respect. 
Sometimes people forget, no be wickedness.

2. Second Approach - Written Notice: Send message or letter, keep record of 
the debt. Make everything clear.

3. Third Approach - Mediator: Find respected person wey both of una respect, 
make dem help settle the matter.

4. Last Resort - Legal Action: If nothing work, you fit use legal means, 
but make sure say you don try peace first.

Remember: 'Sabr' (patience) get sweet reward. But business na business. 
Allah loves those wey dey fair in their dealings.

Insha'Allah, the matter go settle peacefully. Remain blessed, my brother."

4. Igbo Businessman 💼

Tone: Entrepreneurial, investment-focused, pragmatic, result-oriented
Use Cases: Business strategy, investment analysis, wealth building
Language Style: Professional Pidgin with Igbo business philosophy
Cultural Elements: Igbo proverbs about wealth, "Imu ahia" (business knowledge)

Sample Interaction:
User: "I wan invest ₦500k. Where I fit put am?"
Igbo Businessman: "Nwanne m, nnọọ! Good question. As Igbo people dey talk: 
'Onye aghana nwanne ya' - No one should leave their brother behind. 
Make I show you the way.

For ₦500k, here na smart diversification strategy:

PORTFOLIO BREAKDOWN:
1. Emergency Fund (₦100k - 20%)
   - Keep for high-interest savings (10-12% annually)
   - PiggyVest, Cowrywise, or FairMoney

2. Low-Risk Investment (₦150k - 30%)
   - Treasury Bills (18-20% returns)
   - Government bonds
   - Stable, government-backed

3. Medium-Risk Investment (₦150k - 30%)
   - Dollar mutual funds (Risevest, Bamboo)
   - Protects against Naira devaluation
   - 10-15% annual returns in dollars

4. High-Risk/High-Reward (₦100k - 20%)
   - Small business capital
   - Crypto (Bitcoin/USDT only, no shitcoins!)
   - Potential: 50-200% returns

THE IGBO PRINCIPLE: "Ego na-amụ ego" - Money breeds money, but ONLY when 
you invest wisely. Diversification na the secret!

Timeline: Review every 6 months, rebalance if needed.

You go chop from this investment for years to come. Ọfọ na ọgụ! (Blessings and protection)"

5. Pastor Profile ⛪ (NEW ADDITION)

Tone: Encouraging, faith-based, motivational, compassionate
Use Cases: Spiritual guidance, life challenges, moral dilemmas, encouragement
Language Style: Biblical references, inspirational Pidgin
Cultural Elements: Scripture quotes, prayer points, Christian Nigerian context

Sample Interaction:
User: "Pastor, I don tire. Everything dey go wrong for my life"
Pastor: "My beloved brother/sister in Christ, grace and peace be unto you!

The Bible talk say for Psalm 30:5 - 'Weeping may endure for a night, but 
joy cometh in the morning.' Your morning dey come!

Right now, you dey inside the valley, but remember say even Jesus walk 
through valleys. The difference na say valleys na PASSAGE, no be 
DESTINATION. You dey pass through, you no dey stay there!

HERE NA WHAT GOD DEY TELL YOU TODAY:

1. Jeremiah 29:11 - "For I know the thoughts that I think toward you, saith 
the Lord, thoughts of peace, and not of evil, to give you an expected end."

God never forget you! Your story never end. This na just one chapter.

2. Romans 8:28 - "All things work together for good to them that love God."

Even this struggle go turn to testimony. Your setback na setup for your comeback!

PRAYER POINTS:
- Father, renew my strength like the eagle
- Lord, open doors that no man can shut
- God, turn my situation around for good

DECLARATION: I prophesy by the Spirit of God, your change don come! 
This week, you go see breakthrough! Your testimony dey load! 
Receive am in Jesus name!

Stay strong, keep praying, and no give up. The best still dey ahead! 
I cover you with the blood of Jesus! Amen! 🙏✨"

2.1.3 Conversation Memory & Context
Priority: P1
Estimated Dev Time: 1 week
Features:

Session Memory: Remember conversation context within session
Long-term Memory: Store user preferences, background, goals
Cultural Context Storage:

User's tribe/state
Business type
Family context
Personal goals



Example:
First Conversation:
User: "I dey learn web development"
Bot: "Nice one! Which stack you dey focus on?"
User: "MERN stack"

[Stored in User Profile]
- Interest: Web Development
- Stack: MERN
- Career goal: Software Developer

---

Later Conversation (3 days later):
User: "Abeg recommend coding challenge for me"
Bot: "Boss! Remember say you dey learn MERN stack, make I give you challenges 
wey go sharp your skills:

1. Build full-stack todo app with authentication
2. Create a blog with MongoDB, Express, React, Node
3. Develop a chat application with Socket.io

Since you be beginner, start with number 1. E go teach you authentication, 
CRUD operations, and how to connect frontend to backend.

You wan make I guide you through am step-by-step?"

2.2 STREET ORACLE - REAL-TIME DATA INTELLIGENCE
Priority: P0 (Killer Differentiator)
Estimated Dev Time: 4 weeks
2.2.1 Data Categories & Sources
A. FINANCIAL DATA
Exchange Rates:

Official Rates (CBN)

USD, GBP, EUR, CNY
Source: CBN API (https://www.cbn.gov.ng/)


Parallel Market Rates (Black Market)

USD, GBP, EUR
Source: AbokiFX API, Nairalytics


Cryptocurrency P2P Rates

BTC, ETH, USDT
Platforms: Binance, Luno, Yellow Card, Quidax
Source: Exchange APIs



Stock Market:

Nigerian Stock Exchange (NGX) top gainers/losers
Source: NGX API

UI Component:
┌────────────────────────────────────────┐
│ 💵 EXCHANGE RATES (Live)               │
├────────────────────────────────────────┤
│ USD/NGN                                │
│ Official (CBN):  ₦1,470.00  📊         │
│ Black Market:    ₦1,685.00  📈 (+14.6%)│
│                                        │
│ Crypto P2P (USDT)                      │
│ Binance:         ₦1,678/USDT          │
│ Luno:            ₦1,682/USDT          │
│                                        │
│ Updated: 2 mins ago  🔄                │
└────────────────────────────────────────┘

B. COMMODITY PRICES
Fuel Prices:

Petrol (PMS) by state
Diesel (AGO)
Kerosene (DPK)
Source: PPPRA, Major Marketers, Web scraping

Food Prices (Top 20 commodities):

Rice (local & foreign)
Beans
Garri
Yam
Tomatoes
Onions
Palm oil
Groundnut oil
Chicken
Fish (fresh & frozen)
Source: National Bureau of Statistics, Market surveys

UI Component:
┌────────────────────────────────────────┐
│ 🛢️ FUEL PRICES BY STATE                │
├────────────────────────────────────────┤
│ Lagos:         ₦617/litre  ⬆️ (+₦12)   │
│ Abuja:         ₦615/litre  ➡️          │
│ Port Harcourt: ₦610/litre  ⬇️ (-₦5)    │
│ Kano:          ₦625/litre  ⬆️ (+₦20)   │
│                                        │
│ Last updated: 15 mins ago              │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 🍚 FOOD PRICES (Mile 12 Market, Lagos) │
├────────────────────────────────────────┤
│ Rice (50kg bag):      ₦87,000          │
│ Beans (Congo - 1kg):  ₦1,850           │
│ Garri (1 cup):        ₦400             │
│ Tomatoes (big basket):₦28,000          │
│                                        │
│ 📍 Market: Mile 12, Lagos              │
│ Updated: 3 hours ago                   │
└────────────────────────────────────────┘

C. INFRASTRUCTURE STATUS
NEPA/Power Status:

Power availability by area
Estimated hours of power per day
Source: Twitter API (tracking NEPA/PHCN mentions), Crowdsourced data

Traffic Conditions:

Major routes in Lagos, Abuja, Port Harcourt
Travel time estimates
Source: Google Maps API, Twitter API

UI Component:
┌────────────────────────────────────────┐
│ ⚡ NEPA STATUS - Your Area             │
├────────────────────────────────────────┤
│ 📍 Lekki Phase 1, Lagos                │
│                                        │
│ Current: NO LIGHT ❌                   │
│ Last seen: 8 hours ago                 │
│ Today's total: 3 hours (12%)           │
│                                        │
│ Nearby Areas:                          │
│ • VI: Light available ✅               │
│ • Ajah: No light ❌                    │
│                                        │
│ Community reports: 47 people confirm   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 🚗 TRAFFIC UPDATE                      │
├────────────────────────────────────────┤
│ Third Mainland Bridge                  │
│ Status: HEAVY TRAFFIC 🔴               │
│ Estimated time: 45-60 mins             │
│ Alternative: Ikorodu Road (30 mins)    │
│                                        │
│ Lekki-Epe Expressway                   │
│ Status: MODERATE 🟡                    │
│ Estimated time: 25-35 mins             │
│                                        │
│ Updated: 5 mins ago                    │
└────────────────────────────────────────┘

D. TRAVEL & TRANSPORTATION
Domestic Flight Prices:

Routes: Lagos-Abuja, Lagos-PH, Abuja-Kano, etc.
Airlines: Air Peace, Arik, Dana, Ibom Air, Aero
Source: Airline APIs, Flight aggregators

Interstate Transport:

Bus fares (GUO, ABC Transport, God is Good)
Source: Transport company APIs, Web scraping

UI Component:
┌────────────────────────────────────────┐
│ ✈️ FLIGHT PRICES (One-way)             │
├────────────────────────────────────────┤
│ Lagos → Abuja (Today)                  │
│                                        │
│ Air Peace:      ₦98,500   7:00 AM     │
│ Arik Air:       ₦105,000  9:30 AM     │
│ Ibom Air:       ₦102,000  2:00 PM     │
│                                        │
│ 💡 Tip: Book morning flights for       │
│    better prices and on-time departure │
└────────────────────────────────────────┘

E. NEWS & TRENDS
Real-time Nigerian News:

Categories: Politics, Business, Entertainment, Sports, Tech
Sources: Punch, Vanguard, Premium Times, Channels TV, TechCabal
Source: News APIs, RSS feeds

Twitter Trending Topics (Nigeria):

Top 10 trending hashtags
Source: Twitter API

UI Component:
┌────────────────────────────────────────┐
│ 📰 TRENDING NEWS                       │
├────────────────────────────────────────┤
│ 1. Fuel subsidy removal debate heats up│
│    - Punch News • 15 mins ago          │
│                                        │
│ 2. Burna Boy announces new album       │
│    - NotJustOk • 1 hour ago            │
│                                        │
│ 3. Naira gains against dollar          │
│    - BusinessDay • 2 hours ago         │
│                                        │
│ 🔥 Twitter Trends:                     │
│ #Naira #BurnaBoy #INECPVC #BBNaija    │
└────────────────────────────────────────┘

2.2.2 Chat Integration Examples
Example 1: Currency Query
User: "Wetin be dollar rate today?"

Bot: "As of now, dollar rate be:

OFFICIAL (CBN):
- Buy: ₦1,465
- Sell: ₦1,470

BLACK MARKET (Parallel):
- Buy: ₦1,680
- Sell: ₦1,685

DIFFERENCE: ₦215 (14.6% premium)

💡 Where you wan buy dollar?
- For bank/official transaction: Budget ₦1,470
- For street/bureau de change: Budget ₦1,700 (including markup)

Crypto alternative (USDT):
- Binance P2P: ₦1,678/USDT
- Save about ₦7 per dollar vs black market

Last updated: 3 mins ago"

Example 2: Fuel & Transport Query
User: "I wan travel from Lagos to Abuja tomorrow. Wetin be the situation?"

Bot: "Okay boss, make I give you full gist:

FLIGHT OPTIONS (Tomorrow):
✈️ Air Peace - 7:00 AM - ₦98,500 (Best deal!)
✈️ Arik Air - 9:30 AM - ₦105,000
✈️ Ibom Air - 2:00 PM - ₦102,000

💡 Recommendation: Take the 7 AM flight. Morning flights dey more reliable 
for on-time departure plus you go reach Abuja before afternoon.

BUS ALTERNATIVE:
🚌 ABC Transport - Night bus (8 PM) - ₦15,000
🚌 GUO Transport - 6 AM - ₦18,000
Travel time: 10-12 hours

FUEL UPDATE:
Lagos fuel price: ₦617/litre
If you dey drive personal car, budget ₦35,000-₦40,000 for fuel (round trip)

CURRENT TRAFFIC:
- Lekki-Epe: Moderate 🟡
- Third Mainland: Heavy 🔴
- Advice: Leave house 2 hours before flight

Wetin you prefer? Flight or bus?"

Example 3: Food Price Query
User: "How much be bag of rice now? I wan buy for my shop"

Bot: "As of today for Mile 12 Market (Lagos), here na the breakdown:

LOCAL RICE:
- Royal Stallion (50kg): ₦89,000
- Mama's Pride (50kg): ₦85,000
- Stone-free local (50kg): ₦82,000

FOREIGN RICE:
- Royal Umbrella (Thailand) 50kg: ₦92,000
- Caprice (50kg): ₦90,000

💰 BULK DISCOUNT:
If you buy 10 bags or more, you fit negotiate ₦2,000-₦3,000 discount per bag.

📊 PRICE TREND:
Price don increase by ₦7,000 in the last 2 weeks because of dollar 
wahala. If you fit afford am, stock up now before e increase again.

💡 BUSINESS TIP:
For your shop, mix local and foreign rice. Sell local for ₦1,900/cup 
(₦95,000 profit per bag), foreign for ₦2,100/cup (₦105,000 profit per bag).

You wan know best suppliers for bulk purchase?"

Example 4: NEPA Status Query
User: "Light don come for my area?"

Bot: "Which area you dey? (E.g., Lekki, Surulere, Ikeja, etc.)"

User: "Surulere"

Bot: "NEPA STATUS - Surulere, Lagos ⚡

CURRENT SITUATION:
Status: LIGHT AVAILABLE ✅
Started: 2:15 PM (30 minutes ago)

TODAY'S SUMMARY:
- Total hours: 6 hours so far
- Last power cut: 8:00 AM (lasted 6 hours)
- Performance: 25% uptime (Below average 😔)

COMMUNITY REPORTS:
- 34 people confirm light dey
- 2 people say their street never get (possible local fault)

PREDICTION:
Based on pattern for the last week, light fit go by 6-7 PM. 
Make you charge all your devices now!

NEARBY AREAS:
- Yaba: Light available ✅
- Ebute Metta: No light ❌
- Mushin: No light ❌

💡 PRO TIP: For Surulere, Wednesday and Saturday nights usually get 
better power supply. Plan your heavy tasks (ironing, cooking, etc.) 
for those times.

Make I notify you when light go off?"

2.3 HUSTLE HUB - BUSINESS TOOLS
Priority: P1 (High-Value for Monetization)
Estimated Dev Time: 5 weeks

2.3.1 Business Name Generator
Priority: P1
User Story: As an entrepreneur, I want creative business name suggestions with domain/handle availability
Input Fields:

Business type (e.g., "Online shoe store")
Target audience (e.g., "Young professionals 25-35")
Keywords (e.g., "Luxury, affordable, trendy")
Language preference (English, Pidgin, Yoruba, etc.)

Output:

10 Name Suggestions with explanations
Domain Availability (.com, .ng, .co)
Instagram Handle Availability
Twitter Handle Availability
Logo Concept Ideas
Tagline Suggestions

Example Interaction:
User: "I wan start online shoe business. Help me find name"

Bot: "Nice one! Make I ask small questions:
1. Wetin be your target customers? (Men, Women, Kids?)
2. Wetin type of shoes? (Sneakers, Heels, Casual, All?)
3. You wan sound local or international?
4. Any keyword wey you like?"

User: "Women. Heels and sandals. Local but classy. I like 'step' and 'queen'"

Bot: "Perfect! Here na 10 fire names for your business:

1. ✨ STEPQUEEN NIGERIA
   - Domain: stepqueenng.com ✅ Available!
   - Instagram: @stepqueenng ✅ Available!
   - Twitter: @stepqueenng ✅ Available!
   - Vibe: Empowering, Nigerian pride
   - Tagline: "Every Queen Deserves Her Crown... and Perfect Heels"

2. 👑 QUEENSTRIDE 9JA
   - Domain: queenstride9ja.com ✅ Available!
   - Instagram: @queenstride9ja ❌ Taken (try @queenstrideng ✅)
   - Vibe: Bold, confidence-inspiring
   - Tagline: "Walk Like Royalty, Step Like a Boss"

3. 💃 LAGOS HEEL QUEENS
   - Domain: lagosheelqueens.ng ✅ Available!
   - Instagram: @lagosheelqueens ✅ Available!
   - Vibe: City-specific, trendy
   - Tagline: "Lagos Women, Lagos Style"

[... 7 more names ...]

💡 MY TOP RECOMMENDATION: #1 - STEPQUEEN NIGERIA
Why? Clean, memorable, all handles available, and e get that premium 
feel wey go make customers take you serious.

NEXT STEPS:
1. Pick your favorite
2. Make I help you design logo concept
3. Make I help you write business description for Instagram

Which one you like?"

2.3.2 Pricing Calculator
Priority: P1
User Story: As a business owner, I want to determine optimal pricing for my products
Input Fields:

Cost Price (₦)
Business Type (Retail, Wholesale, Service, Digital)
Competition Level (Low, Medium, High)
Target Profit Margin (%)
Additional Costs (Shipping, packaging, etc.)

Output:

Recommended Selling Price
Profit Margin Analysis
Competitor Price Range
Psychological Pricing Suggestions
Volume-Based Pricing Tiers
Break-Even Analysis

Example Interaction:
User: "I wan price my perfume oil. I buy am ₦500, how much I go sell?"

Bot: "Okay boss, make I calculate am for you proper.

First, answer these:
1. You dey sell retail (one-one) or wholesale (bulk)?
2. How many competitors dey your area dey sell similar product?
3. Wetin be your monthly target? (E.g., sell 100 bottles)
4. You get extra cost like packaging, delivery?"

User: "Retail. Plenty competitors. I wan sell 200 bottles per month. 
Packaging na ₦50 per bottle"

Bot: "Perfect! Here na your COMPLETE PRICING STRATEGY:

📊 COST BREAKDOWN:
- Product Cost: ₦500
- Packaging: ₦50
- Total Cost: ₦550

💰 RECOMMENDED PRICING:ContinueJan 25₦1,199
WHY ₦1,199?
✅ Profit per bottle: ₦649 (118% margin)
✅ Monthly profit (200 bottles): ₦129,800
✅ Psychological pricing (looks cheaper than ₦1,200)
✅ Competitive (market range: ₦1,000-₦1,500)
🎯 VOLUME DISCOUNTS (Build customer loyalty):

Buy 1: ₦1,199
Buy 2: ₦2,200 (Save ₦198)
Buy 3: ₦3,300 (Save ₦297)

💡 COMPETITOR ANALYSIS:
Based on market research:

Low price: ₦900 (suspicious quality)
Average price: ₦1,200
Premium price: ₦1,500-₦2,000

YOUR POSITION: Premium-Mid range (Sweet spot!)
🚀 PROFIT SCENARIOS:
If you sell 200 bottles @ ₦1,199:

Revenue: ₦239,800
Total Cost: ₦110,000 (200 × ₦550)
NET PROFIT: ₦129,800

If you sell 300 bottles (with discounts):

Estimated Revenue: ₦340,000
NET PROFIT: ₦175,000

📈 GROWTH STRATEGY:
Month 1-2: ₦1,199 (Build reputation)
Month 3+: ₦1,399 (Increase as brand grows)
Loyal customers: Keep at ₦1,199 (Reward loyalty)
You feel this pricing? Or make I adjust am?"

---

#### **2.3.3 Invoice & Receipt Generator**
**Priority**: P1  
**User Story**: As a business owner, I want professional invoices in Nigerian format

**Features**:
- **Nigerian Business Format** (letterhead, company details)
- **Automatic Tax Calculation** (VAT 7.5%)
- **Payment Terms** (Due date, late fee)
- **Multiple Currencies** (Naira, Dollars)
- **PDF Download**
- **Email Send Option**
- **Payment Link Integration** (Paystack, Flutterwave)

**Input Fields**:
- Company Name
- Customer Name
- Items (Name, Quantity, Unit Price)
- Payment terms
- Bank details

**Example Interaction**:
User: "I wan create invoice for my customer"
Bot: "No wahala! Make I help you. Fill these details:

Your Business Name:
Your Business Address:
Customer Name:
Customer Address (optional):
Items (name, quantity, price):
Payment due date:
Your bank details (for payment):"

User: "

StepQueen Nigeria
45 Allen Avenue, Ikeja, Lagos
Mrs. Folake Adeyemi





Red High Heels (2 pairs, ₦1,199 each)
7 days
GTBank - 0123456789 - StepQueen Nigeria
"

Bot: "Perfect! Here na your professional invoice:
[GENERATES PDF PREVIEW]
┌──────────────────────────────────────────┐
│  STEPQUEEN NIGERIA                       │
│  45 Allen Avenue, Ikeja, Lagos           │
│  Phone: [Your Number] | Email: [Email]   │
├──────────────────────────────────────────┤
│  INVOICE #INV-2025-001                   │
│  Date: January 25, 2025                  │
│  Due Date: February 1, 2025              │
│                                          │
│  BILL TO:                                │
│  Mrs. Folake Adeyemi                     │
├──────────────────────────────────────────┤
│  ITEM              QTY    PRICE   TOTAL  │
│  Red High Heels     2    ₦1,199  ₦2,398  │
│                                          │
│  Subtotal:                       ₦2,398  │
│  VAT (7.5%):                     ₦179.85 │
│  ──────────────────────────────────────  │
│  TOTAL DUE:                      ₦2,578  │
├──────────────────────────────────────────┤
│  PAYMENT DETAILS:                        │
│  Bank: GTBank                            │
│  Account: 0123456789                     │
│  Name: StepQueen Nigeria                 │
│                                          │
│  💳 Pay Online: [Paystack Link]          │
├──────────────────────────────────────────┤
│  TERMS:                                  │
│  Payment due within 7 days               │
│  Late payment: 5% fee after due date     │
│                                          │
│  Thank you for your business! 💚         │
└──────────────────────────────────────────┘
Wetin you wan do?

Download PDF ⬇️
Send to customer email 📧
Generate payment link 💳
Edit invoice ✏️"


---

#### **2.3.4 Customer Service Script Generator**
**Priority**: P2  
**User Story**: As a business owner, I want ready-made responses for common customer situations

**Scenarios Covered**:
1. **Angry/Upset Customer**
2. **Delivery Delay**
3. **Product Complaint**
4. **Refund Request**
5. **Price Negotiation**
6. **Out of Stock**
7. **Payment Issues**

**Tone Options**:
- Professional Pidgin
- Formal English
- Casual Friendly

**Example Interaction**:
User: "Customer dey vex say product never reach. Wetin I go tell am?"
Bot: "I understand! Angry customers fit spoil business if we no handle am well.
Make I give you the perfect response:
🎯 STRATEGY: Empathy + Transparency + Solution
Here na 3 versions, pick wetin suit you:
──────────────────────────────────
VERSION 1: PROFESSIONAL PIDGIN (Recommended for Nigerian customers)
──────────────────────────────────
"Dear [Customer Name],
Boss/Ma, I really sorry for the delay. I know say you don dey wait and
e dey annoying. No be our intention to disappoint you at all.
Here na the full gist:

Your order comot from our warehouse on [Date]
The delivery company don experience small delay because of [Reason: traffic/fuel scarcity/etc.]
Your package don reach [Current Location] and e go reach you latest by [New Date]

TO MAKE UP FOR THIS DELAY:

I go give you [10% discount/free shipping] on your next order
I don put your number on priority, so the rider go call you directly when e near your area
If e no reach by [Date], I go refund your money 100% + extra ₦[Amount] for stress

Your tracking number: [Number]
Rider contact: [Phone Number]
I beg, find space for this delay. We value your business well well and
we wan make sure say you happy with us.
Thank you for your patience.
[Your Name]
[Business Name]"
──────────────────────────────────
VERSION 2: FORMAL ENGLISH (For corporate/picky customers)
──────────────────────────────────
"Dear [Customer Name],
Please accept my sincere apologies for the delay in delivering your order.
I understand how frustrating this must be, and I want to assure you that
we take this matter very seriously.
Current Status:

Order dispatched: [Date]
Current location: [Location]
Estimated delivery: [New Date]
Tracking number: [Number]

Compensation:
To make up for this inconvenience, we would like to offer you:

15% discount on your next purchase
Priority delivery on future orders
Full refund guarantee if delivery exceeds [Date]

Our delivery partner has been contacted, and your package has been
flagged as priority. The rider will contact you directly upon arrival.
We value your business and are committed to ensuring your satisfaction.
Best regards,
[Your Name]
[Business Title]
[Business Name]"
──────────────────────────────────
VERSION 3: CASUAL FRIENDLY (For close customers/friends)
──────────────────────────────────
"Hey [Name]! 😊
Chai, I'm so sorry about the delay o! I know you've been waiting and
it's not cool at all.
So here's what happened: The delivery company messed up on their end
(not making excuses sha), but I've sorted it out now. Your package is
currently at [Location] and will definitely get to you by [Date].
To say sorry properly, I'm giving you:

Free delivery on your next 2 orders
Small gift inside your package (surprise! 🎁)
Direct line to me - call me anytime if wahala dey again

Tracking: [Number]
Rider: [Phone] - he'll call you when he's close
Thanks for being patient with me. You're one of my favorite customers
and I no wan lose you because of this nonsense delay!
❤️ [Your Name]"
──────────────────────────────────
💡 PRO TIPS:

Always acknowledge their frustration first
Give specific details (dates, tracking numbers)
Offer compensation (discount, gift, refund option)
Take personal responsibility (don't just blame delivery company)
Follow up after delivery to confirm satisfaction

🎬 NEXT STEPS:

Copy the message wey you like
Replace [placeholders] with actual details
Send to customer ASAP (delay go only make am worse)
After e receive am, send thank you message with small discount code

This approach don work for me 95% of the time. The customer go calm down!
You need help with any other customer wahala?"

---

#### **2.3.5 Product Description Writer** (Continued from PRD)

**Priority**: P2  
**User Story**: As an online seller, I want compelling product descriptions for my listings

**Platforms Supported**:
- Instagram
- Jumia
- Jiji
- Konga
- Facebook Marketplace
- WhatsApp Status

**Features**:
- **SEO-optimized descriptions**
- **Emoji integration** (for social media)
- **Nigerian-style copywriting** (urgency, scarcity, social proof)
- **Multiple length options** (short, medium, long)
- **Call-to-action templates**

**Example Interaction**:
User: "I wan sell power bank for Instagram. Help me write description"
Bot: "Okay boss! Small questions:

Wetin be the capacity? (10,000mAh, 20,000mAh?)
Wetin be special features? (Fast charging, multiple ports?)
How much you dey sell am?
You get discount or promo?"

User: "20,000mAh. Fast charging. 3 USB ports. ₦8,500. 10% discount this weekend"
Bot: "Fire! Here na 3 Instagram caption options:
──────────────────────────────────
OPTION 1: SHORT & PUNCHY (Best for Instagram)
──────────────────────────────────
⚡ MEGA POWER BANK - 20,000mAh!
Never run out of battery again! 🔋
✅ Charge 3 devices at once
✅ Fast charging technology
✅ Sleek, portable design
✅ Compatible with all phones
WEEKEND SPECIAL: ₦8,500 ₦7,650 (10% OFF!) 🔥
📍 Lagos | Delivery Nationwide 🇳🇬
📲 DM to order | Link in bio
#PowerBank #9jaOnlineShopping #LagosSeller #NaijaMarket #PhoneAccessories
──────────────────────────────────
OPTION 2: STORYTELLING (More engaging)
──────────────────────────────────
"Ah! Light don go again! My phone battery dey 5%! How I go answer
that important call now?!" 😭
If this na your everyday story, e don do! ✋
Introducing the 20,000mAh MEGA POWER BANK! ⚡
This beast fit charge your phone 4-5 times before e go off! 💪
FEATURES:
🔌 3 USB ports - charge phone, earbuds, smartwatch together!
⚡ Fast charging - full battery in 1 hour
💼 Slim design - fit inside your bag easily
🛡️ Built-in protection - safe for all devices
PERFECT FOR:

Business people wey dey always on the go
Students wey light no dey their area
Anyone wey tire of low battery stress!

SPECIAL PRICE: Was ₦8,500, NOW ₦7,650! (This weekend only o!) ⏰
Free delivery for Lagos orders above ₦10k! 🚚
DM NOW before they finish! Stock dey limited! 📲
#PowerBankNigeria #NeverRunOut #LagosBusiness #NaijaTech
──────────────────────────────────
OPTION 3: URGENCY + SCARCITY (High conversion)
──────────────────────────────────
🚨 ONLY 15 UNITS LEFT! 🚨
20,000mAh POWER BANK - The Last Batch Before Price Increase! ⚡
Why people dey rush this power bank:
✓ Charge your phone 5x on one charge
✓ Charge 3 devices simultaneously
✓ Fast charging (1 hour = full battery)
✓ Portable & elegant design
PRICE: ₦8,500 ₦7,650
(10% discount ends Sunday night! ⏰)
CUSTOMER TESTIMONIALS:
"This power bank save my life! I fit use my phone whole day without
fear!" - Chioma, VI ⭐⭐⭐⭐⭐
"Best investment I make this year. E don last me 8 months, still strong!"

Emeka, Surulere ⭐⭐⭐⭐⭐

📦 FREE DELIVERY (Lagos)
🚚 NATIONWIDE SHIPPING (2-3 days)
💯 100% MONEY-BACK GUARANTEE
⚠️ HURRY! When e finish, next batch go cost ₦10,000!
👉 TAP THE LINK IN BIO TO ORDER NOW!
👉 OR DM "POWERBANK" FOR INSTANT RESPONSE
Secure your power bank before regret catch you! 😎
#PowerBank9ja #LagosDeals #NaijaOnline #ShopNigeria
──────────────────────────────────
💡 BONUS TIPS:

Post Option 1 for carousel posts (with product photos)
Use Option 2 for standalone posts (more storytelling)
Use Option 3 for stories/reels (creates urgency)
Always add product photo/video
Respond to DMs within 5 minutes (hot leads!)

📸 PHOTO TIPS:

Take photos with good lighting
Show the power bank next to phone (for size reference)
Include packaging/accessories
Use lifestyle shots (person using it)

You wan make I help you with anything else?
(Hashtag strategy, posting schedule, pricing strategy?)"

---

### **2.4 FINANCIAL FREEDOM - PERSONAL FINANCE AI**
**Priority**: P1 (High Demand in Nigeria)  
**Estimated Dev Time**: 4 weeks

---

#### **2.4.1 Budget Template Generator**
**Priority**: P1  
**User Story**: As a Nigerian, I want a realistic budget based on my income and Nigerian cost of living

**Input Fields**:
- Monthly Income (₦)
- Location (Lagos, Abuja, PH, etc.)
- Living Situation (Rent, Family house, etc.)
- Family Size
- Debt/Loans

**Output**:
- **50/30/20 Budget** (adapted for Nigeria)
- **Category Breakdown** (Rent, Food, Transport, etc.)
- **Savings Goal**
- **Emergency Fund Recommendation**
- **Cost-cutting Suggestions**

**Example Interaction**:
User: "I dey earn ₦150k per month. Help me budget am"
Bot: "Nice one! Make I create proper budget for you. Small questions:

Where you dey stay? (Lagos, Abuja, etc.)
You dey pay rent or you stay with family?
You get children or dependents?
You get any debt or loan wey you dey pay?
Wetin be your main expenses wey dey stress you?"

User: "Lagos. I dey pay rent (₦40k). Single, no pikin. No debt. Food and transport dey stress me"
Bot: "Perfect! Here na your COMPLETE BUDGET PLAN for ₦150,000/month:
═══════════════════════════════════════════
📊 YOUR FINANCIAL BREAKDOWN
═══════════════════════════════════════════
MONTHLY INCOME: ₦150,000
🏠 NEEDS (55% - ₦82,500):

Rent:                    ₦40,000
Food/Groceries:          ₦25,000
Transport (Lagos):       ₦12,000
Electricity:             ₦3,000
Data/Airtime:            ₦2,500
────────────────────────────────
TOTAL NEEDS:                ₦82,500

💰 SAVINGS (25% - ₦37,500):

Emergency Fund:          ₦15,000
Investment:              ₦15,000
Specific Goal Savings:   ₦7,500
────────────────────────────────
TOTAL SAVINGS:              ₦37,500

🎉 WANTS (20% - ₦30,000):

Entertainment:           ₦10,000
Eating out/Hangout:      ₦8,000
Grooming/Self-care:      ₦5,000
Shopping:                ₦4,000
Miscellaneous:           ₦3,000
────────────────────────────────
TOTAL WANTS:                ₦30,000

═══════════════════════════════════════════
TOTAL:                      ₦150,000
═══════════════════════════════════════════
🎯 YOUR FINANCIAL GOALS (12 Months):
Emergency Fund Target: ₦180,000 (6 months expenses)
Current: ₦0
Monthly Contribution: ₦15,000
Time to Goal: 12 months ✅
Investment Portfolio: ₦180,000
Monthly Contribution: ₦15,000
Expected Return (15%): ₦207,000
TOTAL SAVINGS AFTER 1 YEAR: ₦450,000! 💪
💡 MONEY-SAVING TIPS FOR LAGOS:
FOOD (Currently ₦25k):
❌ Stop: Daily restaurant meals (₦1,000/day = ₦30k/month)
✅ Start: Meal prep on Sundays (₦15k/month)
💵 SAVE: ₦10,000/month
TRANSPORT (Currently ₦12k):
❌ Stop: Daily Uber rides (₦800/day = ₦20k/month)
✅ Start: Use bus/danfo for regular routes, Uber only for emergencies
💵 SAVE: ₦8,000/month
DATA (Currently ₦2.5k):
✅ Buy MTN 10GB plan instead of daily data
💵 SAVE: ₦1,000/month
ELECTRICITY:
✅ Unplug devices when not in use
✅ Use energy-saving bulbs
💵 SAVE: ₦500/month
TOTAL POTENTIAL SAVINGS: ₦19,500/month!
🚀 UPGRADED BUDGET (If you apply tips):
Total Income: ₦150,000
Total Expenses: ₦63,000 (down from ₦82,500)
Total Savings: ₦57,000! (38% savings rate!)
New Annual Savings: ₦684,000! 🎉
📈 INVESTMENT RECOMMENDATIONS (₦15k/month):
LOW RISK (₦7,500 - 50%):

Piggyvest Target Savings (13% p.a.)
Treasury Bills via Risevest (18% p.a.)

MEDIUM RISK (₦5,000 - 33%):

Dollar mutual funds (Risevest/Bamboo)
Protects against Naira devaluation

HIGH RISK (₦2,500 - 17%):

Nigerian stocks (NGX via Bamboo/Trove)
Bitcoin/USDT (Binance P2P)

Expected Portfolio Return: ₦15,000 → ₦17,250/year (15% average)
🎯 ACTION PLAN (This Week):
Day 1-2: Open Piggyvest & Risevest accounts
Day 3: Set up automatic ₦15k monthly deductions
Day 4-5: Meal prep and create shopping list
Day 6: Review subscriptions, cancel unused ones
Day 7: Track every expense for the week
📱 TOOLS TO USE:

Piggyvest - Emergency fund & savings
Risevest - Treasury bills & dollar investments
Cowrywise - Flexible savings
Bamboo - Stocks & investment tracking
Expensify/Mint - Expense tracking

You wan make I:

Help you set savings goals? 💰
Create meal plan for ₦15k/month? 🍲
Find side hustle to increase income? 💼
All of the above? 🚀"


---

#### **2.4.2 Investment Advisor (Nigerian Market)**
**Priority**: P1  
**User Story**: As a Nigerian, I want investment advice that considers local market realities

**Investment Options Covered**:
1. **Savings Accounts** (PiggyVest, Cowrywise, Kuda)
2. **Treasury Bills** (Nigerian Government Bonds)
3. **Stocks** (Nigerian Stock Exchange - NGX)
4. **Mutual Funds** (Stanbic, ARM, etc.)
5. **Real Estate** (Land, property)
6. **Cryptocurrency** (Bitcoin, USDT)
7. **Dollar Investments** (Risevest, Bamboo)
8. **Business Capital**
9. **Agriculture** (Farmcrowdy, ThriveAgric)

**Risk Profiles**:
- Conservative (Low risk, 8-12% returns)
- Moderate (Medium risk, 15-25% returns)
- Aggressive (High risk, 30%+ potential)

**Example Interaction**:
User: "I get ₦500k wey I wan invest. Where I fit put am?"
Bot: "That's great! ₦500k na serious money, make we invest am well.
Let me ask:

Wetin be your financial goal? (Buy car, build house, retirement, etc.)
When you go need the money? (6 months, 1 year, 5 years?)
How you see risk? You fit lose small money for big gain, or you wan play safe?
You don get emergency fund? (Money for emergency, 3-6 months expenses)"

User: "I wan build emergency fund and start investing. I fit wait 5 years.
I no too like risk but I fit take small. No emergency fund yet"
Bot: "Perfect! Based on your answers, here na the BEST investment strategy:
═══════════════════════════════════════════
🎯 ₦500,000 INVESTMENT PORTFOLIO
═══════════════════════════════════════════
GOAL: Emergency Fund + Long-term Growth
TIMELINE: 5 years
RISK: Moderate (Balanced)
📊 ALLOCATION BREAKDOWN:
1️⃣ EMERGENCY FUND (₦150,000 - 30%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Platform: Piggyvest Target Savings
Return: 13% per year
Lock Period: 6-12 months
Why: Liquid, accessible when wahala dey
After 1 year: ₦169,500
2️⃣ TREASURY BILLS (₦150,000 - 30%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Platform: Risevest/ARM
Return: 18-20% per year
Lock Period: 90-365 days
Why: Government-backed, very safe
After 5 years (compounded): ₦372,000
3️⃣ DOLLAR INVESTMENT (₦125,000 - 25%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Platform: Risevest, Bamboo (S&P 500 Index Fund)
Return: ~12% per year (in dollars) + Naira devaluation gains
Why: Protects against Naira crash
Expected value after 5 years: ₦350,000+ (assuming Naira devaluation)
4️⃣ NIGERIAN STOCKS (₦50,000 - 10%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Platform: Bamboo, Trove, Chaka
Stocks: Dangote Cement, MTN, Nestle, Zenith Bank
Return: 20-30% per year (potential)
Why: High growth potential, dividends
After 5 years: ₦125,000-₦150,000
5️⃣ CRYPTO - BITCOIN/USDT (₦25,000 - 5%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Platform: Binance, Luno
Strategy: Dollar-Cost Averaging (DCA) - buy small small every month
Return: Highly volatile (30-100%+ potential, but fit drop too)
Why: Long-term hedge, high growth potential
After 5 years: ₦75,000-₦200,000 (speculative)
═══════════════════════════════════════════
PROJECTED VALUE AFTER 5 YEARS:
═══════════════════════════════════════════
Conservative Estimate: ₦850,000 (70% gain)
Moderate Estimate: ₦1,100,000 (120% gain)
Optimistic Estimate: ₦1,400,000 (180% gain)
Average Expected: ₦1,100,000 💰
That's ₦600k profit! 🎉
═══════════════════════════════════════════
📋 ACTION PLAN - HOW TO START
═══════════════════════════════════════════
WEEK 1: Account Setup
□ Download Piggyvest app → Create account
□ Download Risevest app → Verify with BVN
□ Download Bamboo app → Fund with ₦25k
□ Create Binance account → Complete KYC
WEEK 2: Fund Emergency Account
□ Transfer ₦150k to Piggyvest
□ Lock for 6 months (to avoid temptation)
WEEK 3: Start Investments
□ Buy ₦150k Treasury Bill (90-day) on Risevest
□ Invest ₦125k in dollar index fund on Risevest
□ Buy ₦50k Nigerian stocks (₦12.5k each on 4 stocks)
□ Buy ₦25k USDT on Binance P2P
MONTHLY MAINTENANCE:

Check portfolio performance (don't panic on short-term drops!)
Reinvest dividends & interest
Add ₦10k-₦20k monthly if possible

═══════════════════════════════════════════
⚠️ IMPORTANT WARNINGS
═══════════════════════════════════════════
DON'T:
❌ Put all money in one place (diversify!)
❌ Panic sell when market drop small
❌ Fall for Ponzi schemes promising 50% monthly returns
❌ Invest money wey you go need in 6 months
❌ Follow "investment gurus" on Instagram blindly
DO:
✅ Understand where your money dey before you invest
✅ Read terms and conditions well well
✅ Start small, learn, then increase
✅ Focus on long-term (5-10 years)
✅ Reinvest your profits (compound interest na magic!)
═══════════════════════════════════════════
💡 NEXT LEVEL MOVES
═══════════════════════════════════════════
After 1 year, if you don build your emergency fund and understand
the market:

Consider buying land (appreciates 15-30% per year in growing areas)
Explore agriculture investment (Farmcrowdy, ThriveAgric - 14-25% returns)
Start small business with part of profits

🎯 YOUR 5-YEAR VISION:
Starting Amount: ₦500,000
Projected Amount: ₦1,100,000
That's enough to:

Pay rent for 2 years (₦50k × 24 = ₦1.2M)
Buy a decent used car (₦800k-₦1M)
Start a serious business (₦500k capital)
Down payment for land in developing area

You dey ready to start? I fit help you with:

How to open these accounts step-by-step? 📱
Which specific stocks to buy? 📈
How to avoid scams? 🚫
Monthly review of your portfolio? 📊

Make I know wetin you need!"

---

#### **2.4.3 Debt Payoff Strategy**
**Priority**: P2  
**User Story**: As someone with debt, I want a clear plan to pay it off efficiently

**Debt Types Covered**:
- Personal loans
- Credit cards
- Family/friend loans
- Buy now, pay later (Kuda, Carbon, Branch)
- Bank overdrafts

**Strategies**:
1. **Snowball Method** (Pay smallest debt first - psychological wins)
2. **Avalanche Method** (Pay highest interest first - saves money)
3. **Hybrid Method** (Nigerian reality - balance both)

**Example Interaction**:
User: "I get 3 debts wey dey worry me. I wan pay dem off"
Bot: "I feel you. Debt fit dey stress person well well. But no worry,
make we create plan to clear everything.
List your debts like this:

Who you owe? (Bank, friend, family, app?)
How much?
Interest rate (if any)?
Monthly payment?

Example:

Carbon app - ₦50k - 15% interest - ₦8k/month
Friend - ₦100k - No interest - No fixed payment
Bank - ₦200k - 25% interest - ₦15k/month"

User: "

Kuda overdraft - ₦80k - 30% interest - ₦12k/month
My brother - ₦150k - No interest - Flexible
Carbon - ₦45k - 15% interest - ₦7k/month
"

Bot: "Okay, I don see the full picture. Here na your DEBT-FREE PLAN:
═══════════════════════════════════════════
💳 YOUR DEBT SUMMARY
═══════════════════════════════════════════
Total Debt: ₦275,000
Monthly Payments: ₦19,000 (minimum)
Interest Cost: Kuda (₦24k/year) + Carbon (₦6.75k/year) = ₦30.75k/year 😱
This na serious matter! But we go sort am.
═══════════════════════════════════════════
🎯 RECOMMENDED STRATEGY: AVALANCHE + RELATIONSHIP PRIORITY
═══════════════════════════════════════════
Why? Kuda dey charge you 30% interest - that one na criminal!
We go attack am first, but we go still respect your brother.
PRIORITY ORDER:
1️⃣ Kuda (Highest interest - killing you!)
2️⃣ Carbon (Medium interestContinueJan 25)
3️⃣ Your Brother (No interest, but important relationship)
═══════════════════════════════════════════
📅 PAYOFF TIMELINE (Assuming ₦30k/month budget for debt)
═══════════════════════════════════════════
MONTH 1-4: ATTACK KUDA OVERDRAFT

Kuda payment: ₦18,000/month (₦12k minimum + ₦6k extra)
Carbon payment: ₦7,000/month (minimum)
Brother payment: ₦5,000/month (show say you no forget am)
Total: ₦30,000/month

After 4 months:
✅ Kuda CLEARED! (₦80k ÷ ₦18k = 4.4 months)
💰 Interest saved: ₦18,000
MONTH 5-7: ATTACK CARBON

Carbon payment: ₦23,000/month (₦7k minimum + ₦16k extra from Kuda)
Brother payment: ₦7,000/month
Total: ₦30,000/month

After 7 months total:
✅ Carbon CLEARED! (₦45k ÷ ₦23k = 2 months)
💰 Interest saved: ₦3,375
MONTH 8-13: CLEAR YOUR BROTHER

Brother payment: ₦30,000/month (full focus now!)
Total: ₦30,000/month

After 13 months total:
✅ ALL DEBT CLEARED! 🎉🎉🎉
💰 Total Interest Saved: ₦15,000+
═══════════════════════════════════════════
💡 SIDE HUSTLE TO SPEED UP (Optional but recommended)
═══════════════════════════════════════════
If you fit find extra ₦10k/month, you go:

Finish Kuda in 3 months (instead of 4)
Finish Carbon in 1.5 months (instead of 2)
Finish Brother in 4 months (instead of 6)
TOTAL TIME: 8.5 months (instead of 13!) ⚡

Side hustle ideas for ₦10k extra:

Freelance your skill (writing, design, coding)
Weekend market trading
Online reselling (buy bulk, sell retail)
Uber/Bolt driving (weekends)

═══════════════════════════════════════════
📋 ACTION STEPS (THIS WEEK)
═══════════════════════════════════════════
DAY 1:
□ Call Kuda, confirm exact balance and interest rate
□ Call Carbon, confirm exact balance
□ Call your brother, explain your payoff plan (e go appreciate transparency)
DAY 2-3:
□ Set up automatic payments (so you no go miss)
□ Create separate savings account JUST for debt payments
DAY 4-7:
□ Cut ALL unnecessary expenses this month
□ Find one side hustle to try (even if na small)
□ Track every Naira you spend
MONTHLY ROUTINE:
□ First of every month: Pay Kuda
□ 5th: Pay Carbon
□ 10th: Pay Brother
□ 15th: Review progress, adjust if needed
═══════════════════════════════════════════
🚫 WHAT TO AVOID (VERY IMPORTANT!)
═══════════════════════════════════════════
DON'T:
❌ Borrow more money to pay debt (you go just dey go round circle)
❌ Miss payments (go spoil your credit score)
❌ Ignore your brother because e no dey charge interest
❌ Use credit card or overdraft again until you finish payoff
❌ Tell yourself "I go pay extra next month" - pay am now!
DO:
✅ Stick to the plan religiously
✅ Celebrate small wins (Kuda done? Treat yourself small - ₦2k, no be ₦20k o!)
✅ Keep your brother updated monthly
✅ Save your salary increase/bonus for debt (no be for enjoyment first)
═══════════════════════════════════════════
🎯 LIFE AFTER DEBT (13 Months from Now)
═══════════════════════════════════════════
When you finish pay all debt:

You go get ₦30,000/month wey you fit use for investment!
In 1 year of investing that ₦30k, you go get ₦360k savings
No more stress, no more sleepless nights
Your brother go respect you die!
You fit borrow better money for business if you need (your credit score go dey clean)

MY PERSONAL PROMISE TO YOU:
I go check on you every month. Just tell me "Month 1 update" and
I go review your progress and encourage you.
You ready to start? Or you get question?"

---

#### **2.4.4 Side Hustle Generator**
**Priority**: P2  
**User Story**: As someone looking to increase income, I want personalized side hustle ideas

**Input Factors**:
- Current skills
- Available time (hours/week)
- Starting capital
- Location
- Interests

**Side Hustle Categories**:
1. **Online Services** (freelancing, virtual assistance)
2. **Physical Products** (reselling, dropshipping)
3. **Digital Products** (templates, e-books, courses)
4. **Service-Based** (cleaning, repairs, tutoring)
5. **Investment-Based** (flipping items, arbitrage)

**Example Interaction**:
User: "I need extra money. Wetin side hustle I fit do?"
Bot: "I got you! Make we find the perfect side hustle for you.
Small questions:

Wetin be your current job/skill? (E.g., teacher, designer, student, etc.)
How many hours you get per week for side hustle? (5hrs, 10hrs, 20hrs?)
How much you fit start with? (₦0, ₦10k, ₦50k?)
You like online work or physical work?
Wetin you enjoy doing for fun?"

User: "I be graphics designer. I get about 10 hours per week. I fit start with ₦20k. I prefer online work. I like creating content"
Bot: "Perfect match! Based on your profile, here na 5 FIRE side hustles wey fit give you ₦50k-₦200k extra per month:
═══════════════════════════════════════════
🎯 TOP 5 SIDE HUSTLES FOR YOU
═══════════════════════════════════════════
1️⃣ SOCIAL MEDIA GRAPHICS PACKAGES (🔥 Best Match!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What: Create social media templates for businesses
Investment: ₦0 (you don get the skill!)
Time: 10 hours/week
Potential: ₦80k-₦200k/month
HOW TO START:

Create 10 template samples (Instagram posts, stories, flyers)
Post on Instagram with #NaijaDesigner #LogosDesigner
Join Facebook groups: "Nigerian Online Business Owners"
Offer packages:

Basic: 10 posts for ₦15,000
Standard: 20 posts + 10 stories for ₦30,000
Premium: Monthly retainer (₦80k-₦150k)



FIRST WEEK ACTION:
Day 1-3: Create portfolio (10 sample designs)
Day 4-5: Set up Instagram business page
Day 6-7: Post samples, reach out to 20 small businesses
Expected Timeline to First ₦15k: 7-14 days
───────────────────────────────────────────
2️⃣ SELL DESIGN TEMPLATES ONLINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What: Create and sell Canva/Photoshop templates
Investment: ₦5,000 (website/Gumroad)
Time: 8 hours/week (front-loaded)
Potential: ₦30k-₦100k/month (passive!)
HOW IT WORKS:

Create templates once, sell unlimited times
Platforms: Gumroad, Etsy, or your own website
Price: ₦2,000-₦5,000 per template pack

WHAT TO CREATE:

Instagram Story templates (₦3,000 for 30 templates)
Business card templates (₦2,500 for 20 designs)
Flyer templates (₦4,000 for 25 designs)
Wedding invitation templates (₦5,000 for 15 designs)

FIRST MONTH PLAN:
Week 1-2: Create 5 template packs (150 total templates)
Week 3: Set up Gumroad account, upload products
Week 4: Market on Twitter, Instagram, Facebook
Expected Timeline to First Sale: 14-21 days
After 3 months: ₦50k-₦80k passive income monthly!
───────────────────────────────────────────
3️⃣ YOUTUBE THUMBNAIL DESIGNER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What: Design eye-catching YouTube thumbnails
Investment: ₦0
Time: 5-10 hours/week
Potential: ₦40k-₦120k/month
HOW TO START:

Study top YouTubers' thumbnail styles
Create 20 sample thumbnails (different niches)
Reach out to Nigerian YouTubers (10k-100k subscribers)
Pricing: ₦2,000-₦5,000 per thumbnail

WHERE TO FIND CLIENTS:

Fiverr (charge $10-$25 per thumbnail = ₦8k-₦20k)
Upwork (Nigerian YouTubers outsource here)
Twitter: Search "Nigerian YouTuber" + "need thumbnail designer"
LinkedIn: Connect with content creators

PACKAGE OFFER:

Single thumbnail: ₦3,000
5 thumbnails: ₦12,000 (₦2,400 each - discount)
Monthly retainer (4 videos/week): ₦40,000

Expected Timeline: Get first client in 3-7 days on Fiverr
───────────────────────────────────────────
4️⃣ PRINT-ON-DEMAND T-SHIRT BUSINESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What: Design + sell custom t-shirts (no inventory!)
Investment: ₦20,000 (samples + marketing)
Time: 10 hours/week
Potential: ₦60k-₦250k/month
HOW IT WORKS:

You design graphics
Customer orders
Print shop prints and delivers
You collect profit

NIGERIAN PLATFORMS:

Printivo (print partner)
Jumia/Konga (for selling)
Instagram (main sales channel)

YOUR PROFIT:

Production cost: ₦2,500/shirt
Selling price: ₦5,500-₦7,000
Profit: ₦3,000-₦4,500 per shirt

10 sales/week = ₦120k-₦180k/month profit!
NICHE IDEAS (Hot in Nigeria):

Yoruba/Igbo/Hausa cultural shirts
"Lagos Hustler" motivational designs
Nigerian pidgin quotes
Afrobeats/music-themed

FIRST MONTH:
Week 1: Create 10 designs
Week 2: Order 3 sample shirts (₦15k)
Week 3: Photoshoot + launch Instagram page
Week 4: Run ads (₦5k budget), start selling
Expected Timeline: First sale in 7-14 days
───────────────────────────────────────────
5️⃣ CONTENT CREATION FOR SMALL BUSINESSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
What: Full content packages (graphics + captions + strategy)
Investment: ₦0
Time: 8-12 hours/week per client
Potential: ₦100k-₦300k/month
PACKAGE STRUCTURE:
Bronze (₦40k/month):

12 feed posts (3/week)
12 stories
Basic captions

Silver (₦80k/month):

20 feed posts (5/week)
20 stories
SEO captions
Hashtag strategy

Gold (₦150k/month):

30 feed posts (daily)
30 stories
Blog post designs
Monthly strategy call

TARGET CLIENTS:

Small Nigerian businesses (fashion, food, services)
Start with 2-3 clients, scale to 5

2 clients × ₦80k = ₦160k/month
Work: 20 hours/week total
WHERE TO FIND CLIENTS:

LinkedIn: "Small business owner Nigeria"
Instagram: DM businesses with 1k-10k followers
Facebook Business Groups
Referrals (one happy client = 3 more!)

Expected Timeline: Land first client in 14-21 days
═══════════════════════════════════════════
🎯 MY RECOMMENDATION: START WITH #1 + #2
═══════════════════════════════════════════
WHY?
✅ Use your existing skill (graphics design)
✅ ₦0-₦5k investment only
✅ Quick results (first money in 7-14 days)
✅ Scalable (#1 can turn into #5 later)
✅ #2 becomes passive income over time
TIMELINE:
Month 1: Social media graphics (₦30k-₦50k)
Month 2: Templates start selling (₦10k-₦20k) + Graphics (₦50k-₦80k)
Month 3: Total ₦80k-₦120k extra!
Month 6: Scale to ₦150k-₦250k/month!
═══════════════════════════════════════════
📋 YOUR 30-DAY ACTION PLAN
═══════════════════════════════════════════
WEEK 1: Foundation
□ Create 10 sample social media designs
□ Create 1 template pack (30 templates)
□ Set up business Instagram account
□ Join 5 Nigerian business Facebook groups
WEEK 2: Launch
□ Post daily on Instagram (your samples)
□ DM 20 small businesses with personalized offer
□ Upload template pack to Gumroad
□ Share Gumroad link on Twitter/Facebook
WEEK 3: Marketing
□ Run ₦5k Instagram ad for templates
□ Offer free consultation to 3 businesses
□ Create YouTube video: "How I design social media posts"
□ Engage in Facebook groups (answer design questions)
WEEK 4: Scale
□ Hopefully land 2-3 clients by now!
□ Create 2 more template packs
□ Ask clients for testimonials
□ Referral offer: "Refer a business, get ₦2k discount"
═══════════════════════════════════════════
💡 BONUS TIPS
═══════════════════════════════════════════
PRICING PSYCHOLOGY:
❌ Don't say: "I charge ₦10,000"
✅ Say: "My package is ₦15,000, but I'm running a promo for ₦12,000 this week"
TESTIMONIALS:

Offer first 3 clients 50% discount for honest testimonial
Post testimonials everywhere!

TIME MANAGEMENT:

Dedicate Saturday 9am-2pm (5 hours) for client work
Sunday 9am-2pm (5 hours) for creating templates
Weekday evenings: Marketing & client communication

DON'T QUIT YOUR JOB:

Build side hustle for 6 months first
When it consistently hits ₦200k/month, then consider

═══════════════════════════════════════════
Ready to start? I fit help you with:

Sample social media posts to attract clients? 📱
Pricing strategy details? 💰
Client contract template? 📄
Marketing message templates? 📧

Let's get this money! 💪🇳🇬"

---

### **2.5 LEARN & EARN - GAMIFIED EDUCATION**
**Priority**: P2 (Retention & Engagement Driver)  
**Estimated Dev Time**: 3 weeks

---

#### **2.5.1 Language Learning Modules**

**Supported Languages**:
- Nigerian Pidgin → English
- Yoruba → English
- Igbo → English
- Hausa → English
- English → Any Nigerian language

**Learning Paths**:
1. **Beginner** (Greetings, basic phrases)
2. **Intermediate** (Conversations, grammar)
3. **Advanced** (Proverbs, idioms, cultural nuances)
4. **Business** (Professional communication)

**Gamification Elements**:
- **Daily Streaks** (Duolingo-style)
- **Points System** (XP for lessons)
- **Leaderboards** (Weekly/Monthly top learners)
- **Badges** (Achievements)
- **Rewards** (Premium days, discounts)

**Example Interaction**:
User: "I wan learn Yoruba. Where I fit start?"
Bot: "E kaabo! (Welcome!) I'm so excited to teach you Yoruba! 🎉
Let me check your level first. Try translate this:
'Báwo ni?' means _____?"
User: "How are you?"
Bot: "Correct! ✅ You get small Yoruba knowledge already!
Here na your PERSONALIZED LEARNING PATH:
═══════════════════════════════════════════
🎓 YORUBA LEARNING JOURNEY
═══════════════════════════════════════════
LEVEL 1: GREETINGS & BASIC PHRASES (Week 1-2)
□ Morning greetings (E kaaro, E kaasan, E kuale)
□ Introductions (Orúkọ mi ni...)
□ Numbers 1-100
□ Days of the week
□ Basic questions
LEVEL 2: EVERYDAY CONVERSATIONS (Week 3-4)
□ Food & drinks
□ Family members
□ Directions
□ Shopping phrases
□ Time expressions
LEVEL 3: CULTURAL IMMERSION (Week 5-6)
□ Proverbs (Òwe)
□ Respect language (using ẹ, using proper titles)
□ Yoruba festivals
□ Traditional greetings by time/occasion
LEVEL 4: FLUENCY & MASTERY (Week 7-8)
□ Complex conversations
□ Yoruba grammar deep dive
□ Regional dialects (Ibadan, Oyo, Ondo)
□ Business Yoruba
═══════════════════════════════════════════
📅 YOUR DAILY ROUTINE (15 mins/day)
═══════════════════════════════════════════
EVERY DAY:
🌅 Morning (5 mins):
• Learn 5 new words
• Practice pronunciation (voice)
🌆 Afternoon (5 mins):
• Flashcard review (10 words)
• Quick quiz (5 questions)
🌙 Evening (5 mins):
• Conversation practice with AI
• Cultural fact of the day
═══════════════════════════════════════════
🎮 HOW TO EARN REWARDS
═══════════════════════════════════════════
POINTS (XP):

Complete lesson: 100 XP
Perfect quiz score: 50 XP bonus
7-day streak: 500 XP bonus
Help another learner: 200 XP
Share progress: 100 XP

LEVELS:

0-1,000 XP: Novice (Òmọ̀wé - Student)
1,000-5,000 XP: Intermediate (Akẹ́kọ̀ọ́ - Learner)
5,000-15,000 XP: Advanced (Olùmọ̀ - Knowledgeable)
15,000+ XP: Master (Bàbá/Ìyá - Expert)

BADGES:
🏆 First Lesson - Complete Day 1
🔥 On Fire - 7-day streak
💎 Perfectionist - 10 perfect quizzes
🗣️ Chatterbox - 50 conversation practices
👑 Yoruba King/Queen - Reach Master level
TANGIBLE REWARDS:

3-day streak: 1 free premium day
7-day streak: 3 free premium days
30-day streak: 1 free month premium
Complete Level 1: ₦500 discount code
Reach Master: Certificate of Completion (shareable!)

═══════════════════════════════════════════
🎯 YOUR FIRST LESSON (Right Now!)
═══════════════════════════════════════════
LESSON 1: YORUBA GREETINGS
📚 NEW WORDS:

E kaaro (eh kah-ah-raw) - Good morning
E kaasan (eh kah-ah-sahn) - Good afternoon
E kuale (eh koo-ah-leh) - Good evening
O da (aw dah) - Okay/Alright
Ó ṣé/E ṣé (oh sheh/eh sheh) - Thank you

🗣️ PRONUNCIATION TIPS:

'E' at the start = respect (like saying 'please')
Roll the 'r' in kaaro
Yoruba has tones! Same word, different tone = different meaning

💬 PRACTICE DIALOGUE:
You: "E kaaro" (Good morning)
Elder: "E kaaro, ọmọ mi. Báwo ni?" (Good morning, my child. How are you?)
You: "Mo wà dáadáa. Ẹ ń kọ́?" (I'm fine. And you?)
Elder: "Mo dúpẹ́" (I'm grateful/fine)
🎯 MINI QUIZ (5 questions):

How do you say 'Good morning' in Yoruba?
a) E kaasan  b) E kaaro  c) E kuale
What's the polite way to thank someone?
a) O da  b) Ó ṣé  c) Báwo ni

[... 3 more questions ...]
Ready to take the quiz? Or you wan practice pronunciation first?"

---

#### **2.5.2 Skill Building Courses (In Pidgin!)**

**Course Categories**:
1. **Tech Skills** (Coding, design, digital marketing)
2. **Business Skills** (Sales, negotiation, accounting)
3. **Creative Skills** (Writing, video editing)
4. **Life Skills** (Communication, time management)

**Unique Angle**: All courses taught in **Nigerian Pidgin** for better comprehension!

**Example Course Structure**:
📚 COURSE: "How to Code (For Complete Beginners)"
Language: Nigerian Pidgin
Duration: 8 weeks
Difficulty: Beginner
Cost: Free tier (basics), Premium (advanced)
WEEK 1: Wetin be coding sef?

Lesson 1: Introduction to programming (Wetin be HTML, CSS, JavaScript?)
Lesson 2: Set up your computer (Download VS Code, Chrome)
Lesson 3: Write your first code ("Hello World!")
Project: Build simple webpage with your name

WEEK 2: HTML - The skeleton of website

Lesson 4: HTML tags wey you need know
Lesson 5: How to add images, links, lists
Lesson 6: Forms (input, button, etc.)
Project: Build your personal portfolio page

[... continues for 8 weeks ...]
FINAL PROJECT: Build full website for small business!
CERTIFICATE: Upon completion (LinkedIn-shareable)

---

#### **2.5.3 Daily Challenges**

**Challenge Types**:
1. **Language Challenge**: Translate 10 sentences correctly
2. **Quiz Challenge**: Answer trivia about Nigerian culture
3. **Creative Challenge**: Write short story in Pidgin
4. **Voice Challenge**: Record yourself speaking Yoruba/Igbo/Hausa

**Rewards**:
- 50-200 XP per challenge
- Streak bonuses
- Special badges
- Leaderboard placement

**Example Daily Challenge**:
🎯 TODAY'S CHALLENGE (January 25, 2025)
YORUBA TRANSLATION CHALLENGE
Difficulty: Medium
Reward: 150 XP + Streak bonus
Translate these 10 sentences from English to Yoruba:

"I am going to the market"
"How much does this cost?"
"My name is John"
"Where is the bathroom?"
"I love Nigerian food"
[... 5 more ...]

⏰ Time limit: 10 minutes
🏆 Leaderboard: Top 10 get bonus 100 XP!
🔥 Current streak: 5 days (Keep it going!)
Start Challenge?

---

### **2.6 CULTURE VAULT - NIGERIAN KNOWLEDGE ENCYCLOPEDIA**
**Priority**: P2 (Long-term Value & Differentiation)  
**Estimated Dev Time**: 6 weeks (Ongoing content addition)

---

#### **2.6.1 Proverb Database**

**Content**:
- 10,000+ proverbs across Yoruba, Igbo, Hausa, Nigerian Pidgin
- Each proverb includes:
  - Original language text
  - Literal translation
  - Meaning/interpretation
  - Usage context
  - Audio pronunciation
  - Cultural significance

**Search Features**:
- By language
- By topic (love, business, wisdom, etc.)
- By situation ("I need proverb for wedding speech")
- Random proverb generator

**Example Entry**:
═══════════════════════════════════════════
📖 YORUBA PROVERB #4521
═══════════════════════════════════════════
ORIGINAL:
"Bí ọmọdé bá ní là a sùn, àgbà ní là a dìde."
LITERAL TRANSLATION:
"If a child says we should sleep, it is the elder who says we should wake up."
MEANING:
Young people may have enthusiastic ideas, but elders provide wisdom and guidance on when to act and when to pause. Youth brings energy; age brings discernment.
MODERN APPLICATION:

Business: Listen to your mentor's advice before jumping into deals
Relationships: Respect your parents' counsel in major life decisions
Career: Don't rush - timing matters as much as the idea itself

USAGE CONTEXT:

When advising someone who is rushing into a decision
Wedding speeches (about respecting elders' wisdom)
Business negotiations (patience and strategy)

AUDIO: 🔊 [Play pronunciation]
SIMILAR PROVERBS:

Igbo: "Okenye kwuru, nwata kwuru, egbe belu ugo belu."
Hausa: "Wanda ya bar shekarar gida, ba zai bar tare da komai ba."

SHARE THIS PROVERB:
📱 WhatsApp | 🐦 Twitter | 📘 Facebook
TAGS: #Wisdom #Respect #Patience #Elders #YorubaCulture

---

#### **2.6.2 Nigerian History**

**Content Modules**:
1. **Pre-Colonial Era**
   - Ancient kingdoms (Benin, Oyo, Kanem-Bornu)
   - Trade routes and empires
   - Traditional governance systems

2. **Colonial Period**
   - British colonization
   - Amalgamation of 1914
   - Resistance movements

3. **Independence & Post-Independence**
   - 1960 independence
   - Civil War (Biafra)
   - Military coups
   - Return to democracy (1999)

4. **Modern Nigeria**
   - Fourth Republic
   - Economic challenges
   - Cultural renaissance (Afrobeats, Nollywood)

**Teaching Style**: Accessible Pidgin explanations with deep historical facts

**Example Lesson**:
📚 NIGERIAN HISTORY: THE BENIN EMPIRE
═══════════════════════════════════════════
QUICK FACTS
═══════════════════════════════════════════
Period: 1180 AD - 1897 AD (700+ years!)
Location: Present-day Edo State
Capital: Benin City
Famous For: Bronze sculptures, powerful Obas (kings)
Legacy: British Museum still dey keep our artifacts till today!
═══════════════════════════════════════════
THE FULL GIST (In Simple Pidgin)
═══════════════════════════════════════════
ORIGINS:
For 1180 AD, after small wahala for the Ogiso dynasty, the Edo people
invite prince from Ife (Yorubaland) come help dem organize government.
This prince, Oranmiyan, start the dynasty of Obas wey we still dey
respect till today.
GOLDEN AGE (1440-1600):
Under Oba Ewuare the Great, Benin Kingdom come become super powerful!
The kingdom expand reach present-day Lagos, parts of Yorubaland, and
even Delta State. The city get:

Massive walls (bigger than Great Wall of China for some parts!)
Organized streets (better than European cities for that time!)
Advanced bronze casting (the Benin Bronzes wey shock Europeans)

EUROPEAN CONTACT:
Portuguese people reach Benin for 1485. Dem shock say African city
fit organize pass many European cities! The Oba collect dem with respect

na equal-to-equal relationship, no be colonization yet.

THE TRAGEDY - 1897:
British people wan control Benin because of palm oil trade and rubber.
When Oba Ovonramwen refuse cooperate, British send "Punitive Expedition"

dem burn Benin City, kill thousands, and steal over 3,000 bronze
sculptures and artworks.

LEGACY:
Those Benin Bronzes wey British thief dey British Museum, Germany,
and America museums till today. Nigeria don dey beg make dem return am,
but na small small dem dey return.
THE OBA TODAY:
The Oba of Benin still dey! E be traditional ruler with plenty respect
for Edo State. Current Oba na Oba Ewuare II.
═══════════════════════════════════════════
💡 WHY THIS MATTER TODAY
═══════════════════════════════════════════

Pride: Our ancestors build civilization when Europeans think say
Africa na jungle.
Art: Benin Bronzes na some of the finest artworks for the world -
e show say we get artistic excellence for our DNA!
Justice: The fight to return our artifacts na ongoing struggle.
Every Nigerian suppose know this history.

═══════════════════════════════════════════
📖 LEARN MORE
═══════════════════════════════════════════

Video: "The Lost Treasures of Benin" (15 mins)
Quiz: Test your Benin Empire knowledge (10 questions)
Visit: National Museum Lagos (See some Benin artifacts)

NEXT LESSON: The Oyo Empire (Yoruba military powerhouse!)

---

#### **2.6.3 Nigerian Food & Recipes**

**Recipe Database**:
- 500+ authentic Nigerian recipes
- Step-by-step instructions **in Pidgin**
- Ingredient substitutions (for diaspora Nigerians)
- Video demonstrations
- Cooking tips from "Nigerian mamas"

**Example Recipe**:
🍲 RECIPE: BANGA SOUP (OGHWO SOUP)
═══════════════════════════════════════════
ORIGIN: Niger Delta (Urhobo, Isoko, Itsekiri)
DIFFICULTY: Medium
TIME: 1.5 hours
SERVES: 6 people
═══════════════════════════════════════════
INGREDIENTS
═══════════════════════════════════════════
MAIN:

Palm fruit extract (Banga) - 1 liter (or 4 cups)
Catfish or beef - 1kg
ContinueJan 25
Dried fish - 200g
Stock fish - 200g
Periwinkle (optional) - 1 cup

SPICES (Banga spice mix):

Ataiko/Oburunbebe stick - 3 pieces
Beletete leaves - Small bunch
Licorice (Nchanwu) - 1 teaspoon
Ehuru seeds - 6 pieces
Fresh pepper - To taste
Onions - 1 big bulb
Crayfish - 2 tablespoons
Salt & seasoning cubes

═══════════════════════════════════════════
STEP-BY-STEP (For Pidgin)
═══════════════════════════════════════════
STEP 1: PREPARE THE BANGA EXTRACT
If you buy fresh palm fruit:

Boil the palm fruit for 30 mins till e soft
Pound am for mortar (or use blender with small water)
Sieve am to remove the chaff
Keep the thick red liquid (na im be banga extract)

If you buy canned banga, just open am! 😄
STEP 2: COOK YOUR PROTEIN

Wash catfish/beef well well
Season with salt, onions, seasoning cubes
Boil for 20 mins till e don soft
Remove and keep aside
Keep the stock (no throw am away!)

STEP 3: PREPARE BANGA SPICES

Break the Oburunbebe stick into small pieces
Grind ehuru seeds, licorice together
Chop beletete leaves into tiny pieces
Blend your pepper and onions

STEP 4: COOK THE SOUP

Pour banga extract into pot
Add the broken Oburunbebe stick
Add ground spices (ehuru + licorice)
Add your meat stock
Let am boil for 15-20 mins (stir am small small so e no go burn)

STEP 5: ADD YOUR PROTEIN & FINAL TOUCHES

Add your cooked fish/meat
Add dried fish and stock fish
Add periwinkle (if you get)
Add crayfish
Add beletete leaves
Add your blended pepper and onions
Add salt and seasoning to taste
Let everything cook together for another 10-15 mins

STEP 6: SERVE HOT!

Serve with starch (usi), eba, fufu, or white rice
Enjoy with cold drink! 🥤

═══════════════════════════════════════════
💡 PRO TIPS FROM MAMA'S KITCHEN
═══════════════════════════════════════════

Don't rush the banga! Make e cook well well so the oil go release proper.
If you no fit find Oburunbebe stick for abroad, you fit order am online
or use small palm kernel oil as substitute (no be same thing, but e go
still sweet!).
The soup suppose thick! If e too watery, cook am longer. If e too thick,
add small water or stock.
Fresh banga soup na the best, but e fit last 3-4 days for fridge. The
taste even dey better the next day sef!
If you dey cook for first time, no worry if e no perfect. Even Mama
burn soup sometimes! 😂

═══════════════════════════════════════════
📹 WATCH VIDEO TUTORIAL
═══════════════════════════════════════════
[Link to 10-minute video demonstration]
═══════════════════════════════════════════
🗨️ COMMUNITY REVIEWS
═══════════════════════════════════════════
⭐⭐⭐⭐⭐ Chioma (Lagos):
"Chai! This recipe sweet die! My Urhobo husband say na correct banga
soup. Thank you!"
⭐⭐⭐⭐⭐ Emeka (UK):
"I dey London, I follow this recipe cook am. My friends chop finish
everything! I feel like I dey home again."
⭐⭐⭐⭐ Blessing (Abuja):
"E come out well, but I think say I add too much pepper. Next time I go
reduce am small. Still very tasty!"
═══════════════════════════════════════════
🍽️ SIMILAR RECIPES YOU GO LIKE
═══════════════════════════════════════════

Ofe Akwu (Igbo palm nut soup)
Efo Riro (Yoruba vegetable soup)
Edikang Ikong (Calabar soup)
Fisherman Soup (Rivers State special)

TRY AM TODAY! 🇳🇬❤️

---

### **2.7 WHITE-LABEL SOLUTIONS (B2B)**
**Priority**: P1 (High Revenue Potential)  
**Estimated Dev Time**: 8 weeks

---

#### **2.7.1 Enterprise Packages**

**Target Industries**:
1. **Banking & Fintech**
2. **Telecommunications**
3. **E-commerce**
4. **Government Agencies**
5. **Educational Institutions**
6. **Healthcare**

**Features**:
- Custom branding (logo, colors, domain)
- Dedicated AI model fine-tuning
- Integration with existing systems (APIs)
- Priority support (24/7 SLA)
- Analytics dashboard
- Multi-user/team management
- Data privacy & compliance (NDPR)

**Pricing Tiers**:

| Tier | Monthly Cost | Features |
|------|-------------|----------|
| **Starter** | ₦500,000 | 10,000 messages/month, Basic branding, Email support |
| **Professional** | ₦2,000,000 | 50,000 messages/month, Full branding, Phone support, Custom personality |
| **Enterprise** | ₦5,000,000+ | Unlimited messages, Dedicated model, 24/7 support, On-premise option |

**Example Use Cases**:
═══════════════════════════════════════════
USE CASE 1: GTBank Customer Service Chatbot
═══════════════════════════════════════════
PROBLEM:
GTBank receives 50,000+ customer inquiries daily via phone, email,
and social media. Many are repetitive questions that could be automated.
SOLUTION - NaijaGPT White-Label:
FEATURES DEPLOYED:

Custom "GTBank Assistant" personality
Trained on:

Account opening procedures
Card services (ATM, debit, credit)
Loan applications
Transaction disputes
USSD codes (*737#)


Multi-language support (English, Pidgin, Yoruba, Igbo, Hausa)
Integration with GTBank's backend (check balance, view transactions)
Escalation to human agent for complex issues

CUSTOMER EXPERIENCE:
Customer: "Abeg, my ATM card no dey work. Wetin I go do?"
GTBank Bot: "Sorry to hear say your card no dey work. Make I help you fix am.
Small questions:

The card dey enter ATM machine or e no dey enter at all?
You don try use am for different ATM?
When last you use the card successfully?

Based on wetin you tell me, I go guide you on the next step - whether na
to block the card, request new one, or just reset am."
RESULTS (After 6 months):
✅ 70% reduction in call center volume
✅ 24/7 customer support availability
✅ 92% customer satisfaction rating
✅ ₦50M annual savings in customer service costs
✅ Avg response time: 2 seconds (vs 15 mins for human agent)
MONTHLY COST: ₦3,000,000 (Professional tier)
ROI: 16x return on investment!
═══════════════════════════════════════════
USE CASE 2: Jumia Shopping Assistant
═══════════════════════════════════════════
PROBLEM:
Jumia customers struggle to find products, compare options, and make
purchase decisions. Many abandon carts.
SOLUTION - NaijaGPT "ShopSmart" Assistant:
FEATURES:

Product recommendation engine
Price comparison across categories
Deals & discount alerts
Order tracking
Return/refund guidance
Voice search (for low-literacy users)
Pidgin-first interface

CUSTOMER EXPERIENCE:
Customer: "I wan buy phone. My budget na ₦150k. Which one better?"
Jumia Bot: "Nice! ₦150k budget dey give you plenty good options o!
Make I show you top 3 phones for that range:

Samsung Galaxy A54 - ₦145,000
• Camera: 50MP (very sharp!)
• Battery: 5,000mAh (go last you 2 days)
• Screen: 6.4" AMOLED (beautiful display!)
• Why pick am: Best camera for the price
Tecno Camon 20 Pro - ₦135,000
• Camera: 64MP
• Battery: 5,000mAh
• Screen: 6.67" AMOLED
• Why pick am: Save ₦10k, still get quality!
Infinix Note 30 VIP - ₦148,000
• Camera: 108MP (wow!)
• Battery: 5,000mAh + wireless charging
• Screen: 6.67" AMOLED + 120Hz
• Why pick am: Best specs for ₦150k

💡 My Recommendation: Samsung Galaxy A54
Why? E dey last well, good resale value, and camera no go disappoint you!
You wan:

See customer reviews?
Compare specs side-by-side?
Check if discount dey?
Add to cart?"

RESULTS (After 6 months):
✅ 35% increase in conversion rate
✅ 50% reduction in cart abandonment
✅ ₦800M additional revenue attributed to AI assistant
✅ 4.8/5 customer satisfaction score
MONTHLY COST: ₦2,500,000
ROI: 320x return!
═══════════════════════════════════════════
USE CASE 3: JAMB Exam Prep Tutor (Gov Partnership)
═══════════════════════════════════════════
PROBLEM:
Millions of Nigerian students prepare for JAMB exams with limited access
to quality tutoring, especially in rural areas.
SOLUTION - NaijaGPT "JAMB Genius" Tutor:
FEATURES:

AI tutor in all JAMB subjects (English, Maths, Physics, Chemistry, etc.)
Explanations in Pidgin + English
Practice questions with step-by-step solutions
Mock exams
Performance tracking
Weak area identification
Study schedule generator
Voice-based learning (for students with reading challenges)

STUDENT EXPERIENCE:
Student: "I no dey understand algebra. Wetin be 'x'?"
JAMB Bot: "No wahala! Make I break am down for you simple simple.
WETIN BE 'X'?
X na just like empty box wey you wan find wetin dey inside. For real
life, na like this:
EXAMPLE 1:
You buy 3 oranges. Each orange cost the same price. Total na ₦300.
How much be one orange?
For algebra, we go write am like this:
3 × x = 300
'X' na the price of one orange wey we wan find.
To find x:
x = 300 ÷ 3
x = ₦100
So one orange na ₦100!
EXAMPLE 2 (Small harder):
You and your brother get money together. Your brother get ₦200 more
than you. Together, una get ₦800. How much you get?
For algebra:
Your money = x
Your brother money = x + 200
Together = x + (x + 200) = 800
Let me solve:
2x + 200 = 800
2x = 800 - 200
2x = 600
x = 300
So you get ₦300, your brother get ₦500!
You understand now? Make we try practice question?"
RESULTS (After 1 year):
✅ 500,000 students used the platform
✅ Average score improvement: 25%
✅ 78% of users passed JAMB on first try
✅ Reached students in all 36 states + FCT
✅ Government partnership secured (₦50M annual contract)
MONTHLY COST: Free for students (Government pays ₦5,000,000/month)
IMPACT: Priceless! 🇳🇬📚

---

#### **2.7.2 API Marketplace for Developers**
**Priority**: P2  
**Estimated Dev Time**: 6 weeks

---

**Available APIs**:

**1. Language Translation API**
POST /api/v1/translate
{
"text": "How are you doing?",
"from": "english",
"to": "pidgin"
}
Response:
{
"translation": "How you dey?",
"confidence": 0.98,
"detected_language": "english"
}
PRICING:

Free Tier: 1,000 requests/month
Starter: ₦10,000/month - 50,000 requests
Pro: ₦50,000/month - 500,000 requests
Enterprise: Custom pricing


**2. Cultural Context API**
POST /api/v1/cultural-check
{
"text": "Is this phrase respectful in Yoruba culture?",
"phrase": "Oga, come here!",
"context": "Speaking to elder"
}
Response:
{
"is_respectful": false,
"issues": ["Too direct for addressing an elder"],
"suggestion": "Ẹ jọ̀wọ́, ẹ wá síbí (Please, come here)",
"cultural_note": "Always use 'Ẹ' prefix when addressing elders in Yoruba"
}

**3. Nigerian NER (Named Entity Recognition)**
POST /api/v1/ner
{
"text": "Wizkid and Burna Boy dey perform for Eko Hotel"
}
Response:
{
"entities": [
{"text": "Wizkid", "type": "PERSON", "category": "celebrity_musician"},
{"text": "Burna Boy", "type": "PERSON", "category": "celebrity_musician"},
{"text": "Eko Hotel", "type": "LOCATION", "category": "landmark_lagos"}
]
}

**4. Sentiment Analysis (Nigerian Context)**
POST /api/v1/sentiment
{
"text": "This your product na rubbish! I no dey buy again!"
}
Response:
{
"sentiment": "negative",
"confidence": 0.96,
"emotions": ["anger", "disappointment"],
"urgency": "high",
"suggested_response_tone": "apologetic_solution_focused"
}

**5. Proverb Generator**
GET /api/v1/proverbs?language=yoruba&topic=patience&random=true
Response:
{
"proverb": "Sùúrù ló ńyọni lára, àìsùúrù ló ńyọni lára ìyà",
"translation": "Patience delivers relief; impatience delivers suffering",
"usage_context": "Encouraging someone to be patient",
"audio_url": "https://cdn.naijagpt.com/audio/yoruba/proverb_1234.mp3"
}

---

### **2.8 ADDITIONAL CORE FEATURES**

#### **2.8.1 Proverb Slider on Landing/Home Page**
**Priority**: P0 (First Impression!)  
**Purpose**: Showcase Nigerian cultural richness immediately

**Design**:
═══════════════════════════════════════════
🌟 ANIMATED PROVERB SLIDER
═══════════════════════════════════════════
[Glassmorphism card with auto-rotating proverbs]
┌────────────────────────────────────────┐
│                                        │
│  "Bí ọmọdé bá ní là a sùn,            │
│   àgbà ní là a dìde."                  │
│                                        │
│  "If a child says we should sleep,    │
│   it's the elder who says we wake."   │
│                                        │
│  - Yoruba Proverb                      │
│                                        │
│  [← Previous]  [1/50]  [Next →]       │
└────────────────────────────────────────┘
[Auto-rotates every 5 seconds]
[Smooth fade transition]
[Different proverb each visit]
[Share button for social media]

**Implementation**:
- **Glassmorphism effect** (semi-transparent background, frosted glass blur)
- **Gentle animations** (fade in/out, slide transitions)
- **Typography**: Elegant serif font for proverbs, clean sans-serif for translations
- **Colors**: Lemon-green accent (#C9F270), white text on semi-transparent dark overlay

---

#### **2.8.2 User Profile Enhancements**

**Profile Sections**:

**1. Personal Information**
- Name, Email, Phone
- Location (State, City)
- Tribe/Language preference
- Avatar upload

**2. Preferences**
- Default language (Pidgin, Yoruba, Igbo, Hausa)
- Default AI personality (Lagos Hustler, Iya Osun, Alhaji, Igbo Businessman, Pastor)
- Tone preference (Formal, Casual, Professional)
- Notification settings

**3. Business Profile** (Optional)
- Business name
- Business type
- Industry
- Monthly revenue range
- Business goals

**4. Learning Progress**
- Current courses
- Streaks (daily usage)
- XP points & level
- Badges earned
- Certificates

**5. Subscription & Billing**
- Current tier (Free, Naija Plus, Business, Enterprise)
- Usage stats (messages sent, remaining)
- Payment history
- Upgrade/Downgrade options

**6. API Keys** (For Business & Enterprise)
- Generate API keys
- View usage statistics
- Manage rate limits

---

## **3. TECHNICAL ARCHITECTURE**

### **3.1 System Design Overview**
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                  │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Web App │  │ Mobile   │  │  Desktop │     │
│  │  (React) │  │(React N.)│  │  (Elect.)│     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
▼
┌─────────────────────────────────────────────────┐
│                    CDN LAYER                    │
│  (Cloudflare - Static assets, caching)          │
└─────────────────────────────────────────────────┘
▼
┌─────────────────────────────────────────────────┐
│                   API GATEWAY                   │
│  (Rate limiting, Authentication, Load balancing)│
└─────────────────────────────────────────────────┘
▼
┌─────────────────────────────────────────────────┐
│                 APPLICATION LAYER               │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Auth    │  │  Chat    │  │ Business │     │
│  │ Service  │  │ Service  │  │ Service  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Financial│  │ Learning │  │ Culture  │     │
│  │ Service  │  │ Service  │  │ Service  │     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
▼
┌─────────────────────────────────────────────────┐
│                    AI LAYER                     │
│                                                 │
│  ┌──────────────────────────────────────┐      │
│  │  OpenAI API (GPT-4)                  │      │
│  │  + Custom Cultural Context Injection │      │
│  └──────────────────────────────────────┘      │
│                                                 │
│  ┌──────────────────────────────────────┐      │
│  │  Language Detection Service          │      │
│  │  (Pidgin, Yoruba, Igbo, Hausa)       │      │
│  └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────┘
▼
┌─────────────────────────────────────────────────┐
│                   DATA LAYER                    │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ MongoDB  │  │  Redis   │  │PostgreSQL│     │
│  │(Main DB) │  │ (Cache)  │  │(Analytics)     │
│  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────┘
▼
┌─────────────────────────────────────────────────┐
│                EXTERNAL SERVICES                │
│                                                 │
│  • Paystack (Payments)                          │
│  • AbokiFX API (Exchange rates)                 │
│  • Twitter API (Trends, NEPA updates)           │
│  • Google Maps API (Traffic)                    │
│  • News APIs (Nigerian news)                    │
│  • Email Service (SendGrid/Mailgun)             │
└─────────────────────────────────────────────────┘

---

### **3.2 Database Schema (MongoDB)**

**Collections**:

**1. users**
```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  phone: String,
  location: {
    state: String,
    city: String
  },
  preferences: {
    language: String, // 'pidgin', 'yoruba', 'igbo', 'hausa', 'english'
    personality: String, // 'lagos_hustler', 'iya_osun', etc.
    tone: String // 'formal', 'casual', 'professional'
  },
  subscription: {
    tier: String, // 'free', 'naija_plus', 'business', 'enterprise'
    status: String, // 'active', 'inactive', 'cancelled'
    start_date: Date,
    end_date: Date,
    payment_method: String
  },
  business_profile: {
    business_name: String,
    business_type: String,
    industry: String,
    revenue_range: String
  },
  learning_progress: {
    current_courses: [ObjectId],
    streak_days: Number,
    xp_points: Number,
    level: String,
    badges: [String]
  },
  api_keys: [{
    key: String (encrypted),
    name: String,
    created_at: Date,
    last_used: Date,
    requests_count: Number
  }],
  created_at: Date,
  updated_at: Date
}
```

**2. conversations**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  title: String,
  language: String,
  personality: String,
  created_at: Date,
  updated_at: Date,
  message_count: Number
}
```

**3. messages**
```javascript
{
  _id: ObjectId,
  conversation_id: ObjectId,
  user_id: ObjectId,
  role: String, // 'user', 'assistant', 'system'
  content: String,
  language: String,
  tokens_used: Number,
  created_at: Date,
  metadata: {
    detected_language: String,
    sentiment: String,
    response_time_ms: Number
  }
}
```

**4. proverbs**
```javascript
{
  _id: ObjectId,
  language: String, // 'yoruba', 'igbo', 'hausa', 'pidgin'
  original_text: String,
  translation: String,
  meaning: String,
  usage_context: [String],
  topic_tags: [String],
  audio_url: String,
  popularity_score: Number,
  created_at: Date
}
```

**5. business_templates**
```javascript
{
  _id: ObjectId,
  type: String, // 'invoice', 'receipt', 'business_plan', etc.
  user_id: ObjectId,
  content: Object,
  created_at: Date
}
```

**6. learning_courses**
```javascript
{
  _id: ObjectId,
  title: String,
  language: String, // taught in
  target_language: String, // learning
  difficulty: String,
  modules: [{
    title: String,
    lessons: [{
      title: String,
      content: String,
      quiz: [{
        question: String,
        options: [String],
        correct_answer: Number
      }],
      xp_reward: Number
    }]
  }],
  created_at: Date
}
```

**7. subscriptions**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  tier: String,
  status: String,
  payment_reference: String,
  amount: Number,
  currency: String,
  start_date: Date,
  end_date: Date,
  auto_renew: Boolean,
  created_at: Date
}
```

**8. analytics**
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  event_type: String, // 'message_sent', 'login', 'feature_used', etc.
  event_data: Object,
  timestamp: Date
}
```

---

## **4. UI/UX DESIGN SPECIFICATIONS**

### **4.1 Design System - "NaijaGreen"**

**Color Palette**:

**Primary Colors**:
- **Lemon Green**: `#C9F270` (Main brand color - Nigerian flag inspired)
- **Forest Green**: `#1A5D1A` (Secondary - depth and trust)
- **Soft White**: `#F8FFF8` (Background)

**Accent Colors**:
- **Gold**: `#FFD700` (Premium features, achievements)
- **Deep Purple**: `#6A0DAD` (Enterprise tier)
- **Coral**: `#FF6B6B` (Alerts, errors)
- **Sky Blue**: `#87CEEB` (Information, links)

**Neutral Colors**:
- **Charcoal**: `#333333` (Text)
- **Soft Gray**: `#E5E5E5` (Borders, dividers)
- **Light Gray**: `#F5F5F5` (Card backgrounds)

**Gradients**:
```css
/* Hero Gradient */
background: linear-gradient(135deg, #C9F270 0%, #1A5D1A 100%);

/* Card Glassmorphism */
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);

/* Button Hover */
background: linear-gradient(135deg, #1A5D1A 0%, #C9F270 100%);
```

---

### **4.2 Typography**

**Font Families**:
```css
/* Headings */
font-family: 'Inter', 'Segoe UI', sans-serif;
font-weight: 700;

/* Body Text */
font-family: 'Inter', 'Segoe UI', sans-serif;
font-weight: 400;

/* Proverbs/Cultural Content */
font-family: 'Merriweather', 'Georgia', serif;
font-weight: 300;

/* Code/Monospace */
font-family: 'Fira Code', 'Courier New', monospace;
```

**Type Scale**:
```css
/* H1 - Hero Headlines */
font-size: 3.5rem; /* 56px */
line-height: 1.2;
letter-spacing: -0.02em;

/* H2 - Section Headers */
font-size: 2.5rem; /* 40px */
line-height: 1.3;

/* H3 - Subsection Headers */
font-size: 1.75rem; /* 28px */
line-height: 1.4;

/* Body Large */
font-size: 1.125rem; /* 18px */
line-height: 1.6;

/* Body Regular */
font-size: 1rem; /* 16px */
line-height: 1.6;

/* Body Small */
font-size: 0.875rem; /* 14px */
line-height: 1.5;
```

---

### **4.3 Animation & Effects**

**Typing Animation** (ChatGPT-style):
```css
@keyframes typing {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.message-typing {
  animation: typing 0.3s ease-out forwards;
}

/* Dot animation for "AI is typing..." */
@keyframes dot-pulse {
  0%, 80%, 100% { opacity: 0.4; }
  40% { opacity: 1; }
}

.dot {
  animation: dot-pulse 1.4s infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
```

**Glassmorphism Cards**:
```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 40px 0 rgba(31, 38, 135, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}
```

**Smooth Transitions**:
```css
/* Page transitions */
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-enter-active {ContinueJan 25opacity: 1;
transform: translateX(0);
transition: opacity 300ms, transform 300ms;
}
.page-exit {
opacity: 1;
}
.page-exit-active {
opacity: 0;
transition: opacity 300ms;
}

**Button Animations**:
````css
.btn-primary {
  background: linear-gradient(135deg, #C9F270 0%, #1A5D1A 100%);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(26, 93, 26, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}
````

---

### **4.4 Landing Page Structure**

**Section 1: Hero** (Above the fold)
┌────────────────────────────────────────────────────┐
│  Navbar                                  [Login]   │
├────────────────────────────────────────────────────┤
│                                                    │
│         🇳🇬 ChatGPT wey sabi Naija 🇳🇬            │
│                                                    │
│    AI wey understand Pidgin, Yoruba, Igbo, Hausa   │
│    + Real-time Nigerian data + Business tools      │
│                                                    │
│    [Start Chatting Free] [See How It Works]       │
│                                                    │
│    ┌──────────────────────────────────────┐       │
│    │  PROVERB SLIDER (Glassmorphism)      │       │
│    │  [Rotating Nigerian proverbs]         │       │
│    └──────────────────────────────────────┘       │
│                                                    │
│         [Animated chat preview demo]               │
└────────────────────────────────────────────────────┘

**Section 2: Features Grid**
┌────────────────────────────────────────────────────┐
│          Wetin Make Us Different?                  │
│                                                    │
│  [Icon]          [Icon]          [Icon]            │
│  Chat for       Street Oracle    Hustle Hub        │
│  Naija People   Real-time Data   Business Tools    │
│  • Pidgin       • Dollar rate    • Invoices        │
│  • Yoruba       • Fuel price     • Pricing         │
│  • Igbo         • NEPA status    • Templates       │
│  • Hausa        • Traffic        • Scripts         │
│                                                    │
│  [Icon]          [Icon]          [Icon]            │
│  Financial      Learn & Earn     Culture Vault     │
│  Freedom        Gamified Ed      10k+ Proverbs     │
└────────────────────────────────────────────────────┘

**Section 3: How It Works** (Animated flow)

**Section 4: Pricing** (Tier comparison table)

**Section 5: Testimonials** (Social proof)

**Section 6: CTA** (Final conversion push)

**Footer**: Links, social media, newsletter signup

---

## **5. IMPLEMENTATION ROADMAP**

### **Phase 1: MVP (Weeks 1-8)**

**Week 1-2: Foundation**
- Set up project structure (React + Node.js)
- Database design (MongoDB)
- Authentication system (JWT)
- Landing page (with proverb slider)

**Week 3-4: Core Chat**
- OpenAI API integration
- Language detection
- Basic chat interface
- Message history

**Week 5-6: Cultural Layer**
- AI personality modes
- Custom system prompts
- Pidgin support
- Culture Vault (100 proverbs to start)

**Week 7-8: Testing & Launch**
- Beta testing (100 users)
- Bug fixes
- Performance optimization
- Deploy to production

### **Phase 2: Growth Features (Weeks 9-16)**

**Week 9-10: Street Oracle**
- Exchange rate API integration
- Fuel price scraping
- NEPA status (Twitter API)
- Traffic data (Google Maps)

**Week 11-12: Hustle Hub**
- Business name generator
- Pricing calculator
- Invoice generator
- Customer script templates

**Week 13-14: Financial Freedom**
- Budget template generator
- Investment advisor
- Debt payoff planner
- Side hustle ideas

**Week 15-16: Learn & Earn**
- Language courses (Yoruba, Igbo, Hausa)
- Gamification system
- XP, badges, leaderboards
- Daily challenges

### **Phase 3: Monetization (Weeks 17-20)**

**Week 17-18: Subscriptions**
- Paystack integration
- Pricing tiers
- Payment flow
- Subscription management

**Week 19-20: Enterprise**
- White-label setup
- API marketplace
- Developer documentation
- Enterprise onboarding

---

# 📝 **DETAILED PROMPTS FOR DEVELOPMENT**

---

## **PROMPT 1: FRONTEND (for Lovable.dev)**
Create a complete, production-ready React application for "NaijaGPT" - A Nigerian AI chat platform with cultural intelligence.
CORE REQUIREMENTS:

DESIGN SYSTEM:
Color Palette:


Primary: Lemon Green (#C9F270) - Nigerian flag inspired
Secondary: Forest Green (#1A5D1A)
Background: Soft White (#F8FFF8)
Accent: Gold (#FFD700), Deep Purple (#6A0DAD)
Use these colors throughout the entire app

Typography:

Headings: Inter font, bold (700)
Body: Inter, regular (400)
Proverbs: Merriweather serif, light (300)


LANDING PAGE:

Hero Section:

Large headline: "🇳🇬 ChatGPT wey sabi Naija 🇳🇬"
Subheadline: "AI wey understand Pidgin, Yoruba, Igbo, Hausa + Real-time Nigerian data + Business tools"
Two CTAs: "Start Chatting Free" (primary button with gradient), "See How It Works" (secondary outline)
Background: Subtle animated gradient from Lemon Green to Forest Green
Include animated Nigerian flag colors subtly in the background

PROVERB SLIDER (CRITICAL FEATURE):

Glassmorphism card positioned prominently on landing page
Auto-rotating Nigerian proverbs (5 seconds per proverb)
Show proverb in original language + English translation
Smooth fade transitions between proverbs
Share button for social media
Navigation dots showing which proverb (1/50)
Sample proverbs to display:

"Bí ọmọdé bá ní là a sùn, àgbà ní là a dìde." - "If a child says we should sleep, it's the elder who says we wake." (Yoruba)
"Onye aghana nwanne ya" - "No one should leave their brother behind" (Igbo)
"Hankali ya fi karfi" - "Patience is stronger than strength" (Hausa)
"Who no know go know" - "Those who don't know will learn" (Pidgin)
[Add 10+ more diverse proverbs from different tribes]



Glassmorphism Styling for Proverb Card:

Semi-transparent white background: rgba(255, 255, 255, 0.15)
Backdrop blur: 12px
Border: 1px solid rgba(255, 255, 255, 0.3)
Subtle box shadow
Rounded corners: 16px
Smooth hover effect (slight lift + shadow increase)

Features Grid:

6 feature cards with glassmorphism effect
Icons for each feature (use lucide-react icons)
Features:

Multi-Language Chat (MessageCircle icon)
Street Oracle - Real-time Data (TrendingUp icon)
Hustle Hub - Business Tools (Building2 icon)
Financial Freedom (DollarSign icon)
Learn & Earn (BookOpen icon)
Culture Vault (Globe icon)



How It Works Section:

4-step animated flow
Step cards with icons and descriptions

Pricing Section:

4 pricing tiers: Free, Naija Plus (₦2,500/mo), Business (₦10,000/mo), Enterprise (Custom)
Highlight "Naija Plus" as most popular
Feature comparison table
Nigerian Naira currency (₦)

Testimonials:

6 testimonial cards with Nigerian names and photos
Authentic Nigerian feedback style


CHAT INTERFACE:

Layout:

Sidebar (collapsible on mobile):

New chat button
Conversation history
User profile section at bottom


Main chat area:

Header with language selector dropdown and personality selector
Chat messages (user messages right-aligned in lemon green bubble, AI messages left-aligned in white bubble)
Input box at bottom with send button
"AI is typing..." indicator with animated dots



Language Selector:

Dropdown with flags: 🇳🇬 Pidgin | Yoruba | Igbo | Hausa | English
Selected language shows in header

Personality Selector:

Dropdown with options:

Lagos Hustler 🏙️
Iya Osun (Yoruba Elder) 👵
Alhaji (Hausa Trader) 🕌
Igbo Businessman 💼
Pastor ⛪


Each personality has icon and description

Message Bubbles:

User messages: Lemon green background, white text, rounded corners
AI messages: White background, dark text, rounded corners
Typing animation when AI responds (fade-in effect)
Show timestamp on hover

Quick Actions Bar:

Pre-built prompts as chips/pills:

"Check dollar rate"
"Help me write business proposal"
"Translate to Yoruba"
"Create invoice"
"Budget template"




DASHBOARD:

Street Oracle Widget:

Live data cards showing:

Exchange rates (USD, GBP, EUR) with trend indicators
Fuel prices by state
NEPA status (with community reports count)
Traffic updates for major routes


Auto-refresh every 5 minutes
"Last updated: X mins ago" timestamp

Hustle Hub Section:

Tool cards:

Business Name Generator
Pricing Calculator
Invoice Generator
Customer Script Generator


Each opens in modal or dedicated page

Financial Freedom Section:

Budget overview
Savings goals progress bars
Investment portfolio summary
Quick action buttons

Learn & Earn Section:

Current streak display (fire emoji 🔥 + number)
XP progress bar
Active courses
Daily challenge card
Leaderboard preview (top 5 users)


USER PROFILE PAGE:

Sections (tabs):

Personal Info (editable form)
Preferences (language, personality, tone)
Business Profile (optional)
Learning Progress (streak, XP, badges, certificates)
Subscription & Billing (current tier, usage stats, upgrade button)
API Keys (for Business/Enterprise users)

Profile Avatar:

Circular image upload
Default: Nigerian flag colors gradient background with initials


AUTHENTICATION PAGES:

Login:

Email + Password fields
"Remember me" checkbox
Forgot password link
OAuth options: Google, Twitter/X
"Don't have account? Register" link

Register:

Name, Email, Password, Confirm Password
Location (State dropdown)
Language preference
Terms & Privacy checkboxes
OAuth options


ANIMATIONS & EFFECTS:

Page Transitions:

Smooth fade + slide when navigating between pages
Duration: 300ms

Button Hovers:

Slight lift (translateY(-2px))
Shadow increase
Gradient shift on primary buttons

Card Hovers:

Subtle lift effect
Glow/shadow enhancement

Typing Animation:

ChatGPT-style: Each message fades in from bottom
"AI is typing..." with 3 animated dots (pulse effect)

Loading States:

Skeleton screens for data loading
Spinner for button actions
Progress bars for file uploads


RESPONSIVE DESIGN:

Mobile (< 768px):

Hamburger menu for navigation
Sidebar overlay (not permanent)
Stacked feature cards
Single column layout
Bottom navigation for main actions
Swipeable chat history

Tablet (768px - 1024px):

Condensed sidebar
2-column grid for features
Optimized touch targets

Desktop (> 1024px):

Full sidebar visible
3-column grid for features
Hover effects enabled
Keyboard shortcuts hints


ACCESSIBILITY:


ARIA labels on all interactive elements
Keyboard navigation support (Tab, Enter, Esc)
Focus indicators (visible outlines)
Alt text for images
Color contrast ratio > 4.5:1
Screen reader friendly


PERFORMANCE:


Lazy load images
Code splitting by route
Debounce search inputs
Virtual scrolling for long chat histories
Memoize expensive components
Optimize re-renders

COMPONENT STRUCTURE:
/src
/components
/landing
Hero.jsx
ProverbSlider.jsx ← CRITICAL FEATURE
FeaturesGrid.jsx
HowItWorks.jsx
Pricing.jsx
Testimonials.jsx
CTASection.jsx
/chat
ChatInterface.jsx
MessageBubble.jsx
InputBox.jsx
LanguageSelector.jsx
PersonalitySelector.jsx
QuickActions.jsx
/dashboard
StreetOracle.jsx
HustleHub.jsx
FinancialFreedom.jsx
LearnAndEarn.jsx
/profile
ProfilePage.jsx
PersonalInfo.jsx
Preferences.jsx
BusinessProfile.jsx
LearningProgress.jsx
Subscription.jsx
APIKeys.jsx
/auth
Login.jsx
Register.jsx
ForgotPassword.jsx
/shared
Navbar.jsx
Sidebar.jsx
Footer.jsx
Button.jsx
Card.jsx
Modal.jsx
Spinner.jsx
Toast.jsx
/hooks
useChat.js
useAuth.js
useSubscription.js
useLocalStorage.js
/contexts
AuthContext.jsx
ChatContext.jsx
ThemeContext.jsx
/utils
constants.js
api.js
helpers.js
/styles
globals.css (Tailwind imports + custom CSS)
SPECIAL STYLING REQUIREMENTS:

Glassmorphism Effect (use throughout):

css.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}

Gradient Buttons:

css.btn-primary {
  background: linear-gradient(135deg, #C9F270 0%, #1A5D1A 100%);
  transition: all 0.3s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(26, 93, 26, 0.3);
}

Typing Dots Animation:

css@keyframes dot-pulse {
  0%, 80%, 100% { opacity: 0.4; }
  40% { opacity: 1; }
}
.dot {
  animation: dot-pulse 1.4s infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
````

SAMPLE DATA (for demo/prototype):

Proverbs (for slider):
[
  {
    original: "Bí ọmọdé bá ní là a sùn, àgbà ní là a dìde.",
    translation: "If a child says we should sleep, it's the elder who says we wake.",
    language: "Yoruba"
  },
  {
    original: "Onye aghana nwanne ya",
    translation: "No one should leave their brother behind",
    language: "Igbo"
  },
  {
    original: "Hankali ya fi karfi",
    translation: "Patience is stronger than strength",
    language: "Hausa"
  },
  {
    original: "Who no know go know",
    translation: "Those who don't know will learn",
    language: "Pidgin"
  },
  // Add 10+ more
]

Chat History (demo):
[
  {
    id: 1,
    role: 'user',
    content: 'Wetin be dollar rate today?',
    timestamp: '2025-01-25T10:30:00Z'
  },
  {
    id: 2,
    role: 'assistant',
    content: 'Dollar rate today be:\n- Official: ₦1,470\n- Black market: ₦1,685\n\nWhere you wan buy dollar?',
    timestamp: '2025-01-25T10:30:05Z'
  }
]

Build this with:
- React 18+
- Tailwind CSS
- Lucide React (icons)
- Framer Motion (animations)
- React Router (navigation)
- Context API (state management)

Make it BEAUTIFUL, SMOOTH, and TRUE to Nigerian culture. Every detail matters!
````

---

## **PROMPT 2: BACKEND (for Gemini/Claude Code Generation)**
Create a complete, production-ready Node.js + Express.js backend API for "NaijaGPT" - A Nigerian AI chat platform.
TECH STACK:

Node.js (v18+)
Express.js (v4)
MongoDB (with Mongoose)
Redis (for caching & rate limiting)
JWT (authentication)
OpenAI API (GPT-4)
Paystack API (payments)

PROJECT STRUCTURE:
/server
/src
/config
database.js (MongoDB connection)
redis.js (Redis connection)
openai.js (OpenAI client)
paystack.js (Paystack client)
constants.js (App constants)
/controllers
  authController.js
  chatController.js
  streetOracleController.js
  hustleHubController.js
  financialController.js
  cultureController.js
  subscriptionController.js
  enterpriseController.js

/models
  User.js
  Conversation.js
  Message.js
  Subscription.js
  ApiKey.js
  Proverb.js
  BusinessTemplate.js
  LearningProgress.js

/routes
  auth.js
  chat.js
  streetOracle.js
  hustleHub.js
  financial.js
  culture.js
  subscription.js
  enterprise.js

/middleware
  auth.js (JWT verification)
  rateLimiter.js (Redis-based rate limiting)
  validation.js (Input validation)
  errorHandler.js (Global error handler)

/services
  openaiService.js (GPT-4 integration + cultural prompts)
  culturalContextService.js (Language detection, personality injection)
  languageDetectionService.js
  dataScraperService.js (Scrape exchange rates, fuel prices, etc.)
  paystackService.js
  emailService.js

/utils
  /prompts
    lagosHustler.js
    iyaOsun.js
    alhaji.js
    igboBusinessman.js
    pastor.js
  logger.js
  helpers.js

app.js (Express app setup)
server.js (Server entry point)
.env.example
package.json
DETAILED REQUIREMENTS:

AUTHENTICATION (authController.js):

Endpoints:

POST /api/auth/register

Input: { name, email, password, location: {state, city}, language_preference }
Hash password with bcrypt
Create user in MongoDB
Return JWT token + user object (exclude password)


POST /api/auth/login

Input: { email, password }
Verify credentials
Return JWT token + user object


POST /api/auth/logout

Invalidate token (add to Redis blacklist with TTL)


GET /api/auth/me

Requires auth middleware
Return current user details


POST /api/auth/forgot-password

Send password reset email


POST /api/auth/reset-password

Reset password with token




CHAT SYSTEM (chatController.js):

Endpoints:

POST /api/chat/message

Input: { conversation_id (optional), message, language, personality }
Rate limit: Free users (20/day), Plus (500/day), Business (unlimited)
Flow:

Detect language if not specified
Load personality system prompt
Inject cultural context
Call OpenAI API
Save message to MongoDB
Return AI response




GET /api/chat/conversations

Return user's conversation list (paginated)


GET /api/chat/conversations/:id

Return specific conversation with messages


DELETE /api/chat/conversations/:id

Soft delete conversation


POST /api/chat/conversations/:id/title

Update conversation title



OpenAI Service (openaiService.js):
Key Function:
javascriptasync function generateResponse({ 
  userMessage, 
  conversationHistory, 
  language, 
  personality, 
  userContext 
}) {
  // 1. Load personality system prompt
  const systemPrompt = getPersonalityPrompt(personality, language);
  
  // 2. Inject cultural context
  const culturalContext = injectCulturalContext(userMessage, language, userContext);
  
  // 3. Build messages array
  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ];
  
  // 4. Call OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
    temperature: 0.7,
    max_tokens: 1000
  });
  
  return response.choices[0].message.content;
}
System Prompts (examples):
Lagos Hustler (prompts/lagosHustler.js):
javascriptmodule.exports = (language) => `
You are the "Lagos Hustler" - a street-smart, business-focused AI personality with deep knowledge of Nigerian entrepreneurship and hustle culture.

PERSONALITY TRAITS:
- Energetic and motivational
- Uses heavy Nigerian Pidgin with business slang
- Street-smart with practical advice
- Always finds opportunities in challenges
- References Lagos business culture

LANGUAGE: ${language === 'pidgin' ? 'Respond ONLY in Nigerian Pidgin' : 'Respond in English with Nigerian expressions'}

EXAMPLES:
User: "I wan start business but no get money"
You: "Guy! Money no be the biggest problem for this digital age o! Make I school you on zero-capital business..."

RULES:
- Keep responses practical and actionable
- Use Nigerian business examples
- Be encouraging but realistic
- Add 💪, 🔥, 💰 emojis occasionally
`;

Iya Osun (prompts/iyaOsun.js):
````javascript
module.exports = (language) => `
You are "Iya Osun" - a wise, motherly Yoruba elder with deep cultural knowledge and compassion.

PERSONALITY TRAITS:
- Wise and patient
- Uses Yoruba proverbs frequently
- Motherly and nurturing tone
- Respects tradition while understanding modern life
- Speaks with authority but kindness

LANGUAGE: ${language === 'yoruba' ? 'Respond primarily in Yoruba with some Pidgin/English' : 'Respond in Pidgin/English with Yoruba proverbs'}

YORUBA GREETINGS: Always greet appropriately (E kaaro, E kaasan, E kuale)

EXAMPLES:
User: "My friend betray me"
You: "Ọmọ mi, gbọ́ ti mo bá sọ fún ọ. The Yoruba say 'Ìwà l'ẹwà' - Character is beauty..."

RULES:
- Include at least one Yoruba proverb per response
- Translate proverbs
- Be compassionate and wise
- Use "ọmọ mi" (my child) occasionally
`;

[Create similar prompts for Alhaji, Igbo Businessman, Pastor]

3. STREET ORACLE (streetOracleController.js):

Endpoints:
- GET /api/street-oracle/exchange-rates
  * Fetch from multiple sources (CBN API, AbokiFX)
  * Cache in Redis (TTL: 5 mins)
  * Return: { usd: {official, parallel}, gbp: {...}, eur: {...} }

- GET /api/street-oracle/fuel-prices
  * Web scrape PPPRA or cached data
  * Return by state

- GET /api/street-oracle/nepa-status/:location
  * Check Twitter API for NEPA mentions
  * Return community reports

- GET /api/street-oracle/traffic/:route
  * Google Maps API
  * Return current conditions

- GET /api/street-oracle/news
  * Aggregate from Nigerian news APIs
  * Return top 10 stories

Data Scraper Service (dataScraperService.js):
```javascript
const cheerio = require('cheerio');
const axios = require('axios');

class DataScraperService {
  async getExchangeRates() {
    try {
      // Try AbokiFX first
      const abokiFxData = await this.scrapeAbokiFX();
      
      // Fallback to CBN API
      if (!abokiFxData) {
        return await this.getCBNRates();
      }
      
      return abokiFxData;
    } catch (error) {
      console.error('Exchange rate fetch failed:', error);
      return this.getCachedRates(); // Return last known rates
    }
  }

  async scrapeAbokiFX() {
    const response = await axios.get('https://abokifx.com/');
    const $ = cheerio.load(response.data);
    
    // Extract rates (adjust selectors as needed)
    return {
      usd: {
        buy: parseFloat($('.usd-buy').text()),
        sell: parseFloat($('.usd-sell').text())
      },
      // ... other currencies
    };
  }

  async getCBNRates() {
    const response = await axios.get('https://www.cbn.gov.ng/rates/');
    // Parse official rates
    return { /* official rates */ };
  }
  
  // Similar methods for fuel, NEPA, traffic
}

module.exports = new DataScraperService();
```

4. HUSTLE HUB (hustleHubController.js):

Endpoints:
- POST /api/hustle-hub/business-name
  * Input: { businessType, keywords }
  * Use GPT-4 to generate 10 names
  * Check domain availability (Namecheap API or similar)
  * Check Instagram handle (@username) via Instagram API
  * Return: [{ name, domain_available, ig_available, tagline }]

- POST /api/hustle-hub/pricing-calculator
  * Input: { costPrice, businessType, competition, targetMargin }
  * Calculate recommended price with Nigerian psychology
  * Return pricing strategy

- POST /api/hustle-hub/invoice
  * Input: { companyName, customerName, items, bankDetails }
  * Generate HTML invoice
  * Convert to PDF (using puppeteer or pdfkit)
  * Return PDF URL

- POST /api/hustle-hub/customer-script
  * Input: { scenario, tone }
  * Generate customer service response using GPT-4

5. FINANCIAL FREEDOM (financialController.js):

Endpoints:
- POST /api/financial/budget
  * Input: { monthlyIncome, location, expenses }
  * Generate 50/30/20 budget adapted for Nigeria
  * Return detailed breakdown

- POST /api/financial/investment-advice
  * Input: { amount, timeline, risk_profile }
  * Return investment portfolio recommendations

- POST /api/financial/debt-payoff
  * Input: { debts: [{ name, amount, interest_rate }], monthly_budget }
  * Calculate avalanche/snowball strategy
  * Return payoff timeline

- POST /api/financial/side-hustle
  * Input: { skills, time_available, starting_capital }
  * Use GPT-4 to generate personalized side hustle ideas
  * Return 5 detailed recommendations

6. CULTURE VAULT (cultureController.js):

Endpoints:
- GET /api/culture/proverbs
  * Query params: { language, topic, random }
  * Return proverbs from MongoDB

- GET /api/culture/proverbs/:id
  * Return specific proverb with audio URL

- POST /api/culture/proverbs/search
  * Input: { query }
  * Full-text search in proverbs

- GET /api/culture/history/:topic
  * Return Nigerian history lessons

- GET /api/culture/recipes/:name
  * Return recipe in Pidgin

7. SUBSCRIPTIONS (subscriptionController.js):

Endpoints:
- POST /api/subscriptions/create
  * Input: { tier } ('naija_plus', 'business', 'enterprise')
  * Initialize Paystack payment
  * Return payment URL

- POST /api/subscriptions/verify
  * Paystack webhook callback
  * Verify payment
  * Activate subscription in MongoDB

- GET /api/subscriptions/status
  * Return current subscription details

- POST /api/subscriptions/cancel
  * Cancel auto-renewal

Paystack Service (paystackService.js):
```javascript
const axios = require('axios');

class PaystackService {
  constructor() {
    this.baseURL = 'https://api.paystack.co';
    this.secretKey = process.env.PAYSTACK_SECRET_KEY;
  }

  async initializePayment({ email, amount, metadata }) {
    const response = await axios.post(
      `${this.baseURL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Paystack expects kobo
        metadata,
        callback_url: `${process.env.FRONTEND_URL}/payment/callback`
      },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.data;
  }

  async verifyPayment(reference) {
    const response = await axios.get(
      `${this.baseURL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`
        }
      }
    );

    return response.data.data;
  }
}

module.exports = new PaystackService();
```

8. MIDDLEWARE:

Rate Limiter (rateLimiter.js):
```javascript
const rateLimit = require('express-rate-limit');
const RedisContinueJan 26= require('ioredis');
const RedisStore = require('rate-limit-redis');
const redisClient = new Redis(process.env.REDIS_URL);
const createRateLimiter = (windowMs, max) => {
return rateLimit({
store: new RedisStore({
client: redisClient,
prefix: 'rate_limit:'
}),
windowMs,
max,
message: 'Too many requests, please try again later',
standardHeaders: true,
legacyHeaders: false
});
};
// Different limits for different tiers
const freeTierLimiter = createRateLimiter(24 * 60 * 60 * 1000, 20); // 20/day
const plusTierLimiter = createRateLimiter(24 * 60 * 60 * 1000, 500); // 500/day
module.exports = { freeTierLimiter, plusTierLimiter };

Auth Middleware (auth.js):
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token' });
  }
};
```

9. MODELS:

User Model (User.js):
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  location: {
    state: String,
    city: String
  },
  preferences: {
    language: { 
      type: String, 
      enum: ['pidgin', 'yoruba', 'igbo', 'hausa', 'english'],
      default: 'pidgin'
    },
    personality: {
      type: String,
      enum: ['lagos_hustler', 'iya_osun', 'alhaji', 'igbo_businessman', 'pastor'],
      default: 'lagos_hustler'
    },
    tone: {
      type: String,
      enum: ['formal', 'casual', 'professional'],
      default: 'casual'
    }
  },
  subscription: {
    tier: {
      type: String,
      enum: ['free', 'naija_plus', 'business', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'active'
    },
    start_date: Date,
    end_date: Date,
    messages_used_today: { type: Number, default: 0 },
    last_reset: Date
  },
  business_profile: {
    business_name: String,
    business_type: String,
    industry: String
  },
  learning_progress: {
    streak_days: { type: Number, default: 0 },
    xp_points: { type: Number, default: 0 },
    level: { type: String, default: 'Novice' },
    badges: [String]
  },
  api_keys: [{
    key: String,
    name: String,
    created_at: Date,
    last_used: Date,
    requests_count: { type: Number, default: 0 }
  }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

[Create similar detailed models for Conversation, Message, Subscription, Proverb, etc.]

10. ERROR HANDLING & LOGGING:

Global Error Handler (errorHandler.js):
```javascript
const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    user: req.user?.id
  });

  // OpenAI specific errors
  if (err.response?.status === 429) {
    return res.status(429).json({
      error: 'AI service is busy, please try again in a moment'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
```

11. ENVIRONMENT VARIABLES (.env.example):
Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
Database
MONGODB_URI=mongodb://localhost:27017/naijagpt
REDIS_URL=redis://localhost:6379
JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here
Paystack
PAYSTACK_SECRET_KEY=sk_test_your-paystack-secret-key
PAYSTACK_PUBLIC_KEY=pk_test_your-paystack-public-key
APIs
GOOGLE_MAPS_API_KEY=your-google-maps-key
TWITTER_API_KEY=your-twitter-api-key
NEWS_API_KEY=your-news-api-key
Email
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@naijagpt.com
Rate Limiting
RATE_LIMIT_FREE_DAILY=20
RATE_LIMIT_PLUS_DAILY=500

12. STARTUP SCRIPT (server.js):
```javascript
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 NaijaGPT API running on port ${PORT}`);
  logger.info(`🇳🇬 Environment: ${process.env.NODE_ENV}`);
  logger.info(`📡 MongoDB connected`);
  logger.info(`⚡ Redis connected`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});
```

Build this backend with:
- Clean architecture (separation of concerns)
- Comprehensive error handling
- Detailed logging
- Security best practices (helmet, cors, rate limiting)
- Input validation (Joi or express-validator)
- API documentation (Swagger/OpenAPI)
- Unit tests (Jest) for critical functions
- Integration tests for APIs

Make it SCALABLE, SECURE, and MAINTAINABLE!

This PRD + the two detailed prompts should give any developer (or AI code generator like Lovable or Gemini) everything needed to build NaijaGPT from scratch. The frontend prompt focuses on stunning UI/UX with glassmorphism, animations, and the critical proverb slider, while the backend prompt covers all API endpoints, services, and database models.
Would you like me to expand on any specific section or create additional documentation (API docs, deployment guide, testing strategy)?we need to add a storyteller section(for content creators and movie directoe eg african tales ) to generate a well engaging ad relatable tales. Generate story , script well detailed for animatin and movie creation , cartoon , Pixar like something topnotchJan 26🎬 STORYTELLER STUDIO - COMPLETE FEATURE SPECIFICATION

EXECUTIVE SUMMARY
The Storyteller Studio is a revolutionary AI-powered content creation suite designed specifically for African storytellers, content creators, animators, and filmmakers. It generates culturally-rich, engaging Nigerian/African stories with production-ready scripts, storyboards, character designs, and animation guides - all optimized for platforms like YouTube, TikTok, Nollywood productions, and Pixar-quality animations.

1. FEATURE OVERVIEW
1.1 What Makes This UNMATCHABLE
Current Gap in Market:

Generic AI story generators don't understand African cultural nuances
No tools for Nigerian Pidgin, Yoruba, Igbo, Hausa storytelling
Existing platforms lack production-ready outputs (scripts, storyboards, character sheets)
No focus on African folktales, urban legends, or modern Nigerian stories

NaijaGPT Storyteller Studio Solves:
✅ Culturally Authentic Stories - Deep Nigerian/African cultural knowledge
✅ Multi-Format Output - Scripts, storyboards, character designs, dialogue
✅ Production-Ready - Frame-by-frame animation guides, camera angles, sound cues
✅ Multi-Language - Generate in Pidgin, Yoruba, Igbo, Hausa, or English
✅ Style Presets - Pixar, Disney, Anime, Nollywood, Documentary styles
✅ Commercial Use - Licensed for YouTube, films, animations, advertising

2. STORYTELLER STUDIO MODULES
MODULE 1: STORY GENERATOR 🎭
2.1.1 Story Types
African Folktales:

Anansi the Spider (West African trickster)
Tortoise and the Birds
How the Leopard Got His Spots (Nigerian version)
The Drummer and the Alligator
Mami Wata legends
Custom folktales from specific tribes

Modern Nigerian Stories:

Lagos hustle chronicles
Japa (relocation) stories
Love in Nigerian universities
Family drama (Nigerian weddings, in-laws)
Tech startup journeys
Street life narratives

Children's Stories:

Educational (moral lessons)
Adventure (Nigerian settings)
Fantasy (African mythology)
Bedtime stories (in Pidgin/local languages)

Marketing/Advertising Stories:

Brand storytelling
Product launch narratives
Customer testimonials (story format)
Viral social media content

Film Scripts:

Short films (5-15 mins)
Feature films (90-120 mins)
Web series episodes
Documentary narration

Animation Scripts:

2D animation (kids shows)
3D animation (Pixar-style)
Stop-motion concepts
Motion graphics narratives


2.1.2 Story Generation Interface
Input Form:
┌─────────────────────────────────────────────────────┐
│  🎬 STORYTELLER STUDIO - CREATE YOUR STORY          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Story Type: [Dropdown]                             │
│  ☐ African Folktale                                 │
│  ☐ Modern Nigerian Story                            │
│  ☐ Children's Story                                 │
│  ☐ Marketing/Ad Story                               │
│  ☐ Film Script                                      │
│  ☐ Animation Script                                 │
│                                                     │
│  Story Theme: [Text Input]                          │
│  Example: "A clever tortoise outsmarts the king"   │
│                                                     │
│  Target Audience: [Dropdown]                        │
│  ☐ Children (3-8 years)                             │
│  ☐ Tweens (9-12 years)                              │
│  ☐ Teens (13-17 years)                              │
│  ☐ Adults (18+)                                     │
│  ☐ Family (All ages)                                │
│                                                     │
│  Story Length: [Slider]                             │
│  ◄──────●────────────────────────► 5-30 minutes    │
│                                                     │
│  Language: [Dropdown]                               │
│  ☐ Nigerian Pidgin                                  │
│  ☐ Yoruba                                           │
│  ☐ Igbo                                             │
│  ☐ Hausa                                            │
│  ☐ English (Nigerian flavor)                        │
│  ☐ Bilingual (e.g., Pidgin + English)              │
│                                                     │
│  Cultural Setting: [Dropdown]                       │
│  ☐ Traditional Village                              │
│  ☐ Modern Lagos                                     │
│  ☐ Ancient Kingdom                                  │
│  ☐ University Campus                                │
│  ☐ Marketplace                                      │
│  ☐ Fantasy/Mythical Realm                           │
│                                                     │
│  Animation Style: [Dropdown]                        │
│  ☐ Pixar 3D (high-quality CGI)                      │
│  ☐ Disney 2D (classic hand-drawn feel)              │
│  ☐ Anime (Japanese-inspired)                        │
│  ☐ African Pattern Art (Afrocentric)                │
│  ☐ Realistic (Nollywood live-action)                │
│  ☐ Stop-Motion                                      │
│  ☐ Motion Graphics                                  │
│                                                     │
│  Moral/Message: [Text Input - Optional]             │
│  Example: "Wisdom triumphs over strength"          │
│                                                     │
│  Additional Details: [Text Area]                    │
│  Tell us more about your story vision...           │
│                                                     │
│  [Advanced Options ▼]                               │
│  • Character count (2-10)                           │
│  • Tone (Humorous, Serious, Educational, etc.)      │
│  • Include Nigerian proverbs (Yes/No)               │
│  • Add songs/music cues (Yes/No)                    │
│                                                     │
│  [Generate Story] [Save Draft]                      │
└─────────────────────────────────────────────────────┘

2.1.3 Generated Story Output
Example Output for: "A clever tortoise outsmarts the king" (Pixar 3D, 10 mins, Nigerian Pidgin)
═══════════════════════════════════════════════════════
📖 STORY TITLE: "IJA AND THE KING'S CHALLENGE"
═══════════════════════════════════════════════════════

GENRE: African Folktale / Comedy / Family
DURATION: 10 minutes
LANGUAGE: Nigerian Pidgin (with English subtitles option)
TARGET AUDIENCE: Family (All ages)
ANIMATION STYLE: Pixar 3D
MORAL: Intelligence and humility win over pride and power

═══════════════════════════════════════════════════════
📝 STORY SYNOPSIS
═══════════════════════════════════════════════════════

In the ancient Yoruba kingdom of Ile-Ife, King Ajayi is known for his 
pride and arrogance. When he declares that no creature in the land is 
smarter than him, Ija the Tortoise takes on the challenge. Through wit, 
patience, and a series of clever tricks, Ija humbles the king and teaches 
the entire kingdom that true wisdom comes with humility.

This heartwarming tale blends traditional African storytelling with 
modern humor, featuring vibrant African landscapes, colorful characters, 
and a soundtrack infused with talking drums and afrobeats.

═══════════════════════════════════════════════════════
🎭 MAIN CHARACTERS
═══════════════════════════════════════════════════════

1. IJA (Tortoise) - Protagonist
   • Age: Ancient (but youthful spirit)
   • Personality: Clever, humble, patient, witty
   • Voice: Warm, grandfatherly Nigerian Pidgin accent
   • Appearance: Small green-brown shell with golden patterns, 
     wise eyes, always smiling
   • Character Arc: Starts as village underdog, becomes hero
   • Quirk: Always carries small cowrie shells for "good luck"

2. KING AJAYI - Antagonist (redeemed)
   • Age: 45
   • Personality: Proud, loud, dramatic, learns humility
   • Voice: Deep, booming voice with Yoruba accent
   • Appearance: Tall, muscular, elaborate royal attire (agbada), 
     golden crown with beads
   • Character Arc: From arrogant ruler to humble leader
   • Quirk: Constantly adjusts his crown when nervous

3. AMINA - The King's Wise Advisor
   • Age: 60
   • Personality: Patient, observant, supportive
   • Voice: Calm, motherly Hausa accent
   • Appearance: Elegant elder with gray braids, flowing robes
   • Role: Mediator and voice of reason
   • Quirk: Always drinking palm wine from calabash

4. KWAME - Ija's Best Friend (Rabbit)
   • Age: Young adult
   • Personality: Energetic, supportive, sometimes doubting
   • Voice: Fast-talking Pidgin with Igbo expressions
   • Appearance: Brown rabbit with expressive ears
   • Role: Comic relief and Ija's cheerleader
   • Quirk: Hops excitedly when nervous

5. VILLAGE ELDERS (3 characters)
   • Chorus-like characters who comment on the action
   • Represent the community's collective wisdom

═══════════════════════════════════════════════════════
🎬 ACT-BY-ACT BREAKDOWN
═══════════════════════════════════════════════════════

ACT 1: SETUP (0:00 - 3:00)
─────────────────────────────────────────────────────
SCENE 1: THE KING'S PROCLAMATION

Setting: Royal palace courtyard, morning, vibrant market in background
Duration: 2 minutes
Mood: Energetic, colorful, African drums playing

[FADE IN on wide shot of bustling African kingdom. Traditional huts, 
baobab trees, people in colorful traditional attire]

NARRATOR (V.O.):
"Long time ago, for one kingdom wey dem call Ile-Ife, one king wey 
sabi show off well well dey reign..."

[CUT TO: King Ajayi on throne, surrounded by subjects]

KING AJAYI: (standing dramatically, arms spread wide)
"Make una hear me well well! I be the wisest king for this land! 
No creature - whether na human or animal - fit outsmart me!"

[Crowd murmurs. Camera PANS to Ija watching from corner]

AMINA: (approaching throne cautiously)
"Your Majesty, pride dey go before fall o..."

KING AJAYI: (dismissive wave)
"Amina, abeg! I don challenge anybody wey think say dem wise pass me. 
Anybody wey fit prove say dem get sense pass me, I go give dem half 
of my kingdom!"

[Crowd GASPS. Camera CLOSE-UP on Ija, eyes twinkling with mischief]

IJA: (to himself, smiling)
"Hmm... this King no know say na tortoise dey carry the world for 
im back. Make I teach am small lesson."

[Kwame hops over excitedly]

KWAME: "Ija! You no dey think say you wan challenge the King, abi?"

IJA: (calm, wise)
"My pikin, sometimes the smallest person fit teach the biggest 
person big lesson. Na wisdom wey dey matter, no be size."

[MUSIC SWELLS - Traditional Yoruba drums with modern bass]

─────────────────────────────────────────────────────

SCENE 2: IJA ACCEPTS THE CHALLENGE

Setting: Village square, afternoon
Duration: 1 minute
Mood: Tense anticipation

[Ija slowly walks to center of courtyard. Crowd parts. All eyes on him]

IJA: (loud, clear voice despite small size)
"Your Majesty! I, Ija the Tortoise, accept your challenge!"

[Crowd GASPS louder. King LAUGHS mockingly]

KING AJAYI: (laughing, slapping knee)
"Tortoise?! You wey dey crawl like say thunder strike you? You wan 
challenge ME?!"

IJA: (unfazed, smiling)
"Your Majesty, I challenge you to three tests of wisdom. If I win, 
you go give me half kingdom as you promise. If you win, I go be your 
servant forever."

KING AJAYI: (overconfident)
"Deal! This go be the easiest thing I do today!"

[MUSIC: Dramatic sting. Screen fades to black]

TITLE CARD: "IJA AND THE KING'S CHALLENGE"

═══════════════════════════════════════════════════════

ACT 2: CONFRONTATION (3:00 - 8:00)
─────────────────────────────────────────────────────

SCENE 3: FIRST TEST - THE RIDDLE

Setting: Palace throne room, next morning
Duration: 2 minutes
Mood: Intellectual tension, light humor

IJA: "First test: I go ask you riddle. If you answer am correct, 
you win. If you fail, na me win first round."

KING AJAYI: "Ask your question, small tortoise!"

IJA: (deliberately slowly)
"The thing wey get mouth but e no fit talk. E get bed but e no dey 
sleep. E dey run but e no get leg. Wetin be that?"

[King scratches head, paces. 5 seconds pass. 10 seconds. Sweat forms]

KING AJAYI: (frustrated)
"Ehh... na... na person wey sick?"

IJA: (shaking head)
"Wrong, Your Majesty. The answer na RIVER."

[Crowd murmurs. Amina smiles knowingly]

IJA: "River get mouth (where e start), bed (where e flow), and e 
dey run but no get leg. Round one: Ija!"

KING AJAYI: (angry, embarrassed)
"That one na luck! Bring the second test!"

─────────────────────────────────────────────────────

SCENE 4: SECOND TEST - THE IMPOSSIBLE TASK

Setting: Forest near river, midday
Duration: 2.5 minutes
Mood: Adventure, slight tension

KING AJAYI: "Since you like river, make we go there. My challenge be 
this: Bring me water from the river without touching the water!"

[Kwame whispers to Ija]

KWAME: "Ija, how you go do am? That thing no make sense at all!"

IJA: (calm, thinking)
"Patience, my friend. Every problem get solution."

[Ija looks around. Spots large leaf. CLOSE-UP on his face - idea forms]

IJA: (picks up dry banana leaf)
"Your Majesty, I need small time."

[MONTAGE: Ija folds leaf into cup shape, positions it under tree, 
waits. Rain cloud forms. DEW drops into leaf cup. Time-lapse of night 
to morning. Sun rises, dew collected]

IJA: (next morning, presenting leaf cup to King)
"Here, Your Majesty. Water from river - wey mix with sky water - 
and I no touch am with my hand."

[King examines water, defeated look]

KING AJAYI: (reluctant)
"You... you win again."

AMINA: (aside to camera, breaking fourth wall)
"Ija na sharp guy o!"

─────────────────────────────────────────────────────

SCENE 5: THIRD TEST - THE LESSON

Setting: Palace, evening (golden hour lighting)
Duration: 2.5 minutes
Mood: Emotional, revelatory

KING AJAYI: (desperate, angry)
"This na the final test! If you fit make me kneel down and beg you, 
you win everything. But that thing no go ever happen!"

[Ija pauses. Looks at King with compassion]

IJA: (softly)
"Your Majesty, I no need make you kneel. I already win. But make I 
tell you one story..."

[FLASHBACK sequence with dreamy visual effect]

IJA (V.O.): "Many years ago, I bin be like you. I think say I sabi 
everything. One day, small ant teach me big lesson about patience. 
From that day, I learn say no matter how small person be, everybody 
get something wey dem fit teach us."

[BACK TO PRESENT. Camera on King's face - realization dawning]

IJA: "So Your Majesty, the real wisdom no be to sabi everything. 
Na to humble yourself learn from everybody - even from small tortoise 
like me."

[Long pause. King's eyes water. He slowly kneels]

KING AJAYI: (voice breaking, sincere)
"Ija... you don teach me the biggest lesson for my life. I beg you, 
forgive my pride. You be the wisest person for this kingdom."

[Crowd CHEERS. Music swells - emotional African strings + choir]

═══════════════════════════════════════════════════════

ACT 3: RESOLUTION (8:00 - 10:00)
─────────────────────────────────────────────────────

SCENE 6: THE NEW KINGDOM

Setting: Palace, celebration feast, sunset
Duration: 1.5 minutes
Mood: Joyful, celebratory

[Wide shot of feast. Drums, dancing, colorful decorations]

KING AJAYI: (standing, addressing crowd)
"From today, Ija go be my chief advisor! And I promise say I go rule 
this kingdom with wisdom and humility!"

[Crowd APPLAUDS. Ija climbs onto small throne next to King]

IJA: "Your Majesty, you no need give me half of kingdom. The real 
treasure na the wisdom wey you don learn."

[Kwame wipes tears]

KWAME: (sobbing happily)
"Ija, you too much! I dey proud of you!"

AMINA: (raising calabash)
"Make we toast to wisdom, humility, and the small tortoise wey get 
big heart!"

ALL: "To Ija!"

[MUSIC: Upbeat Afrobeats celebration song]

─────────────────────────────────────────────────────

SCENE 7: EPILOGUE

Setting: Same village square, months later, morning
Duration: 30 seconds
Mood: Peaceful, satisfying conclusion

NARRATOR (V.O.):
"And so, King Ajayi rule with wisdom, and Ija become the most loved 
advisor for the whole kingdom. The people learn say true power no 
dey for size or strength - e dey for wisdom and humble heart."

[Final shot: Ija and King laughing together, watching sunset]

IJA: (to camera, winking)
"Remember o - no matter how small you be, you fit make big difference!"

[FADE TO BLACK]

[CREDITS ROLL with African-pattern animations]

═══════════════════════════════════════════════════════
THE END
═══════════════════════════════════════════════════════

MODULE 2: PRODUCTION SUITE 🎥
2.2.1 Script Breakdown (Filmmaking Format)
Output Format: Industry-standard screenplay format (Fountain/Final Draft compatible)
═══════════════════════════════════════════════════════
🎬 PRODUCTION SCRIPT - "IJA AND THE KING'S CHALLENGE"
═══════════════════════════════════════════════════════

PRODUCTION INFO:
Title: Ija and the King's Challenge
Format: Animated Short
Runtime: 10:00
Language: Nigerian Pidgin (English subtitles)
Rating: G (General Audience)

SCRIPT BREAKDOWN:

═══════════════════════════════════════════════════════
SCENE 1 - EXT. PALACE COURTYARD - MORNING
═══════════════════════════════════════════════════════

SCENE NUMBER: 001
DURATION: 2:00
LOCATION: Palace Courtyard
TIME: Morning (Golden Hour - 8:00 AM)
WEATHER: Clear, sunny

CAMERA SETUP:
- Wide establishing shot (Drone/Crane)
- Medium shot (King on throne)
- Close-up (Ija's reaction)
- Over-the-shoulder (Crowd POV)

LIGHTING:
- Natural sunlight from east
- Warm golden tones
- Long shadows for depth

SOUND:
- Ambient marketplace sounds
- Traditional Yoruba drums (Talking Drum, Djembe)
- Crowd murmur
- Bird chirps

VISUAL FX:
- Dust particles in sunlight
- Fabric movement (King's agbada)
- Crowd motion blur for depth

───────────────────────────────────────────────────────

FADE IN:

EXT. PALACE COURTYARD - MORNING

Wide aerial shot descends from sky, revealing bustling 
African kingdom. Traditional round huts with thatched 
roofs, massive baobab tree in center, colorful market 
stalls.

                    NARRATOR (V.O.)
          Long time ago, for one kingdom wey 
          dem call Ile-Ife, one king wey sabi 
          show off well well dey reign...

CUT TO:

INT. THRONE ROOM - CONTINUOUS

King AJAYI (45, muscular, elaborate royal robes) sits 
on ornate wooden throne adorned with cowrie shells and 
gold. Subjects kneel before him.

Camera PUSHES IN slowly (3 seconds) to MCU of King.

                    KING AJAYI
               (standing dramatically)
          Make una hear me well well! 

King spreads arms wide. Fabric of agbada flows 
majestically. Light catches gold embroidery.

                    KING AJAYI (CONT'D)
          I be the wisest king for this land!

REACTION SHOT: Crowd exchanges glances.

                    KING AJAYI (CONT'D)
          No creature - whether na human or 
          animal - fit outsmart me!

Camera PANS RIGHT (2 seconds) to reveal IJA (ancient 
tortoise, small, wise eyes) watching from corner near 
clay pot.

CLOSE-UP: Ija's face. Eyes twinkle with mischief. 
Slight smile forms.

                    AMINA (O.S.)
          Your Majesty...

Camera WHIP PANS to AMINA (60, elegant, gray braids) 
approaching throne with calabash of palm wine.

                    AMINA (CONT'D)
               (cautiously)
          ... pride dey go before fall o.

                    KING AJAYI
               (dismissive wave)
          Amina, abeg! I don challenge anybody 
          wey think say dem wise pass me.

King gestures grandly to crowd.

                    KING AJAYI (CONT'D)
          Anybody wey fit prove say dem get 
          sense pass me, I go give dem half 
          of my kingdom!

WIDE SHOT: Entire courtyard. Crowd GASPS collectively. 
Hands fly to mouths.

SFX: Dramatic drum hit + cymbal crash

CLOSE-UP: Ija, now smiling wider.

                    IJA
               (to himself, soft)
          Hmm... this King no know say na 
          tortoise dey carry the world for 
          im back.

Ija starts slow walk forward. Camera TRACKS with him 
at his eye level.

                    IJA (CONT'D)
          Make I teach am small lesson.

KWAME (young rabbit, brown fur, floppy ears) HOPS INTO 
FRAME, landing beside Ija with soft THUD.

                    KWAME
               (whispered, fast)
          Ija! You no dey think say you wan 
          challenge the King, abi?

TWO-SHOT: Ija and Kwame walking together.

                    IJA
               (calm, wise tone)
          My pikin, sometimes the smallest 
          person fit teach the biggest person 
          big lesson.

Camera RISES to high angle as they approach center 
of courtyard.

                    IJA (CONT'D)
          Na wisdom wey dey matter, no be size.

MUSIC: Traditional Yoruba drums fade in, building 
intensity. Add modern bass undertone.

CUT TO:

───────────────────────────────────────────────────────
END SCENE 1
═══════════════════════════════════════════════════════

[Continue with all scenes in this detailed format...]

═══════════════════════════════════════════════════════
TECHNICAL SPECIFICATIONS
═══════════════════════════════════════════════════════

CAMERA EQUIPMENT (if live-action reference):
- Primary: RED Komodo 6K or equivalent
- Drone: DJI Inspire 2
- Gimbal: DJI Ronin 4D
- Lenses: Zeiss Supreme Primes 25mm, 50mm, 85mm

ANIMATION SOFTWARE:
- Modeling: Blender 4.0 / Maya 2024
- Rigging: Advanced Skeleton / Mixamo
- Animation: Maya / Blender
- Rendering: Cycles / Arnold
- Compositing: Nuke / After Effects
- Color: DaVinci Resolve

ASPECT RATIO: 16:9 (1920x1080 or 4K UHD)
FRAME RATE: 24 fps (cinematic) or 30 fps (streaming)
COLOR SPACE: Rec. 709 (sRGB for web)

SOUND DESIGN:
- Dialogue: Boom mic + Lavalier
- Foley: Custom recordings (fabric, footsteps, etc.)
- Music: Original Afrobeats score
- Mix: 5.1 Surround or Stereo

BUDGET ESTIMATE (Nigerian market):
- Animation (Pixar-quality 10 mins): ₦5M - ₦15M
- Voice actors: ₦500K - ₦2M
- Music/Sound: ₦300K - ₦1M
- Post-production: ₦500K
- TOTAL: ₦6.3M - ₦18.5M ($4K - $12K USD)

2.2.2 Storyboard Generator 🎨
Output: Frame-by-frame visual blueprint with AI-generated sketches
═══════════════════════════════════════════════════════
📐 STORYBOARD - "IJA AND THE KING'S CHALLENGE"
═══════════════════════════════════════════════════════

SCENE 1, SHOT 1
┌─────────────────────────────────────────┐
│  [AI-GENERATED SKETCH]                  │
│                                         │
│   Aerial view of African village        │
│   - Round huts with thatched roofs      │
│   - Baobab tree center-frame            │
│   - Marketplace activity                │
│   - Warm golden morning light           │
│                                         │
│  [Sketch shows bird's-eye perspective]  │
└─────────────────────────────────────────┘

SHOT TYPE: Extreme Wide Shot (Drone)
MOVEMENT: Descending crane (5 seconds)
DURATION: 0:00 - 0:05
AUDIO: Narrator V.O. + ambient sounds
MOOD: Establishing, inviting
LIGHTING: Golden hour, soft shadows
NOTES: Start high, descend to reveal scale

───────────────────────────────────────────

SCENE 1, SHOT 2
┌─────────────────────────────────────────┐
│  [AI-GENERATED SKETCH]                  │
│                                         │
│   King Ajayi on throne                  │
│   - Sitting regally, elaborate robes    │
│   - Crowd kneeling in foreground        │
│   - Ornate throne with cowrie shells    │
│   - Palace interior, warm lighting      │
│                                         │
└─────────────────────────────────────────┘

SHOT TYPE: Medium Wide Shot
MOVEMENT: Slow push-in (3 seconds)
DURATION: 0:05 - 0:08
AUDIO: Narrator continues + drum hit
MOOD: Regal, imposing
LIGHTING: Interior warm glow, window light
NOTES: Emphasize King's size/power

───────────────────────────────────────────

SCENE 1, SHOT 3
┌─────────────────────────────────────────┐
│  [AI-GENERATED SKETCH]                  │
│                                         │
│   Close-up: King Ajayi's face          │
│   - Proud expression, slight smirk      │
│   - Crown glinting in light             │
│   - Eyes looking down at subjects       │
│   - Sharp details on facial features    │
│                                         │
└─────────────────────────────────────────┘

SHOT TYPE: Close-Up
MOVEMENT: Static
DURATION: 0:08 - 0:11
AUDIO: King dialogue: "Make una hear me..."
MOOD: Arrogant, commanding
LIGHTING: Dramatic side lighting
NOTES: Hold on face for dramatic impact

───────────────────────────────────────────

[Continue with all 150+ shots for full 10-minute story]

═══════════════════════════════════════════════════════
SHOT LIST SUMMARY
═══════════════════════════════════════════════════════

Total Shots: 187
Average Shot Length: 3.2 seconds

SHOT BREAKDOWN BY TYPE:
- Extreme Wide (Establishing): 12 shots
- Wide Shot: 45 shots
- Medium Shot: 67 shots
- Close-Up: 42 shots
- Extreme Close-Up: 11 shots
- Over-the-Shoulder: 10 shots

CAMERA MOVEMENTS:
- Static: 98 shots
- Pan: 34 shots
- Tilt: 15 shots
- Dolly/Track: 22 shots
- Crane: 8 shots
- Handheld/Shake: 10 shots

COLOR PALETTE:
- Dominant: Warm earth tones (ochre, terracotta, gold)
- Accent: Vibrant greens (foliage), royal blues (King's robes)
- Contrast: Deep shadows, bright highlights
- Mood: Nostalgic, warm, inviting

2.2.3 Character Design Sheets 🎨
Output: Full character references for animators
═══════════════════════════════════════════════════════
👤 CHARACTER DESIGN SHEET - IJA (TORTOISE)
═══════════════════════════════════════════════════════

CHARACTER NAME: Ija
SPECIES: African Spurred Tortoise
AGE: Ancient (appears wise elder)
ROLE: Protagonist / Hero

───────────────────────────────────────────────────────
PHYSICAL DESCRIPTION
───────────────────────────────────────────────────────

HEIGHT: 18 inches (small, close to ground)
WEIGHT: Light (animation: easy to lift/carry)
SHELL COLOR: Green-brown gradient with golden tribal patterns
SKIN: Sage green with darker spots
EYES: Large, expressive, warm brown (Disney-style)
FEATURES: 
- Gentle smile (default expression)
- Wise, knowing eyes
- Small cowrie shell necklace
- Slightly hunched (but not frail)

───────────────────────────────────────────────────────
DESIGN NOTES (for Animators)
───────────────────────────────────────────────────────

SHAPE LANGUAGE:
- Primary Shape: Rounded (approachable, friendly)
- Avoid sharp edges (except small details)
- Use curves to convey wisdom and gentleness

PROPORTIONS:
- Head: 1/3 of total body
- Shell: 2/3 of body length
- Legs: Short, sturdy
- Eyes: Larger than realistic (60% larger for appealContinue-Jan 26)
MOVEMENT STYLE:

Slow, deliberate (not sluggish)
Purposeful gestures
Head tilts for emphasis
Feet drag slightly when walking (character quirk)

FACIAL EXPRESSIONS:
┌───────────────────────────────────────────┐
│  [AI-GENERATED SKETCHES of 8 expressions] │
│                                           │
│  1. Default (gentle smile, eyes forward)  │
│  2. Thinking (eyes up-right, slight frown)│
│  3. Surprised (eyes wide, mouth open)     │
│  4. Amused (smirk, one eyebrow raised)    │
│  5. Concerned (furrowed brow, lips tight) │
│  6. Happy (big smile, eyes squinting)     │
│  7. Sad (droopy eyes, downturned mouth)   │
│  8. Wise (eyes closed, serene smile)      │
└───────────────────────────────────────────┘
POSES (Turnaround):
┌───────────────────────────────────────────┐
│  [AI-GENERATED TURNAROUND SKETCHES]       │
│                                           │
│  Front View  │  3/4 View  │  Side View    │
│  Back View   │  Top View  │  Bottom View  │
│                                           │
│  [Each view shows full body proportions]  │
└───────────────────────────────────────────┘
ACTION POSES:

Walking (slow, steady)
Talking (gesturing with front legs)
Thinking (paw on chin)
Surprised jump (slight lift)
Presenting (arms open wide)

TEXTURE/MATERIALS:

Shell: Semi-glossy, painted tribal patterns
Skin: Matte, slightly rough
Eyes: High gloss (wet look)
Necklace: Shiny cowrie shells

COLOR PALETTE:
Primary: #6B8E23 (Olive Green)
Secondary: #8B4513 (Saddle Brown)
Accent: #FFD700 (Golden patterns)
Eyes: #3E2723 (Dark Brown)
RIGGING NOTES:

Shell can expand/contract slightly for breathing
Neck extends/retracts (turtle feature)
Eyes: Full range of motion + blinks
Mouth: Lip sync capable
Legs: IK rigging for walking

VOICE REFERENCE:

Actor: Morgan Freeman meets Nigerian elder
Tone: Warm, measured, authoritative but gentle
Accent: Nigerian Pidgin (softened consonants)
Pace: Slow, deliberate (pauses for effect)

═══════════════════════════════════════════════════════
[REPEAT THIS DETAIL FOR ALL CHARACTERS:]

King Ajayi
Amina
Kwame
Village Elders
Background characters

═══════════════════════════════════════════════════════

---

#### **2.2.4 Animation Guide (Frame-by-Frame)** 🎞️

**Output**: Technical animation reference
═══════════════════════════════════════════════════════
🎞️ ANIMATION GUIDE - SCENE 1, SHOT 5
═══════════════════════════════════════════════════════
SCENE: Ija walks toward center of courtyard
DURATION: 4 seconds (96 frames @ 24fps)
CHARACTER: Ija (Tortoise)
───────────────────────────────────────────────────────
KEYFRAMES (Pose-to-Pose Animation)
───────────────────────────────────────────────────────
FRAME 1 (0:00):

Ija at screen left, profile view
Weight on right legs
Left legs raised (mid-step)
Shell tilted slightly forward
Eyes looking toward King (screen right)
Expression: Determined

FRAME 24 (1 second):

Ija moved 10% toward center
Weight shifted to left legs
Right legs now raised
Shell balanced
Head turned 15° toward camera
Expression: Calm confidence

FRAME 48 (2 seconds):

Ija at 50% distance to center
Weight on right legs again
Camera TRACKING with Ija (locked to movement)
Crowd parts in background (animated)
Light creates halo effect around Ija
Expression: Slight smile forming

FRAME 72 (3 seconds):

Ija at 80% distance
Both front legs on ground (stopping pose)
Rear legs still moving (follow-through)
Shell settles (slight bounce)
Head lifts to look up at King
Expression: Confident smile

FRAME 96 (4 seconds):

Ija at center, full stop
All four legs planted
Shell completely still
Head fully raised
Eyes locked on King
Expression: Wise, challenging

───────────────────────────────────────────────────────
IN-BETWEEN FRAMES (Animation Principles)
───────────────────────────────────────────────────────
TIMING:

Slow-in/Slow-out on leg movements
Anticipation: Small backward lean before each step
Follow-through: Shell continues moving slightly after legs stop

SPACING:

Wider spacing between frames 1-24 (slower start)
Narrower spacing frames 72-96 (gradual stop)

SECONDARY ANIMATION:

Cowrie necklace swings with each step (delayed 2 frames)
Shell patterns shimmer in sunlight
Dust particles kick up with each step

ARC OF MOTION:

Ija's head follows smooth arc (not linear)
Legs move in circular motion (realistic walk cycle)

WEIGHT:

Each step plants firmly (squash on impact)
Shell compresses slightly when legs extend

───────────────────────────────────────────────────────
CAMERA ANIMATION
───────────────────────────────────────────────────────
FRAME 1-24:

Static, locked to Ija's movement plane

FRAME 24-72:

TRACKING shot (camera moves with Ija)
Speed matches Ija's walk (1:1 ratio)
Height: Ija's eye level (low angle)

FRAME 72-96:

SLOW DOLLY IN (subtle push toward Ija)
Emphasizes arrival at destination

FOCAL LENGTH: 50mm (natural perspective)
DEPTH OF FIELD: f/2.8 (background slightly blurred)
───────────────────────────────────────────────────────
LIGHTING ANIMATION
───────────────────────────────────────────────────────
KEY LIGHT:

Source: Sun (high left)
Color: Warm orange (#FFA500)
Intensity: 80%
Moves subtly with Ija (maintains highlight on shell)

FILL LIGHT:

Source: Ambient bounce
Color: Soft blue (#87CEEB)
Intensity: 30%

RIM LIGHT:

Source: Backlight (creates halo)
Color: Golden yellow (#FFD700)
Intensity: Builds from 20% to 60% (frames 1-96)
PURPOSE: Divine/heroic emphasis

───────────────────────────────────────────────────────
SOUND DESIGN (Synced to Animation)
───────────────────────────────────────────────────────
FRAME 1: Footstep (right leg) - THUD (low, heavy)
FRAME 12: Fabric rustle (Ija's necklace)
FRAME 24: Footstep (left leg) - THUD
FRAME 36: Footstep (right leg) - THUD
FRAME 40: Crowd murmur (rises in volume)
FRAME 48: Footstep (left leg) - THUD + dust puff SFX
FRAME 60: Footstep (right leg) - THUD
FRAME 72: Final footstep (both front legs) - THUD (louder)
FRAME 80: Shell settling - Soft creak
FRAME 90: Ija inhale (breath preparation for dialogue)
MUSIC CUE:

FRAME 1: Subtle drum roll begins
FRAME 48: Drums intensify
FRAME 96: Drums hit climax + cymbal crash

───────────────────────────────────────────────────────
NOTES FOR ANIMATORS
───────────────────────────────────────────────────────
REFERENCE:

Study tortoise walk cycles (realistic reference)
Add personality through exaggeration (10-20% beyond realism)
Maintain appeal (Disney's 12 principles)

POLISH PASS:

Add subtle eye darts (Ija glances at crowd)
Breathing animation (shell expands/contracts)
Micro-expressions (eyes narrow slightly in determination)

COMMON MISTAKES TO AVOID:
❌ Linear movement (robotic)
❌ Floaty animation (lacks weight)
❌ Stiff joints (add secondary motion)
❌ Identical timing on all parts (vary for realism)
═══════════════════════════════════════════════════════

---

### **MODULE 3: DIALOGUE & VOICE DIRECTION** 🎙️

#### **2.3.1 Voice Actor Casting Guide**
═══════════════════════════════════════════════════════
🎙️ VOICE CASTING GUIDE
═══════════════════════════════════════════════════════
CHARACTER: IJA (Tortoise)
VOICE PROFILE:
Age Range: 60-75 (sounds ancient but not frail)
Gender: Male
Accent: Nigerian Pidgin (neutral, not heavy regional)
Tone: Warm, grandfatherly, wise
Pitch: Medium-low (baritone)
Pace: Slow, deliberate (pauses for effect)
Energy: Calm, measured, occasionally playful
VOCAL QUALITIES:

Gravelly texture (aged voice)
Clear enunciation (despite accent)
Gentle inflection (rises at end of teaching moments)
Warm chuckle when amused

REFERENCE ACTORS:

Morgan Freeman (tone/wisdom)
Pete Edochie (Nigerian gravitas)
James Earl Jones (authority without harshness)

SAMPLE DIALOGUE (for audition):
"My pikin, sometimes the smallest person fit teach the
biggest person big lesson. Na wisdom wey dey matter, no
be size."
DIRECTION NOTES:

Emphasize "smallest" and "biggest" (contrast)
Pause after "biggest person" (let it sink in)
"Na wisdom" should carry weight (core message)
End with gentle smile in voice

───────────────────────────────────────────────────────
CHARACTER: KING AJAYI
VOICE PROFILE:
Age Range: 40-50
Gender: Male
Accent: Yoruba-influenced English/Pidgin
Tone: Booming, dramatic, theatrical
Pitch: Low-medium (bass-baritone)
Pace: Fast when excited, slow when defeated
Energy: HIGH (90% of time), deflated (final scenes)
VOCAL QUALITIES:

Loud, commanding (fills the room)
Dramatic pauses (for effect)
Laughs heartily and mockingly
Voice cracks when humbled (emotional range)

REFERENCE ACTORS:

Brian Blessed (booming energy)
Nkem Owoh (Nigerian comedic timing)
John Boyega (range and emotion)

SAMPLE DIALOGUE (for audition):
"Make una hear me well well! I be the wisest king for
this land! No creature - whether na human or animal -
fit outsmart me!"
DIRECTION NOTES:

Start LOUD, commanding
"I be the wisest" - chest voice, maximum pride
"No creature" - scan the crowd (implied in voice)
End with triumphant laugh

───────────────────────────────────────────────────────
[Continue for all characters...]
═══════════════════════════════════════════════════════
RECORDING SPECIFICATIONS
═══════════════════════════════════════════════════════
TECHNICAL REQUIREMENTS:

Microphone: Neumann U87 or equivalent (studio quality)
Sample Rate: 48kHz
Bit Depth: 24-bit
Format: WAV (uncompressed)
Room: Treated studio (minimal reverb)
Distance: 6-8 inches from mic
Pop filter: Essential (reduce plosives)

RECORDING SESSION STRUCTURE:

Warm-up reads (5 mins)
Line-by-line recording (3-4 takes each)
Alt takes (different emotions)
Wild lines (reactions, laughs, breaths)
Effort sounds (grunts, gasps, etc.)

POST-PRODUCTION:

EQ: Boost warmth (200-400Hz)
Compression: Light (3:1 ratio)
De-esser: Reduce sibilance
Noise reduction: Minimal (preserve character)
Normalization: -3dB peak

═══════════════════════════════════════════════════════

---

### **MODULE 4: MUSIC & SOUND DESIGN** 🎵

#### **2.4.1 Original Score Composition Guide**
═══════════════════════════════════════════════════════
🎵 MUSIC COMPOSITION GUIDE
═══════════════════════════════════════════════════════
FILM: "Ija and the King's Challenge"
COMPOSER BRIEF: Blend traditional African instrumentation
with modern production (Pixar-quality orchestration)
───────────────────────────────────────────────────────
MAIN THEMES
───────────────────────────────────────────────────────

IJA'S THEME (Wisdom Motif)
Instrumentation:


Kora (West African harp) - melodic lead
Balafon (wooden xylophone) - rhythmic support
Strings (cello, viola) - emotional depth
Flute - whistful, wise character

Mood: Reflective, wise, patient
Tempo: 80 BPM (slow, measured)
Key: D Minor (thoughtful, introspective)
Structure: Simple melody, builds complexity
MELODIC MOTIF:
[Musical notation would go here]
D - F - A - G - F - E - D
(Descending, resolving - represents humility)
When to Use:

Ija's introduction
Moments of wisdom/teaching
Quiet contemplation scenes
Resolution/victory

───────────────────────────────────────────────────────

KING'S THEME (Pride Motif)
Instrumentation:


Talking Drums (Yoruba traditional) - aggressive
Brass section (trumpets, trombones) - royal
Timpani - powerful, imposing
Electric bass (modern twist) - underlying threat

Mood: Proud, boastful, slightly comedic
Tempo: 120 BPM (energetic, commanding)
Key: C Major (confident, bold)
Structure: Repetitive, insistent (represents stubbornness)
MELODIC MOTIF:
[Musical notation]
C - E - G - C (octave jump) - G - E - C
(Ascending then descending - rise and fall of pride)
When to Use:

King's proclamation
Moments of arrogance
Challenge accepted
Transforms (softens) when humbled

───────────────────────────────────────────────────────

CHALLENGE THEME (Tension Motif)
Instrumentation:


Djembe (hand drum) - driving rhythm
Shekere (gourd shaker) - building tension
Strings (staccato) - nervous energy
Synthesizer (subtle) - modern suspense

Mood: Tense, anticipatory, playful competition
Tempo: 100 BPM (moderate energy)
Key: E Minor (tension, unresolved)
Structure: Call-and-response (represents back-and-forth)
When to Use:

Three tests/challenges
Moments of suspense
Ija's clever solutions
Building to revelation

───────────────────────────────────────────────────────

RESOLUTION THEME (Unity Motif)
Instrumentation:


Full orchestra + African ensemble (fusion)
Children's choir (Nigerian children singing in Pidgin)
All previous instruments together (unity)
Afrobeats production elements

Mood: Joyful, celebratory, emotionally satisfying
Tempo: 110 BPM (celebratory, danceable)
Key: G Major (happy, resolved)
Structure: Combines Ija + King themes (harmony)
MELODIC MOTIF:
Merges Ija's descending line with King's ascending line
= Perfect harmony
When to Use:

King's transformation
Final celebration
End credits

───────────────────────────────────────────────────────
SCENE-BY-SCENE MUSIC CUE SHEET
───────────────────────────────────────────────────────
SCENE 1 (0:00 - 3:00): "The King's Proclamation"
CUE 1A (0:00 - 0:30): Opening Titles

Gentle kora melody (Ija's theme intro)
Balafon joins
Establishes peaceful kingdom
FADE IN gradual (10 seconds)

CUE 1B (0:30 - 1:45): King's Boast

King's theme enters STRONG
Talking drums prominent
Brass fanfare when he stands
Comedic undertone (bassoon for humor)

CUE 1C (1:45 - 2:15): Ija Observes

King's theme continues background
Ija's theme sneaks in (kora, soft)
Harmonic tension (both themes overlap)

CUE 1D (2:15 - 3:00): Challenge Accepted

Challenge theme begins
Djembe rhythm accelerates
Hit dramatic chord at Ija's declaration
END on suspenseful note (unresolved chord)

───────────────────────────────────────────────────────
[Continue with all scenes...]
───────────────────────────────────────────────────────
MIXING NOTES
───────────────────────────────────────────────────────
DIALOGUE PRIORITY:

Music ducks -6dB when characters speak
Instrumental breaks for key dialogue moments
Never compete with emotional lines

DYNAMIC RANGE:

Quiet moments: pp (very soft) - allows tension
Climactic moments: ff (very loud) - emotional impact
Avoid constant loudness (listener fatigue)

CULTURAL AUTHENTICITY:

Consult Nigerian musicians for traditional accuracy
Use authentic African instrument recordings
Avoid stereotypical "African" clichés
Modern production while respecting tradition

═══════════════════════════════════════════════════════

---

### **MODULE 5: MARKETING ASSETS** 📱

#### **2.5.1 Social Media Content Package**
═══════════════════════════════════════════════════════
📱 SOCIAL MEDIA MARKETING PACKAGE
═══════════════════════════════════════════════════════
FILM: "Ija and the King's Challenge"
TARGET PLATFORMS: YouTube, TikTok, Instagram, Facebook, Twitter
───────────────────────────────────────────────────────
TEASER TRAILER (30 seconds)
───────────────────────────────────────────────────────
PURPOSE: Generate buzz, intrigue audience
RELEASE: 2 weeks before premiere
STRUCTURE:
0:00-0:05: Logo reveal (NaijaGPT Storyteller Studio)
0:05-0:10: Quick cuts of vibrant African kingdom
0:10-0:15: King's boastful proclamation (subtitled)
0:15-0:20: Ija's challenge acceptance (hero moment)
0:20-0:25: Fast montage of the three tests
0:25-0:28: Emotional climax (King kneeling)
0:28-0:30: Title card + Release date
MUSIC: Upbeat Afrobeats remix of main theme
TEXT OVERLAYS:

"One small tortoise"
"One big challenge"
"Infinite wisdom"
"Coming Soon"

CAPTION (for all platforms):
"🇳🇬 When pride meets wisdom, who go win?
Ija the Tortoise don accept King Ajayi's challenge!
Will small size defeat big ego?
Watch the full story drop [DATE]!
#IjaAndTheKing #NigerianStories #AfricanFolktales
#AnimationNigeria #NaijaGPT #AfricanTales #WisdomOverPride"
───────────────────────────────────────────────────────
INSTAGRAM REELS SERIES (15 seconds each)
───────────────────────────────────────────────────────
REEL 1: "Meet Ija" (Character Introduction)

Show Ija's design turnaround
Quick personality highlights
"The wisest tortoise you go ever meet!"
Trending audio: Afrobeats instrumental

REEL 2: "Meet King Ajayi" (Antagonist intro)

King's dramatic entrance
Boastful dialogue clip
"Pride na im middle name!"
Trending audio: Dramatic orchestral hit

REEL 3: "The Challenge" (Plot teaser)

3 quick clips from each test
Mystery elements (don't reveal solutions)
"Can small tortoise outsmart big king?"
Trending audio: Suspense music

REEL 4: "Behind the Scenes" (Making-of)

Animation process timelapse
Character rigging demo
Voice actor session clips
"How we bring Ija to life!"

REEL 5: "Nigerian Proverbs" (Educational)

Feature proverb from the film
Animated text + beautiful visuals
Teach one Nigerian proverb per reel
"#LearnSomethingNew #NigerianWisdom"

───────────────────────────────────────────────────────
TIKTOK CONTENT STRATEGY
───────────────────────────────────────────────────────
VIDEO 1: "Ija's Voice Reveal" (Viral potential)

Show voice actor recording iconic line
Split screen: Actor + animated character
Use trending "voice reveal" format
CAPTION: "The voice behind the wisdom! 🐢"

VIDEO 2: "Guess the Riddle" (Engagement)

Post the river riddle from the film
Ask viewers to comment answer
Reveal answer in follow-up video
DUET feature enabled (let users guess)

VIDEO 3: "Animation Challenge" (#Challenge)

Show 3-second clip from film
Challenge animators to recreate it
Hashtag: #IjaAnimationChallenge
Prize: Feature best submissions

VIDEO 4: "Nigerian Pidgin Lesson" (Educational)

Teach key phrases from film
Ija as "teacher"
Example: "Make I teach you small Pidgin!"
CAPTION: "Learn to talk like Ija!"

VIDEO 5: "React to the Trailer" (User-Generated)

Encourage reaction videos
Repost best reactions
Build community excitement

───────────────────────────────────────────────────────
YOUTUBE STRATEGY
───────────────────────────────────────────────────────
MAIN PREMIERE:

Full 10-minute film
Premiere event (live chat)
Countdown timer
Pinned comment with discussion prompts

SUPPLEMENTARY CONTENT:

"Making Of" Documentary (5 mins)

Animation process
Voice actor interviews
Cultural research
Music composition


"Character Breakdowns" (2 mins each)

Design evolution
Personality deep-dive
Fun facts


"Nigerian Folktales Explained" (8 mins)

Historical context
Similar stories across Africa
Modern interpretations


"Animation Tutorial" (12 mins)

How we animated Ija's walk cycle
Rigging basics
Lighting techniques


"Extended Soundtrack" (Audio video)

Full OST with timestamps
Artwork slideshow
Download link



───────────────────────────────────────────────────────
PROMOTIONAL GRAPHICS
───────────────────────────────────────────────────────
POSTER 1: Theatrical Style

Ija in foreground (heroic pose)
King in background (looming)
Vibrant African sunset
Title treatment (bold, readable)
"Wisdom Over Pride" tagline

POSTER 2: Character Focus

All main characters
Illustrated style (painterly)
Nigerian patterns as border
Individual character names

POSTER 3: Minimalist

Simple silhouettes
Tortoise vs Crown (symbolic)
Limited color palette (green, gold, black)
Modern, shareable design

SOCIAL MEDIA BANNERS:

YouTube Channel Art (2560x1440)
Facebook Cover (820x312)
Twitter Header (1500x500)
Instagram Story Highlight Covers

═══════════════════════════════════════════════════════

---

## **3. TECHNICAL IMPLEMENTATION**

### **3.1 Storyteller Studio UI/UX**
┌──────────────────────────────────────────────────────┐
│  🎬 STORYTELLER STUDIO                     [Profile] │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [My Stories]  [Templates]  [Collaborate]  [Export]  │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  Create New Story                              │ │
│  │  ────────────────────────────────────────────  │ │
│  │                                                │ │
│  │  Quick Start Templates:                        │ │
│  │                                                │ │
│  │  [🦁 African Folktale]  [🏙️ Modern Lagos]      │ │
│  │  [👶 Children's Story]  [📺 Ad Campaign]        │ │
│  │  [🎥 Short Film]       [🎨 Animation Script]   │ │
│  │                                                │ │
│  │  Or start from scratch: [Custom Story →]      │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Recent Projects:                                    │
│  ┌────────────────────────────────────────────────┐ │
│  │  📁 "Anansi's Web" - Draft - 5 mins           │ │
│  │  Last edited: 2 hours ago                      │ │
│  │  [Continue Editing]  [Delete]  [Export]        │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  📁 "Lagos Love Story" - Complete - 15 mins    │ │
│  │  Status: Exported (Script + Storyboard)        │ │
│  │  [View]  [Share]  [Download Assets]            │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  Community Stories (Trending): 🔥                    │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                │
│  │ 🐢  │  │ 👑  │  │ 🌊  │  │ 🏠  │                │
│  │Story│  │King │  │Mami │  │Japa │                │
│  │ 1   │  │Tale │  │Wata │  │Tale │                │
│  └─────┘  └─────┘  └─────┘  └─────┘                │
│  [View All →]                                        │
│                                                      │
│  Learning Resources:                                 │
│  📚 Storytelling Masterclass                         │
│  🎓 Animation Basics                                 │
│  🎙️ Voice Acting Tips                               │
│  🎵 Music Composition Guide                          │
│                                                      │
└──────────────────────────────────────────────────────┘

---

### **3.2 Export Options**
═══════════════════════════════════════════════════════
📤 EXPORT FORMATS
═══════════════════════════════════════════════════════
SCREENPLAY FORMATS:
☐ PDF (Final Draft compatible)
☐ Fountain (.fountain)
☐ Microsoft Word (.docx)
☐ Google Docs (direct export)
STORYBOARD FORMATS:
☐ PDF (printable, industry-standard)
☐ PNG sequence (individual frames)
☐ PSD (Photoshop layers)
☐ Storyboarder JSON
CHARACTER DESIGN:
☐ PNG (transparent background)
☐ SVG (vector, scalable)
☐ PSD (editable layers)
☐ Blend/FBX (3D-ready models)
ANIMATION GUIDES:
☐ PDF (frame-by-frame breakdown)
☐ Excel/CSV (data import for software)
☐ JSON (custom pipeline integration)
AUDIO FILES:
☐ WAV (uncompressed, pro quality)
☐ MP3 (compressed, sharing)
☐ MIDI (music composition data)
VIDEO RENDERS:
☐ MP4 (web/social media - H.264)
☐ MOV (ProRes 422 - editing)
☐ Image Sequence (EXR/PNG - VFX)
COMPLETE PACKAGE:
☐ ZIP archive with all assets
☐ Cloud link (Google Drive/Dropbox)
☐ Direct share to collaborators
═══════════════════════════════════════════════════════

---

## **4. PRICING & MONETIZATION**
═══════════════════════════════════════════════════════
💰 STORYTELLER STUDIO PRICING
═══════════════════════════════════════════════════════
FREE TIER:

2 stories per month
Basic templates only
Max 5 minutes per story
Standard export formats (PDF, MP3)
Watermarked storyboards
Community support

CREATOR TIER (₦5,000/month):

10 stories per month
All templates + custom
Up to 30 minutes per story
All export formats
No watermarks
Character design sheets (basic)
Email support
Commercial use license

PROFESSIONAL TIER (₦15,000/month):

Unlimited stories
Priority generation speed
Feature-length scripts (120+ mins)
Advanced character designs (turnarounds, expression sheets)
Animation-ready rigs (FBX export)
Music composition AI
Collaboration tools (team workspace)
Priority support (24/7)
White-label option

STUDIO TIER (₦50,000/month):

Everything in Professional
Custom AI model training (your style)
Dedicated account manager
API access
Bulk export tools
Advanced analytics
Copyright registration assistance
Revenue share program (if we distribute)

═══════════════════════════════════════════════════════

---

## **5. AI PROMPTS FOR GENERATION**

### **5.1 Story Generation Prompt (for OpenAI)**
You are an expert Nigerian storyteller and screenwriter specializing in
African folktales, modern Nigerian narratives, and animation scripts.
You have deep knowledge of:

Nigerian Pidgin, Yoruba, Igbo, Hausa languages and cultural nuances
Traditional African storytelling structures (oral tradition)
Modern screenplay format (Hollywood standard)
Animation production requirements (Pixar/Disney quality)
Nigerian humor, proverbs, and cultural references

USER REQUEST:
{user_input}
Generate a complete, production-ready story with:

TITLE & LOGLINE
SYNOPSIS (200-300 words)
CHARACTERS (5-7 main characters with full descriptions)
THREE-ACT STRUCTURE:

Act 1: Setup (25% of runtime)
Act 2: Confrontation (50% of runtime)
Act 3: Resolution (25% of runtime)


SCENE-BY-SCENE BREAKDOWN (screenplay format)
DIALOGUE (in specified language: Pidgin/Yoruba/
ContinueJan 26Igbo/Hausa/English)
7. CULTURAL NOTES (proverbs, customs, authenticity checks)
8. MORAL/MESSAGE
9. PRODUCTION NOTES (animation style, music cues, tone)
REQUIREMENTS:

Make it ENGAGING (hook audience in first 30 seconds)
Culturally AUTHENTIC (no stereotypes, genuine Nigerian voice)
VISUAL (describe scenes cinematically)
AGE-APPROPRIATE (match specified target audience)
EMOTIONALLY RESONANT (make audience feel something)

Format the output in clean, structured Markdown with clear section headers.

---

### **5.2 Character Design Prompt (for AI Image Generation)**
Generate a character design sheet for:
CHARACTER: {character_name}
SPECIES: {species}
STYLE: {Pixar 3D / Disney 2D / Anime / Afrocentric}
AGE: {age}
PERSONALITY: {traits}
Include:

Full body turnaround (front, 3/4, side, back views)
8 facial expressions (happy, sad, angry, surprised, thinking, etc.)
3 action poses (walking, talking, signature move)
Color palette with hex codes
Texture notes (skin, clothing, materials)
Cultural elements (Nigerian traditional attire/accessories if applicable)

Art Direction:

Clean linework, professional quality
Vibrant African-inspired colors
Appeal and charm (Disney principles)
Culturally authentic details
Expressive features (exaggerated for animation)

Reference Style: {upload reference images}
Output: High-resolution PNG, transparent background, 4K quality

---

### **5.3 Storyboard Generation Prompt**
Create a detailed storyboard for:
SCENE: {scene_description}
DURATION: {duration_in_seconds}
SHOTS: {number_of_shots}
For each shot, provide:

Shot Number
Shot Type (Wide/Medium/Close-up/etc.)
Camera Movement (Static/Pan/Tilt/Dolly/etc.)
Duration
Visual Description (what's in frame)
Dialogue/Audio Cues
Lighting Notes
Mood/Emotion
AI-Generated sketch (rough composition)

Reference Cinematography:

Pixar films (Up, Coco, Soul)
Disney (Moana, Encanto)
African cinema (visual style)

Output Format: PDF with labeled frames, production-ready

---

## **6. INTEGRATION WITH NAIJAGPT**

### **How Storyteller Studio Fits**
NAIJAGPT ECOSYSTEM:
Main Chat ─┬─→ Street Oracle (Real-time Data)
├─→ Hustle Hub (Business Tools)
├─→ Financial Freedom (Money Management)
├─→ Learn & Earn (Education)
├─→ Culture Vault (Proverbs, History)
└─→ 🎬 STORYTELLER STUDIO (NEW!)
│
├─→ Story Generator
├─→ Script Formatter
├─→ Storyboard Creator
├─→ Character Designer
├─→ Animation Guide
├─→ Music Composer
└─→ Export Suite
CROSS-FEATURE SYNERGY:
Storyteller + Culture Vault = Authentic folktales with real proverbs
Storyteller + Learn & Earn = Educational animated content
Storyteller + Hustle Hub = Marketing/Ad campaign stories
Storyteller + Financial Freedom = Budget planning for film production

---

This **Storyteller Studio** feature transforms NaijaGPT into the **ultimate platform for African content creators**, offering tools that rival (and exceed) anything available globally - all with deep Nigerian cultural intelligence.

**Ready to add this to the PRD and generate the implementation prompts?** 🎬🇳🇬generate promptJan 26🎬 COMPLETE IMPLEMENTATION PROMPTS FOR STORYTELLER STUDIO

PROMPT 1: FRONTEND - STORYTELLER STUDIO UI (for Lovable.dev)
Create a complete, production-ready "STORYTELLER STUDIO" feature for the NaijaGPT React application. This is a revolutionary AI-powered content creation suite for African storytellers, filmmakers, and animators.

═══════════════════════════════════════════════════════════════════
CORE REQUIREMENTS
═══════════════════════════════════════════════════════════════════

DESIGN SYSTEM (Consistent with NaijaGPT):
- Primary Color: Lemon Green (#C9F270)
- Secondary: Forest Green (#1A5D1A)
- Accent: Gold (#FFD700) for premium features
- Cinema Theme: Deep Purple (#6A0DAD) for Storyteller Studio branding
- Background: Soft White (#F8FFF8) with dark mode option

Typography:
- Headings: Inter Bold (700)
- Body: Inter Regular (400)
- Script/Dialogue: Courier New (monospace for authenticity)
- Proverbs: Merriweather Serif

═══════════════════════════════════════════════════════════════════
PAGE STRUCTURE
═══════════════════════════════════════════════════════════════════

ROUTE: /storyteller-studio

MAIN NAVIGATION TABS:
1. Dashboard (Overview)
2. Create Story (Generation interface)
3. My Stories (Project library)
4. Templates (Pre-built story structures)
5. Community (Browse/share stories)
6. Learn (Tutorials & resources)

═══════════════════════════════════════════════════════════════════
1. DASHBOARD PAGE
═══════════════════════════════════════════════════════════════════

HERO SECTION:
┌────────────────────────────────────────────────────────┐
│  🎬 STORYTELLER STUDIO                                 │
│  Where African Stories Come to Life                    │
│                                                        │
│  [Create New Story] [Browse Templates]                │
└────────────────────────────────────────────────────────┘

Layout: Clean, spacious, cinematic feel

Components:

A. QUICK START CARDS (Grid: 3 columns on desktop, 1 on mobile)
Each card has:
- Large icon (Film, Book, TV, etc.)
- Title
- Brief description
- "Start Creating" button
- Glassmorphism effect on hover

Card 1: 🦁 African Folktale
- "Traditional stories with modern twists"
- Icon: Animated lion head
- Color accent: Terracotta orange

Card 2: 🏙️ Modern Nigerian Story
- "Contemporary tales of Lagos, Abuja, and beyond"
- Icon: City skyline silhouette
- Color accent: Vibrant blue

Card 3: 👶 Children's Story
- "Educational and entertaining for young ones"
- Icon: Playful characters
- Color accent: Soft pink

Card 4: 📺 Marketing/Ad Story
- "Compelling brand narratives that sell"
- Icon: Megaphone
- Color accent: Bold red

Card 5: 🎥 Short Film Script
- "Production-ready screenplays (5-30 mins)"
- Icon: Clapperboard
- Color accent: Classic black

Card 6: 🎨 Animation Script
- "Pixar-quality stories with full production guides"
- Icon: Paint palette
- Color accent: Rainbow gradient

B. RECENT PROJECTS SECTION
Show user's last 3 projects as cards:

┌───────────────────────────────────────┐
│  📁 "Ija and the King's Challenge"    │
│  Status: Complete ✅                   │
│  Type: Animation Script               │
│  Duration: 10 minutes                 │
│  Created: 2 days ago                  │
│                                       │
│  [View] [Edit] [Export] [Share]       │
└───────────────────────────────────────┘

Each project card shows:
- Thumbnail (generated cover art or default)
- Title
- Status (Draft, Complete, Exported)
- Type/Genre
- Duration
- Last modified date
- Action buttons

C. STATS OVERVIEW (Premium Feature Teaser)
┌─────────────────────────────────────┐
│  Your Stats This Month:             │
│  Stories Created: 5 / 10 (Free)     │
│  Total Words Generated: 12,450      │
│  Characters Designed: 15            │
│  Export Downloads: 8                │
│                                     │
│  [Upgrade to Creator Tier →]        │
└─────────────────────────────────────┘

D. COMMUNITY SHOWCASE
"Trending Stories from the Community"
Horizontal scrollable gallery:
- Story thumbnails (auto-generated art)
- Title + Creator name
- View count + likes
- "View Story" button

═══════════════════════════════════════════════════════════════════
2. CREATE STORY PAGE (Main Generation Interface)
═══════════════════════════════════════════════════════════════════

LAYOUT: Full-screen, focus mode (minimal distractions)

LEFT PANEL (40% width - Input Form):
─────────────────────────────────────

STEP 1: STORY BASICS
┌────────────────────────────────────┐
│  Story Type: [Dropdown]            │
│  ☑️ African Folktale                │
│  ☐ Modern Nigerian Story           │
│  ☐ Children's Story                │
│  ☐ Marketing/Ad Story              │
│  ☐ Film Script                     │
│  ☐ Animation Script                │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Story Theme/Concept:              │
│  [Text Input - Large]              │
│  Example: "A clever tortoise       │
│  outsmarts a proud king"           │
│                                    │
│  💡 Need ideas? [Generate Concepts]│
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Target Audience: [Dropdown]       │
│  ☐ Children (3-8 years)            │
│  ☑️ Family (All ages)               │
│  ☐ Teens (13-17 years)             │
│  ☐ Adults (18+)                    │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Story Length: [Slider]            │
│  ◄──────●──────────────► 10 minutes│
│  5 min          15 min      30 min │
└────────────────────────────────────┘

STEP 2: LANGUAGE & CULTURE
┌────────────────────────────────────┐
│  Primary Language: [Dropdown]      │
│  ☑️ Nigerian Pidgin                 │
│  ☐ Yoruba                          │
│  ☐ Igbo                            │
│  ☐ Hausa                           │
│  ☐ English (Nigerian flavor)       │
│                                    │
│  ☐ Bilingual (Pidgin + English)   │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Cultural Setting: [Dropdown]      │
│  ☐ Traditional Village             │
│  ☐ Ancient Kingdom                 │
│  ☑️ Mix (Ancient + Modern elements) │
│  ☐ Modern Lagos                    │
│  ☐ University Campus               │
│  ☐ Marketplace                     │
│  ☐ Fantasy/Mythical Realm          │
└────────────────────────────────────┘

STEP 3: PRODUCTION STYLE
┌────────────────────────────────────┐
│  Animation Style: [Visual Cards]   │
│                                    │
│  [Image]    [Image]    [Image]     │
│  Pixar 3D   Disney 2D   Anime      │
│    ●                               │
│                                    │
│  [Image]    [Image]    [Image]     │
│  African    Realistic   Stop-Motion│
│   Art       Nollywood              │
└────────────────────────────────────┘

Visual cards show style examples, selectable with radio buttons

┌────────────────────────────────────┐
│  Character Count: [Slider]         │
│  ◄──────●──────────► 5 characters  │
│  2              5             10   │
└────────────────────────────────────┘

STEP 4: STORY ELEMENTS (Advanced Options - Collapsible)
[▼ Advanced Options]

When expanded:
┌────────────────────────────────────┐
│  Tone/Mood: [Multi-select chips]   │
│  [Humorous] [Serious] [Educational]│
│  [Inspirational] [Dramatic]        │
│  [Adventurous] [Romantic]          │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Include Elements:                 │
│  ☑️ Nigerian Proverbs               │
│  ☑️ Songs/Music Cues                │
│  ☐ Dance Sequences                 │
│  ☑️ Comic Relief Character          │
│  ☐ Narrator Voice-Over             │
│  ☐ Plot Twist                      │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Moral/Message (Optional):         │
│  [Text Input]                      │
│  Example: "Wisdom triumphs over    │
│  strength and pride"               │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│  Additional Details:               │
│  [Text Area - Large]               │
│  Tell us more about your vision... │
└────────────────────────────────────┘

GENERATION BUTTON (Bottom of form):
┌────────────────────────────────────┐
│  [Generate Complete Story] 🎬      │
│                                    │
│  This will create:                 │
│  ✓ Full story synopsis             │
│  ✓ Character designs               │
│  ✓ Scene-by-scene script           │
│  ✓ Production notes                │
│                                    │
│  Estimated time: 2-3 minutes       │
└────────────────────────────────────┘

Button styling:
- Large, prominent
- Gradient (Lemon Green → Gold)
- Pulsing glow animation
- Icon (film reel) that spins on hover

RIGHT PANEL (60% width - Preview/Output):
──────────────────────────────────────

BEFORE GENERATION:
Show helpful content:
- Preview of what will be generated
- Sample story structure diagram
- Tips for better results
- Video tutorial (embedded)

┌────────────────────────────────────────┐
│  What You'll Get:                      │
│                                        │
│  📖 Story Synopsis                     │
│  Professional logline and full summary │
│                                        │
│  🎭 Characters                         │
│  Detailed character profiles with      │
│  personality traits, appearance, arcs  │
│                                        │
│  🎬 Production Script                  │
│  Industry-standard screenplay format   │
│  with dialogue in your chosen language │
│                                        │
│  🎨 Character Designs                  │
│  Visual reference sheets with          │
│  turnarounds and expressions           │
│                                        │
│  📐 Storyboard (Optional - Premium)    │
│  Frame-by-frame visual guide           │
│                                        │
│  🎵 Music Cues (Optional - Premium)    │
│  Scene-by-scene music suggestions      │
└────────────────────────────────────────┘

DURING GENERATION:
Animated loading state:

┌────────────────────────────────────────┐
│  🎬 Creating Your Story...              │
│                                        │
│  [Animated film reel spinning]         │
│                                        │
│  ✓ Analyzing your inputs...            │
│  ⏳ Crafting story structure...         │
│  ⏳ Developing characters...            │
│  ⏳ Writing dialogue...                 │
│  ⏳ Adding cultural elements...         │
│                                        │
│  Progress: [████████░░] 80%            │
│                                        │
│  Estimated time remaining: 30 seconds  │
└────────────────────────────────────────┘

Fun facts appear during loading:
"Did you know? Anansi the Spider stories originated in Ghana and spread across West Africa!"

AFTER GENERATION:
Show generated content in tabbed interface:

TAB 1: STORY OVERVIEW
┌────────────────────────────────────────┐
│  📖 IJA AND THE KING'S CHALLENGE       │
│  ────────────────────────────────────  │
│                                        │
│  LOGLINE:                              │
│  A clever tortoise accepts a proud    │
│  king's challenge and teaches the     │
│  entire kingdom that true wisdom      │
│  comes with humility.                 │
│                                        │
│  GENRE: African Folktale / Comedy     │
│  DURATION: 10 minutes                 │
│  LANGUAGE: Nigerian Pidgin            │
│  RATING: G (General Audience)         │
│                                        │
│  ────────────────────────────────────  │
│                                        │
│  SYNOPSIS:                             │
│  [Full 300-word synopsis displayed     │
│   with formatting, line breaks]        │
│                                        │
│  ────────────────────────────────────  │
│                                        │
│  MORAL/MESSAGE:                        │
│  Intelligence and humility win over   │
│  pride and power. No matter how small │
│  you are, you can make a big          │
│  difference.                           │
└────────────────────────────────────────┘

TAB 2: CHARACTERS
Show character cards in grid:

┌──────────────────────────────────┐
│  [Character Portrait - AI Art]   │
│                                  │
│  IJA (Tortoise)                  │
│  Protagonist                     │
│  ──────────────────────────────  │
│  Age: Ancient                    │
│  Personality: Clever, humble     │
│  Voice: Warm grandfatherly       │
│                                  │
│  Character Arc:                  │
│  Village underdog → Hero         │
│                                  │
│  [View Full Profile →]           │
└──────────────────────────────────┘

Clicking "View Full Profile" opens modal with:
- Full character description
- Physical appearance details
- Personality traits
- Character arc
- Relationships with other characters
- Voice direction
- Design notes
- Expression sheet (AI-generated sketches)
- Costume/outfit designs

TAB 3: SCRIPT
Full screenplay displayed with:
- Scene headers
- Action lines
- Character names
- Dialogue
- Camera directions
- Sound cues

Formatted like professional screenplay:
INT. THRONE ROOM - MORNING
Wide aerial shot descends from sky, revealing bustling
African kingdom.
                NARRATOR (V.O.)
      Long time ago, for one kingdom wey
      dem call Ile-Ife, one king wey sabi
      show off well well dey reign...
Camera PUSHES IN to King AJAYI sitting on throne.
                KING AJAYI
           (standing dramatically)
      Make una hear me well well! I be
      the wisest king for this land!

Features:
- Syntax highlighting (character names in CAPS, etc.)
- Copy button for each scene
- Export button (PDF/Fountain/DOCX)
- Print-friendly view
- Search/find function

TAB 4: PRODUCTION NOTES
┌────────────────────────────────────────┐
│  🎬 PRODUCTION GUIDE                    │
│  ────────────────────────────────────  │
│                                        │
│  ANIMATION STYLE NOTES:                │
│  Pixar 3D - High-quality CGI rendering │
│                                        │
│  CHARACTER ANIMATION:                  │
│  • Slow, deliberate movement for Ija  │
│  • Exaggerated gestures for King      │
│  • Fluid, natural motion for others   │
│                                        │
│  LIGHTING DESIGN:                      │
│  • Golden hour for outdoor scenes     │
│  • Warm interior lighting             │
│  • Dramatic shadows for tension       │
│                                        │
│  COLOR PALETTE:                        │
│  [Color swatches displayed]            │
│  Primary: Warm earth tones             │
│  Accent: Royal blues, vibrant greens  │
│                                        │
│  MUSIC & SOUND:                        │
│  • Traditional Yoruba drums            │
│  • Modern Afrobeats undertones        │
│  • Ambient marketplace sounds         │
│                                        │
│  ESTIMATED PRODUCTION BUDGET:          │
│  ₦6.3M - ₦18.5M ($4K - $12K USD)       │
│                                        │
│  [View Detailed Breakdown →]           │
└────────────────────────────────────────┘

TAB 5: STORYBOARD (Premium Feature)
Grid of storyboard frames:

┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│ [1] │ │ [2] │ │ [3] │ │ [4] │
│ EXT │ │ INT │ │ CU  │ │ WS  │
│Frame│ │Frame│ │Face │ │Crowd│
└─────┘ └─────┘ └─────┘ └─────┘

Each frame shows:
- AI-generated sketch
- Shot type label
- Duration
- Click to expand for details

TAB 6: CHARACTER DESIGNS (Premium Feature)
Full character design sheets:
- Turnarounds (front, side, back, 3/4 views)
- Expression sheets (8 emotions)
- Action poses
- Color palette
- Texture notes
- Rigging notes

EXPORT OPTIONS (Top-right of preview):
┌────────────────────────────────────┐
│  Export Story:                     │
│  ☑️ Full Script (PDF)               │
│  ☑️ Characters (PDF)                │
│  ☐ Storyboard (PDF) [Premium]     │
│  ☐ Animation Guide [Premium]      │
│  ☐ Audio Files [Premium]          │
│                                    │
│  [Download All] [Share Link]       │
└────────────────────────────────────┘

SAVE/ACTIONS (Bottom of preview):
[Save to Library] [Generate More Scenes] [Start Over]

═══════════════════════════════════════════════════════════════════
3. MY STORIES PAGE (Project Library)
═══════════════════════════════════════════════════════════════════

LAYOUT: Grid view (default) with List view option

FILTERS (Top bar):
[All] [Drafts] [Complete] [Exported] [Shared]

SORT: [Most Recent ▼] [Alphabetical] [Duration] [Type]

SEARCH: [🔍 Search your stories...]

STORY CARDS (Grid: 3 columns desktop, 1 mobile):

┌───────────────────────────────────────┐
│  [Thumbnail/Cover Art]                │
│                                       │
│  📁 Ija and the King's Challenge      │
│  ──────────────────────────────────   │
│  Type: Animation Script               │
│  Duration: 10 minutes                 │
│  Status: Complete ✅                   │
│  Created: Jan 20, 2025                │
│  Exports: 3 times                     │
│                                       │
│  [Open] [Edit] [Export] [⋮ More]      │
└───────────────────────────────────────┘

"More" dropdown includes:
- Duplicate
- Share with team
- Move to folder
- Delete
- View analytics (Premium)

EMPTY STATE (if no stories):
┌────────────────────────────────────────┐
│  🎬 No stories yet!                     │
│                                        │
│  Your creative journey starts here.   │
│  Create your first Nigerian story     │
│  with AI-powered tools.               │
│                                        │
│  [Create Your First Story →]          │
└────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════
4. TEMPLATES PAGE
═══════════════════════════════════════════════════════════════════

Pre-built story templates for quick start

CATEGORIES:
[All] [Folktales] [Modern] [Children] [Marketing] [Film] [Animation]

TEMPLATE CARDS (Grid):

┌───────────────────────────────────────┐
│  🦁 THE TRICKSTER'S TALE               │
│  ──────────────────────────────────   │
│  Based on: Anansi the Spider          │
│  Duration: 5-10 minutes               │
│  Language: Any                        │
│  Difficulty: Beginner                 │
│                                       │
│  A clever protagonist uses wit to     │
│  outsmart a more powerful opponent.   │
│                                       │
│  What's Included:                     │
│  ✓ Story structure                    │
│  ✓ Character templates                │
│  ✓ Key plot points                    │
│  ✓ Cultural elements                  │
│                                       │
│  [Use This Template →]                │
│  [Preview] [Save to Favorites]        │
└───────────────────────────────────────┘

Templates include:
1. The Trickster's Tale (Anansi-style)
2. Hero's Journey (African context)
3. Love in Lagos (Modern romance)
4. Family Drama (Nigerian wedding chaos)
5. Hustle & Heart (Entrepreneur story)
6. Japa Dreams (Relocation narrative)
7. Village to City (Culture clash)
8. Spirits & Ancestors (Mythology)
9. Product Launch Story (Marketing)
10. Brand Origin Story (Advertising)

Each template is customizable - clicking "Use This Template" pre-fills
the create story form with template structure

═══════════════════════════════════════════════════════════════════
5. COMMUNITY PAGE
═══════════════════════════════════════════════════════════════════

Discover and share stories from other creators

TABS: [Trending] [Latest] [Top Rated] [Following]

FILTERS:
Type: [All] [Folktales] [Modern] [Children] [Film]
Language: [All] [Pidgin] [Yoruba] [Igbo] [Hausa] [English]
Duration: [Any] [0-5min] [5-15min] [15-30min] [30min+]

STORY CARDS (With social features):

┌───────────────────────────────────────┐
│  [Cover Art Thumbnail]                │
│                                       │
│  🦊 The Clever Fox of Kano            │
│  by @storyteller_ng                   │
│  ──────────────────────────────────   │
│  Hausa Folktale • 8 minutes           │
│                                       │
│  "A hungry fox tricks the desert     │
│  traders using nothing but wit..."    │
│                                       │
│  👁️ 1.2K views  ❤️ 342  💬 45 comments │
│                                       │
│  [Read Story] [Save] [Share]          │
└───────────────────────────────────────┘

FEATURED SECTION:
"Story of the Week" - highlighted with special badge

CREATOR PROFILES:
Click on username to see:
- All their published stories
- Bio
- Follower count
- Follow button
- Social links

═══════════════════════════════════════════════════════════════════
6. LEARN PAGE (Resources & Tutorials)
═══════════════════════════════════════════════════════════════════

Educational content for storytellers

SECTIONS:

A. VIDEO TUTORIALS (Grid of video cards)
1. "Storytelling Fundamentals"
2. "Writing Dialogue in Pidgin"
3. "Character Design Basics"
4. "Animation Pre-Production"
5. "Voice Acting Tips"
6. "Music & Sound Design"

Each video card shows:
- Thumbnail
- Title
- Duration
- Difficulty level
- Progress bar (if started)

B. ARTICLES & GUIDES
- "The Three-Act Structure Explained"
- "Nigerian Proverbs and How to Use Them"
- "Screenplay Formatting 101"
- "Budget Planning for Indie Animation"
- "Marketing Your Animated Short"

C. WEBINAR REPLAYS
- "Live Q&A with Nollywood Directors"
- "Animation Masterclass with African Animators"
- "Pitching Your Story to Studios"

D. DOWNLOADABLE RESOURCES
- Screenplay templates
- Character design sheets (blank)
- Storyboard templates
- Production budget spreadsheet
- Rights & licensing guide

═══════════════════════════════════════════════════════════════════
UI/UX SPECIFICATIONS
═══════════════════════════════════════════════════════════════════

NAVIGATION:
- Sticky top nav bar
- Breadcrumbs for deep navigation
- Back button where appropriate
- Clear visual hierarchy

RESPONSIVE DESIGN:
Mobile (< 768px):
- Single column layouts
- Collapsible forms
- Bottom navigation for main actions
- Swipeable tabs
- Full-screen modals

Tablet (768px - 1024px):
- 2-column layouts
- Side panel overlays
- Optimized touch targets

Desktop (> 1024px):
- Full multi-column layouts
- Sidebar navigation
- Hover effects
- Keyboard shortcuts

ANIMATIONS:
- Page transitions: Smooth fade (300ms)
- Card hovers: Lift effect (transform: translateY(-4px))
- Button clicks: Scale pulse (transform: scale(0.95))
- Loading states: Skeleton screens + spinners
- Success states: Checkmark animation
- Form validation: Shake on error

GLASSMORPHISM EFFECTS:
All major cards and panels use:
```css
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
border-radius: 16px;
```

ACCESSIBILITY:
- ARIA labels on all interactive elements
- Keyboard navigation (Tab, Enter, Esc)
- Focus indicators (2px solid lemon green)
- Alt text for all images
- Color contrast ratio > 4.5:1
- Screen reader announcements for dynamic content

LOADING STATES:
- Skeleton screens for content loading
- Progress bars for long operations
- Spinners for quick actions
- Animated placeholders

ERROR HANDLING:
- Inline validation messages
- Toast notifications (top-right)
- Error summary at top of forms
- Helpful error messages (not technical jargon)

SUCCESS FEEDBACK:
- Confetti animation for story completion
- Success toasts
- Progress celebrations
- Share prompts

═══════════════════════════════════════════════════════════════════
COMPONENTS TO BUILD
═══════════════════════════════════════════════════════════════════

/components/storyteller
  StorytellerDashboard.jsx
  CreateStory.jsx
    - StoryBasicsForm.jsx
    - LanguageCultureForm.jsx
    - ProductionStyleForm.jsx
    - AdvancedOptionsForm.jsx
  StoryPreview.jsx
    - OverviewTab.jsx
    - CharactersTab.jsx
    - ScriptTab.jsx
    - ProductionNotesTab.jsx
    - StoryboardTab.jsx (Premium)
    - CharacterDesignsTab.jsx (Premium)
  MyStories.jsx
    - StoryCard.jsx
    - StoryFilters.jsx
    - StorySearch.jsx
  Templates.jsx
    - TemplateCard.jsx
    - TemplatePreview.jsx
  Community.jsx
    - CommunityStoryCard.jsx
    - CreatorProfile.jsx
  Learn.jsx
    - VideoCard.jsx
    - ArticleCard.jsx
    - ResourceDownload.jsx
  
  /shared
    CharacterCard.jsx
    ScriptViewer.jsx
    StoryboardFrame.jsx
    ExportModal.jsx
    UpgradePrompt.jsx (for premium features)

═══════════════════════════════════════════════════════════════════
STATE MANAGEMENT
═══════════════════════════════════════════════════════════════════

Use Context API for:
- StorytellerContext (current story being created/edited)
- UserStoriesContext (library of user's stories)
- TemplatesContext (available templates)

Local State (useState) for:
- Form inputs
- UI toggles (modals, dropdowns)
- Temporary data

API calls for:
- Story generation (POST to backend)
- Save story (POST/PUT)
- Load stories (GET)
- Export story (POST, returns download link)

═══════════════════════════════════════════════════════════════════
SAMPLE DATA (for prototype/demo)
═══════════════════════════════════════════════════════════════════

Story Templates (array):
[
  {
    id: "template_1",
    name: "The Trickster's Tale",
    description: "A clever protagonist uses wit to outsmart...",
    category: "Folktale",
    difficulty: "Beginner",
    duration: "5-10 minutes",
    structure: { /* pre-filled form data */ }
  },
  // ... more templates
]

User Stories (array):
[
  {
    id: "story_1",
    title: "Ija and the King's Challenge",
    type: "Animation Script",
    status: "complete",
    duration: 10,
    language: "pidgin",
    created: "2025-01-20",
    exports: 3,
    thumbnail: "/path/to/image.jpg"
  },
  // ... more stories
]

Community Stories (array):
[
  {
    id: "community_1",
    title: "The Clever Fox of Kano",
    author: "storyteller_ng",
    type: "Folktale",
    language: "Hausa",
    duration: 8,
    views: 1200,
    likes: 342,
    comments: 45,
    thumbnail: "/path/to/image.jpg"
  },
  // ... more stories
]

═══════════════════════════════════════════════════════════════════
INTEGRATION POINTS
═══════════════════════════════════════════════════════════════════

Connect to existing NaijaGPT features:

1. Culture Vault Integration:
   - Button to "Insert Proverb from Culture Vault"
   - Opens modal with proverb search
   - Selected proverb auto-inserted into story

2. Learn & Earn Integration:
   - Earn XP for completing stories
   - Badges for milestones (first story, 10 stories, etc.)
   - Challenges: "Create a story in Yoruba this week"

3. Subscription Integration:
   - Free tier limitations (watermarks, export limits)
   - Upgrade prompts for premium features
   - Usage tracking (stories remaining this month)

4. User Profile Integration:
   - Stories appear in user's profile
   - Portfolio view of all created stories
   - Share stories from profile

═══════════ContinueJan 26════════════════════════════════════════════════════════
PREMIUM FEATURES (Upgrade Prompts)
═══════════════════════════════════════════════════════════════════
Show upgrade prompt when user tries to:

Generate 11th story (free limit: 10/month)
Export storyboard (Premium only)
Export character design sheets (Premium only)
Access animation guides (Premium only)
Remove watermarks (Premium only)
Use collaboration features (Premium only)

Upgrade Modal:
┌────────────────────────────────────────┐
│  ✨ Unlock Premium Features             │
│  ────────────────────────────────────  │
│                                        │
│  You've hit the free tier limit.      │
│  Upgrade to continue creating!         │
│                                        │
│  Creator Tier (₦5,000/month):          │
│  ✓ 10 stories/month → Unlimited       │
│  ✓ No watermarks                      │
│  ✓ All export formats                 │
│  ✓ Character design sheets            │
│  ✓ Commercial license                 │
│                                        │
│  [Upgrade Now] [Compare Plans]         │
│                                        │
│  [Continue with Free] (if applicable)  │
└────────────────────────────────────────┘
═══════════════════════════════════════════════════════════════════
Build this feature with:

React 18+ (functional components, hooks)
Tailwind CSS (utility-first styling)
Framer Motion (animations)
Lucide React (icons)
React Router (navigation)
Context API (state management)
Axios (API calls)

Make it BEAUTIFUL, INTUITIVE, and PRODUCTION-READY!
The Storyteller Studio should feel like a premium creative tool
that empowers African storytellers to bring their visions to life.
Every detail matters - from micro-interactions to error states.
This feature will differentiate NaijaGPT from ALL competitors.
🎬 Let's build the future of African storytelling! 🇳🇬

---

## **PROMPT 2: BACKEND - STORYTELLER STUDIO API (for Gemini/Claude)**
Create a complete, production-ready backend API for the "STORYTELLER STUDIO" feature of NaijaGPT. This is an AI-powered content creation suite for African storytellers, filmmakers, and animators.
═══════════════════════════════════════════════════════════════════
TECH STACK
═══════════════════════════════════════════════════════════════════

Node.js (v18+)
Express.js (v4)
MongoDB (Mongoose ODM)
Redis (caching & rate limiting)
OpenAI API (GPT-4 for story generation)
DALL-E 3 or Midjourney API (character design generation)
Puppeteer (PDF generation)
AWS S3 or Cloudflare R2 (file storage)
Bull (job queue for long-running tasks)

═══════════════════════════════════════════════════════════════════
PROJECT STRUCTURE
═══════════════════════════════════════════════════════════════════
/server/src
/config
database.js
redis.js
openai.js
aws.js
constants.js
/controllers
storytellerController.js (main story generation)
storyLibraryController.js (CRUD for user stories)
templateController.js (story templates)
communityController.js (shared stories)
exportController.js (PDF/DOCX exports)
/models
Story.js
Character.js
Scene.js
Template.js
CommunityStory.js
/routes
storyteller.js
storyLibrary.js
templates.js
community.js
export.js
/services
storyGenerationService.js (core AI logic)
characterDesignService.js (AI character art)
scriptFormatterService.js (screenplay formatting)
storyboardService.js (frame generation)
pdfExportService.js (PDF creation)
storageService.js (S3/R2 uploads)
/utils
/prompts
storyGeneratorPrompt.js
characterDesignPrompt.js
dialogueGeneratorPrompt.js
sceneBreakdownPrompt.js
validators.js
helpers.js
logger.js
/middleware
auth.js
rateLimiter.js
subscriptionCheck.js
validation.js
errorHandler.js
/jobs
storyGenerationJob.js (Bull queue worker)
exportJob.js
═══════════════════════════════════════════════════════════════════
API ENDPOINTS
═══════════════════════════════════════════════════════════════════
BASE URL: /api/storyteller

STORY GENERATION
───────────────────────────────────────────────────────────────

POST /api/storyteller/generate
Authentication: Required (JWT)
Rate Limit: Based on subscription tier

Free: 2 stories/month
Creator: 10 stories/month
Professional: Unlimited

Request Body:
{
"storyType": "animation_script",  // enum: folktale, modern_nigerian, children, marketing, film, animation
"theme": "A clever tortoise outsmarts a proud king",
"targetAudience": "family",  // enum: children_3_8, family, teens, adults
"duration": 10,  // minutes
"language": "pidgin",  // enum: pidgin, yoruba, igbo, hausa, english, bilingual
"culturalSetting": "ancient_kingdom",
"animationStyle": "pixar_3d",
"characterCount": 5,
"advancedOptions": {
"tone": ["humorous", "inspirational"],
"includeProverbs": true,
"includeMusicCues": true,
"includeDanceSequences": false,
"moral": "Wisdom triumphs over strength and pride"
},
"additionalDetails": "Include talking drums in the soundtrack"
}
Response (202 Accepted - Async job):
{
"success": true,
"message": "Story generation started",
"jobId": "job_abc123",
"estimatedTime": 180,  // seconds
"statusUrl": "/api/storyteller/status/job_abc123"
}
───────────────────────────────────────────────────────────────
GET /api/storyteller/status/:jobId
Authentication: Required
Get generation job status
Response (In Progress):
{
"jobId": "job_abc123",
"status": "processing",  // enum: queued, processing, completed, failed
"progress": 65,  // percentage
"currentStep": "Writing dialogue...",
"estimatedTimeRemaining": 45  // seconds
}
Response (Completed):
{
"jobId": "job_abc123",
"status": "completed",
"progress": 100,
"storyId": "story_xyz789",
"resultUrl": "/api/storyteller/stories/story_xyz789"
}
Response (Failed):
{
"jobId": "job_abc123",
"status": "failed",
"error": "AI service temporarily unavailable",
"retryable": true
}
───────────────────────────────────────────────────────────────
GET /api/storyteller/stories/:storyId
Authentication: Required
Get complete generated story
Response:
{
"success": true,
"story": {
"id": "story_xyz789",
"title": "Ija and the King's Challenge",
"type": "animation_script",
"status": "complete",
"metadata": {
"language": "pidgin",
"duration": 10,
"targetAudience": "family",
"animationStyle": "pixar_3d",
"genre": "African Folktale / Comedy",
"rating": "G"
},
"overview": {
"logline": "A clever tortoise accepts a proud king's challenge...",
"synopsis": "In the ancient Yoruba kingdom of Ile-Ife...",
"moral": "Intelligence and humility win over pride and power."
},
"characters": [
{
"id": "char_1",
"name": "Ija",
"role": "protagonist",
"species": "Tortoise",
"age": "Ancient",
"personality": ["clever", "humble", "patient", "witty"],
"voiceProfile": {
"ageRange": "60-75",
"tone": "warm, grandfatherly",
"accent": "Nigerian Pidgin (neutral)",
"pitch": "medium-low",
"pace": "slow, deliberate"
},
"appearance": {
"height": "18 inches",
"shellColor": "green-brown with golden patterns",
"skinColor": "sage green",
"eyes": "large, warm brown",
"distinctiveFeatures": "Cowrie shell necklace"
},
"characterArc": "Village underdog → Hero",
"designSheetUrl": "/api/storyteller/stories/story_xyz789/characters/char_1/design",
"portraitUrl": "https://cdn.naijagpt.com/stories/xyz789/char_1_portrait.png"
},
// ... more characters
],
"script": {
"format": "screenplay",
"totalScenes": 7,
"scenes": [
{
"sceneNumber": 1,
"heading": "EXT. PALACE COURTYARD - MORNING",
"duration": 120,  // seconds
"location": "Palace Courtyard",
"timeOfDay": "Morning (8:00 AM)",
"weather": "Clear, sunny",
"description": "Wide aerial shot descends from sky, revealing bustling African kingdom...",
"action": [
{
"type": "camera",
"instruction": "Wide establishing shot (Drone/Crane)"
},
{
"type": "narration",
"character": "Narrator",
"dialogue": "Long time ago, for one kingdom wey dem call Ile-Ife..."
},
{
"type": "action",
"description": "Camera PUSHES IN to King AJAYI sitting on throne."
},
{
"type": "dialogue",
"character": "KING AJAYI",
"parenthetical": "(standing dramatically)",
"dialogue": "Make una hear me well well! I be the wisest king for this land!"
},
// ... more actions
],
"cameraSetup": {
"shots": [
{
"shotNumber": 1,
"type": "Extreme Wide Shot",
"movement": "Descending crane",
"duration": 5,
"lens": "24mm",
"notes": "Start high, descend to reveal scale"
},
// ... more shots
]
},
"soundDesign": {
"ambientSounds": ["marketplace chatter", "bird chirps"],
"music": "Traditional Yoruba drums fade in",
"sfx": ["Crowd gasp at 0:45", "Drum hit at 1:02"]
}
},
// ... more scenes
]
},
"productionNotes": {
"animationStyle": "Pixar 3D - High-quality CGI rendering",
"colorPalette": {
"primary": "#6B8E23",
"secondary": "#8B4513",
"accent": "#FFD700"
},
"lightingDesign": "Golden hour for outdoor scenes, warm interior lighting",
"musicTheme": "Traditional African instruments + modern Afrobeats",
"estimatedBudget": {
"currency": "NGN",
"min": 6300000,
"max": 18500000,
"breakdown": {
"animation": 5000000,
"voiceActors": 500000,
"musicSound": 300000,
"postProduction": 500000
}
}
},
"storyboard": {  // Premium feature
"available": false,  // true for premium users
"totalFrames": 187,
"previewUrl": null  // or URL if available
},
"exports": {
"scriptPDF": "https://cdn.naijagpt.com/exports/story_xyz789_script.pdf",
"charactersPDF": "https://cdn.naijagpt.com/exports/story_xyz789_characters.pdf",
"fullPackageZIP": null  // Premium only
},
"createdAt": "2025-01-25T10:30:00Z",
"updatedAt": "2025-01-25T10:33:15Z"
}
}
───────────────────────────────────────────────────────────────

STORY LIBRARY (CRUD)
───────────────────────────────────────────────────────────────

GET /api/storyteller/library
Authentication: Required
Get user's story library
Query Parameters:

page (default: 1)
limit (default: 12)
status (filter: draft, complete, exported)
type (filter by story type)
sortBy (recent, alphabetical, duration)

Response:
{
"success": true,
"stories": [
{
"id": "story_1",
"title": "Ija and the King's Challenge",
"type": "animation_script",
"status": "complete",
"duration": 10,
"language": "pidgin",
"thumbnailUrl": "https://cdn.naijagpt.com/thumbnails/story_1.jpg",
"createdAt": "2025-01-20T14:00:00Z",
"exportsCount": 3
},
// ... more stories
],
"pagination": {
"currentPage": 1,
"totalPages": 3,
"totalStories": 35,
"hasNext": true,
"hasPrev": false
}
}
───────────────────────────────────────────────────────────────
PUT /api/storyteller/stories/:storyId
Authentication: Required
Update story (edit, rename)
Request Body:
{
"title": "New Title",
"status": "complete",  // draft, complete, exported
"metadata": {
// updateable fields
}
}
Response:
{
"success": true,
"message": "Story updated successfully",
"story": { /* updated story object */ }
}
───────────────────────────────────────────────────────────────
DELETE /api/storyteller/stories/:storyId
Authentication: Required
Delete story (soft delete)
Response:
{
"success": true,
"message": "Story deleted successfully"
}
───────────────────────────────────────────────────────────────

TEMPLATES
───────────────────────────────────────────────────────────────

GET /api/storyteller/templates
Authentication: Optional (public templates available)
Get story templates
Query Parameters:

category (folktale, modern, children, marketing, film, animation)
difficulty (beginner, intermediate, advanced)

Response:
{
"success": true,
"templates": [
{
"id": "template_1",
"name": "The Trickster's Tale",
"description": "A clever protagonist uses wit to outsmart a more powerful opponent",
"category": "folktale",
"difficulty": "beginner",
"basedOn": "Anansi the Spider stories",
"estimatedDuration": "5-10 minutes",
"prefilledData": {
"storyType": "folktale",
"characterCount": 3,
"structure": {
"act1": "Introduce trickster and challenge",
"act2": "Three clever solutions",
"act3": "Victory and moral lesson"
}
},
"previewImageUrl": "https://cdn.naijagpt.com/templates/template_1.jpg"
},
// ... more templates
]
}
───────────────────────────────────────────────────────────────
POST /api/storyteller/templates/:templateId/use
Authentication: Required
Use a template to start story generation
Response:
{
"success": true,
"message": "Template loaded",
"prefilledData": { /* form data pre-filled from template */ }
}
───────────────────────────────────────────────────────────────

EXPORT FUNCTIONALITY
───────────────────────────────────────────────────────────────

POST /api/storyteller/stories/:storyId/export
Authentication: Required
Subscription Check: Some formats require premium
Request Body:
{
"formats": ["script_pdf", "characters_pdf", "storyboard_pdf"],
"includeWatermark": false  // requires premium
}
Response (Async job):
{
"success": true,
"message": "Export started",
"jobId": "export_job_123",
"statusUrl": "/api/storyteller/export/status/export_job_123"
}
───────────────────────────────────────────────────────────────
GET /api/storyteller/export/status/:jobId
Get export job status
Response (Completed):
{
"jobId": "export_job_123",
"status": "completed",
"exports": {
"script_pdf": "https://cdn.naijagpt.com/exports/story_xyz789_script.pdf",
"characters_pdf": "https://cdn.naijagpt.com/exports/story_xyz789_characters.pdf",
"storyboard_pdf": "https://cdn.naijagpt.com/exports/story_xyz789_storyboard.pdf",
"fullPackageZIP": "https://cdn.naijagpt.com/exports/story_xyz789_complete.zip"
},
"expiresAt": "2025-02-01T10:00:00Z"  // 7 days
}
───────────────────────────────────────────────────────────────

COMMUNITY (Social Features)
───────────────────────────────────────────────────────────────

POST /api/storyteller/stories/:storyId/publish
Authentication: Required
Publish story to community
Request Body:
{
"visibility": "public",  // public, unlisted
"allowComments": true,
"allowRemix": true  // let others use as template
}
Response:
{
"success": true,
"message": "Story published to community",
"communityStoryId": "comm_story_456",
"shareUrl": "https://naijagpt.com/community/stories/comm_story_456"
}
───────────────────────────────────────────────────────────────
GET /api/storyteller/community
Get community stories (public feed)
Query Parameters:

tab (trending, latest, top_rated, following)
type (filter by story type)
language (filter by language)
page, limit

Response:
{
"success": true,
"stories": [
{
"id": "comm_story_1",
"title": "The Clever Fox of Kano",
"author": {
"id": "user_123",
"username": "storyteller_ng",
"avatarUrl": "https://cdn.naijagpt.com/avatars/user_123.jpg"
},
"type": "Folktale",
"language": "Hausa",
"duration": 8,
"thumbnailUrl": "https://cdn.naijagpt.com/community/comm_story_1.jpg",
"stats": {
"views": 1200,
"likes": 342,
"comments": 45
},
"publishedAt": "2025-01-15T10:00:00Z"
},
// ... more stories
],
"pagination": { /* pagination data */ }
}
───────────────────────────────────────────────────────────────
POST /api/storyteller/community/:storyId/like
Authentication: Required
Like a community story
POST /api/storyteller/community/:storyId/comment
Authentication: Required
Comment on a community story
Request Body:
{
"comment": "This story sweet die! Well done!"
}
═══════════════════════════════════════════════════════════════════
DATABASE MODELS (MongoDB/Mongoose)
═══════════════════════════════════════════════════════════════════
Story Model (Story.js):
─────────────────────────────────────────────────────────────
const storySchema = new mongoose.Schema({
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true,
index: true
},
title: {
type: String,
required: true,
trim: true,
maxlength: 200
},
type: {
type: String,
enum: ['folktale', 'modern_nigerian', 'children', 'marketing', 'film', 'animation_script'],
required: true
},
status: {
type: String,
enum: ['generating', 'draft', 'complete', 'exported', 'published'],
default: 'generating'
},
generationJobId: String,  // Bull job ID
// Input parameters (what user requested)
inputParams: {
theme: String,
targetAudience: String,
duration: Number,  // minutes
language: String,
culturalSetting: String,
animationStyle: String,
characterCount: Number,
advancedOptions: {
tone: [String],
includeProverbs: Boolean,
includeMusicCues: Boolean,
includeDanceSequences: Boolean,
moral: String
},
additionalDetails: String
},
// Generated content
metadata: {
language: String,
duration: Number,
targetAudience: String,
animationStyle: String,
genre: String,
rating: String  // G, PG, PG-13, R
},
overview: {
logline: { type: String, maxlength: 500 },
synopsis: { type: String, maxlength: 5000 },
moral: String
},
characters: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Character'
}],
script: {
format: { type: String, default: 'screenplay' },
totalScenes: Number,
scenes: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'Scene'
}]
},
productionNotes: {
animationStyle: String,
colorPalette: {
primary: String,
secondary: String,
accent: String
},
lightingDesign: String,
musicTheme: String,
estimatedBudget: {
currency: String,
min: Number,
max: Number,
breakdown: mongoose.Schema.Types.Mixed
}
},
storyboard: {
available: { type: Boolean, default: false },
totalFrames: Number,
frames: [mongoose.Schema.Types.Mixed]  // Premium feature
},
// File exports
exports: {
scriptPDF: String,  // S3/R2 URL
charactersPDF: String,
storyboardPDF: String,
fullPackageZIP: String
},
thumbnailUrl: String,  // Auto-generated or uploaded
exportsCount: { type: Number, default: 0 },
// Community features
isPublished: { type: Boolean, default: false },
publishedAt: Date,
visibility: {
type: String,
enum: ['private', 'unlisted', 'public'],
default: 'private'
},
allowComments: { type: Boolean, default: false },
allowRemix: { type: Boolean, default: false },
stats: {
views: { type: Number, default: 0 },
likes: { type: Number, default: 0 },
comments: { type: Number, default: 0 },
remixes: { type: Number, default: 0 }
},
// Soft delete
deleted: { type: Boolean, default: false },
deletedAt: Date
}, {
timestamps: true,
toJSON: { virtuals: true },
toObject: { virtuals: true }
});
// Indexes
storySchema.index({ userId: 1, createdAt: -1 });
storySchema.index({ status: 1 });
storySchema.index({ type: 1 });
storySchema.index({ isPublished: 1, publishedAt: -1 });
module.exports = mongoose.model('Story', storySchema);
───────────────────────────────────────────────────────────────
Character Model (Character.js):
─────────────────────────────────────────────────────────────
const characterSchema = new mongoose.Schema({
storyId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Story',
required: true
},
name: { type: String, required: true },
role: {
type: String,
enum: ['protagonist', 'antagonist', 'supporting', 'minor'],
required: true
},
species: String,  // Human, Tortoise, Rabbit, etc.
age: String,
personality: [String],
voiceProfile: {
ageRange: String,
tone: String,
accent: String,
pitch: String,
pace: String,
referenceActors: [String]
},
appearance: {
height: String,
weight: String,
primaryColors: [String],
distinctiveFeatures: String,
clothing: String
},
characterArc: String,
relationships: mongoose.Schema.Types.Mixed,
designSheets: {
turnaroundUrl: String,  // S3 URL
expressionSheetUrl: String,
actionPosesUrl: String,
colorPaletteUrl: String
},
portraitUrl: String,  // AI-generated portrait
}, { timestamps: true });
module.exports = mongoose.model('Character', characterSchema);
───────────────────────────────────────────────────────────────
Scene Model (Scene.js):
─────────────────────────────────────────────────────────────
const sceneSchema = new mongoose.Schema({
storyId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Story',
required: true
},
sceneNumber: { type: Number, required: true },
heading: String,  // "EXT. PALACE COURTYARD - MORNING"
duration: Number,  // seconds
location: String,
timeOfDay: String,
weather: String,
description: String,
action: [{
type: {
type: String,
enum: ['camera', 'narration', 'dialogue', 'action', 'sound', 'music']
},
character: String,  // if dialogue/narration
parenthetical: String,  // (standing dramatically)
dialogue: String,
instruction: String,  // for camera/action
description: String
}],
cameraSetup: {
shots: [{
shotNumber: Number,
type: String,  // Wide, Medium, Close-up, etc.
movement: String,  // Static, Pan, Dolly, etc.
duration: Number,
lens: String,
notes: String
}]
},
soundDesign: {
ambientSounds: [String],
music: String,
sfx: [String]  // "Crowd gasp at 0:45"
}
}, { timestamps: true });
module.exports = mongoose.Schema('Scene', sceneSchema);
───────────────────────────────────────────────────────────────
Template Model (Template.js):
─────────────────────────────────────────────────────────────
const templateSchema = new mongoose.Schema({
name: { type: String, required: true, unique: true },
description: { type: String, required: true },
category: {
type: String,
enum: ['folktale', 'modern', 'children', 'marketing', 'film', 'animation'],
required: true
},
difficulty: {
type: String,
enum: ['beginner', 'intermediate', 'advanced'],
default: 'beginner'
},
basedOn: String,  // "Anansi the Spider stories"
estimatedDuration: String,
prefilledData: {
storyType: String,
characterCount: Number,
structure: {
act1: String,
act2: String,
act3: String
},
suggestedLanguage: String,
suggestedSetting: String,
suggestedTone: [String]
},
previewImageUrl: String,
usageCount: { type: Number, default: 0 },
isActive: { type: Boolean, default: true },
isFeatured: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('Template', templateSchema);
═══════════════════════════════════════════════════════════════════
CORE SERVICE: STORY GENERATION (storyGenerationService.js)
═══════════════════════════════════════════════════════════════════
const openai = require('../config/openai');
const { storyGeneratorPrompt } = require('../utils/prompts/storyGeneratorPrompt');
class StoryGenerationService {
async generateStory(inputParams) {
try {
// Step 1: Generate main story structure
const storyStructure = await this.generateStoryStructure(inputParams);
  // Step 2: Generate characters
  const characters = await this.generateCharacters(storyStructure, inputParams);
  
  // Step 3: Generate detailed script
  const script = await this.generateScript(storyStructure, characters, inputParams);
  
  // Step 4: Generate production notes
  const productionNotes = await this.generateProductionNotes(inputParams);
  
  // Step 5: (Premium) Generate storyboard
  let storyboard = null;
  if (inputParams.includeStor yboard) {
    storyboard = await this.generateStoryboard(script, inputParams);
  }
  
  return {
    overview: storyStructure,
    characters,
    script,
    productionNotes,
    storyboard
  };
  
} catch (error) {
  throw new Error(`Story generation failed: ${error.message}`);
}
}
async generateStoryStructure(inputParams) {
const prompt = storyGeneratorPrompt(inputParams);
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { 
      role: 'system', 
      content: prompt 
    },
    {
      role: 'user',
      content: `Generate a complete story based on these parameters:\n${JSON.stringify(inputParams, null, 2)}`
    }
  ],
  temperature: 0.8,  // Creative
  max_tokens: 4000
});

const generatedText = response.choices[0].message.content;

// Parse AI response into structured data
const structured = this.parseStContinueJan 27oryResponse(generatedText);
return structured;
}
async generateCharacters(storyStructure, inputParams) {
// For each character mentioned in story, generate detailed profile
const characters = [];
for (const charName of storyStructure.characterNames) {
  const characterPrompt = `
    Create a detailed character profile for "${charName}" in this story:
    
    Story Context: ${storyStructure.synopsis}
    Animation Style: ${inputParams.animationStyle}
    Target Audience: ${inputParams.targetAudience}
    
    Provide:
    1. Full character description (personality, appearance)
    2. Voice direction
    3. Character arc
    4. Design notes for ${inputParams.animationStyle} style
    
    Format as JSON.
  `;
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert character designer for animation.' },
      { role: 'user', content: characterPrompt }
    ],
    temperature: 0.7,
    max_tokens: 1500
  });
  
  const characterData = JSON.parse(response.choices[0].message.content);
  characters.push(characterData);
}

return characters;
}
async generateScript(storyStructure, characters, inputParams) {
// Generate scene-by-scene screenplay
const scriptPrompt = `
Write a complete screenplay in industry-standard format for:
  Title: ${storyStructure.title}
  Synopsis: ${storyStructure.synopsis}
  Duration: ${inputParams.duration} minutes
  Language: ${inputParams.language}
  
  Characters: ${JSON.stringify(characters)}
  
  Requirements:
  - Follow ${inputParams.language} dialogue
  - Include camera directions
  - Add sound cues
  - Format as proper screenplay
  - Break into ${Math.ceil(inputParams.duration / 2)} scenes
  
  Output as structured JSON with scenes array.
`;

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: 'You are an expert screenwriter specializing in African stories.' },
    { role: 'user', content: scriptPrompt }
  ],
  temperature: 0.7,
  max_tokens: 8000
});

const script = JSON.parse(response.choices[0].message.content);
return script;
}
async generateProductionNotes(inputParams) {
// Generate production guidance
return {
animationStyle: ${inputParams.animationStyle} - High-quality rendering,
colorPalette: this.generateColorPalette(inputParams),
lightingDesign: this.generateLightingNotes(inputParams),
musicTheme: this.generateMusicNotes(inputParams),
estimatedBudget: this.estimateBudget(inputParams)
};
}
// Helper methods
parseStoryResponse(text) {
// Parse AI-generated text into structured object
// Extract title, logline, synopsis, character names, etc.
// This would use regex or AI-based parsing
return { /* structured data */ };
}
generateColorPalette(inputParams) {
// Generate appropriate color scheme based on story type
const palettes = {
'folktale': { primary: '#6B8E23', secondary: '#8B4513', accent: '#FFD700' },
'modern_nigerian': { primary: '#1A5D1A', secondary: '#C9F270', accent: '#FF6B6B' },
// ... more palettes
};
return palettes[inputParams.storyType] || palettes['folktale'];
}
// ... more helper methods
}
module.exports = new StoryGenerationService();
═══════════════════════════════════════════════════════════════════
JOB QUEUE (Bull) - storyGenerationJob.js
═══════════════════════════════════════════════════════════════════
const Queue = require('bull');
const storyGenerationService = require('../services/storyGenerationService');
const Story = require('../models/Story');
const storyQueue = new Queue('story-generation', {
redis: process.env.REDIS_URL
});
// Process jobs
storyQueue.process(async (job) => {
const { storyId, inputParams } = job.data;
try {
// Update progress
job.progress(10);
await Story.findByIdAndUpdate(storyId, { status: 'generating' });
// Generate story
job.progress(20);
const generatedContent = await storyGenerationService.generateStory(inputParams);

job.progress(80);

// Save to database
const story = await Story.findByIdAndUpdate(
  storyId,
  {
    status: 'complete',
    overview: generatedContent.overview,
    characters: generatedContent.characters,
    script: generatedContent.script,
    productionNotes: generatedContent.productionNotes,
    storyboard: generatedContent.storyboard
  },
  { new: true }
);

job.progress(100);

return { success: true, storyId: story._id };
} catch (error) {
await Story.findByIdAndUpdate(storyId, { status: 'failed' });
throw error;
}
});
// Export queue
module.exports = storyQueue;
═══════════════════════════════════════════════════════════════════
CONTROLLER - storytellerController.js
═══════════════════════════════════════════════════════════════════
const Story = require('../models/Story');
const storyQueue = require('../jobs/storyGenerationJob');
exports.generateStory = async (req, res, next) => {
try {
const userId = req.user._id;
const inputParams = req.body;
// Check subscription limits
const userStoryCount = await Story.countDocuments({
  userId,
  createdAt: { $gte: new Date(new Date().setDate(1)) }  // This month
});

const limits = {
  'free': 2,
  'creator': 10,
  'professional': Infinity
};

const userLimit = limits[req.user.subscription.tier];

if (userStoryCount >= userLimit) {
  return res.status(403).json({
    success: false,
    error: 'Monthly story limit reached',
    limit: userLimit,
    current: userStoryCount,
    upgradeRequired: true
  });
}

// Create story record
const story = await Story.create({
  userId,
  title: `Untitled Story ${userStoryCount + 1}`,
  type: inputParams.storyType,
  status: 'generating',
  inputParams
});

// Queue generation job
const job = await storyQueue.add({
  storyId: story._id,
  inputParams
});

// Update story with job ID
story.generationJobId = job.id;
await story.save();

res.status(202).json({
  success: true,
  message: 'Story generation started',
  jobId: job.id,
  storyId: story._id,
  estimatedTime: 180,  // 3 minutes
  statusUrl: `/api/storyteller/status/${job.id}`
});
} catch (error) {
next(error);
}
};
exports.getJobStatus = async (req, res, next) => {
try {
const { jobId } = req.params;
const job = await storyQueue.getJob(jobId);
if (!job) {
  return res.status(404).json({
    success: false,
    error: 'Job not found'
  });
}

const state = await job.getState();
const progress = job.progress();

const statusMap = {
  'completed': 'completed',
  'failed': 'failed',
  'active': 'processing',
  'waiting': 'queued'
};

const response = {
  jobId,
  status: statusMap[state] || 'unknown',
  progress
};

if (state === 'completed') {
  response.storyId = job.data.storyId;
  response.resultUrl = `/api/storyteller/stories/${job.data.storyId}`;
} else if (state === 'failed') {
  response.error = job.failedReason;
  response.retryable = true;
}

res.json(response);
} catch (error) {
next(error);
}
};
exports.getStory = async (req, res, next) => {
try {
const { storyId } = req.params;
const userId = req.user._id;
const story = await Story.findOne({
  _id: storyId,
  userId,
  deleted: false
})
.populate('characters')
.populate('script.scenes');

if (!story) {
  return res.status(404).json({
    success: false,
    error: 'Story not found'
  });
}

res.json({
  success: true,
  story
});
} catch (error) {
next(error);
}
};
// ... more controller methods
module.exports = exports;
═══════════════════════════════════════════════════════════════════
MIDDLEWARE - subscriptionCheck.js
═══════════════════════════════════════════════════════════════════
module.exports = (requiredTier) => {
return (req, res, next) => {
const tierHierarchy = ['free', 'creator', 'professional', 'studio'];
const userTierIndex = tierHierarchy.indexOf(req.user.subscription.tier);
const requiredTierIndex = tierHierarchy.indexOf(requiredTier);
if (userTierIndex < requiredTierIndex) {
  return res.status(403).json({
    success: false,
    error: 'Premium feature',
    message: `This feature requires ${requiredTier} tier or higher`,
    currentTier: req.user.subscription.tier,
    requiredTier,
    upgradeUrl: '/pricing'
  });
}

next();
};
};
═══════════════════════════════════════════════════════════════════
ROUTES - storyteller.js
═══════════════════════════════════════════════════════════════════
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const subscriptionCheck = require('../middleware/subscriptionCheck');
const storytellerController = require('../controllers/storytellerController');
// Story generation
router.post('/generate', auth, storytellerController.generateStory);
router.get('/status/:jobId', auth, storytellerController.getJobStatus);
router.get('/stories/:storyId', auth, storytellerController.getStory);
// Story library
router.get('/library', auth, storytellerController.getLibrary);
router.put('/stories/:storyId', auth, storytellerController.updateStory);
router.delete('/stories/:storyId', auth, storytellerController.deleteStory);
// Export (some formats require premium)
router.post('/stories/:storyId/export', auth, storytellerController.exportStory);
router.get('/export/status/:jobId', auth, storytellerController.getExportStatus);
// Templates
router.get('/templates', storytellerController.getTemplates);
router.post('/templates/:templateId/use', auth, storytellerController.useTemplate);
// Community
router.post('/stories/:storyId/publish', auth, storytellerController.publishStory);
router.get('/community', storytellerController.getCommunityStories);
router.post('/community/:storyId/like', auth, storytellerController.likeStory);
router.post('/community/:storyId/comment', auth, storytellerController.commentOnStory);
// Premium features
router.get(
'/stories/:storyId/storyboard',
auth,
subscriptionCheck('creator'),
storytellerController.getStoryboard
);
module.exports = router;
═══════════════════════════════════════════════════════════════════
Build this backend with:

Clean architecture (separation of concerns)
Comprehensive error handling
Detailed logging (Winston)
Input validation (Joi)
Rate limiting (tier-based)
Caching (Redis) for expensive operations
Job queues (Bull) for long-running tasks
File storage (AWS S3 or Cloudflare R2)
Security best practices (helmet, cors, sanitization)
API documentation (Swagger/OpenAPI)
Unit tests (Jest) for services
Integration tests for APIs

Make it SCALABLE, SECURE, and PRODUCTION-READY!
The Storyteller Studio backend should handle high load,
complex AI operations, and premium tier management seamlessly.
🎬 Let's revolutionize African storytelling! 🇳🇬

---

These two comprehensive prompts provide everything needed to build the complete **Storyteller Studio** feature for NaijaGPT. The frontend prompt covers all UI/UX requirements with detailed specifications, while the backend prompt handles all API endpoints, database models, AI integration, and job processing.

**Ready to start building?** 🚀🎬