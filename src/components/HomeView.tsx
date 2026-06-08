import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Award, 
  Star, 
  Clock, 
  Heart, 
  Users, 
  Calendar, 
  ArrowRight, 
  Check, 
  Instagram, 
  Gift, 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Send, 
  CheckCircle,
  BookOpen
} from 'lucide-react';
import { submitContactMessage } from '../firebase/contact';

interface HomeViewProps {
  setCurrentPage: (page: string) => void;
}

// ----------------------------------------------------
// AESTHETIC SVG MOTIFS & DIVIDERS
// ----------------------------------------------------

const LotusIcon = ({ className = "h-6 w-6 text-rose-gold" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 20 C45 35, 45 65, 50 82 C55 65, 55 35, 50 20 Z" fill="currentColor" fillOpacity="0.12" />
    <path d="M50 45 C35 40, 20 50, 15 65 C25 65, 40 55, 50 45 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M50 45 C65 40, 80 50, 85 65 C75 65, 60 55, 50 45 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M50 55 C30 55, 12 68, 20 80 C32 80, 45 70, 50 55 Z" fill="currentColor" fillOpacity="0.06" />
    <path d="M50 55 C70 55, 88 68, 80 80 C68 80, 55 70, 50 55 Z" fill="currentColor" fillOpacity="0.06" />
    <path d="M35 80 C40 86, 60 86, 65 80" />
  </svg>
);

const FloralDivider = () => (
  <div className="flex items-center justify-center space-x-4 py-6" id="floral-divider">
    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-rose-gold/40 to-rose-gold" />
    <LotusIcon className="h-7 w-7 text-rose-gold/80" />
    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-rose-gold/40 to-rose-gold" />
  </div>
);

const OrnamentalCorner = () => (
  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-soft-gold/30 rounded-tl-md pointer-events-none" />
);

const OrnamentalCornerRight = () => (
  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-soft-gold/30 rounded-tr-md pointer-events-none" />
);

const OrnamentalCornerBottomLeft = () => (
  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-soft-gold/30 rounded-bl-md pointer-events-none" />
);

const OrnamentalCornerBottomRight = () => (
  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-soft-gold/30 rounded-br-md pointer-events-none" />
);

const TraditionalMandalaGrid = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-color-burn" id="mandala-grid-motif">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M 50 0 L 50 100 M 0 50 L 100 50 M 15 15 L 85 85 M 15 85 L 85 15" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="50,10 60,35 85,35 65,55 75,80 50,65 25,80 35,55 15,35 40,35" stroke="currentColor" strokeWidth="0.5" fill="none" />
    </svg>
  </div>
);

