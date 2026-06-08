/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
const fallbackBusinesses: Record<string, any> = {
  cafe: {
    details: {
      category: 'cafe',
      categoryLabel: 'Specialty Coffee',
      name: 'Brew & Co',
      slogan: 'Crafted with care',
      description: 'Charming neighborhood espresso bar',
      address: '123 Espresso Way',
      phone: '+1 234 5678',
      email: 'cafe@brew.com',
      hours: '7am - 6pm daily'
    },
    website: {
      theme: {
        primaryColor: 'amber-700',
        secondaryColor: 'zinc-950',
        accentColor: 'amber-500',
        themeStyle: 'warm-organic'
      },
      heroTitle: 'Warm organic micro-brew cafe',
      heroSlogan: 'Every roast tells a story',
      aboutText: 'We serve premium single origin coffees.',
      services: [
        { title: 'Pour Over Special', price: '$6', description: 'Hand-brewed premium micro lots', icon: 'Coffee' },
        { title: 'Artisan Espresso', price: '$4.5', description: 'Double shot with balanced notes', icon: 'Sparkles' }
      ],
      features: ['Organic beans', 'Sourdough pastries'],
      testimonials: [
        { author: 'Jane', text: 'Amazing micro roasts!', role: 'Local guide', rating: 5 }
      ],
      interactiveComponent: 'booking'
    },
    pitchDeck: [
      { slideNumber: 1, title: 'Introduction', heading: 'Meet Brew & Co', insights: ['Premium quality'], keyWords: ['espresso'], growthImpact: 'High' }
    ]
  },
  custom: {
    details: {
       category: 'custom',
       categoryLabel: 'Custom Business',
       name: 'Local Star',
       slogan: 'Redefining Services',
       description: 'Premium local services',
       address: '101 Main St',
       phone: '+1 555 5555',
       email: 'info@localstar.com',
       hours: '9am - 5pm'
    },
    website: {
      theme: {
        primaryColor: 'rose-700',
        secondaryColor: 'zinc-950',
        accentColor: 'rose-500',
        themeStyle: 'modern-sleek'
      },
      heroTitle: 'Aesthetic modern layouts',
      heroSlogan: 'Crafting community growth',
      aboutText: 'Dedicated premium solution providers.',
      services: [
        { title: 'Exclusive Treatment', price: '$120', description: 'Premium personalized service', icon: 'Sparkles' }
      ],
      features: ['Instant Booking', 'Award winning staff'],
      testimonials: [
        { author: 'Emma', text: 'Incredibly professional and easy!', role: 'Premium member', rating: 5 }
      ],
      interactiveComponent: 'booking'
    },
    pitchDeck: [
      { slideNumber: 1, title: 'Growth Formula', heading: 'Modernized Local Commerce', insights: ['Capturing digital leads 24/7'], keyWords: ['conversions'], growthImpact: '35% margin increase' }
    ]
  }
};
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY' || key === 'MOCK_KEY') {
    // If no key is set, we return null to fall back to our high quality custom templates
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Custom Local Business & Pitch Deck Generator
app.post('/api/business/generate', async (req: Request, res: Response) => {
  const { category, businessName, locationDescription, keyOffers } = req.body;

  if (!category) {
    return res.status(400).json({ error: 'Business category is required.' });
  }

  const client = getGeminiClient();

  // If client is missing/unconfigured, load our exceptional fallback templates
  if (!client) {
    console.log('Gemini API unconfigured/missing. Serving offline high-quality template.');
    const result = { ...fallbackBusinesses[category as keyof typeof fallbackBusinesses] || fallbackBusinesses.custom };
    if (businessName) {
      result.details.name = businessName;
      result.website.heroTitle = `${businessName}: Beautiful local design`;
    }
    return res.json(result);
  }

  try {
    const prompt = `
Generate a comprehensive professional local business profile, an absolute masterpiece website layout configuration, and a structured, high-conversion 5-slide visual pitch deck.
Return a structured JSON output matching the requested types strictly.

TARGET CRITERIA:
- Business Category: ${category}
- Provided Name: ${businessName || "Come up with an inspiring name"}
- Context/Location/Keywords: ${locationDescription || "A beautiful thriving local community district"}
- Key Offers: ${keyOffers || "Standard high value specialty offers"}

Ensure the names are authentic and distinct. Do NOT use placeholder text or corporate lingo like "Lorem Ipsum".
The website config must look real, incorporating a cohesive design system: choose standard beautiful Tailwind color styles.
For Icons, use only official PascalCase Lucide Icon names (such as Coffee, Scissors, Dumbbell, Sparkles, Shield, Heart, Laptop, Layers, Briefcase, Star, MapPin, Award, Brush, Trophy, Clipboard).
The Pitch Deck must be highly persuasive and describe how a professional, frictionless digital website helps this local business capture leads, boost average basket sizes, and make daily bookings automatic.
`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        details: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Must be exactly: 'cafe' | 'gym' | 'salon' | 'clinic' | 'boutique' | 'custom'" },
            categoryLabel: { type: Type.STRING, description: "Human friendly category label, e.g. Specialty Micro Roastery Cafe" },
            name: { type: Type.STRING, description: "Crafted aesthetic business name" },
            slogan: { type: Type.STRING },
            description: { type: Type.STRING },
            address: { type: Type.STRING },
            phone: { type: Type.STRING },
            email: { type: Type.STRING },
            hours: { type: Type.STRING },
          },
          required: ["category", "categoryLabel", "name", "slogan", "description", "address", "phone", "email", "hours"]
        },
        website: {
          type: Type.OBJECT,
          properties: {
            theme: {
              type: Type.OBJECT,
              properties: {
                primaryColor: { type: Type.STRING, description: "Main color. Pick standard Tailwind Class colors like amber-700, rose-700, teal-700, emerald-700, steel-800, sky-800" },
                secondaryColor: { type: Type.STRING, description: "Secondary brand color like stone-800, zinc-900, slate-800" },
                accentColor: { type: Type.STRING, description: "Accent visual highlight like yellow-500, cyan-400, amber-500, green-400" },
                themeStyle: { type: Type.STRING, description: "One of: 'modern-sleek' | 'warm-organic' | 'editorial-serif' | 'clean-clinical' | 'bold-athletic'" },
              },
              required: ["primaryColor", "secondaryColor", "accentColor", "themeStyle"]
            },
            heroTitle: { type: Type.STRING },
            heroSlogan: { type: Type.STRING },
            aboutText: { type: Type.STRING },
            services: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  price: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING, description: "A valid Lucide icon name in PascalCase e.g. Coffee, Scissors, Dumbbell, Shield, Sparkles, Laptop, Briefcase." }
                },
                required: ["title", "price", "description", "icon"]
              }
            },
            features: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            testimonials: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  author: { type: Type.STRING },
                  text: { type: Type.STRING },
                  role: { type: Type.STRING },
                  rating: { type: Type.INTEGER }
                },
                required: ["author", "text", "role", "rating"]
              }
            },
            interactiveComponent: { type: Type.STRING, description: "The type of form widget: 'booking' | 'reservations' | 'classes' | 'contacts'" }
          },
          required: ["theme", "heroTitle", "heroSlogan", "aboutText", "services", "features", "testimonials", "interactiveComponent"]
        },
        pitchDeck: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              slideNumber: { type: Type.INTEGER },
              title: { type: Type.STRING, description: "Compact slide theme (e.g. 'The Hook', 'The Pain Points', 'The Solution: Online Hub', 'Growth & Metrics', 'The Pitch & Offer')" },
              heading: { type: Type.STRING },
              insights: { type: Type.ARRAY, items: { type: Type.STRING } },
              keyWords: { type: Type.ARRAY, items: { type: Type.STRING } },
              growthImpact: { type: Type.STRING }
            },
            required: ["slideNumber", "title", "heading", "insights", "keyWords", "growthImpact"]
          }
        },
        growthPotential: {
          type: Type.OBJECT,
          properties: {
            problemStatement: { type: Type.STRING },
            solutionValue: { type: Type.STRING },
            metrics: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["problemStatement", "solutionValue", "metrics"]
        }
      },
      required: ["details", "website", "pitchDeck", "growthPotential"]
    };

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    return res.json(parsedData);
  } catch (error) {
    console.error('Error generating with Gemini:', error);
    // Return appropriate fallback if generating errors out
    const result = { ...fallbackBusinesses[category as keyof typeof fallbackBusinesses] || fallbackBusinesses.custom };
    return res.json(result);
  }
});

