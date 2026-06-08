/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import BookingView from './components/BookingView';
import GalleryView from './components/GalleryView';
import TestimonialsView from './components/TestimonialsView';
import PricingView from './components/PricingView';
import BlogView from './components/BlogView';
import FaqView from './components/FaqView';
import ContactView from './components/ContactView';
import PremiumAIQuiz from './components/PremiumAIQuiz';
import PremiumCostCalculator from './components/PremiumCostCalculator';
import AdminDashboard from './components/AdminDashboard';
import { Booking } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('glow_dark_mode') === 'true';
  });

  // Load and store bookings statefully
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const local = localStorage.getItem('glow_bookings');
    if (local) return JSON.parse(local);
    // Return high quality preloaded bookings to make Admin Dashboard instantly exciting
    return [
      {
        id: 'b-default-1',
        customerName: 'Aishwarya Sen',
        phone: '+91 98480 22338',
        email: 'aishwarya@sen.example.in',
        serviceId: 'hair-coloring',
        serviceName: 'French Balayage & Royal Highlights',
        stylistId: 's2',
        stylistName: 'Ananya Rao',
        date: '2026-06-12',
        time: '10:00 AM',
        notes: 'Enjoys premium jasmine tea. Requires seamless root shadow melt.',
        status: 'confirmed',
        price: 8500,
        createdAt: new Date().toISOString()
      },
      {
        id: 'b-default-2',
        customerName: 'Priya Naidu',
        phone: '+91 91212 55431',
        email: 'priya.naidu@studio.example.in',
        serviceId: 'facials',
        serviceName: 'HydraGlow Advanced Infusion Facial',
        stylistId: 's3',
        stylistName: 'Pooja Hegde',
        date: '2026-06-15',
        time: '02:30 PM',
        notes: 'Seeking skin lifting therapies alongside antioxidant cellular boosters before engagement day.',
        status: 'pending',
        price: 3500,
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('glow_dark_mode', String(darkMode));
  }, [darkMode]);

  // Sync bookings in local persistence
  useEffect(() => {
    localStorage.setItem('glow_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Modifying single bookings status callback
  const handleUpdateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  // Delete callback
  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // Add booking triggered inside stateful scheduler validation success
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Master Switch Page Router
  const renderActiveView = () => {
    switch (currentPage) {
      case 'about':
        return <AboutView />;
      case 'services':
        return (
          <ServicesView 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        );
      case 'booking':
        return (
          <BookingView 
            selectedServiceId={selectedServiceId}
            setSelectedServiceId={setSelectedServiceId}
            onAddBooking={handleAddBooking}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'gallery':
        return <GalleryView />;
      case 'pricing':
        return (
          <PricingView 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        );
      case 'testimonials':
        return <TestimonialsView />;
      case 'blog':
        return <BlogView />;
      case 'faq':
        return <FaqView />;
      case 'contact':
        return <ContactView />;
      case 'quiz':
        return (
          <PremiumAIQuiz 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        );
      case 'calculator':
        return (
          <PremiumCostCalculator 
            setCurrentPage={setCurrentPage} 
            setSelectedServiceId={setSelectedServiceId} 
          />
        );
      case 'admin':
        return (
          <AdminDashboard />
        );
      case 'home':
      default:
        return <HomeView setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-charcoal transition-colors duration-300">
      
      {/* Editorial Luxury Top Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-rose-gold via-blush-pink to-rose-gold text-charcoal py-2 px-4 text-center text-[10.5px] font-semibold tracking-wider uppercase flex items-center justify-center space-x-1.5 shadow-sm select-none border-b border-rose-gold/10">
        <Sparkles className="h-3 w-3 animate-pulse text-soft-gold" />
        <span className="font-sans text-xs tracking-wide">✨ Saanvi Wedding Special: Secure your Royal Muhurtham dates for this wedding season & unlock complimentary hand-crafted Saffron facial mist sprays! ✨</span>
      </div>

      {/* Main Navbar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

      {/* Dynamic Main Body Content Router Frame */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Main Footer */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
