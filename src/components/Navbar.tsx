/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Menu, X, Sparkles, LayoutDashboard, Calculator, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Salon' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'blog', label: 'Magazine' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blush-pink bg-warm-ivory/95 backdrop-blur-md transition-all duration-300 shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <button 
          onClick={() => handleNavClick('home')}
          className="group flex items-center space-x-2.5 text-left"
          id="nav-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-baby-pink via-blush-pink to-rose-gold shadow-md shadow-rose-gold/10 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-5 w-5 text-rose-gold" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-widest text-charcoal uppercase block leading-none">
              SAANVI
            </span>
            <span className="block text-[8.5px] tracking-[0.3em] font-semibold text-rose-gold uppercase mt-1">
              Royal Bridal Lounge
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 hover:text-rose-gold ${
                currentPage === item.id 
                  ? 'text-rose-gold' 
                  : 'text-soft-grey'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-rose-gold rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Dynamic Utilities & Controls */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Premium Quiz Link - styled as secondary button: white background, rose-gold border */}
          <button
            onClick={() => handleNavClick('quiz')}
            className={`flex h-10 items-center space-x-1.5 rounded-full px-5 text-xs font-semibold border transition-all duration-300 ${
              currentPage === 'quiz'
                ? 'bg-baby-pink border-rose-gold text-rose-gold shadow-sm'
                : 'bg-white border border-rose-gold text-rose-gold hover:bg-baby-pink/30 hover:scale-[1.01]'
            }`}
            id="btn-quiz-nav"
          >
            <Sparkles className="h-3.5 w-3.5 text-soft-gold" />
            <span>AI Quiz</span>
          </button>

          {/* Booking Shortcut Button - styled as primary button: baby pink gradient, pill shape, hover lift */}
          <button
            onClick={() => handleNavClick('booking')}
            className="flex h-10 items-center space-x-1.5 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink px-5 text-xs font-bold text-rose-gold shadow-soft hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transform transition-all duration-300 border border-rose-gold/20"
            id="btn-book-nav"
          >
            <Calendar className="h-3.5 w-3.5 text-rose-gold" />
            <span>Book Royal Slot</span>
          </button>

          {/* Admin Toggle Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
              currentPage === 'admin'
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'border-rose-gold/20 bg-white text-rose-gold hover:bg-baby-pink/25'
            }`}
            title="Admin Dashboard"
            id="btn-admin-nav"
          >
            <LayoutDashboard className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => handleNavClick('booking')}
            className="flex h-9 items-center space-x-1 px-3 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-[10px] font-bold text-rose-gold shadow-sm border border-rose-gold/20"
          >
            <Calendar className="h-3 w-3" />
            <span>Book</span>
          </button>

          <button
            onClick={() => handleNavClick('admin')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-gold/20 bg-white text-rose-gold"
          >
            <LayoutDashboard className="h-4 w-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-baby-pink text-rose-gold focus:outline-none"
            aria-label="Toggle mobile menu"
            id="hamburger-btn"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Hamburger Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="sm:hidden border-t border-blush-pink bg-warm-ivory px-4 pt-2 pb-6 space-y-1.5 transition-all duration-300 shadow-xl max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full rounded-lg px-4 py-2.5 text-left text-xs font-semibold tracking-wider uppercase transition-all ${
                currentPage === item.id
                  ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border-l-4 border-rose-gold pl-3'
                  : 'text-charcoal hover:bg-baby-pink/20'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-blush-pink flex flex-col space-y-2">
            <button
              onClick={() => handleNavClick('quiz')}
              className="flex w-full items-center justify-center space-x-2 rounded-full bg-white border border-rose-gold py-2.5 text-xs font-bold text-rose-gold"
            >
              <Sparkles className="h-3.5 w-3.5 text-soft-gold" />
              <span>AI Wedding Beauty Quiz</span>
            </button>
            <button
              onClick={() => handleNavClick('booking')}
              className="flex w-full items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink py-2.5 text-xs font-extrabold text-rose-gold shadow-soft border border-rose-gold/10"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Appointment Now</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
