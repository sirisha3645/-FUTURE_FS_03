import React, { useState } from 'react';
import { Search, BookOpen, Clock, ArrowLeft, Tag, X, User } from 'lucide-react';
import { blogData } from '../data/salonData';
import { BlogPost } from '../types';

export default function BlogView() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected single article to show full read view
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Hair Care', 'Skincare', 'Makeup Trends'];

  const filteredBlogs = blogData.filter((post) => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-16 bg-warm-ivory min-h-screen">
      
      {selectedArticle ? (
        /* Detailed FULL ARTICLE Read Mode */
        <article className="max-w-3xl mx-auto space-y-8 pb-12 animate-fade-in font-sans" id="full-article-reader">
          
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-rose-gold hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Magazine Ledger</span>
          </button>

          {/* Banner */}
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft border border-blush-pink bg-white">
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title} 
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-xs">
              <span className="font-sans bg-baby-pink text-rose-gold font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-gold/15">
                {selectedArticle.category}
              </span>
              <span className="text-soft-grey font-mono">{selectedArticle.date}</span>
              <span className="text-blush-pink">&bull;</span>
              <span className="text-soft-grey font-mono flex items-center space-x-1">
                <Clock className="h-3 w-3 text-rose-gold" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-light text-charcoal leading-tight">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center space-x-2 border-y py-3 border-blush-pink/60">
              <div className="h-8 w-8 rounded-full bg-baby-pink border border-rose-gold/20 text-rose-gold font-bold flex items-center justify-center text-xs">
                {selectedArticle.author[0]}
              </div>
              <span className="text-xs font-bold text-charcoal">Written by {selectedArticle.author} &bull; Senior Artisan</span>
            </div>
          </div>

          {/* Core Content paragraphs */}
          <div className="text-xs sm:text-sm text-charcoal leading-relaxed space-y-6">
            <p className="font-bold text-charcoal text-sm">{selectedArticle.summary}</p>
            {selectedArticle.content.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-blush-pink/60 animate-fade-in">
            {selectedArticle.tags.map((tag) => (
              <span key={tag} className="flex items-center text-xs font-bold font-mono text-rose-gold bg-baby-pink px-3 py-1 rounded-lg border border-rose-gold/10">
                <Tag className="h-3 w-3 mr-1" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>

        </article>
      ) : (
        /* LISTING IN OVERVIEW VIEW */
        <>
          {/* Header titles */}
          <section className="text-center space-y-4 font-sans">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Saanvi Magazine</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
              The Indian Bridal <span className="font-semibold text-rose-gold">Editorial Hub</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
              Curated guides, saffron-mix recipes, floral braid secrets, and skin routines written directly by our founder Saanvi Reddy and our senior artisans.
            </p>
          </section>

          {/* Controls bar (Search & category buttons) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-blush-pink/60 pb-8 font-sans">
            <div className="lg:col-span-8 flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/25 shadow-xs font-extrabold'
                      : 'bg-white border border-blush-pink text-soft-grey hover:text-[#B76E79] hover:bg-baby-pink/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="lg:col-span-4 max-w-sm w-full mx-auto">
              <div className="relative flex items-center border rounded-full bg-white px-3.5 py-2.5 border-blush-pink shadow-xs">
                <Search className="h-4.5 w-4.5 text-rose-gold mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search articles & hair tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-charcoal placeholder-soft-grey focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Core grids of articles */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-sans">
            {filteredBlogs.map((post) => (
              <div 
                key={post.id}
                onClick={() => { setSelectedArticle(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-blush-pink bg-white shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                id={`blog-card-${post.id}`}
              >
                <div className="relative aspect-[16/10] bg-warm-ivory overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/95 border border-blush-pink px-3 py-1 text-[9.5px] font-bold text-rose-gold font-sans tracking-widest uppercase">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-1 text-[10px] text-soft-grey font-mono font-bold uppercase">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span className="flex items-center"><Clock className="h-3 w-3 text-rose-gold mr-0.5" /> {post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-charcoal leading-snug group-hover:text-rose-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-soft-grey leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-blush-pink/60 flex items-center justify-between text-xs font-semibold">
                    <span className="text-soft-grey italic truncate text-[11px]">by {post.author}</span>
                    <span className="text-rose-gold font-bold uppercase tracking-wider flex items-center space-x-1 text-[10px] hover:underline">
                      <span>Read Guide</span>
                      <BookOpen className="h-3.5 w-3.5 text-rose-gold" />
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </section>
        </>
      )}

    </div>
  );
}
