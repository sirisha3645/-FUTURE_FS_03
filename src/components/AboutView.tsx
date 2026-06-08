import React from 'react';
import { Target, Compass, Award, Star, ShieldCheck, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { stylistsData } from '../data/salonData';

export default function AboutView() {
  return (
    <div className="space-y-24 pb-20 animate-fade-in bg-warm-ivory">
      
      {/* Editorial Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">
              Our Heritage Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-charcoal leading-tight">
              Crafting Absolute Luxury <span className="font-semibold block text-transparent bg-clip-text bg-gradient-to-r from-rose-gold via-rose-gold to-soft-gold">Since 2014</span>
            </h1>
            <p className="text-sm text-soft-grey leading-relaxed">
              Saanvi Studio was founded in Hyderabad by master stylist Saanvi Reddy with a simple, disruptive vision: to build a modern royal bridal sanctuary that merges traditional Vedic skincare rituals with elite, sweatproof high-definition cosmetics. We replace aggressive chemical bleaching with botanical saffron infusions, rosewater hydration, and customized care that let your natural warmth shine under grand wedding spotlights.
            </p>
            <p className="text-sm text-soft-grey leading-relaxed">
              Today, our lounge is celebrated as South India's premium destination for bespoke Mehendi styling, ornate fresh-jasmine braid sculpting, and seamless airbrush makeovers. Every lotion, henna paste, and skin fluid we use is 100% organic, biocompatible, and crafted to deliver photogenic perfection for custom couture lehengas and sarees of any heritage.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-baby-pink to-blush-pink blur-2xl opacity-40 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1600948836101-f9ffdb5965e5?auto=format&fit=crop&q=80&w=800" 
              alt="Ornate Traditional Royal Indian Wedding Decor" 
              className="rounded-3xl shadow-soft border border-blush-pink relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values block - styled as glass cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-baby-pink/30 border-y border-blush-pink/60 py-16 rounded-3xl col-span-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-blush-pink/40 shadow-soft space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-baby-pink text-rose-gold">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Our Mission</h3>
            <p className="text-xs text-soft-grey leading-relaxed">
              To deliver elite sensory and cosmetic physical upgrades utilizing biocompatible botanical resources and state-of-the-art clinical tools in an inclusive environment of profound relaxation and customized care.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blush-pink/40 shadow-soft space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-baby-pink text-rose-gold">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Our Vision</h3>
            <p className="text-xs text-soft-grey leading-relaxed">
              To pioneer zero-compromise royal grooming across India, setting high benchmarks where total scalp health protection, structural skincare results, and environmental ethics thrive together.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blush-pink/40 shadow-soft space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-baby-pink text-rose-gold">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal">Clean Values</h3>
            <p className="text-xs text-soft-grey leading-relaxed">
              Absolute ingredient transparency, surgical sterilization safety, bio-active organic compounds, and customized continuous consultation. No shortcuts, ever.
            </p>
          </div>

        </div>
      </section>

      {/* Staff Profiles Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">
            Artisanal Masters
          </span>
          <h2 className="font-serif text-3xl font-light text-charcoal">Meet Our Dream Team</h2>
          <p className="text-xs text-soft-grey leading-relaxed">
            Our creative board of directors bring together over 35 years of global styling and dermaceutic experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stylistsData.map((stylist) => (
            <div 
              key={stylist.id} 
              className="group overflow-hidden rounded-3xl border border-blush-pink bg-white shadow-soft"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-warm-ivory">
                <img 
                  src={stylist.image} 
                  alt={stylist.name} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-charcoal">{stylist.name}</h3>
                  <span className="flex items-center text-xs font-bold text-soft-gold">
                    <Star className="h-3.5 w-3.5 fill-current shrink-0 mr-1" />
                    <span>{stylist.rating}</span>
                  </span>
                </div>
                <div className="text-xs font-semibold text-rose-gold">{stylist.role}</div>
                <div className="text-[11px] text-soft-grey">Experience: <span className="font-semibold text-charcoal">{stylist.experience}</span></div>
                <p className="text-xs text-soft-grey italic pt-2.5 leading-relaxed border-t border-blush-pink/30">
                  "{stylist.specialty}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications, Awards, and Achievements */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans text-center text-xs font-bold uppercase tracking-[0.25em] text-rose-gold mb-10 block">
          Accomplishments & Trust Seals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="p-6 space-y-2 bg-white rounded-2xl border border-blush-pink/60 shadow-soft">
            <Award className="h-8 w-8 text-rose-gold mx-auto" />
            <h4 className="text-xs font-bold text-charcoal uppercase">AESTHETIC OF THE YEAR</h4>
            <p className="text-[10px] text-soft-grey">National Wedding Cosmetics Guild India 2024</p>
          </div>

          <div className="p-6 space-y-2 bg-white rounded-2xl border border-blush-pink/60 shadow-soft">
            <ShieldCheck className="h-8 w-8 text-rose-gold mx-auto" />
            <h4 className="text-xs font-bold text-charcoal uppercase">PCA DERMAL APPROVED</h4>
            <p className="text-[10px] text-soft-grey">Advanced Skincare Certified</p>
          </div>

          <div className="p-6 space-y-2 bg-white rounded-2xl border border-blush-pink/60 shadow-soft">
            <Heart className="h-8 w-8 text-rose-gold mx-auto" />
            <h4 className="text-xs font-bold text-charcoal uppercase">100% ECO-COMPATIBLE</h4>
            <p className="text-[10px] text-soft-grey">Cruelty-Free, Non-Toxic</p>
          </div>

          <div className="p-6 space-y-2 bg-white rounded-2xl border border-blush-pink/60 shadow-soft">
            <Sparkles className="h-8 w-8 text-rose-gold mx-auto animate-pulse" />
            <h4 className="text-xs font-bold text-charcoal uppercase">BALAYAGE CERTIFIED</h4>
            <p className="text-[10px] text-soft-grey font-sans">Vidal Sassoon Academy Master</p>
          </div>

        </div>
      </section>

      {/* Business trust, safety guidelines indicator segment - Refactored to premium rose-gold/blush alignment */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center bg-white border border-blush-pink p-8 sm:p-10 rounded-3xl space-y-4 shadow-soft">
        <h3 className="font-serif text-2xl font-light text-rose-gold">Our Clean Health Pledge</h3>
        <p className="text-xs text-soft-grey leading-relaxed max-w-2xl mx-auto">
          We treat scalp care & skincare like high medicine. That means we enforce zero-compromise environmental hygiene: tools are single-use disposable or disinfected through certified high-temperature autoclaves. Air is continuously purified via premium triple-filters, and every product bottle used is cataloged with ingredient verification lists.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-rose-gold pt-2">
          <span className="flex items-center space-x-1.5"><CheckCircle className="h-4.5 w-4.5 text-rose-gold shrink-0" /> <span>AUTOCLAVE SECURE</span></span>
          <span className="flex items-center space-x-1.5"><CheckCircle className="h-4.5 w-4.5 text-rose-gold shrink-0" /> <span>HEPA FILTERED AIR</span></span>
          <span className="flex items-center space-x-1.5"><CheckCircle className="h-4.5 w-4.5 text-rose-gold shrink-0" /> <span>FORMALDEHYDE-FREE</span></span>
        </div>
      </section>

    </div>
  );
}
