import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { faqData } from '../data/salonData';

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First element open by default for luxury UX

  const toggleIndex = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-16 bg-warm-ivory min-h-screen">
      
      {/* 1. Header Titles */}
      <section className="text-center space-y-4">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Continuous Clarity</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
          Frequently Asked <span className="font-semibold text-rose-gold">Lounge Questions</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Everything you need to know about scheduling, saree pleating hours, custom pre-wedding packages, and luxury kundan support.
        </p>
      </section>

      {/* 2. Accordion List with categorization values */}
      <section className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-10 shadow-soft space-y-4">
        {faqData.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`rounded-2xl border transition-all ${
                isOpen 
                  ? 'border-rose-gold/30 bg-baby-pink/30' 
                  : 'border-blush-pink bg-warm-ivory hover:bg-baby-pink/10'
              }`}
              id={`faq-item-${idx}`}
            >
              {/* Accordion trigger block header */}
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between p-5 text-left transition-all focus:outline-none cursor-pointer"
              >
                <div className="space-y-1.5 flex-1 pr-4 font-sans">
                  <span className="text-[9.5px] font-bold text-rose-gold uppercase tracking-widest block font-sans">
                    {faq.category}
                  </span>
                  <span className="font-serif text-sm sm:text-base font-bold text-charcoal leading-normal">
                    {faq.question}
                  </span>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-xs border border-blush-pink">
                  {isOpen ? <ChevronUp className="h-4 w-4 text-rose-gold" /> : <ChevronDown className="h-4 w-4 text-soft-grey" />}
                </div>
              </button>

              {/* Accordion interior explanation panel */}
              {isOpen && (
                <div className="p-5 pt-0 border-t border-blush-pink/40 text-xs sm:text-sm text-charcoal leading-relaxed space-y-3 animate-fade-in font-sans">
                  <p>{faq.answer}</p>
                </div>
              )}

            </div>
          );
        })}
      </section>

      {/* 3. Post questions banner */}
      <section className="text-center space-y-4 font-sans">
        <h3 className="font-serif text-xl font-light text-charcoal">Still Seeking Support?</h3>
        <p className="text-xs text-soft-grey leading-relaxed max-w-md mx-auto">
          Our front desk leads are live continuously on WhatsApp text channels to clarify Nizam crown fitting details or custom draping times.
        </p>
        <div className="flex justify-center">
          <a
            href="https://wa.me/919885501034"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 flex items-center space-x-2 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <MessageSquare className="h-4.5 w-4.5" />
            <span>Chat Front Desk Live</span>
          </a>
        </div>
      </section>

    </div>
  );
}