// 2. API: AI Pitch Coach (Feedback Analyzer)
app.post('/api/pitch/coach', async (req: Request, res: Response) => {
  const { pitchText, businessInfo } = req.body;

  if (!pitchText) {
    return res.status(400).json({ error: 'Pitch text is required' });
  }

  const client = getGeminiClient();

  if (!client) {
    console.log('Gemini API unconfigured. Sending highly realistic offline evaluation simulation.');
    // Simulated coaching scores based on keyword analysis
    const includesGrowth = /growth|metrics|money|roi|sales|percent|\d+%/i.test(pitchText);
    const includesFriction = /friction|booking|schedule|website|online|lead/i.test(pitchText);
    const includesRisk = /risk|free|trial|guarantee/i.test(pitchText);

    let score = 70;
    if (includesGrowth) score += 10;
    if (includesFriction) score += 10;
    if (includesRisk) score += 10;
    score = Math.min(score, 98);

    const result = {
      score,
      clarityScore: score - 2,
      persuasionScore: score + 1,
      structureScore: score - 1,
      strengths: [
        'You successfully connected with the business theme directly.',
        includesFriction ? 'Excellent job identifying scheduling bottlenecks or digital booking access.' : 'Good general conversational dialogue.'
      ],
      weaknesses: [
        !includesGrowth ? 'Missing concrete ROI indicators or growth metrics (e.g. percentage increase, monthly income numbers).' : 'Could state structural value metrics more prominently.',
        !includesRisk ? 'Add a risk-free trial offer or money-back guarantee to lower their barrier to action.' : 'Ensure checkout rates are aligned.'
      ],
      suggestions: [
        'Quote a specific, realistic calculation (e.g. "We can free up 4 hours a week by letting clients schedule themselves").',
        'State your risk-free launch trial clearly: "Try it free for 30 days; if bookings don\'t jump by 20%, you pay $0."'
      ],
      revisedPitch: `Hi! I noticed that your customers currently have to call in during rush hours to book services. I created a custom, responsive scheduler web hub for ${businessInfo?.details?.name || 'your business'} that lets clients self-book 24/7. This can capture up to 30% more weekend bookings, saving your staff hours of phone coordination. I want to deploy this for you entirely risk-free for 30 days: if appointments do not increase, you pay absolutely nothing!`
    };
    return res.json(result);
  }

  try {
    const prompt = `
Act as an elite Startup Pitch Coach and Business Strategy Trainer.
Analyze and evaluate the following speech pitch script submitted by a student.
The student is trying to pitch a web solution and growth plan to the local business owner of: ${businessInfo?.details?.name || "a local boutique shop"}.

STUDENT'S PITCH:
"""
${pitchText}
"""

LOCAL BUSINESS LANDSCAPE:
- Category: ${businessInfo?.details?.category}
- Slogan: ${businessInfo?.details?.slogan}
- Problems Solving: ${businessInfo?.growthPotential?.problemStatement}
- Digital Growth Value: ${businessInfo?.growthPotential?.solutionValue}

Task:
Grade the pitch out of 100. Be critical yet highly encouraging, warm, and constructive. Provide tangible tips the student can apply during the presentation. Give them a highly persuasive, beautifully revised version of their pitch that they can read or model.

Ensure the scores are integers between 0 and 100.
`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        clarityScore: { type: Type.INTEGER },
        persuasionScore: { type: Type.INTEGER },
        structureScore: { type: Type.INTEGER },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
        revisedPitch: { type: Type.STRING, description: "A fully polished, professional rewrite of their pitch, written in natural, high-impact conversational language." }
      },
      required: ["score", "clarityScore", "persuasionScore", "structureScore", "strengths", "weaknesses", "suggestions", "revisedPitch"]
    };

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    return res.json(parsedData);
  } catch (error) {
    console.error('Coaching evaluation failed:', error);
    return res.status(500).json({ error: 'Failed to process pitch evaluation' });
  }
});

