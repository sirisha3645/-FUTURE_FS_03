import React, { useState } from 'react';
import { Eye, ArrowRightLeft, X, MoveLeft, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { galleryData } from '../data/salonData';
import { GalleryItem } from '../types';

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bridal' | 'hair' | 'mehendi' | 'before-after' | 'interior'>('all');
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Before/After Comparison sliders interactive drag position (percentage 1 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const categories = [
    { id: 'all' as const, label: 'All Portfolios' },
    { id: 'bridal' as const, label: 'Bridal Looks' },
    { id: 'hair' as const, label: 'Hair Styling' },
    { id: 'mehendi' as const, label: 'Mehendi' },
    { id: 'before-after' as const, label: 'Makeovers' },
    { id: 'interior' as const, label: 'Salon Interior' },
  ];

  const filteredItems = galleryData.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'bridal') {
      return item.category === 'bridal' || item.category === 'engagement';
    }
    return item.category === activeCategory;
  });

  const beforeAfterItems = galleryData.filter(item => item.beforeImage && item.afterImage);

  // Drag logic for before/after comparison slider
  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingSlider || e.buttons === 1) {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      handleSliderMove(e.clientX, rect);
    }
  };

  const handleNextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in bg-warm-ivory min-h-screen">
      
      {/* 1. Header Segment */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 text-center space-y-4">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">
          Visual Masterpieces
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
          Our Bridal <span className="font-semibold text-rose-gold">Aesthetic Gallery</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Explore stunning, high-definition captures of our royal Hyderabad brides, heritage jasmines styling, sweatproof airbrush contouring, and our clean bento-inspired lounge layout.
        </p>
      </section>

      {/* 2. Interactive Before/After Comparison Slider (PREMIUM OPTION) */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center space-x-1.5 border border-rose-gold/20 bg-baby-pink text-rose-gold text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.15em]">
            <Sparkles className="h-3.5 w-3.5 text-soft-gold animate-pulse" />
            <span>Interactive Before / After Face Glow</span>
          </div>
          <h2 className="font-serif text-2xl font-light text-charcoal">Swipe To Reveal the Transformation</h2>
          <p className="text-xs text-soft-grey">Drag or swipe the dual-dashed white divider line horizontally to assess the look.</p>
        </div>

        {beforeAfterItems.length > 0 && (
          <div 
            className="relative h-[360px] sm:h-[450px] w-full overflow-hidden rounded-3xl border border-blush-pink shadow-soft select-none cursor-ew-resize bg-warm-ivory"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDraggingSlider(true)}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseLeave={() => setIsDraggingSlider(false)}
            id="before-after-comparer"
          >
            {/* After Image (Full frame behind slider overlay) */}
            <img 
              src={beforeAfterItems[0].afterImage} 
              alt="After look"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            />
            <div className="absolute right-4 bottom-4 z-10 rounded-full bg-white/90 border border-blush-pink px-4 py-1 text-[10px] text-rose-gold font-sans font-bold tracking-wider uppercase">
              After (Airbrush Royal Glow)
            </div>

            {/* Before Image (Cropped frame dynamically based on slider position) */}
            <div 
              className="absolute top-0 left-0 bottom-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={beforeAfterItems[0].beforeImage} 
                alt="Before look"
                className="absolute top-0 left-0 h-[360px] sm:h-[450px] object-cover"
                style={{ width: '100%', minWidth: '100%', maxWidth: 'none' }}
              />
              <div className="absolute left-4 bottom-4 z-10 rounded-full bg-white/90 border border-blush-pink px-4 py-1 text-[10px] text-rose-gold font-sans font-bold tracking-wider uppercase">
                Before
              </div>
            </div>

            {/* Slider Divider bar line handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize select-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-rose-gold border border-blush-pink shadow-md cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
                <ArrowRightLeft className="h-4 w-4" />
              </div>
            </div>

          </div>
        )}
      </section>

      {/* 3. Portfolio Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 border-b border-blush-pink pb-6 mb-10">
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                activeCategory === item.id
                  ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border-rose-gold/25 shadow-sm'
                  : 'bg-white border-blush-pink text-soft-grey hover:bg-baby-pink/15'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 4. Masonry Portfolio Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => {
            // Find global index in full database to match lightbox selection correctly
            const globalIndex = filteredItems.findIndex(g => g.id === item.id);
            return (
              <div 
                key={item.id}
                onClick={() => setLightboxIndex(globalIndex)}
                className="group relative overflow-hidden rounded-3xl border border-blush-pink bg-white shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-zoom-in break-inside-avoid"
                id={`gallery-portfolio-card-${idx}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
                
                {/* Visual Hover details bar */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/45 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-305">
                  <span className="font-sans text-[9px] font-bold text-rose-gold uppercase tracking-wider bg-baby-pink/70 px-2 py-0.5 rounded-full w-fit">{item.category} Details</span>
                  <p className="font-serif text-lg text-charcoal font-medium mt-1.5 leading-snug">{item.title}</p>
                  <div className="flex items-center space-x-1.5 text-xs text-rose-gold font-bold mt-3">
                    <Eye className="h-4.5 w-4.5" />
                    <span>View Detail Case</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Lightbox Modal Overlay */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-xs p-4 animate-fade-in select-none">
          {/* Close trigger button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Previous Portfolios"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Core Expanded Image */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col justify-center items-center space-y-4">
            <img 
              src={filteredItems[lightboxIndex].image} 
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] rounded-2xl object-contain border border-blush-pink"
            />
            <div className="text-center space-y-1 bg-white/95 border border-blush-pink rounded-2xl py-3 px-6 shadow-md max-w-md">
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-rose-gold">
                {filteredItems[lightboxIndex].category} Portfolio
              </span>
              <h3 className="font-serif text-base text-charcoal">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-[10px] text-soft-grey font-semibold">Slide {lightboxIndex + 1} of {filteredItems.length}</p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextLightbox}
            className="absolute right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Next Portfolios"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

    </div>
  );
}
