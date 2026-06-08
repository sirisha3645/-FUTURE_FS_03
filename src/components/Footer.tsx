import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, MessageCircle, ArrowRight, CheckCircle2, Award, Loader2 } from 'lucide-react';
import { addSubscriber } from '../firebase/newsletter';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [subscribeError, setSubscribeError] = React.useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      return;
    }

    setSubscribeError('');
    setSubmitting(true);

    try {
      await addSubscriber(email.trim());
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 6000);
    } catch (err: any) {
      console.error('Newsletter error:', err);
      setSubscribeError('Unable to subscribe. Please retry.');
      setTimeout(() => {
        setSubscribeError('');
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLink = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-blush-pink bg-gradient-to-b from-white to-baby-pink/30 pt-16 pb-8">
      
      {/* Decorative Golden Ambient Accent */}
      <div className="absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-gradient-radial from-rose-gold/10 to-transparent blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Segment: Primary Details & Newsletter Brand Banner */}
        <div className="grid grid-cols-1 gap-10 border-b border-blush-pink/60 pb-12 lg:grid-cols-3">
          
          {/* Logo Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-baby-pink via-blush-pink to-rose-gold shadow-sm">
                <Award className="h-5 w-5 text-rose-gold" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-widest text-charcoal uppercase block leading-none">
                  SAANVI
                </span>
                <span className="block text-[8.5px] tracking-[0.25em] font-semibold text-rose-gold uppercase mt-1">
                  Royal Bridal Lounge
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-soft-grey">
              A premium luxury bridal studio dedicated to high-definition sweatproof styling, organic Vedic skin preparations, and timeless South and North Indian bridal draping.
            </p>
            <div className="flex space-x-3.5 pt-1">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-pink bg-white text-rose-gold hover:bg-baby-pink hover:scale-115 transition-all shadow-sm">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-pink bg-white text-rose-gold hover:bg-baby-pink hover:scale-115 transition-all shadow-sm">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-pink bg-white text-rose-gold hover:bg-baby-pink hover:scale-115 transition-all shadow-sm">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://wa.me/9140555722" target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-blush-pink bg-white text-emerald-600 hover:bg-emerald-50 hover:text-white hover:scale-115 transition-all shadow-sm">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Business Hours & Key Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-[#B76E79] uppercase">
              RESERVE SECURELY
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-soft-grey">
                <MapPin className="h-4 w-4 text-rose-gold shrink-0 mt-0.5" />
                <span>Road No. 12, Banjara Hills<br />Hyderabad, Telangana 500034</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-soft-grey">
                <Phone className="h-4 w-4 text-rose-gold" />
                <span>+91 40 555-SAANVI</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-soft-grey">
                <Mail className="h-4 w-4 text-rose-gold" />
                <span>concierge@saanvibridal.com</span>
              </li>
            </ul>
          </div>

          {/* Premium Newsletter Sign-up */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest text-[#B76E79] uppercase">
              BEAUTY TIPS NEWSLETTER
            </h3>
            <p className="text-sm text-soft-grey leading-relaxed">
              Subscribe to lock in customized pre-bridal consultation guides and complimentary heritage saffron mist offers.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 rounded-xl bg-baby-pink border border-blush-pink p-3.5 text-xs text-rose-gold animate-fade-in">
                <CheckCircle2 className="h-4.5 w-4.5 text-rose-gold shrink-0" />
                <span>Welcome! You have successfully subscribed to the Saanvi Circle.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <form onSubmit={handleSubscribe} className="relative flex rounded-xl border border-blush-pink bg-white p-1">
                  <input
                    type="email"
                    required
                    disabled={submitting}
                    placeholder="Your luxury email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-xs text-charcoal placeholder-soft-grey/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/10 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shrink-0"
                    aria-label="Submit subscriber"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-rose-gold" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-rose-gold" />
                    )}
                  </button>
                </form>
                {subscribeError && (
                  <p className="text-[10px] text-red-500 px-2 font-medium">{subscribeError}</p>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Middle Segment: Simple Multi-Column Links */}
        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4 border-b border-blush-pink/60">
          
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-gold">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              {['home', 'about', 'services', 'pricing'].map((v) => (
                <button key={v} onClick={() => handleLink(v)} className="text-left text-xs text-[#666666] hover:text-[#B76E79] transition-colors uppercase font-mono tracking-wider">
                  {v} Page
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-gold">Services</h4>
            <div className="flex flex-col space-y-2">
              <button onClick={() => handleLink('services')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Bridal Airbrush Makeover</button>
              <button onClick={() => handleLink('services')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Vedic Saffron Facials</button>
              <button onClick={() => handleLink('services')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Bespoke Henna (Mehendi)</button>
              <button onClick={() => handleLink('services')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Fresh Jasmine Styling</button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-gold">Premium Space</h4>
            <div className="flex flex-col space-y-2">
              <button onClick={() => handleLink('quiz')} className="text-left text-xs font-bold text-rose-gold hover:text-charcoal transition-colors flex items-center space-x-1">
                <span>AI Skin Prepping Quiz</span>
              </button>
              <button onClick={() => handleLink('calculator')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Package Cost Estimator</button>
              <button onClick={() => handleLink('pricing')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Pre-Bridal Memberships</button>
              <button onClick={() => handleLink('gallery')} className="text-left text-xs text-soft-grey hover:text-[#B76E79] transition-colors">Bridal Transformations</button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-gold">Referral Perks</h4>
            <div className="bg-white border border-blush-pink/60 p-3.5 rounded-xl shadow-xs">
              <div className="text-xs font-bold text-[#B76E79] mb-1">Pass On the Radiance</div>
              <p className="text-[11px] text-soft-grey leading-relaxed">
                Gift a friend ₹2,000 off their first booking, and unlock 500 loyalty points automatically.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Trust Disclaimers */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-soft-grey">
            &copy; {new Date().getFullYear()} Saanvi Royal Bridal Studio, Hyderabad, Telangana. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-xs text-soft-grey">
            <button className="hover:text-[#B76E79]">Privacy Policy</button>
            <span>&bull;</span>
            <button className="hover:text-[#B76E79]">Terms of Service</button>
            <span>&bull;</span>
            <button onClick={() => handleLink('admin')} className="text-rose-gold font-bold hover:text-charcoal">Admin Panel</button>
          </div>
        </div>

      </div>

      {/* Floating Sticky Live WhatsApp Button widget on the screen bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <a 
          href="https://wa.me/9140555722" 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center space-x-2 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-105 transition-all rounded-full p-3.5 border border-emerald-400/20"
          id="whatsapp-floating-bubble"
        >
          <MessageCircle className="h-5.5 w-5.5 fill-current" />
          <span className="max-w-0 overflow-hidden font-bold text-xs group-hover:max-w-xs transition-all duration-300 ease-out shrink-0 block whitespace-nowrap">
            WhatsApp Frontdesk
          </span>
        </a>
      </div>

    </footer>
  );
}
