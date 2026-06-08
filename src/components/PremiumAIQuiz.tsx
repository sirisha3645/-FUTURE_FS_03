import React, { useState } from 'react';
import { Sparkles, Smile, Scissors, HelpCircle, RefreshCw, Check, Calendar, Award } from 'lucide-react';

interface PremiumAIQuizProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceId: (id: string) => void;
}

export default function PremiumAIQuiz({ setCurrentPage, setSelectedServiceId }: PremiumAIQuizProps) {
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('dry');
  const [hairState, setHairState] = useState('normal');
  const [coreGoal, setCoreGoal] = useState('hydration');
  const [details, setDetails] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleStartOver = () => {
    setStep(1);
    setSkinType('dry');
    setHairState('normal');
    setCoreGoal('hydration');
    setDetails('');
    setResult(null);
  };

  const handleRunAI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/beauty/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skinType, hairState, coreGoal, details }),
      });
      const data = await response.json();
      setResult(data);
    } catch (e) {
      console.error('Quiz analysis failed:', e);
      // Fail gracefully with smart localized luxury fallback
      setResult({
        recommendedServiceId: '3', // Bridal Airbrush Makeover or Saffron Facial
        recommendedServiceTitle: 'Royal Saffron Glow Ritual & Airbrush Consultation',
        beautyRoutineTips: [
          'Prepare skin surface using pure organic rosewater mist daily.',
          'Inject cold-pressed sandalwood skin nourishment under cosmetics.',
          'Avoid sulfate-based synthetic lathering cleansers entirely.'
        ],
        sculptingStrategy: 'Your delicate profile responds beautifully to custom hand-massaged herbal hydration and organic saffron oil preps.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstantBook = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12 bg-warm-ivory min-h-screen">
      
      {/* Editorial Title banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-1 border border-rose-gold/20 bg-baby-pink px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-rose-gold">
          <Sparkles className="h-3.5 w-3.5 text-soft-gold animate-pulse" />
          <span>ELITE AI BRIDAL ANALYTICS</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-charcoal">
          The Luxury <span className="font-semibold text-rose-gold">AI Skin & Hair Quiz</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          State your unique skin conditions and traditional celebration goals. Our advanced analytical model calculates custom compatibility matches to recommend exquisite salon treatments.
        </p>
      </div>

      {loading ? (
        /* Loading shimmers with beautiful rose tints */
        <div className="bg-white border border-blush-pink rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-soft relative overflow-hidden">
          <div className="animate-spin h-10 w-10 border-4 border-rose-gold border-t-transparent rounded-full mx-auto" />
          <div className="space-y-2">
            <h3 className="font-serif text-sm font-bold text-rose-gold uppercase tracking-wider">Evaluating compatibility parameters</h3>
            <p className="text-xs text-soft-grey max-w-sm mx-auto leading-relaxed">
              Matching high-definition airbrush compounds and traditional Vedic rose preparations against our certified elite services list...
            </p>
          </div>
          {/* Shimmer decorative lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-baby-pink/10 to-transparent animate-shimmer pointer-events-none" />
        </div>
      ) : result ? (
        /* Detailed results display card with booking CTA */
        <div className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-10 shadow-soft space-y-8 animate-fade-in" id="quiz-result-node">
          
          <div className="text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-baby-pink text-rose-gold mx-auto border border-rose-gold/10">
              <Award className="h-5.5 w-5.5" />
            </div>
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-rose-gold block">Your Royal Recommended Match</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-charcoal">
              {result.recommendedServiceTitle}
            </h2>
          </div>

          {/* Core breakdown blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-blush-pink/60">
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-rose-gold block">Artisan Strategy Notes</h3>
              <p className="text-xs sm:text-sm text-soft-grey leading-relaxed italic border-l-2 border-rose-gold pl-4 py-1 bg-baby-pink/15 rounded-r-xl pr-2">
                "{result.sculptingStrategy}"
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-rose-gold block">Your Custom Pre-Wedding Rituals</h3>
              <div className="space-y-3">
                {result.beautyRoutineTips.map((tip: string, i: number) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-soft-grey">
                    <Check className="h-4 w-4 text-rose-gold shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-blush-pink/50 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleInstantBook(result.recommendedServiceId)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-soft border border-rose-gold/10 hover:scale-[1.02] transform transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Recommended Suite</span>
            </button>
            <button
              onClick={handleStartOver}
              className="w-full sm:w-auto text-xs font-bold uppercase text-soft-grey hover:text-rose-gold py-3 block text-center tracking-wider"
            >
              Restart Quiz
            </button>
          </div>

        </div>
      ) : (
        /* Quiz form wizard steps card */
        <div className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-10 shadow-soft space-y-6">
          
          {/* Progress gauge */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-soft-grey uppercase tracking-widest">
              <span>Bridal Profile Progress</span>
              <span>Question {step} of 3</span>
            </div>
            <div className="h-2 w-full bg-warm-ivory rounded-full overflow-hidden border border-blush-pink/35">
              <div 
                className="h-full bg-gradient-to-r from-baby-pink via-blush-pink to-rose-gold transition-all duration-300 rounded-full" 
                style={{ width: `${(step/3)*100}%` }}
              />
            </div>
          </div>

          <div className="min-h-[220px] flex flex-col justify-between py-4">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in" id="quiz-step-1">
                <h3 className="font-serif text-xl font-light text-charcoal flex items-center space-x-2">
                  <Smile className="h-5.5 w-5.5 text-rose-gold shrink-0" />
                  <span>1. Define Your Facial Skin Surface</span>
                </h3>
                <p className="text-xs text-soft-grey leading-normal">What feels most accurate about your facial skin texture throughout standard months?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { id: 'dry', title: 'Dry or Sensitive', desc: 'Feeling occasional tight/flaky spots, seeking absolute radiance.' },
                    { id: 'oily', title: 'Oily or Prone', desc: 'Active moisture glow, prone to perspiration or wedding shine.' },
                    { id: 'normal', title: 'Balanced & Smooth', desc: 'Even moisture skin tone without heavy skin outbreaks.' },
                    { id: 'mature', title: 'Collagen Desiring', desc: 'Seeking organic tightening, facial definition, and fine line smoothing.' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSkinType(item.id)}
                      className={`rounded-2xl border p-4.5 text-left transition-all text-xs font-medium leading-relaxed ${
                        skinType === item.id
                          ? 'border-rose-gold bg-baby-pink/30 shadow-xs'
                          : 'border-blush-pink/40 bg-warm-ivory hover:bg-baby-pink/15'
                      }`}
                    >
                      <span className="block text-xs font-bold text-charcoal">{item.title}</span>
                      <span className="block text-[10.5px] text-soft-grey mt-1 bg-transparent leading-relaxed">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in" id="quiz-step-2">
                <h3 className="font-serif text-xl font-light text-charcoal flex items-center space-x-2">
                  <Scissors className="h-5.5 w-5.5 text-rose-gold shrink-0" />
                  <span>2. State Your Scalp & Hair Lock Type</span>
                </h3>
                <p className="text-xs text-soft-grey leading-normal">How would our elite salon artisans classify your hair cuticles or strands today?</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { id: 'dry-colored', title: 'Processed, Colored or Bleached', desc: 'Underwent prior synthetic coloring, seeks organic bond repair.' },
                    { id: 'normal', title: 'Virgin or Beautifully Raw', desc: 'No heavy prior highlights, healthy standard locks.' },
                    { id: 'fine-thin', title: 'Fine, Light or Low Volume', desc: 'Desires jasmine braid extensions and photographic thickness.' },
                    { id: 'coarse-coils', title: 'Coarse, Thick or Natural Curls', desc: 'Seeking deep pure essential oil nutrition and steam softening.' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setHairState(item.id)}
                      className={`rounded-2xl border p-4.5 text-left transition-all text-xs font-medium leading-relaxed ${
                        hairState === item.id
                          ? 'border-rose-gold bg-baby-pink/30 shadow-xs'
                          : 'border-blush-pink/40 bg-warm-ivory hover:bg-baby-pink/15'
                      }`}
                    >
                      <span className="block text-xs font-bold text-charcoal">{item.title}</span>
                      <span className="block text-[10.5px] text-soft-grey mt-1 leading-relaxed">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in" id="quiz-step-3">
                <h3 className="font-serif text-xl font-light text-charcoal flex items-center space-x-2">
                  <Award className="h-5.5 w-5.5 text-rose-gold shrink-0 animate-pulse" />
                  <span>3. Define Your Ultimate Aesthetic Goal</span>
                </h3>
                <p className="text-xs text-soft-grey leading-normal">What is the absolute focus behind your upcoming royal session?</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    { id: 'hydration', title: 'Bridal Skin Radiance', desc: 'Authentic jasmine & saffron facial prep.' },
                    { id: 'hair-care', title: 'Couture Styling', desc: 'Bespoke braids or hair makeover.' },
                    { id: 'spa-relax', title: 'Stress & Tension Reset', desc: 'Pre-wedding massage oil therapy.' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setCoreGoal(item.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        coreGoal === item.id
                          ? 'border-rose-gold bg-baby-pink/30'
                          : 'border-blush-pink/40 bg-warm-ivory hover:bg-baby-pink/15'
                      }`}
                    >
                      <span className="block text-xs font-bold text-charcoal">{item.title}</span>
                      <span className="block text-[10.5px] text-soft-grey mt-1.5 leading-relaxed">{item.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 pt-4">
                  <label className="text-[11px] font-bold text-charcoal block uppercase tracking-wider">Any customization notes or skin sensitivities...</label>
                  <input
                    type="text"
                    placeholder="e.g. skin responds beautifully to natural sandalwood formulas..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-3 text-charcoal placeholder-soft-grey/60 focus:outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold/30"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center pt-6 border-t border-blush-pink/60">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
              className="text-xs font-bold uppercase tracking-wider text-soft-grey hover:text-rose-gold disabled:opacity-40"
            >
              Previous
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="rounded-full bg-gradient-to-r from-baby-pink to-blush-pink border border-rose-gold/15 text-rose-gold px-8 py-3 text-xs font-bold uppercase tracking-wider shadow-soft hover:scale-[1.02] transform transition-all duration-300"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRunAI}
                className="flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-baby-pink via-blush-pink to-rose-gold border border-rose-gold/20 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-rose-gold shadow-soft hover:scale-[1.03] transition-all duration-300 animate-pulse"
              >
                <Sparkles className="h-4 w-4 text-soft-gold" />
                <span>Calculate Match</span>
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