// 3. API: AI Beauty Recommendation Quiz Analyzer
app.post('/api/beauty/recommend', async (req: Request, res: Response) => {
  const { skinType, hairState, coreGoal, details } = req.body;

  if (!skinType || !hairState || !coreGoal) {
    return res.status(400).json({ error: 'Quiz answers are required.' });
  }

  const client = getGeminiClient();

  // HIGH QUALITY OFFLINE FALLBACK ENGINE
  if (!client) {
    console.log('Gemini unconfigured. Processing localized smart rules...');
    
    // Matched based on selections
    let recommendedServiceId = 'facials';
    let recommendedServiceTitle = 'HydraGlow Advanced Infusion Facial';
    let beautyRoutineTips = [
      'Double cleanse daily using deep saffron or almond cleansing oils to nurture skin folds.',
      'Saturate skin layers with pure Damascus rose floral water to lock cellular hydration.',
      'Protect with luxury physical shield SPF 50 sunscreen before stepping out into Hyderabad sun.'
    ];
    let scriptingRule = 'Regular biweekly HydraGlow facials with active vitamins will rebuild flawless pre-bridal moisture depots.';

    if (coreGoal === 'hair-care' || hairState === 'dry-colored') {
      recommendedServiceId = 'hair-coloring';
      recommendedServiceTitle = 'French Balayage & Royal Highlights';
      beautyRoutineTips = [
        'Wash hair in cool, filtered water to preserve premium botanical gold Highlights.',
        'Apply a deep botanical nourishing hair spa steam masque once every ten days.',
        'Avoid high heat irons; blow-dry on warm settings with deep protective styling serums.'
      ];
      scriptingRule = 'Keep your roots shaded with gentle organic glossy glazes to protect the hair fiber structure.';
    } else if (coreGoal === 'spa-relax') {
      recommendedServiceId = 'spa-treatments';
      recommendedServiceTitle = 'Himalayan Pink Salt Hot Oil Massage';
      beautyRoutineTips = [
        'Drink warm saffron-herb or ginger teas to flush deep post-massage muscle residues.',
        'In corporate relaxing milk-bath foot soaks with real rose petals on heavy walking days.',
        'Massage heels and cuticle beds with pure cold-pressed coconut oil or organic kokum butter.'
      ];
      scriptingRule = 'Integrate light, calming slow breathing loops to ease pre-wedding planning cortisol levels.';
    }

    return res.json({
      recommendedServiceId,
      recommendedServiceTitle,
      beautyRoutineTips,
      sculptingStrategy: scriptingRule
    });
  }

  try {
    const prompt = `
    Act as an elite VIP Beauty Consultant, Bridal Makeup Maestro, and Senior Esthetician at Saanvi Bridal & Beauty Studio in Hyderabad, India.
    Analyze the following questionnaire answers for our prestigious guest:
    - Skin Type: ${skinType}
    - Hair State / Texture: ${hairState}
    - Core Wellness Goal: ${coreGoal}
    - Custom considerations: ${details || "None provided"}

    Determine the absolute best matching service from Saanvi Studio's menu:
    - ROYAL BRIDAL MAKEUP (id: 'bridal-makeup')
    - ULTRA-LIGHT AIRBRUSH MAKEUP (id: 'airbrush-makeup')
    - LUMINOUS ENGAGEMENT MAKEUP (id: 'engagement-makeup')
    - COCKTAIL GALA PARTY MAKEUP (id: 'party-makeup')
    - RE-SHAPING HAIR STYLING & UPDOS (id: 'hair-styling')
    - FRENCH BALAYAGE & HIGHLIGHTS (id: 'hair-coloring')
    - KÉRASTASE BOTANICAL SPA (id: 'hair-spa')
    - HYDRAGLOW INFUSION FACIAL (id: 'facials')
    - COLLAGEN GOLD RADIANCE LIFT (id: 'skin-treatments')
    - SAFFRON GEL MANICURE (id: 'manicure')
    - ROYAL MILK & PETAL PEDICURE (id: 'pedicure')
    - ORNATE BRIDAL extension NAIL ART (id: 'nail-art')
    - RESTORATIVE SPA STONE MASSAGE (id: 'spa-treatments')
    - CUSTOM ROYAL HENNA MEHENDI (id: 'mehendi-services')

    Provide the recommended Service ID, its precise title in our menu, 3 incredibly specific luxury beauty hygiene tips for home maintenance, and a brief, personalized skin/hair restructuring advice (sculptingStrategy) written in majestic, sophisticated, encouraging style.
    `;

    const schema = {
      type: Type.OBJECT,
      properties: {
        recommendedServiceId: { type: Type.STRING, description: "Must match one of: 'bridal-makeup' | 'airbrush-makeup' | 'engagement-makeup' | 'party-makeup' | 'hair-styling' | 'hair-coloring' | 'hair-spa' | 'facials' | 'skin-treatments' | 'manicure' | 'pedicure' | 'nail-art' | 'spa-treatments' | 'mehendi-services'" },
        recommendedServiceTitle: { type: Type.STRING },
        beautyRoutineTips: { type: Type.ARRAY, items: { type: Type.STRING } },
        sculptingStrategy: { type: Type.STRING, description: "A highly custom, supportive skincare/hair consultation advice sentence." }
      },
      required: ["recommendedServiceId", "recommendedServiceTitle", "beautyRoutineTips", "sculptingStrategy"]
    };

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    return res.json(parsedData);
  } catch (error) {
    console.error('Beauty analyzer fail:', error);
    return res.status(500).json({ error: 'Fail to process AI beauty quiz consultation' });
  }
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Server: Mount Vite Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production Server: Serve Static dist files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server fully operational behind proxy at http://localhost:${PORT}`);
  });
}

startServer();
