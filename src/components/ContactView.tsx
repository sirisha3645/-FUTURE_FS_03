import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Award, Landmark, Loader2, AlertCircle } from 'lucide-react';
import { submitContactMessage } from '../firebase/contact';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email';
    if (!message.trim()) errs.message = 'Please input your support inquiry';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitError('');
    setSubmitting(true);
    
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: `[Subject: ${subject}] ${message.trim()}`,
        createdAt: new Date().toISOString()
      });

      setSuccess(true);
      
      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('general');
      setMessage('');

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err: any) {
      console.error('Contact Form error:', err);
      setSubmitError('Failed to dispatch concierge message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-20 bg-warm-ivory min-h-screen">
      
      {/* Editorial Title banner */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">Concierge Access</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-charcoal leading-tight">
          Begin Your <span className="font-semibold text-rose-gold">Serene Dialogue</span>
        </h1>
        <p className="text-xs sm:text-sm text-soft-grey leading-relaxed">
          Seeking a private appointment, specific saffron or sandalwood scalp trial, or customized group packages? Send our Banjara Hills concierge a note below.
        </p>
      </section>

      {/* Grid of details & forms */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Info & mock maps module */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft">
            <h3 className="font-serif text-xl font-light text-charcoal">Saanvi Royal Lounge</h3>
            <p className="text-xs text-soft-grey leading-relaxed">
              Our flagship physical lounge is situated on Road No. 10 inside Banjara Hills, Hyderabad's boutique fashion precinct, offering guarded VIP parking suites for upcoming brides.
            </p>

            <ul className="space-y-4.5 text-xs font-semibold text-soft-grey font-sans">
              <li className="flex items-start space-x-3 text-charcoal">
                <MapPin className="h-5 w-5 text-rose-gold shrink-0 mt-0.5" />
                <span className="text-soft-grey">
                  <strong className="text-charcoal font-serif">Flagship Headquarters:</strong><br />
                  Signature Building, Road No. 10,<br />
                  Banjara Hills, Hyderabad, Telangana 500034
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#B76E79]" />
                <span className="text-charcoal font-bold">+91 98855 01034 / +91 40 40120101</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-gold" />
                <span className="text-charcoal">concierge@saanvibridallounge.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-rose-gold shrink-0 mt-0.5" />
                <span className="text-soft-grey">
                  <strong className="text-charcoal font-serif">Elite Salon Hours:</strong><br />
                  Monday - Sunday: 09:00 AM - 08:30 PM<br />
                  (Bridal suites are locked for prior booked consultations on weekends)
                </span>
              </li>
            </ul>
          </div>

          {/* Interactive Google Map Mock Representation */}
          <div className="relative h-64 overflow-hidden rounded-3xl border border-blush-pink shadow-soft group">
            
            {/* styled vector elements simulating an elegant high contrast road mapping */}
            <div className="absolute inset-0 bg-[#FFFDF9] flex flex-col justify-between p-6">
              
              {/* Fake styled maps layout coordinates lines */}
              <div className="absolute top-1/3 left-0 w-full h-[1px] bg-blush-pink/65" />
              <div className="absolute top-2/3 left-0 w-full h-[1px] bg-blush-pink/65" />
              <div className="absolute top-0 left-1/3 w-[1px] h-full bg-blush-pink/65" />
              <div className="absolute top-0 left-2/3 w-[1px] h-full bg-blush-pink/65" />

              {/* Park gardens */}
              <div className="absolute top-4 left-6 h-12 w-28 bg-baby-pink border border-rose-gold/20 rounded-xl flex items-center justify-center text-[10px] text-rose-gold font-sans font-bold uppercase tracking-wider">
                Banjara Gardens
              </div>

              {/* Landmark location of suite */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-1 z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-baby-pink text-rose-gold border border-rose-gold/25 shadow-md animate-pulse">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="bg-white text-rose-gold border border-blush-pink text-[9px] font-sans font-bold rounded-lg px-2.5 py-1 whitespace-nowrap uppercase tracking-widest shadow-xs">
                  Saanvi Luxury Lounge
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-[9px] font-sans font-semibold text-soft-grey">
                Coordinate: 17.4156° N | 78.4348° E
              </div>
            </div>
            
            {/* Visual Hover cover directing to Google Maps */}
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer" 
              className="absolute inset-0 bg-[#F8D7E3]/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-rose-gold space-y-2 z-20 cursor-pointer"
            >
              <Landmark className="h-8 w-8 text-rose-gold" />
              <span className="font-sans text-[10px] tracking-widest uppercase font-extrabold">Open Google directions</span>
            </a>

          </div>

        </div>

        {/* Contact Form module card */}
        <div className="lg:col-span-7 bg-white border border-blush-pink rounded-3xl p-6 sm:p-10 shadow-soft space-y-6">
          <h3 className="font-serif text-2xl font-light text-charcoal pb-3 border-b border-blush-pink/70">Send Concierge Message</h3>
          
          {success ? (
            <div className="bg-baby-pink/40 border border-rose-gold/15 p-6 rounded-2xl text-center space-y-3 animate-fade-in shadow-xs">
              <CheckCircle2 className="h-8 w-8 text-rose-gold mx-auto animate-bounce" />
              <h4 className="font-serif text-lg font-bold text-charcoal">Concierge Inquiry Received Successfully!</h4>
              <p className="text-xs text-soft-grey leading-relaxed">
                Thank you for initiating conversation. A booking ledger manager will review your styling details and reply to your inbox shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Your Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal shadow-xs" htmlFor="contact-name">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder="Enter full name..."
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
                  />
                  {errors.name && <span className="text-[10px] text-red-500">{errors.name}</span>}
                </div>

                {/* Email address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal" htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Phone number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal" htmlFor="contact-phone">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    placeholder="+91 98855 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
                  />
                </div>

                {/* Subject type */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal" htmlFor="contact-subject">Topic / Subject</label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45 cursor-pointer"
                  >
                    <option value="general">General Bridal Inquiries</option>
                    <option value="bridal">Group Pre-Wedding Consultation</option>
                    <option value="skincare">Vedic Cellular Skin Program</option>
                    <option value="membership">Elite Member subscription details</option>
                  </select>
                </div>

              </div>

              {/* Message text */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="contact-message">Detailed Message Notes</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Share details about your wedding date, design preference, entourage group scale, or allergy symptoms..."
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(p => ({ ...p, message: '' })); }}
                  className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45 resize-none"
                />
                {errors.message && <span className="text-[10px] text-red-500">{errors.message}</span>}
              </div>

              {submitError && (
                <div className="flex items-start space-x-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600 animate-pulse">
                  <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Pill shaped primary submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold font-bold uppercase tracking-wider text-xs border border-rose-gold/20 py-4 shadow-soft hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-65 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Dispatching inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Concierge Request</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </section>

    </div>
  );
}
