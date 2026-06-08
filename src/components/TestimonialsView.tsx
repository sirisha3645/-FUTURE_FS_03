import React, { useState } from 'react';
import { Star, MessageSquare, Play, CheckCircle2, Award, Calendar, ThumbsUp, X } from 'lucide-react';
import { TestimonialItem } from '../types';

export default function TestimonialsView() {
  const [reviews, setReviews] = useState<TestimonialItem[]>([
    {
      id: 'r1',
      author: 'Priya Rao',
      role: 'Secunderabad Royal Bride',
      text: 'They designed my Nizam royal bridal look beautifully! The kundan jewelry setting, the silk sari draping, and the subtle, natural dewy makeup stayed absolutely crisp from the morning Muhurtham all the way through the reception. The jasmine-integrated hair crown was breathtaking!',
      rating: 5,
      date: 'May 30, 2026',
      avatar: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'r2',
      author: 'Aruna Reddy',
      role: 'Banjara Hills Guest',
      text: 'Saanvi’s customized Vedic sandalwood prep facial was perfect for my sensitive skin. Usually, any heavy makeup causes redness, but their pre-wedding organic hydration facial left my pores incredibly calm and radiant, creating a flawless canvas.',
      rating: 5,
      date: 'May 14, 2026',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'r3',
      author: 'Anjali Deshmukh',
      role: 'Jubilee Hills Luxe Bride',
      text: 'The absolute pinnacle of luxury bridal beauty in Hyderabad! The team came right to my wedding chamber. They completed the intricate kundan style makeup and heavy hand mehendi for six of my bridesmaids seamlessly. Pure class, high-end care, and absolute reliability.',
      rating: 5,
      date: 'April 22, 2026',
      avatar: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 'r4',
      author: 'Sanjana Krishna',
      role: 'Elite VIP Lounge Member',
      text: 'Enrolling in the Saanvi Royal Gold membership was the best decision for my lifestyle. The priority reservation queue is highly valuable since Banjara Hills bridal lounges gets fully booked months in advance. Their herbal hair therapies are magic.',
      rating: 5,
      date: 'April 05, 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  // Form states to leave a new review
  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [success, setSuccess] = useState(false);

  // Simulated Video Player State to replace legacy window.alert
  const [activeVideo, setActiveVideo] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newTestimonial: TestimonialItem = {
      id: `r-${Date.now()}`,
      author: authorName,
      role: relation || 'Verified Salon Client',
      text: reviewText,
      rating: rating,
      date: 'Today',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
    };

    setReviews(prev => [newTestimonial, ...prev]);
    setSuccess(true);
    
    // Clear controls
    setAuthorName('');
    setRelation('');
    setReviewText('');
    setRating(5);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-16 pb-12 animate-fade-in bg-warm-ivory min-h-screen">
      
      {/* 1. Header Portion */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 text-center space-y-4">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Guest Endorsements</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
          What Our <span className="font-semibold text-rose-gold">Saanvi Family Says</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Authentic pre-wedding reflections. We pride ourselves on creating beautiful, trustworthy style connections for Telangana's royal families. Read why we hold a continuous 4.9 Star average rate.
        </p>
      </section>

      {/* 2. Interactive Video Testimonials Simulation Box */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative group/video overflow-hidden rounded-3xl border border-blush-pink bg-[#FFFDF9] text-charcoal min-h-[300px] flex items-center p-8 sm:p-12 shadow-soft">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200" 
              alt="Artisan hair coloring session review" 
              className="h-full w-full object-cover object-center group-hover/video:scale-[1.02] transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
          
          <div className="relative z-10 max-w-lg space-y-4 font-sans">
            <div className="inline-flex items-center space-x-1 border border-rose-gold/20 bg-baby-pink text-rose-gold text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <span>EXCLUSIVE DIALOGUE VIDEOS</span>
            </div>
            <h3 className="font-serif text-2xl font-light leading-snug">
              "They treat bridal beauty like a <span className="font-semibold text-rose-gold">Vedic Craft</span>"
            </h3>
            <p className="text-xs text-soft-grey leading-relaxed">
              Explore this short video narrative with Srimathi Priya Rao as she shares why standard salon products caused her skin flares, and how our sandalwood therapy achieved pristine glow.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <button 
                onClick={() => setActiveVideo(true)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-baby-pink to-blush-pink border border-rose-gold/20 text-rose-gold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Play video review testimonial"
              >
                <Play className="h-5 w-5 fill-current ml-0.5 text-rose-gold" />
              </button>
              <div className="text-xs">
                <span className="block font-bold text-charcoal">Srimathi Priya Rao</span>
                <span className="block text-[10px] text-soft-grey">Secunderabad Premium Royal Bride</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulated Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs font-sans">
          <div className="relative bg-white border border-blush-pink rounded-3xl max-w-lg w-full overflow-hidden shadow-lg animate-fade-in p-6">
            <button 
              onClick={() => setActiveVideo(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-baby-pink text-rose-gold hover:bg-blush-pink transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#B76E79] font-bold block">Saanvi Stories Player</span>
              <h3 className="font-serif text-xl text-charcoal">Pre-Wedding Sandalwood Routine Reflection</h3>
              <div className="aspect-video bg-charcoal rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white space-y-3 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 text-[10px] font-mono tracking-wider flex justify-between items-center z-10">
                  <span>STREAMING PREVIEW: 1080P</span>
                  <span className="text-rose-gold">&bull; PLAYING</span>
                </div>
                {/* Traditional bride picture placeholder in background */}
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=450" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  alt="Traditional Bride feedback"
                />
                <div className="relative z-10 space-y-2">
                  <Play className="h-10 w-10 text-rose-gold fill-current mx-auto animate-ping" />
                  <p className="text-xs font-bold font-sans">"My makeup survived all day temple heat flawlessly..."</p>
                  <p className="text-[10px] text-zinc-300">Priya Rao &bull; Secunderabad Bride</p>
                </div>
              </div>
              <p className="text-xs text-soft-grey leading-relaxed">
                Our in-UI theater displays custom high-fidelity styling stories filmed directly in Telangana's elegant bridal environments using high-end mirrors and closeups.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Ratings Breakdown segment & Active Review Roster */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Roster Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#B76E79] mb-2 font-sans">Verified Client Reviews List</h3>
            <div className="space-y-6">
              {reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-white border border-blush-pink p-6 rounded-3xl shadow-soft hover:shadow-md transition-all flex space-x-4 font-sans"
                >
                  <img src={rev.avatar} alt={rev.author} className="h-12 w-12 rounded-full shrink-0 object-cover border border-blush-pink" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-charcoal leading-tight">{rev.author}</h4>
                        <span className="text-[10px] text-[#B76E79] font-semibold">{rev.role}</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-0.5 text-rose-gold text-xs font-bold leading-none">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < rev.rating ? 'fill-current text-[#B76E79]' : 'text-[#FFFDF9]'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[9px] text-[#B76E79] block mt-1">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-charcoal leading-relaxed italic">
                      "{rev.text}"
                    </p>
                    <div className="flex items-center space-x-2.5 pt-1 text-[10.5px] text-soft-grey">
                      <button className="hover:text-rose-gold flex items-center space-x-1 cursor-pointer">
                        <ThumbsUp className="h-3.5 w-3.5 text-rose-gold" />
                        <span>Helpful ({rev.id === 'r1' ? 42 : 12})</span>
                      </button>
                      <span>&bull;</span>
                      <span className="flex items-center space-x-1 text-rose-gold font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5 text-rose-gold" />
                        <span>Verified Lounge Guest</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Module: Left Custom Star rating collector questionnaire */}
          <div className="space-y-8 font-sans">
            
            {/* Quick aggregate statistics */}
            <div className="bg-white border border-blush-pink p-6 rounded-3xl shadow-soft">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#B76E79] mb-4">Saanvi Aggregate Rating</h4>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-extrabold text-[#B76E79]">4.9 / 5</span>
                <div className="space-y-0.5">
                  <div className="flex text-rose-gold h-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="block text-[10px] text-soft-grey font-bold">1,482 verified check-ins</span>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-blush-pink mt-4 text-[10.5px] text-soft-grey">
                <div className="flex justify-between font-bold"><span>5 Stars</span> <span className="text-charcoal">96%</span></div>
                <div className="h-1.5 w-full bg-warm-ivory rounded-full"><div className="h-full bg-gradient-to-r from-baby-pink to-blush-pink rounded-full border border-rose-gold/20" style={{ width: '96%' }} /></div>
                
                <div className="flex justify-between font-bold"><span>4 Stars</span> <span className="text-charcoal">3%</span></div>
                <div className="h-1.5 w-full bg-warm-ivory rounded-full"><div className="h-full bg-gradient-to-r from-baby-pink to-blush-pink rounded-full border border-rose-gold/20" style={{ width: '3%' }} /></div>

                <div className="flex justify-between font-bold"><span>3 Stars & Under</span> <span className="text-charcoal">1%</span></div>
                <div className="h-1.5 w-full bg-warm-ivory rounded-full"><div className="h-full bg-gradient-to-r from-baby-pink to-blush-pink rounded-full border border-rose-gold/20" style={{ width: '1%' }} /></div>
              </div>
            </div>

            {/* Leave a review box */}
            <div className="bg-white border border-blush-pink p-6 rounded-3xl shadow-soft space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-gold">Share Your Experience</h4>
              <p className="text-xs text-soft-grey leading-relaxed">
                Had an elegant style or bridal make-up session at Saanvi Lounge? Log your thoughts below.
              </p>
              
              {success ? (
                <div className="bg-baby-pink/35 border border-rose-gold/20 p-5 rounded-2xl text-center space-y-2 animate-fade-in">
                  <CheckCircle2 className="h-6 w-6 text-rose-gold mx-auto" />
                  <p className="text-xs font-bold text-charcoal">Review saved successfully!</p>
                  <p className="text-[10px] text-soft-grey">Your feedback was appended to the client roster board.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal" htmlFor="reviewer-name">Full Name</label>
                    <input
                      type="text"
                      id="reviewer-name"
                      required
                      placeholder="e.g. Shalini Reddy"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal outline-none focus:ring-1 focus:ring-rose-gold/45"
                    />
                  </div>

                  {/* Relationship */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal" htmlFor="reviewer-relation">Event treated / Speciality</label>
                    <input
                      type="text"
                      id="reviewer-relation"
                      placeholder="e.g. Pre-Wedding Bride"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal outline-none"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-charcoal block">Rating Score</span>
                    <div className="flex space-x-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setRating(i + 1)}
                          className="transition-transform hover:scale-115 cursor-pointer"
                        >
                          <Star className={`h-5 w-5 ${i < rating ? 'fill-current text-[#B76E79]' : 'text-blush-pink'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-charcoal" htmlFor="reviewer-text">Detailed Review Notes</label>
                    <textarea
                      id="reviewer-text"
                      required
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share what made your bridal make-up, draping, or facial feel special..."
                      className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none resize-none focus:ring-1 focus:ring-rose-gold/45"
                    />
                  </div>

                  {/* Primary pill shaped button */}
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold text-xs uppercase tracking-wider border border-rose-gold/20 py-3 font-bold shadow-soft transition-all duration-300 cursor-pointer"
                  >
                    Post Certified Feedback
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
