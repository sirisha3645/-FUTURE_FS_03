import React, { useState } from 'react';
import { Clock, Check, Search, ArrowUpDown, Calendar } from 'lucide-react';
import { servicesData } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesViewProps {
  setCurrentPage: (page: string) => void;
  setSelectedServiceId: (id: string) => void;
}

type ServiceFilterCategory = 'all' | 'hair' | 'skin' | 'makeup' | 'nails' | 'spa' | 'bridal' | 'mehendi';

export default function ServicesView({ setCurrentPage, setSelectedServiceId }: ServicesViewProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceFilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  const categories: { id: ServiceFilterCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'bridal', label: 'Bridal Couture' },
    { id: 'mehendi', label: 'Royal Mehendi' },
    { id: 'hair', label: 'Hair Styling' },
    { id: 'skin', label: 'Advanced Skin' },
    { id: 'makeup', label: 'Couture Makeup' },
    { id: 'nails', label: 'Luxury Nails' },
    { id: 'spa', label: 'Therapeutic Spa' },
  ];

  const handleBookNow = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter and sort items
  const filteredAndSorted = servicesData
    .filter((srv) => {
      const matchCat = activeCategory === 'all' || srv.category === activeCategory;
      const matchSearch = srv.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          srv.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      return 0; // default order
    });

  return (
    <div className="space-y-16 pb-20 animate-fade-in bg-warm-ivory min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 text-center space-y-4">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">
          The Salon Catalog
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-tight">
          Our Exquisite <span className="font-semibold text-rose-gold">Royal Bridal Treatments</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Explore Hyderabad's signature portfolio of organic sandalwood and saffron skincare prep, sweatproof high-definition cosmetic applications, and luxurious fresh jasmines braids.
        </p>
      </section>

      {/* 2. Controls Segment (Filters, Search, Sort) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-blush-pink pb-8">
          
          {/* Tab Filter buttons - styled as pill gradient options */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs border ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border-rose-gold/20 shadow-sm'
                    : 'bg-white text-soft-grey hover:bg-baby-pink/20 border-blush-pink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar and sort dropdown */}
          <div className="flex flex-col sm:flex-row gap-3">
            
            {/* Search Input */}
            <div className="relative flex items-center rounded-full border border-blush-pink bg-white px-4 py-2 sm:w-64 shadow-xs">
              <Search className="h-4 w-4 text-rose-gold shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-charcoal placeholder-soft-grey/65 focus:outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center rounded-full border border-blush-pink bg-white px-4 py-2 shadow-xs">
              <ArrowUpDown className="h-4 w-4 text-rose-gold shrink-0 mr-2.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-soft-grey focus:outline-none cursor-pointer"
              >
                <option value="default">Default Sort Order</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Catalog Grid with full-blown services */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20 space-y-4 rounded-3xl border border-dashed border-blush-pink bg-white">
            <p className="text-sm font-semibold text-soft-grey">No royal treatments match your search configuration.</p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortBy('default'); }}
              className="text-xs font-bold uppercase tracking-wider text-rose-gold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSorted.map((service) => (
              <div 
                key={service.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-blush-pink/60 bg-white shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              >
                {/* Product Image Section */}
                <div className="relative h-60 overflow-hidden bg-warm-ivory">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-550"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-rose-gold shadow-sm border border-blush-pink">
                    ₹{service.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Info and content blocks */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[9px] font-bold uppercase tracking-wider bg-baby-pink/50 px-2.5 py-1 text-rose-gold rounded-full">
                        {service.category} Care
                      </span>
                      <span className="text-[11px] text-soft-grey font-semibold flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 text-rose-gold" />
                        <span>{service.duration}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-charcoal">{service.title}</h3>
                    <p className="text-xs text-soft-grey leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Service Benefits List */}
                    <div className="pt-2 space-y-2">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-rose-gold">Target Treatment Benefits</div>
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-2 text-[11px] text-soft-grey">
                          <Check className="h-3.5 w-3.5 text-rose-gold shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Deep Links */}
                  <div className="pt-4 border-t border-blush-pink/40">
                    <button
                      onClick={() => handleBookNow(service.id)}
                      className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink border border-rose-gold/20 py-3 text-xs font-bold uppercase tracking-wider text-rose-gold shadow-soft hover:scale-[1.01] transform transition-all"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Elite Suite</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
