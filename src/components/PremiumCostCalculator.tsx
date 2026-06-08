import React, { useState } from 'react';
import { Calculator, Percent, Sparkles, Check, Users, Gift, Calendar } from 'lucide-react';
import { servicesData } from '../data/salonData';

interface PremiumCostCalculatorProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceId: (id: string) => void;
}

export default function PremiumCostCalculator({ setCurrentPage, setSelectedServiceId }: PremiumCostCalculatorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [memberLevel, setMemberLevel] = useState<string>('none');

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(prev => prev.filter(sId => sId !== id));
    } else {
      setSelectedServices(prev => [...prev, id]);
    }
  };

  // Calculations
  const baseSubtotal = selectedServices.reduce((acc, sId) => {
    const service = servicesData.find(s => s.id === sId);
    return acc + (service ? service.price : 0);
  }, 0) * guestCount;

  // Determine membership discount percentage
  let memberDiscountPercent = 0;
  if (memberLevel === 'silk') memberDiscountPercent = 10; // 10% for Saanvi Silver Core
  if (memberLevel === 'vip') memberDiscountPercent = 20;  // 20% for Royal Shubh Vivah Club
  if (memberLevel === 'empress') memberDiscountPercent = 25; // 25% for Empress Maharani Elite

  let groupDiscountPercent = 0;
  if (guestCount >= 3) groupDiscountPercent = 15; // 15% discount for 3 or more guests!

  const totalDiscountPercent = memberDiscountPercent + groupDiscountPercent;
  const discountSumVal = baseSubtotal * (totalDiscountPercent / 100);

  const subtotalAfterDiscounts = baseSubtotal - discountSumVal;
  const stateTaxVal = subtotalAfterDiscounts * 0.18; // 18% luxury GST in Hyderabad, India
  const finalTotal = subtotalAfterDiscounts + stateTaxVal;

  const handleInstantBook = () => {
    if (selectedServices.length > 0) {
      setSelectedServiceId(selectedServices[0]);
    }
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const notesEl = document.getElementById('booking-notes') as HTMLTextAreaElement;
      if (notesEl) {
        notesEl.value = `Saanvi custom estimate details:\nGuests: ${guestCount}\nMembership applied: ${memberLevel}\nLineup chosen: ${selectedServices.map(sId => servicesData.find(s => s.id === sId)?.title).join(', ')}\nEstimated Grand Total: ₹${Math.round(finalTotal).toLocaleString('en-IN')}`;
      }
    }, 150);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12 bg-warm-ivory min-h-screen">
      
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-1.5 border border-rose-gold/20 bg-baby-pink text-rose-gold text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
          <Calculator className="h-3.5 w-3.5 text-rose-gold" />
          <span>ESTIMATE GENERATOR</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-charcoal">
          Saanvi Bridal <span className="font-semibold text-rose-gold">Cost Calculator</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Build your custom bridal or makeup session. Combine multiple treatments, scale tour entourage size, apply premium loyalty discounts, and calculate your instant quote with full GST tax breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Checkbox selector column */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-blush-pink rounded-3xl p-6 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-rose-gold">Step 1: Select Curated Treatments</h3>
            <div className="max-h-72 overflow-y-auto space-y-2 border border-blush-pink/40 p-3.5 rounded-2xl bg-warm-ivory">
              {servicesData.map((srv) => {
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`w-full flex items-center justify-between text-left p-3.5 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-rose-gold bg-baby-pink/35 shadow-xs' 
                        : 'border-blush-pink/40 bg-white hover:bg-baby-pink/15'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <span className="block text-xs font-bold text-charcoal">{srv.title}</span>
                      <span className="block text-[10px] text-soft-grey capitalize">{srv.category} &bull; {srv.duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-sans text-xs font-bold text-rose-gold">₹{srv.price.toLocaleString('en-IN')}</span>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'bg-rose-gold border-rose-gold text-white' : 'border-blush-pink/60 text-transparent'}`}>
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Step 2: Guest count selector */}
            <div className="bg-white border border-blush-pink p-5 rounded-3xl space-y-3.5 shadow-soft">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-rose-gold">Step 2: Entourage Guest size</h3>
              <div className="flex items-center space-x-2">
                <Users className="h-4.5 w-4.5 text-rose-gold" />
                <span className="text-[11px] font-semibold text-soft-grey">How many guests in entourage?</span>
              </div>
              <div className="flex border rounded-xl bg-warm-ivory px-3 py-2 border-blush-pink">
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-transparent text-xs font-semibold text-charcoal focus:outline-none focus:ring-0"
                />
              </div>
              {guestCount >= 3 && (
                <div className="text-[10px] font-bold text-rose-gold flex items-center space-x-1 animate-pulse">
                  <Percent className="h-3 w-3" />
                  <span>Entourage Discount (15%) applied successfully!</span>
                </div>
              )}
            </div>

            {/* Step 3: Member discount applied */}
            <div className="bg-white border border-blush-pink p-5 rounded-3xl space-y-3.5 shadow-soft">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-rose-gold">Step 3: Membership Status</h3>
              <div className="flex border rounded-xl bg-warm-ivory px-3 py-2 border-blush-pink">
                <select
                  value={memberLevel}
                  onChange={(e) => setMemberLevel(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-charcoal focus:outline-none focus:ring-0"
                >
                  <option value="none">No Membership Program</option>
                  <option value="silk">Saanvi Silver Core (10% Off)</option>
                  <option value="vip">Royal Shubh Vivah Cup (20% Off)</option>
                  <option value="empress">Empress Maharani Elite (25% Off)</option>
                </select>
              </div>
              <p className="text-[9.5px] italic text-soft-grey">Instantly select special club levels to accumulate rewards.</p>
            </div>

          </div>

        </div>

        {/* receipt styled delicately in white glassmorphic texture */}
        <div className="lg:col-span-5 bg-white border border-blush-pink rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft relative overflow-hidden">
          
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-baby-pink/30 blur-2xl pointer-events-none" />
          
          <div className="text-center pb-4 border-b border-blush-pink">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-rose-gold">Your Estimate Details</span>
            <h3 className="font-serif text-xl font-light text-charcoal mt-1">Saanvi Summary Receipt</h3>
          </div>

          {selectedServices.length === 0 ? (
            <div className="text-center py-20 text-soft-grey text-xs">
              Select one or more wedding treatments to instantly calculate your luxury custom estimate.
            </div>
          ) : (
            <div className="space-y-5 animate-fade-in font-sans">
              
              {/* Receipt lineup */}
              <div className="space-y-2 border-b border-blush-pink/60 pb-4 max-h-40 overflow-y-auto">
                <span className="text-[10px] font-bold text-rose-gold uppercase tracking-[0.15em] block">Selected Lineup</span>
                {selectedServices.map((id) => {
                  const srv = servicesData.find(s => s.id === id);
                  if (!srv) return null;
                  return (
                    <div key={id} className="flex justify-between items-center text-xs text-charcoal">
                      <span>{srv.title} <span className="text-[10px] text-soft-grey italic">x {guestCount}</span></span>
                      <span className="font-sans font-semibold">₹{(srv.price * guestCount).toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>

              {/* Numerical stats rows */}
              <div className="space-y-2 text-xs border-b border-blush-pink/60 pb-4 text-soft-grey">
                <div className="flex justify-between">
                  <span>Subtotal Amount</span>
                  <span>₹{baseSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {totalDiscountPercent > 0 && (
                  <div className="flex justify-between text-rose-gold font-bold">
                    <span>Applied Level Discounts ({totalDiscountPercent}%)</span>
                    <span>-₹{Math.round(discountSumVal).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST Tax Breakdown (18%)</span>
                  <span>+₹{Math.round(stateTaxVal).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="font-serif text-sm font-semibold text-charcoal">Estimated Grand Total</span>
                <span className="text-2xl font-bold text-rose-gold">
                  ₹{Math.round(finalTotal).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="rounded-2xl border border-blush-pink/60 bg-warm-ivory p-3.5 flex items-start space-x-2.5">
                <Gift className="h-4.5 w-4.5 text-rose-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-soft-grey leading-normal">
                  Lock in this premium estimate price! Grand Muhurtham calendars book out swiftly. Ensure seamless scheduling by booking your suite package.
                </p>
              </div>

              {/* Primary button: Baby pink gradient, pill shape, active translate */}
              <button
                onClick={handleInstantBook}
                className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold py-3.5 text-xs font-bold uppercase tracking-wider border border-rose-gold/25 shadow-soft hover:scale-[1.02] transform transition-all duration-300"
              >
                <Calendar className="h-4.5 w-4.5 text-rose-gold" />
                <span>Book Package Custom Slots</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