export default function HomeView({ setCurrentPage }: HomeViewProps) {
  
  // Stats Animation State
  const [stats, setStats] = useState({ brides: 0, heritage: 0, awards: 0, masterArtisans: 0 });

  useEffect(() => {
    const bTimer = setTimeout(() => setStats(prev => ({ ...prev, brides: 2450 })), 400);
    const hTimer = setTimeout(() => setStats(prev => ({ ...prev, heritage: 12 })), 600);
    const aTimer = setTimeout(() => setStats(prev => ({ ...prev, awards: 18 })), 500);
    const mTimer = setTimeout(() => setStats(prev => ({ ...prev, masterArtisans: 6 })), 750);

    return () => {
      clearTimeout(bTimer);
      clearTimeout(hTimer);
      clearTimeout(aTimer);
      clearTimeout(mTimer);
    };
  }, []);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----------------------------------------------------
  // SECTION 3 — PREMIUM SERVICES DATA
  // ----------------------------------------------------
  const premiumServices = [
    {
      id: 'bridal-makeup',
      title: 'Royal Shubh Vivah Bridal Makeup',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
      description: 'Our award-winning signature luxury bridal cosmetic look. Hand-curated to remain sweatproof, dewy, and majestic under intensive wedding stage lighting.',
      feature: 'Includes jewelry setting & double dupatta draping'
    },
    {
      id: 'hair-styling',
      title: 'Couture Hair Styling & Jasmine Sculpting',
      img: 'https://images.unsplash.com/photo-1596178060810-729ab7912440?auto=format&fit=crop&q=80&w=600',
      description: 'Expert sculpted hairdos ranging from flower-braided South Indian Jadas to modern elegant messy top buns decorated with dynamic crown details.',
      feature: 'Real fresh jasmine & floral pins integration'
    },
    {
      id: 'mehendi-services',
      title: 'Traditional Intricate Bridal Mehendi',
      img: 'https://images.unsplash.com/photo-1612547087680-aa16032af419?auto=format&fit=crop&q=80&w=600',
      description: 'Bespoke hand-drawn traditional patterns. Features dense jaali, elegant peafowl silhouettes, mandalas, and marital union symbolism.',
      feature: 'Created with 100% organic home-brewed henna'
    },
    {
      id: 'facials',
      title: 'HydraGlow Dermal Facial Treatments',
      img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
      description: 'Deep cellular skin resurfacing using clean herbal hydrosols. Saffron extracts and milk essences clarify and plump up your tone.',
      feature: 'Zero downtime - instant camera-ready glow'
    },
    {
      id: 'spa-treatments',
      title: 'Botanical Bridal Spa Experiences',
      img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=600',
      description: 'Revitalizing full-body hot oil rituals with pure sandalwood. Releases pre-wedding physical tension and establishes holistic serenity.',
      feature: 'Infused with warm Himalayan pink stones'
    },
    {
      id: 'draping',
      title: 'Heritage Wardrobe & Custom Preparation',
      img: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=600',
      description: 'High-precision saree pleating, lehenga adjustments, and structural padding supports to guarantee zero shifting as you walk.',
      feature: 'Expert draping matching regional customs'
    }
  ];  // ----------------------------------------------------
  // SECTION 4 — BRIDAL PACKAGES DATA
  // ----------------------------------------------------
  const packagesList = [
    {
      name: 'South Indian Saree Bride',
      price: '18,000',
      tagline: 'Traditional Temple Heritage & Kanjeevaram Draping',
      features: [
        'Signature HD Bridal Cosmetics matching South Asian skin undertones',
        'Traditional floral coiling (Jasmine Jada braiding with fresh flowers)',
        'Traditional Kanjeevaram saree draping with clean, flat chest pleat styles',
        'Kasu Malai / gold temple jewelry setting & secure waist belt pinning',
        'Hydration mask skin prep with physical organic rose extract drops',
        'Full physical trial consultation with a master drape artisan included'
      ]
    },
    {
      name: 'Golden Bride Saree Elite',
      price: '28,000',
      tagline: 'Elite Royal Saree & Silk Heritage Masterpiece',
      features: [
        'Ultra-Refined Bridal Luminous Base Cosmetics & Dewy Finish',
        'Classical double-saree draping or grand heavy Banarasi pleating',
        'Flower crown hair sculpts with custom pearls & fresh Mogra wreaths',
        'Nourishing Saffron Foot Basalt Stone Pedicure & hand manicure',
        'Advanced pre-wedding HydraGlow herbal skin clarifying therapy',
        'Exclusive matching cosmetics for mother of the bride or custom guest'
      ]
    },
    {
      name: 'Royal Bride Shubh Vivah',
      price: '48,000',
      tagline: 'Imperial Palace Luxury for Saree & Lehenga look shifts',
      features: [
        'Complete Sweatproof Flawless temptu Airbrush cosmetics',
        'Complex bridal coiffure (Jasmine braids shifting to modern evening bun)',
        'Multi-dress wardrobe support with 2 complete saree/lehenga shifts',
        'Basalt stone hand manicure & luxury pure saffron pedicures',
        '24K Gold customized herbal facial & cellular skin lift treatment',
        'Professional pre-wedding makeup with physical studio lighting styling'
      ]
    },
    {
      name: 'Maharani South Indian Dynasty',
      price: '85,000',
      tagline: 'The Ultimate Royal Saree Sravanam Pampering Suite',
      features: [
        'Double Day Bridal + Reception signature customized makeovers',
        'Bespoke dense physical organic Bridal henna (Hands, wrists & legs)',
        'Multi-stylist wardrobe assistance with complete custom-border pleating',
        'Unlimited luxury hair blowouts & pure fresh Mogra and red rose wreaths',
        'Premium high-shine gel nail extensions with dynamic gold leaf foils',
        'Full physical signature touch-up keepsake kit with designer rouge',
        'Private VIP vanity suite reservation loaded with high-grade organic tea'
      ]
    }
  ];

  // ----------------------------------------------------
  // SECTION 5 — GALLERY DATA
  // ----------------------------------------------------
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'South Indian' | 'North Indian' | 'Mehendi' | 'Jewelry' | 'Interiors'>('All');
  
  const galleryItems = [
    { id: 1, title: 'Kanjeevaram Silk Saree South Indian Bride', category: 'South Indian', img: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Banarasi Zari Draped Royal Saree Pride', category: 'North Indian', img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Symmetrical Peacock Henna Mandala', category: 'Mehendi', img: 'https://images.unsplash.com/photo-1612547087680-aa16032af419?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Kundan Polki Bridal Choker Set', category: 'Jewelry', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Fresh Jasmine Floral Coiled Jada Braid', category: 'South Indian', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Traditional Red Silk Saree Temple Bride', category: 'South Indian', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800' },
    { id: 7, title: 'Ivory Marble Arch VIP Dress Suite', category: 'Interiors', img: 'https://images.unsplash.com/photo-1600948836101-f9ffdb5965e5?auto=format&fit=crop&q=80&w=800' },
    { id: 8, title: 'Luxury Backdrops & Bridal Floral Decor', category: 'Interiors', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' }
  ];

  const filteredGallery = galleryFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  // ----------------------------------------------------
  // SECTION 6 — EXPERTS DATA
  // ----------------------------------------------------
  const expertsList = [
    {
      name: 'Saanvi Reddy',
      role: 'Founder & Principal Maestro',
      exp: '20+ Years Experience',
      specialty: 'Contemporary Royal HD Makeup & Couture Draping',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500'
    },
    {
      name: 'Ananya Sen',
      role: 'Lead Airbrush Stylist',
      exp: '12 Years Experience',
      specialty: 'Weightless Temperature Airbrushing & Precision Lashes',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500'
    },
    {
      name: 'Priya Sharma',
      role: 'Senior Hair & Flora Artisan',
      exp: '8 Years Experience',
      specialty: 'Traditional South Indian Jada Braiding & Floral Settings',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500'
    },
    {
      name: 'Dr. Rohit Rao',
      role: 'Dermal Preparation Lead',
      exp: '10 Years Experience',
      specialty: 'Ayurvedic Preparation Masks & Sandalwood Skin Lifting',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500'
    }
  ];

  // ----------------------------------------------------
  // SECTION 7 — CLIENT TESTIMONIALS DATA
  // ----------------------------------------------------
  const testimonials = [
    {
      name: 'Meenakshi & Vignesh',
      city: 'Hyderabad Bride',
      role: 'Traditional South Indian Bridal Package',
      photo: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400',
      story: 'Saanvi and her crew are magic! My saree didn’t shift a millimeter during my 5-hour long Muhurtham ceremony, and the makeup felt as light as air. I was absolutely flooded with compliments about my jasmine braid.'
    },
    {
      name: 'Harshita & Karan',
      city: 'Delhi Destination Bride',
      role: 'Royal Maharani Package',
      photo: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=400',
      story: 'I booked the Maharani Package, and it was worth every single rupee. The organic Rajasthani henna paste gave a deeply rich, dark maroon stain that stayed glorious for three entire weeks. Highly elite care and very professional.'
    },
    {
      name: 'Dr. Divya Rao',
      city: 'Secunderabad Bride',
      role: 'Golden Bridal Package',
      photo: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=400',
      story: 'Exceptional hygiene benchmarks. From the autoclaved cosmetic brushes to the warm almond-infused foot spa rituals, they made me feel like real royalty. I walked onto the wedding stage feeling serene and beautiful.'
    }
  ];

  // ----------------------------------------------------
  // SECTION 8 — BEAUTY TIPS DATA
  // ----------------------------------------------------
  const beautyTips = [
    {
      title: 'Saffron Dermal Clarification',
      category: 'Natural Skincare',
      summary: 'Soak three precious threads of Kashmiri saffron inside pure warm raw almond milk. Apply overnight to boost localized glow and remove facial spots naturally.',
      img: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=500'
    },
    {
      title: 'Rose & Sandalwood Cleansing',
      category: 'Bridal Preparation',
      summary: 'Combine dry red rose petal powder with cold hydraulic-pressed sandalwood paste. This herbal mixture gently pulls out impurities while sealing moisture locks.',
      img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=500'
    },
    {
      title: 'Coconut Braid Nourishing',
      category: 'Haircare Routine',
      summary: 'Massage cold-pressed virgin coconut oil blended with rosemary drops. Strengthens thick South Asian hair cuticles and prevents split-end moisture leakage.',
      img: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=500'
    }
  ];

  // ----------------------------------------------------
  // SECTION 9 — INSTAGRAM FEED SHOWCASE DATA
  // ----------------------------------------------------
  const instagramFeed = [
    { id: 1, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400', likes: '1.2k', tag: '#SaanviBrides', type: 'Bridal' },
    { id: 2, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400', likes: '942', tag: '#NizamJewels', type: 'Jewelry' },
    { id: 3, img: 'https://images.unsplash.com/photo-1612547087680-aa16032af419?auto=format&fit=crop&q=80&w=400', likes: '2.5k', tag: '#LotusHenna', type: 'Mehendi' },
    { id: 4, img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=400', likes: '811', tag: '#FestiveHairstyles', type: 'Hair' },
    { id: 5, img: 'https://images.unsplash.com/photo-1600948836101-f9ffdb5965e5?auto=format&fit=crop&q=80&w=400', likes: '1.4k', tag: '#VIPSuitLife', type: 'Lounge' },
    { id: 6, img: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=400', likes: '1.9k', tag: '#SareePleating', type: 'Draping' }
  ];

  // ----------------------------------------------------
  // SECTION 10 — CONTACT FORM & FIREBASE HANDLERS
  // ----------------------------------------------------
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setFormError('Please provide your name and phone number so we may contact you.');
      return;
    }

    setFormLoading(true);
    setFormError(null);
    try {
      // Direct Firebase integration message submission!
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: new Date().toISOString()
      });
      setFormSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setFormError(err.message || 'Connecting to database failed. Please attempt again.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-20 animate-fade-in bg-warm-ivory text-charcoal">
      
      {/* ==================================================== */}
      {/* SECTION 1 — HERO                                    */}
      {/* ==================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blush-pink/40 to-warm-ivory py-16 px-4">
        
        {/* Full-screen luxury bridal background photograph */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=1600" 
            alt="Saanvi Elegant Indian Bride Traditional Styling" 
            className="h-full w-full object-cover object-center translate-y-[-5%]"
          />
        </div>

        {/* Soft white overlay & luxury subtle blur to separate text for readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1.2px] z-[1]" />

        {/* Subtle floral motifs / vector decorations */}
        <TraditionalMandalaGrid />

        {/* Floating Ambient Glow elements */}
        <div className="absolute top-[20%] left-[10%] h-64 w-64 rounded-full bg-baby-pink/30 blur-3xl pointer-events-none z-[1]" />
        <div className="absolute bottom-[20%] right-[10%] h-80 w-80 rounded-full bg-blush-pink/30 blur-3xl pointer-events-none z-[1]" />

        {/* Core Text Container */}
        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-8 px-2">
          
          <div className="inline-flex items-center space-x-2.5 rounded-full bg-white/90 border border-rose-gold/20 px-5 py-2 text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#B76E79] shadow-xs">
            <Sparkles className="h-4 w-4 text-soft-gold" />
            <span>The Crest of Hyderabad Bridal Heritage</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-tight text-charcoal leading-tight max-w-4xl mx-auto">
            Celebrating Beauty, <br className="hidden sm:inline" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#B76E79] via-[#B76E79] to-[#D4AF37]">
              Tradition & Elegance
            </span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-soft-grey leading-relaxed max-w-2xl mx-auto">
            Luxury Bridal Makeup, Hair Styling & Beauty Services Crafted for Your Special Moments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
            <button
              onClick={() => handleNav('booking')}
              className="w-full sm:w-auto font-sans flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-xs font-bold uppercase tracking-wider text-rose-gold border border-rose-gold/20 px-8 py-4 shadow-soft hover:shadow-md hover:scale-[1.02] transform transition-all cursor-pointer"
              id="hero-booking-action"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={() => handleNav('services')}
              className="w-full sm:w-auto font-sans flex items-center justify-center space-x-2 rounded-full bg-white border border-rose-gold text-xs font-bold uppercase tracking-wider text-rose-gold px-8 py-4 hover:bg-baby-pink/30 transition-all cursor-pointer"
              id="hero-services-action"
            >
              <span>Explore Services</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 2 — TRADITIONAL WELCOME                      */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl border border-blush-pink/60 p-8 sm:p-16 relative overflow-hidden shadow-soft">
          
          <OrnamentalCorner />
          <OrnamentalCornerRight />
          <OrnamentalCornerBottomLeft />
          <OrnamentalCornerBottomRight />

          {/* Symmetrical Indian Arch Backdrop Pattern */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none flex items-center justify-center">
            <div className="w-[80%] h-[90%] border-[20px] border-charcoal rounded-t-full" />
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10 font-sans">
            
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold">Saanvi Guldasta</span>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal">
              A Living Tradition of <span className="font-semibold text-rose-gold">Royal Indian Care</span>
            </h2>

            <FloralDivider />

            <p className="text-soft-grey text-xs sm:text-sm leading-relaxed">
              Step into a sanctuary where traditional Vedic beauty regimes and regal heritage converge with clinical cosmetic science. Founded in Hyderabad by master artisan Saanvi Reddy, Saanvi Studio honors the delicate purity of royal Rajput courtcraft and Mughal floral aesthetics.
            </p>

            <p className="text-soft-grey text-xs sm:text-sm leading-relaxed">
              Every moisturizer is blended with house-pressed Kashmiri saffron fibers, physical Kannada rosewater essences, and organic marigold oils of deep therapeutic grade. We hold Hyderabad's ultimate benchmark for non-fading airbrush cosmetics, pristine luxury saree styling, and fragrant jasmine hair braids designed to radiate everlasting elegance throughout your wedding celebrations.
            </p>

            <div className="pt-4">
              <button 
                onClick={() => handleNav('about')}
                className="text-xs font-bold uppercase tracking-widest text-[#B76E79] hover:underline flex items-center space-x-1.5 mx-auto"
              >
                <span>Discover Our Heritage Story</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 3 — PREMIUM SERVICES                        */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Bespoke Shringar Menu</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">
            Premium <span className="font-semibold text-rose-gold">Bridal Services</span>
          </h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-[#B76E79] to-[#D4AF37] mx-auto" />
          <p className="text-xs text-soft-grey sm:text-sm leading-relaxed">
            All services are masterfully executed using medically disinfected cosmetic tools and organic, skin-nourishing luxury active creams.
          </p>
        </div>

        {/* Luxury Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumServices.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => handleNav('services')}
              className="group bg-white rounded-3xl border border-blush-pink/60 overflow-hidden shadow-soft hover:shadow-md hover:-translate-y-1 transform transition-all duration-300 cursor-pointer flex flex-col justify-between"
              id={`service-premium-card-${index}`}
            >
              <div className="relative aspect-[16/11] bg-warm-ivory overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 rounded-full px-3 py-1 border border-blush-pink text-[9px] font-bold text-rose-gold uppercase tracking-widest leading-none shadow-xs">
                  Premium Quality
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-rose-gold transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-soft-grey leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-blush-pink/30 flex items-center justify-between text-[10px] text-[#B76E79] font-bold">
                  <span className="flex items-center space-x-1 uppercase">
                    <Sparkles className="h-3.5 w-3.5 text-soft-gold" />
                    <span>{service.feature}</span>
                  </span>
                  <span className="flex items-center space-x-0.5 hover:underline">
                    <span>Reserve Slot</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 4 — BRIDAL PACKAGES                         */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Royal Indian Wedding Packages</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">
            The Bridal <span className="font-semibold text-rose-gold">Packages Suite</span>
          </h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-rose-gold to-soft-gold mx-auto" />
          <p className="text-xs text-soft-grey leading-relaxed">
            Beautiful wedding invitation styled cards framed in double golden boundaries. Tailored for complete head-to-toe sensory pampering.
          </p>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packagesList.map((pkg, idx) => (
            <div 
              key={idx}
              className={`relative bg-[#FFFDF9] rounded-3xl p-6 border-2 transition-all flex flex-col justify-between shadow-soft hover:shadow-md ${
                pkg.name === 'Royal Bride' || pkg.name === 'Maharani Bridal Experience'
                  ? 'border-soft-gold/60' 
                  : 'border-blush-pink'
              }`}
              id={`package-invitation-${idx}`}
            >
              <OrnamentalCorner />
              <OrnamentalCornerRight />
              <OrnamentalCornerBottomLeft />
              <OrnamentalCornerBottomRight />

              {/* Gold/Blush accent line inside */}
              <div className="absolute inset-2 border border-dashed border-blush-pink pointer-events-none rounded-2xl" />

              <div className="space-y-6 relative z-10 pt-4 px-2">
                
                <div className="text-center space-y-1">
                  <span className="font-mono text-[9px] font-bold text-soft-gold uppercase tracking-[0.25em] block">Package Tier</span>
                  <h3 className="font-serif text-xl font-bold text-[#333333] tracking-wide">{pkg.name}</h3>
                  <p className="text-[10px] text-rose-gold italic tracking-wide">{pkg.tagline}</p>
                </div>

                <div className="text-center py-4 border-y border-blush-pink/60">
                  <span className="text-[10px] text-soft-grey block uppercase tracking-widest font-mono">Investment</span>
                  <span className="font-serif text-3xl font-light text-[#333333]">₹{pkg.price}</span>
                  <span className="text-[9.5px] text-soft-grey block mt-0.5 font-sans">*All-Inclusive Rate</span>
                </div>

                <ul className="space-y-3.5 pt-2">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs text-soft-grey leading-tight font-sans">
                      <Check className="h-4 w-4 text-soft-gold shrink-0 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

              <div className="relative z-10 pt-6 px-2 text-center pb-2">
                <button
                  onClick={() => handleNav('booking')}
                  className={`w-full font-sans justify-center rounded-full text-xs font-bold uppercase tracking-wider py-3.5 border transition-all cursor-pointer ${
                    pkg.name === 'Maharani Bridal Experience' || pkg.name === 'Royal Bride'
                      ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border-rose-gold/25 shadow-soft hover:scale-[1.01]'
                      : 'bg-white border-rose-gold text-rose-gold hover:bg-baby-pink/30'
                  }`}
                >
                  Reserve Package
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 5 — GALLERY                                 */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block font-sans">The Royal Mirror</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">
            The Heritage <span className="font-semibold text-rose-gold">Bridal Gallery</span>
          </h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-rose-gold to-soft-gold mx-auto" />
          <p className="text-xs text-soft-grey leading-relaxed">
            Beautiful high-fidelity imagery celebrating premium South & North Indian brides, authentic lehengas, temple ornaments, and our serene treatment spaces.
          </p>
        </div>

        {/* Gallery Filter controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-sans">
          {(['All', 'South Indian', 'North Indian', 'Mehendi', 'Jewelry', 'Interiors'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setGalleryFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                galleryFilter === cat 
                  ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/25 shadow-xs font-extrabold'
                  : 'bg-white border border-blush-pink text-soft-grey hover:bg-baby-pink/15 hover:text-rose-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry or Staggered grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in" id="heritage-staggered-gallery">
          {filteredGallery.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleNav('gallery')}
              className="group relative overflow-hidden rounded-3xl border border-blush-pink bg-white shadow-soft cursor-pointer aspect-square"
            >
              <img 
                src={item.img} 
                alt={item.title} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-500"
              />
              {/* Luxury gold hover mask panel */}
              <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono font-bold tracking-widest text-[#B76E79] uppercase bg-baby-pink px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <LotusIcon className="h-5 w-5 text-rose-gold/60" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-charcoal">{item.title}</h4>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-gold flex items-center space-x-1">
                    <span>View Showcase</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 6 — OUR EXPERTS                             */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block font-sans">The Bridal Guild</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">
            Meet the <span className="font-semibold text-rose-gold">Master Artisans</span>
          </h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-[#B76E79] to-[#D4AF37] mx-auto" />
          <p className="text-xs text-soft-grey leading-relaxed">
            Learn more about our award-winning beauty experts certified in royal cosmetics, traditional draping customs, and deep scalp therapies.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertsList.map((expert, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-blush-pink shadow-soft group"
              id={`expert-guild-card-${idx}`}
            >
              <div className="relative aspect-[3/4] bg-warm-ivory overflow-hidden">
                <img 
                  src={expert.photo} 
                  alt={expert.name} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-charcoal">{expert.name}</h3>
                  <span className="text-[10px] font-bold text-rose-gold font-mono">{expert.exp}</span>
                </div>
                <div className="text-xs font-bold text-rose-gold">{expert.role}</div>
                <p className="text-[11px] text-soft-grey leading-relaxed italic border-t border-blush-pink/40 pt-2.5">
                  "{expert.specialty}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 7 — CLIENT TESTIMONIALS                     */}
      {/* ==================================================== */}
      <section className="relative py-20 bg-baby-pink/20 border-y border-blush-pink/40">
        
        {/* Subtle decorative mandala background overlay */}
        <TraditionalMandalaGrid />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block font-sans">Shubh Vivah Chronicles</span>
            <h2 className="font-serif text-4xl font-light text-charcoal">
              Love Letters from <span className="font-semibold text-rose-gold">Our Royal Brides</span>
            </h2>
            <p className="text-xs text-soft-grey leading-relaxed">
              Every photograph below portrays or represents genuine Saanvi Reddy wedding brides and their physical transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-blush-pink shadow-soft space-y-6 flex flex-col justify-between"
                id={`bride-testimonial-${idx}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-0.5 text-soft-gold">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-soft-grey leading-relaxed italic">
                    "{test.story}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-4 border-t border-blush-pink/60">
                  <img 
                    src={test.photo} 
                    alt={test.name} 
                    className="h-11 w-11 rounded-full object-cover border border-rose-gold/20 shadow-xs shrink-0" 
                  />
                  <div className="font-sans text-left">
                    <h4 className="text-xs font-bold text-charcoal tracking-wide">{test.name}</h4>
                    <span className="text-[10px] text-rose-gold uppercase tracking-widest block font-bold mt-0.5">{test.city}</span>
                    <span className="text-[9.5px] text-soft-grey font-medium block">{test.role}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION 8 — BEAUTY TIPS                             */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16 font-sans">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block font-sans">Vedic Shringar Guides</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">
            Traditional <span className="font-semibold text-rose-gold">Beauty Rituals</span>
          </h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-rose-gold to-soft-gold mx-auto" />
          <p className="text-xs text-soft-grey leading-relaxed">
            Invaluable recipes, home preparation, and preparation timelines written directly by Saanvi Reddy and our senior practitioners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {beautyTips.map((tip, idx) => (
            <div 
              key={idx}
              onClick={() => handleNav('blog')}
              className="bg-white rounded-3xl border border-blush-pink overflow-hidden shadow-soft hover:-translate-y-1 transform transition-all duration-300 cursor-pointer flex flex-col justify-between"
              id={`beauty-tip-invitation-${idx}`}
            >
              <div className="relative aspect-[16/10] bg-warm-ivory">
                <img src={tip.img} alt={tip.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/95 rounded-full px-3 py-1 border border-blush-pink text-[9px] font-bold text-rose-gold uppercase tracking-wider">
                  {tip.category}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-serif text-lg font-bold text-charcoal hover:text-rose-gold transition-colors">{tip.title}</h3>
                <p className="text-xs text-soft-grey leading-relaxed">{tip.summary}</p>
                
                <div className="pt-2 border-t border-blush-pink/40 flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-gold">Read complete guide</span>
                  <BookOpen className="h-4 w-4 text-rose-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 9 — INSTAGRAM SHOWCASE                     */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block font-sans">Connect on Social Channels</span>
          <h2 className="font-serif text-3xl font-light text-charcoal">
            Follow Our Grid <span className="font-semibold text-rose-gold">@SaanviRoyalLounge</span>
          </h2>
          <p className="text-xs text-soft-grey font-sans">
            Instantly view real-time bridal transformations, intricate hairstyles, cosmetics closeups, and client moments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {instagramFeed.map((post) => (
            <a 
              href="https://instagram.com" 
              key={post.id}
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-warm-ivory border border-blush-pink group block"
              id={`insta-item-grid-${post.id}`}
            >
              <img 
                src={post.img} 
                alt={post.tag} 
                loading="lazy" 
                className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center space-y-1">
                <Instagram className="h-6 w-6 text-[#B76E79]" />
                <span className="text-[10px] font-bold text-rose-gold uppercase tracking-wider">{post.tag}</span>
                <span className="text-[9px] text-soft-grey font-mono flex items-center space-x-0.5">
                  <Heart className="h-3 w-3 text-rose-gold fill-rose-gold mr-0.5" />
                  <span>{post.likes}</span>
                </span>
              </div>
            </a>
          ))}
        </div>

      </section>

      {/* ==================================================== */}
      {/* SECTION 10 — CONTACT                                */}
      {/* ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-blush-pink overflow-hidden shadow-soft">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Contact details list & Live Map - left side */}
            <div className="lg:col-span-5 p-8 sm:p-12 space-y-8 bg-baby-pink/20 relative overflow-hidden">
              <TraditionalMandalaGrid />
              
              <div className="space-y-3 relative z-10 font-sans">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B76E79]">Operational coordinates</span>
                <h3 className="font-serif text-3xl font-light text-charcoal">We’d love to <span className="font-bold text-rose-gold">host you</span></h3>
                <p className="text-xs text-soft-grey leading-relaxed">
                  Have a custom query regarding your royal Shubh Vivah event, regional draping layouts, or private VIP trial timelines? Write to us or call our front desk directly.
                </p>
              </div>

              <div className="space-y-5 relative z-10 font-sans">
                
                <div className="flex items-start space-x-3 text-xs sm:text-sm text-charcoal">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-blush-pink shadow-xs">
                    <MapPin className="h-4.5 w-4.5 text-[#B76E79]" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold">Bridal Head Office</p>
                    <p className="text-xs text-soft-grey mt-0.5">Plot No. 82, Road No. 4, Film Nagar, Jubilee Hills, Hyderabad, Telangana 500096</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs sm:text-sm text-charcoal">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-blush-pink shadow-xs">
                    <Phone className="h-4.5 w-4.5 text-[#B76E79]" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold">Front Desk Hotlines</p>
                    <p className="text-xs text-soft-grey mt-0.5">+91 40 555-SAANVI (722684)</p>
                    <p className="text-xs text-soft-grey">+91 98855 01034 (Text Channels Only)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs sm:text-sm text-charcoal">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-blush-pink shadow-xs">
                    <Mail className="h-4.5 w-4.5 text-[#B76E79]" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold">Digital Concierge</p>
                    <p className="text-xs text-soft-grey mt-0.5">shringar@saanvibridallounge.co.in</p>
                  </div>
                </div>

              </div>

              {/* High precision vector simulated Google Map representation */}
              <div className="border border-blush-pink rounded-2xl overflow-hidden aspect-video relative z-10 shadow-xs bg-white flex flex-col justify-between">
                
                {/* Visual Representation of Map coordinates with grid lines */}
                <div className="absolute inset-0 bg-[#E8ECEF] opacity-75 flex flex-col justify-between p-3 pointer-events-none">
                  {/* Grid lines */}
                  <div className="w-full h-full relative" style={{ backgroundImage: 'radial-gradient(#C6CBD1 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                    {/* Road pathways */}
                    <div className="absolute top-[30%] left-0 w-full h-8 bg-white border-y border-[#BAC0C7] transform rotate-[10deg]" />
                    <div className="absolute left-[40%] top-0 w-8 h-full bg-white border-x border-[#BAC0C7] transform rotate-[-20deg]" />
                    {/* Jubilee hills circle */}
                    <div className="absolute top-[40%] left-[30%] w-12 h-12 rounded-full border-2 border-[#819C3F] bg-[#DAE5A7] flex items-center justify-center text-[7.5px] font-bold text-[#556923] text-center uppercase tracking-wide px-1">Jubilee Circle</div>
                    {/* Marker Pin */}
                    <div className="absolute top-[35%] left-[50%] animate-bounce flex flex-col items-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#B76E79] to-rose-gold shadow-md text-white">
                        <Sparkles className="h-3.5 w-3.5 text-soft-gold" />
                      </div>
                      <div className="w-1.5 h-1.5 bg-[#B76E79] rounded-full mt-[-2px] shadow-sm" />
                    </div>
                  </div>
                </div>

                <div className="relative p-2.5 bg-white/95 border-b border-blush-pink/40 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-charcoal">Jubilee Hills, Hyderabad Map coordinates</span>
                  <span className="text-[9px] font-mono text-rose-gold">Live GPS Location</span>
                </div>

                <div className="relative p-3.5 bg-white/95 text-right">
                  <a 
                    href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[10px] font-bold text-rose-gold uppercase tracking-wider inline-flex items-center space-x-1 hover:underline"
                  >
                    <span>Open in Nav App</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

              </div>

            </div>

            {/* Live Interactive Contact form - right side */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              
              <div className="space-y-1 font-sans">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-gold">Send Luxury Inquiry</span>
                <h3 className="font-serif text-2xl font-light text-[#333333]">Connect with <span className="font-bold text-rose-gold">Concierge desk</span></h3>
                <p className="text-xs text-soft-grey">Messages are transmitted directly into our live Firebase Firestore leads system.</p>
              </div>

              {formSuccess ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-6 space-y-4 text-center font-sans">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <h4 className="font-bold text-emerald-800 text-sm">Inquiry Transmitted Successfully</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                    A physical representative on our Hyderabad VIP front desk team has cataloged your details. We will touch base within 2 business hours via WhatsApp/Phone call.
                  </p>
                  <button 
                    onClick={() => setFormSuccess(false)}
                    className="text-xs font-bold text-emerald-800 hover:underline hover:text-emerald-900 uppercase tracking-widest block mx-auto pt-2"
                  >
                    Submit another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submitInquiry} className="space-y-4 font-sans text-xs">
                  
                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-lg text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-bold text-charcoal uppercase tracking-wider block">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Aishwarya Sen" 
                        className="w-full bg-warm-ivory border border-blush-pink focus:border-[#B76E79] rounded-xl px-4 py-3 placeholder-soft-grey text-charcoal text-xs focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="font-bold text-charcoal uppercase tracking-wider block">Mobile Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="e.g. +91 98480 22338" 
                        className="w-full bg-warm-ivory border border-blush-pink focus:border-[#B76E79] rounded-xl px-4 py-3 placeholder-soft-grey text-charcoal text-xs focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-bold text-charcoal uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="e.g. guest@royal.in" 
                      className="w-full bg-warm-ivory border border-blush-pink focus:border-[#B76E79] rounded-xl px-4 py-3 placeholder-soft-grey text-charcoal text-xs focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-bold text-charcoal uppercase tracking-wider block">Custom Event specifics & requirements</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Sangeet date on Nov 12, Wedding Muhurtham on Nov 14. Requesting Saffron HydraGlow preps and heavy saree draping..." 
                      className="w-full bg-warm-ivory border border-blush-pink focus:border-[#B76E79] rounded-xl px-4 py-3 placeholder-soft-grey text-charcoal text-xs focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={formLoading}
                      className="w-full font-sans flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink py-4 text-xs font-bold uppercase tracking-widest text-rose-gold border border-rose-gold/25 shadow-soft hover:shadow-md hover:scale-[1.01] active:scale-95 disabled:opacity-55 transition-all text-center cursor-pointer"
                    >
                      {formLoading ? (
                        <span>Attending lead...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Transmit Secure Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

              <div className="pt-4 border-t border-blush-pink/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-soft-grey text-center sm:text-left leading-relaxed">
                  Rather chat? Our front desk leads respond continuously on WhatsApp.
                </span>
                
                <a 
                  href="https://wa.me/919885501034" 
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider px-5 py-3.5 flex items-center space-x-2 transition-all active:scale-95 shrink-0 shadow-xs cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-white" />
                  <span>Chat Frontdesk Live</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
