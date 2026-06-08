/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, Stylist, GalleryItem, BlogPost, TestimonialItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'bridal-makeup',
    title: 'Royal Shubh Vivah Bridal Makeup',
    category: 'bridal',
    price: 18000,
    duration: '150 mins',
    description: 'Our signature luxury bridal cosmetic look. Features premium high-definition makeup engineered to remain absolutely sweatproof, camera-ready, and flawless under heavy Indian wedding spotlights. Includes bespoke hand-applied lashes, luxury hydration base priming, neck and arm cosmetics, and professional dupattta and jewelry draping.',
    benefits: ['Bespoke HD base matching coordinates', 'Flawless 18-hour sweatproof durability', 'Includes dupatta setting & heavy jewelry pinning'],
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'airbrush-makeup',
    title: 'Ultra-Light Flawless Airbrush Makeup',
    category: 'makeup',
    price: 25000,
    duration: '120 mins',
    description: 'An advanced micro-mist cosmetic application using luxury siliconized pigments. It feels completely weightless, like a second skin, while delivering flawless coverage and a satin-soft airbrushed texture that excels in ultra-high-magnification 4K cameras.',
    benefits: ['Zero cakiness and absolute skin breathability', 'Perfect for outdoor weather and high humidity', 'Seamless coverage for pigmentation or micro-scars'],
    image: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'engagement-makeup',
    title: 'Shimmer & Sheer Engagement Makeup',
    category: 'makeup',
    price: 12000,
    duration: '90 mins',
    description: 'Crafted specifically for your Engagement or Sangeet ceremony. Features a luminous base with champagne highlighter accents, soft smokey eye shadows tailored to complement your lehenga or cocktail gown, and a velvety custom lip stain.',
    benefits: ['Dewy blush champagne-shimmer accents', 'Complements grand indoor venue lighting', 'Includes high-gloss setting lock spray'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'party-makeup',
    title: 'Cocktail Gala & Party Makeup',
    category: 'makeup',
    price: 6000,
    duration: '60 mins',
    description: 'Perfect for wedding guests, bridesmaids, or premium high-fashion occasions. Tailored around elegant minimalism or classic bold liners. Includes skin prepping, custom blush contouring, and false lash clusters.',
    benefits: ['Quick professional completion under 70 mins', 'Tailored to frame your facial highlights', 'Premium designer lashes included'],
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hair-styling',
    title: 'Bridal Couture Hair Styling & Ornate Updos',
    category: 'hair',
    price: 3500,
    duration: '60 mins',
    description: 'Expert sculpture hair-styling from traditional South Indian braids adorned with real fresh jasmine, complex messy buns, or modern Hollywood waves. Includes high-grade heat shield application, volume-boosting sprays, and secure pin-up holds.',
    benefits: ['Long-lasting hold that survives intense dancing', 'Tailored floral or hair jewelry integration support', 'Includes volume hair stuffing pads if required'],
    image: 'https://images.unsplash.com/photo-1596178060810-729ab7912440?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hair-coloring',
    title: 'French Balayage & Royal Highlights',
    category: 'hair',
    price: 8500,
    duration: '180 mins',
    description: 'Sophisticated hand-painted dimensional highlights designed to beautifully complement warm South Asian skin tones. Uses premium non-toxic ammonia-free gold clairol glosses that leave hair feeling soft, healthy, and ultra-luminous.',
    benefits: ['Seamless high-contrast gradient grow-out', 'Zero brassy tones with organic custom toner', 'Bond-building luxury nourishing sealant step'],
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'hair-spa',
    title: 'Kérastase Luxury Botanical Dry Hair Spa',
    category: 'hair',
    price: 2500,
    duration: '75 mins',
    description: 'An advanced scalp and hair shaft nourishing ritual to breathe life back into damaged, colored, or dry hair. Features a micro-steam conditioning masque application, herbal rinse infusions, and an invigorating hot oil acupressure crown massage.',
    benefits: ['Soothes dry, chemically processed hair cuticles', 'Anti-frizz hair gloss booster for weeks', 'Deeply destresses crown muscles with hot steam'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'facials',
    title: 'HydraGlow Advanced Infusion Facial',
    category: 'skin',
    price: 4500,
    duration: '60 mins',
    description: 'A clinical resurfacing facial featuring painless vacuum suction that evacuates deep skin impurities, while instantly infusing deep dermal tissue with highly concentrated skin hydrators, vitamin C, and glutathione.',
    benefits: ['Clears pores, blackheads, and dead skin cells', 'Leaves tone instantly brightened with natural bounce', 'No redness, no downtime - exit glowing'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'skin-treatments',
    title: 'Collagen Lifting & Golden Glow Treatment',
    category: 'skin',
    price: 7500,
    duration: '90 mins',
    description: 'A luxurious anti-aging non-invasive facial sculpting experience. Combines advanced manual lymphatic drainage, gold leaf infusion masks, and microcurrent therapy designed to stimulate facial muscle tone and tighten skin contours around the jawline.',
    benefits: ['Instant tightening and gorgeous cheekbone definition', 'Purges fluids under the eyes for a rested look', 'Imperial 24K real gold radiance glow'],
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'manicure',
    title: 'Imperial Saffron-Infused Gel Manicure',
    category: 'nails',
    price: 1800,
    duration: '45 mins',
    description: 'Treat your hands like royalty. Includes a gentle saffron and almond milk warm hand soak, nail filing, precise dry cuticle work, skin massage with pure virgin coconut oils, and application of a high-shine LED gel color.',
    benefits: ['No chipping or peeling for up to 4 weeks', 'Deeply hydrates tired hands with warm herbal wrap', 'Reinforces soft brittle nail tips'],
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'pedicure',
    title: 'Royal Rosewood & Milk Honey Pedicure',
    category: 'nails',
    price: 2200,
    duration: '65 mins',
    description: 'A glorious therapy for your feet. Features a soaking bath in fresh rose petals, goat milk, and honey. Safe callus exfoliation, gentle scrub, detailed cuticle shaping, and a premium massage using warm volcanic basalt stones.',
    benefits: ['Hydrates dry cracked calluses into baby-soft skin', 'Releases stiff joints and improves foot circulation', 'Classic or high-shine breathable gel varnish finish'],
    image: 'https://images.unsplash.com/photo-1519415510236-8a5225a27161?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'nail-art',
    title: 'Avant-Garde Hand-Painted Nail Art & Shellac',
    category: 'nails',
    price: 2500,
    duration: '75 mins',
    description: 'Stunning artistic extensions and custom-created designs. Features delicate hand-painted motifs, gold foils, negative spaces, and fine Swarovski crystal embellishments suited to match your bridal gown aesthetics.',
    benefits: ['Bespoke tailoring to match wedding dress trims', 'Top quality durable premium hard acrylics', 'UV protection lock prevents color fading'],
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'spa-treatments',
    title: 'Himalayan Pink Salt Hot Oil Massage',
    category: 'spa',
    price: 5000,
    duration: '90 mins',
    description: 'Full-body restorative therapy. We use customized heated oils infused with traditional Indian active botanicals. Heated salt crystals are applied to acupressure nodes to melt muscular tightness and calm the neural matrix.',
    benefits: ['Combats chronic physical back stress and shoulders stiffness', 'Gently balances and detoxifies skin lipid barriers', 'Deep meditative relaxation for pre-wedding anxieties'],
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'mehendi-services',
    title: 'Ornate Traditional Bridal Mehendi',
    category: 'mehendi',
    price: 8000,
    duration: '240 mins',
    description: 'Incredibly detailed hand-drawn traditional Mehendi designs. Features intricate jaali, peafowls, lotuses, and beautiful mandalas representing marital unions. We use custom 100% organic home-rolled henna cones yielding deep, rich mahogany stains.',
    benefits: ['No synthetic chemicals, skin-safe organic brew', 'Outstanding deep maroon stain longevity', 'Expert fast-hand application of heavy classical layouts'],
    image: 'https://images.unsplash.com/photo-1612547087680-aa16032af419?auto=format&fit=crop&q=80&w=600'
  }
];

export const stylistsData: Stylist[] = [
  {
    id: 'stylist-saanvi',
    name: 'Saanvi Reddy',
    role: 'Founder & Principal Bridal Maestro',
    specialty: 'Contemporary Royal HD Makeup & Couture Draping',
    rating: 5.0,
    experience: '20 Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'stylist-ananya',
    name: 'Ananya Sen',
    role: 'Lead Airbrush & Eye Cosmetic Artist',
    specialty: 'Luminous Airbrushing & Dramatic Eyes',
    rating: 4.9,
    experience: '12 Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'stylist-priya',
    name: 'Priya Sharma',
    role: 'Senior Hair Stylist & Mehendi designer',
    specialty: 'Floral South Indian Braids & Complex Mehendi Mandalas',
    rating: 4.9,
    experience: '8 Years',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'stylist-rohit',
    name: 'Dr. Rohit Rao',
    role: 'Master Skin & Scalp Practitioner',
    specialty: 'HydraGlow Resurfacing & 24K Gold Collagen Lift',
    rating: 4.8,
    experience: '10 Years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500'
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Traditional South Indian Red Silk Saree Temple Bride',
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g2',
    title: 'High-Gloss Saree & Sangeet Emerald Makeover',
    category: 'engagement',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g3',
    title: 'Grand South Indian Jasmine-Laced Bridal Braid',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g4',
    title: 'Dense Intricate Lotus Bridal Mehendi Hands',
    category: 'mehendi',
    image: 'https://images.unsplash.com/photo-1612547087680-aa16032af419?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g5',
    title: 'The Royal Champagne Bridal Salon VIP Suite',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffdb5965e5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g6',
    title: 'Dull Skin to High-Gloss Radiance Skin Treatment',
    category: 'before-after',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=800',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g7',
    title: 'Kanjeevaram Saree & Gold Border Saree Bride Look',
    category: 'engagement',
    image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'g8',
    title: 'Lounge Mirror & Polished Ivory Dressing Areas',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  }
];

export const blogData: BlogPost[] = [
  {
    id: 'b1',
    title: 'Saanvi Studio Secrets to Long-Lasting Hair Care & Volume',
    category: 'Hair Care',
    summary: 'The ultimate guide to maintaining luscious South Asian hair density, preventing humidity frizz, and selecting salon-backed serums.',
    content: 'Indian hair is traditionally rich, thick, and highly textured, which demands intensive moisture retention. To prevent Hyderabad’s hot climate from causing frizzy flyaways, our hair styling division recommends three golden rules. First, opt for sulphate-free keratin shampoos. Second, always shampoo with lukewarm water rather than hot, which robs the hair follicles of natural lipid barriers. Third, incorporate a rosemary and argan botanical hair spa conditioning wrap monthly to repair structure and double the shine.',
    author: 'Priya Sharma',
    date: 'June 5, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600',
    tags: ['hairspa', 'hairgrowth', 'luxurycare']
  },
  {
    id: 'b2',
    title: 'The 6-Month Pre-Bridal Skincare Roadmap to Ultimate Glow',
    category: 'Skincare',
    summary: 'Why waiting until the final wedding week is a mistake, and how to chronologically schedule facials, microcurrents, and vitamins.',
    content: 'Getting that ethereal glass-like glow on your wedding day is a planned scientific process, not a last-minute miracle. At Saanvi Studio, we recommend brides begin their skin preparation 6 months in advance. Start with deep cellular hydration and light lactic chemical resurfacing facials. As you reach 3 months, introduce Collagen Lift microcurrent treatments to strengthen and sculpt cheekbone contours. In the final month, avoid raw extractions; instead, embrace soothing antioxidant and hyaluronic acid infusing therapies to maximize skin moisture lock.',
    author: 'Saanvi Reddy',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    tags: ['prebridal', 'hydrafacial', 'skincareglow']
  },
  {
    id: 'b3',
    title: 'Traditional vs Modern: Choosing Between HD and Airbrush Makeup',
    category: 'Makeup Trends',
    summary: 'An expert comparison on color mapping, skin-type adapters, and photographic flash performance of premium cosmetics.',
    content: 'A classic question every bride asks is: Should I choose HD Makeup or Airbrush? The answer depends entirely on your skin texture and the event environment. HD makeup relies on lightweight, light-diffusing formulas cream-blended into the skin with precision sponges. It is incredibly customizable and offers unmatched warmth. Airbrush makeup utilizes a motorized micro-mist nozzle. It is highly recommended for oily skin types, extremely humid wedding seasons, or outdoor venues, as it sits beautifully on top of pores and provides complete water resistance.',
    author: 'Ananya Sen',
    date: 'May 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?auto=format&fit=crop&q=80&w=600',
    tags: ['airbrush', 'bridalstyling', 'makeuptrend']
  }
];

export const faqData = [
  {
    question: 'How many months in advance should I book my bridal studio package?',
    answer: 'Because of Saanvi Studio’s reputation across Hyderabad, we highly recommend securing your dates 4 to 6 months in advance, especially if your wedding falls during prime Muhurtham dates. We take a standard advance booking deposit to hold slots exclusively for you.',
    category: 'Bridal Bookings'
  },
  {
    question: 'Do you offer on-location makeup artists for weddings outside of Hyderabad?',
    answer: 'Yes! Saanvi Bridal Crew travels both within Hyderabad (including Gachibowli, Jubilee Hills, Banjara Hills, and Secunderabad) as well as destination weddings nationwide. Travel and accommodation fees are tailored outside original package rates.',
    category: 'Location & Services'
  },
  {
    question: 'What premium cosmetic and skincare brands do you use in your treatments?',
    answer: 'We exclusively work with ultra-premium, dermatologically certified, safe cosmetics: MAC, Estée Lauder, Charlotte Tilbury, Bobbi Brown, Kryolan for heavy HD work, Temptu for professional Airbrushing, and Kérastase for luxury botanical hair treatments.',
    category: 'Premium Products'
  },
  {
    question: 'Can I request a customized package that mixes makeup, hair, and spa?',
    answer: 'Absolutely! Speak with Saanvi Reddy or our guest relationship leads. We love crafting customized packages tailored to your schedule, events (Mehendi, Sangeet, Wedding, Reception), and exact entourage size.',
    category: 'Customization'
  },
  {
    question: 'Does the makeup pack include saree pleating and hair flower setting?',
    answer: 'Yes, indeed. All our bridal packages (Silver, Gold, Platinum, Maharani) comprehensively include expert saree draping/pleating, dupatta setting, heavy jewelry pinning, and the placement of your chosen fresh flowers and hair buns.',
    category: 'Service Inclusions'
  }
];

export const membershipPlans = [
  {
    name: 'Saanvi Silver Core',
    price: 3500,
    period: 'month',
    description: 'Perfect for regular pre-wedding skincare maintenance and basic luxury grooming.',
    features: [
      '1x Botanical Hair Spa & Head Warm Massage weekly',
      '1x Premium Herbal Facial / Organic Cleansing',
      '10% Discount on any additional makeup reservations',
      'Complementary tea service at every visit'
    ],
    recommended: false
  },
  {
    name: 'Royal Shubh Vivah Club',
    price: 8500,
    period: 'month',
    description: 'Our signature pre-bridal club designed to yield gorgeous results on your wedding month.',
    features: [
      '2x HydraGlow Facial or Deep Pore Cleansing Treatments',
      '2x Hair Styling blowouts / Jasmine hair setting sessions',
      '1x Saffron Hand-Polish Manicure & Foot Pedicure Pack',
      '20% Off all luxury makeup and Airbrush treatments',
      'Free VIP priority dressing room locks'
    ],
    recommended: true
  },
  {
    name: 'Empress Maharani Elite',
    price: 15500,
    period: 'month',
    description: 'The ultimate luxury grooming lounge access. Experience uncompromised pampering.',
    features: [
      'Unlimited luxury blowouts & botanical scalp washes',
      '1x 24K Gold Collagen Face Rejuvenation Facial',
      '1x Full-Body Himalayan Salt Stone Hot Oil Massages',
      '25% Off full bridal packages and bridesmaid packages',
      'Bespoke luxury vanity room reservations on booking',
      'Free luxury beauty pouch for birthday month'
    ],
    recommended: false
  }
];

export const bridalPackages = [
  {
    name: 'Silver Bridal Package',
    price: 15000,
    subtitle: 'Classic Grace',
    features: [
      'Premium Shubh Vivah HD Bridal Makeup',
      'Classic Bridal Updo or Sculpted Blowout with flower placement',
      'Saree draping and precision pleating',
      'Saffron hand manicure and classic lacquer',
      'Complementary beauty trial session at our studio'
    ]
  },
  {
    name: 'Gold Bridal Package',
    price: 25000,
    subtitle: 'The Photographic Masterpiece',
    features: [
      'Luminous HD Bridal Makeup (MAC / Bobbi Brown formulas)',
      'Intricate hair styling with orchid hair ornaments & braids',
      'Complete saree draping & heavy dupatta pinning',
      'Saffron milk manicure and Rosewood warm stone pedicure',
      'Complimentary Hydrating Facial 3 days before the ceremony',
      '15% discount for up to 3 bridesmaids makeups'
    ]
  },
  {
    name: 'Platinum Bridal Package',
    price: 45000,
    subtitle: 'High-Fashion Extravaganza',
    features: [
      'Premium Temptu Airbrush Makeup (sweatproof, flawless coverage)',
      'Luxury Ornate Hair braids & floral setting (premium jasmine garlands)',
      'Saree draping and heavy jewelry setting (two dynamic ceremony look shifts)',
      'Imperial gel nail art & custom gold extensions',
      'Collagen lifting non-invasive face treatment pre-wedding',
      'Complimentary full bridesmaid makeup for maid of honor'
    ]
  },
  {
    name: 'Royal Maharani Package',
    price: 75000,
    subtitle: 'The Empress Luxury Suite',
    features: [
      'HD + Temptu Airbrush Bridal Makeup for major Wedding Ceremony + Reception',
      'Specialized Mehendi Sangeet light glam look',
      'Intricate Traditional Bridal Mehendi (full arms and shins)',
      'Ornate fresh Rose and Jasmine crown jewelry integration',
      'Unlimited Saree draping changes with personal wardrobe companion support',
      '24K Gold leaf cellular lifting skin treatment',
      'Royal Rosewood Milk Pedicure & Imperial Gel Manicure',
      'Keepsake Premium Lipstick Touch-Up kit & Luxury Perfume',
      'Exclusive private VIP vanity dressing suite access on the wedding day'
    ]
  }
];
