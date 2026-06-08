import React, { useState } from 'react';
import { Check, HelpCircle, Award, Sparkles, Gift, DollarSign, Users, ShieldAlert, X } from 'lucide-react';
import { servicesData, membershipPlans, bridalPackages } from '../data/salonData';

interface PricingViewProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceId: (id: string) => void;
}

export default function PricingView({ setCurrentPage, setSelectedServiceId }: PricingViewProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookBridal = (name: string) => {
    setSelectedServiceId('');
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const notesEl = document.getElementById('booking-notes') as HTMLTextAreaElement;
      if (notesEl) {
        notesEl.value = `Reserving: [BRIDAL COLLECTION] ${name}`;
      }
    }, 100);
  };

  const handleEnrollMembership = (planName: string, price: number) => {
    setSuccessMsg(`Simulating premium checkout sequence for the ${planName} membership. Our ledger will safely activate your ₹${price.toLocaleString('en-IN')}/mo billing during your check-in!`);
  };

  const handleGenerateReferral = () => {
    setCouponCode("SAANVIPRIVILEGE-500034");
  };

  return (
    <div className="space-y-24 pb-20 animate-fade-in bg-warm-ivory min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 text-center space-y-4">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">
          Transparent Elegance
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-tight">
          Our Imperial <span className="font-semibold text-rose-gold">Bridal Pricing Menu</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Unrivaled quality with zero hidden additions. We combine absolute clinical skincare standards with customizable, premium pre-wedding packages and VIP on-location bridal support.
        </p>
      </section>

      {/* Dynamic Feedback Modal/Notification */}
      {(successMsg || couponCode) && (
        <div className="fixed inset-0 bg-charcoal/20 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-lg relative space-y-4">
            <button 
              onClick={() => { setSuccessMsg(null); setCouponCode(null); }}
              className="absolute top-4 right-4 p-1 hover:bg-baby-pink rounded-full transition-colors"
            >
              <X className="h-4.5 w-4.5 text-rose-gold" />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-baby-pink text-rose-gold">
              <Sparkles className="h-5.5 w-5.5" />
            </div>
            {successMsg && (
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-charcoal">Enrollment Active</h4>
                <p className="text-xs text-soft-grey leading-relaxed">{successMsg}</p>
              </div>
            )}
            {couponCode && (
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-charcoal">Invite Coupon Generated</h4>
                <p className="text-xs text-soft-grey leading-relaxed">
                  Your customized invitation card link has been compiled. Copy and deliver this credentials code to your sister or colleagues:
                </p>
                <div className="bg-warm-ivory text-center py-3.5 px-4 rounded-xl border border-dashed border-rose-gold text-sm font-mono font-bold tracking-wider text-rose-gold select-all">
                  {couponCode}
                </div>
                <p className="text-[10px] text-soft-grey italic text-center">*Allows ₹2,000 off skin sessions automatically!</p>
              </div>
            )}
            <button
              onClick={() => { setSuccessMsg(null); setCouponCode(null); }}
              className="w-full rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold py-2.5 text-xs font-bold uppercase tracking-wider border border-rose-gold/15"
            >
              Confirm & Close
            </button>
          </div>
        </div>
      )}

      {/* 2. CURATED TREATMENTS PRICING LIST COLUMN */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-10 shadow-soft space-y-6">
          <h2 className="font-serif text-2xl font-light text-charcoal pb-4 border-b border-blush-pink/60">Treatment Roster Pricing Menu</h2>
          
          <div className="divide-y divide-blush-pink/30">
            {servicesData.map((item) => (
              <div key={item.id} className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="font-serif text-base font-bold text-charcoal group-hover:text-rose-gold transition-colors">{item.title}</span>
                    <span className="font-sans text-[10px] font-bold text-rose-gold uppercase bg-baby-pink/40 px-2 py-0.5 rounded-full">({item.duration})</span>
                  </div>
                  <p className="text-xs text-soft-grey leading-relaxed line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center space-x-4 justify-between sm:justify-end shrink-0">
                  <span className="font-sans text-sm font-bold text-rose-gold">₹{item.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => handleBookService(item.id)}
                    className="rounded-full bg-white hover:bg-baby-pink border border-rose-gold/40 text-rose-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-all"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BRIDAL COLLECTIONS DECK */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Bridal Packages</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">Our Imperial Wedding Suites</h2>
          <div className="h-[2px] w-14 bg-gradient-to-r from-rose-gold to-soft-gold mx-auto" />
          <p className="text-sm text-soft-grey">
            Flawless photogenic skin compositions, heirloom jewelry placement, and organic saffron preps designed to look magnificent under cameras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {bridalPackages.map((pack, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blush-pink bg-white p-8 shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-rose-gold bg-baby-pink/50 px-3 py-1 rounded-full">{pack.subtitle} Suite</span>
                  <Award className="h-5.5 w-5.5 text-rose-gold shrink-0" />
                </div>
                <h3 className="font-serif text-2xl font-light text-charcoal">{pack.name}</h3>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-2xl font-extrabold text-rose-gold">₹{pack.price.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] font-sans font-bold text-soft-grey uppercase tracking-wider bg-warm-ivory px-2 py-0.5 border border-blush-pink rounded">all inclusive</span>
                </div>
                
                <div className="pt-4 border-t border-blush-pink/65 space-y-3">
                  <span className="block text-[10px] font-bold text-[#B76E79] uppercase tracking-widest">Included Treatments</span>
                  {pack.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-soft-grey leading-relaxed">
                      <Check className="h-4 w-4 text-rose-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleBookBridal(pack.name)}
                  className="w-full flex items-center justify-center rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/20 py-3 text-xs font-bold uppercase tracking-wider shadow-soft hover:scale-[1.01] transition-all"
                >
                  Reserve Suite Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ELITE MEMBERSHIPS & COMPARISON MATRIX */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-baby-pink/30 py-20 border-y border-blush-pink/60 rounded-3xl">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Continuous Wellness</span>
          <h2 className="font-serif text-4xl font-light text-charcoal">Saanvi Elite Lounge Memberships</h2>
          <p className="text-xs sm:text-sm text-soft-grey">
            Consistently glow throughout your grand social periods with our luxury monthly savings subscriptions. Enjoy customized trial access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {membershipPlans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between shadow-soft transition-all border ${
                plan.recommended
                  ? 'bg-white text-charcoal border-2 border-rose-gold scale-103 z-10'
                  : 'bg-white/80 text-charcoal border-blush-pink hover:bg-white'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-4 right-4 bg-baby-pink border border-rose-gold text-rose-gold px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                  Highly Rec
                </div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-sans text-[9px] font-bold text-rose-gold uppercase tracking-wider block">Plan Tier</span>
                  <h3 className="font-serif text-2xl font-light">{plan.name}</h3>
                  <p className="text-xs leading-relaxed text-soft-grey">{plan.description}</p>
                </div>

                <div className="flex items-baseline space-x-1.5">
                  <span className="text-2xl font-extrabold text-rose-gold font-sans">₹{plan.price.toLocaleString('en-IN')}</span>
                  <span className="text-[11px] font-semibold text-soft-grey capitalize">/ {plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-blush-pink/50">
                  <span className="block text-[10px] font-bold text-[#B76E79] uppercase tracking-widest">Subscriber Privileges</span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs leading-normal">
                      <Check className="h-4 w-4 text-rose-gold shrink-0 mt-0.5" />
                      <span className="text-soft-grey">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleEnrollMembership(plan.name, plan.price)}
                  className={`w-full flex items-center justify-center rounded-full py-3 text-xs font-bold uppercase tracking-wider transition-all border ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border-rose-gold/20 shadow-soft hover:scale-[1.01]'
                      : 'bg-warm-ivory text-rose-gold border-blush-pink hover:bg-baby-pink/35'
                  }`}
                >
                  Initiate Membership Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 5. COMPARISON TABLE OF SUBSCRIPTIONS */}
        <div className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-soft overflow-x-auto">
          <h3 className="font-serif text-lg font-bold text-charcoal mb-6 text-center">Membership Feature Matrix</h3>
          <table className="w-full text-xs text-left min-w-[500px]">
            <thead>
              <tr className="border-b border-blush-pink text-rose-gold font-sans uppercase text-[9.5px]">
                <th className="py-3">CORE SUITE BENEFITS</th>
                <th className="py-3">SILK PLAN (₹3,500)</th>
                <th className="py-3 text-rose-gold font-bold">ROYAL VIP (₹8,500)</th>
                <th className="py-3">EMPRESS CLUB (₹15,500)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blush-pink/40 font-medium text-soft-grey">
              <tr>
                <td className="py-3.5 font-bold text-charcoal">Hair Styling Saving Bonus</td>
                <td>15% Off</td>
                <td className="text-rose-gold font-bold">20% Off</td>
                <td>25% Off</td>
              </tr>
              <tr>
                <td className="py-3.5 font-bold text-charcoal">Monthly Saffron Facials / Massages</td>
                <td>Add-on charge</td>
                <td className="text-rose-gold font-bold">1x Saffron Glow Face Care</td>
                <td>1x Facial and 1x Body Massage</td>
              </tr>
              <tr>
                <td className="py-3.5 font-bold text-charcoal">Lounge Retail Cosmetics Saving</td>
                <td>10% Off</td>
                <td className="text-rose-gold font-bold">15% Off</td>
                <td>25% Off</td>
              </tr>
              <tr>
                <td className="py-3.5 font-bold text-charcoal">Concierge Support Hotline</td>
                <td>No</td>
                <td className="text-rose-gold font-bold">Standby priority</td>
                <td>VIP Priority Line</td>
              </tr>
              <tr>
                <td className="py-3.5 font-bold text-charcoal">Pre-Trial Wedding Jasmine Drinks</td>
                <td>No</td>
                <td className="text-rose-gold font-bold">Welcome Jasmin infusion</td>
                <td>Free unlimited drinks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. REFERRAL PROGRAM DASHBOARD segment */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center bg-white border border-blush-pink p-8 sm:p-12 rounded-3xl space-y-4 shadow-soft">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-baby-pink text-rose-gold mx-auto border border-rose-gold/15">
          <Users className="h-5.5 w-5.5" />
        </div>
        <h3 className="font-serif text-3xl font-light text-charcoal">Our Referral Circle Program</h3>
        <p className="text-xs sm:text-sm text-soft-grey leading-relaxed max-w-2xl mx-auto">
          Pass on the luxury beauty experience. Gift your sibling, friends, or bridesmaids <span className="font-bold text-rose-gold">₹2,000 toward their initial Advanced Facial slot</span>. When their appointment completes, our booking ledger deposits <span className="font-bold text-rose-gold">500 Loyalty Points (worth ₹1,000 salon credit)</span> into your profile!
        </p>
        <button
          onClick={handleGenerateReferral}
          className="rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/15 px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-soft hover:scale-[1.02] transform transition-all duration-300"
        >
          Generate Invitation Code Link
        </button>
      </section>

    </div>
  );
}
