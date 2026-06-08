import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Scissors, MessageSquare, CheckCircle, Flame, Gift, Loader2, AlertCircle } from 'lucide-react';
import { servicesData, stylistsData } from '../data/salonData';
import { Booking } from '../types';
import { createBooking } from '../firebase/booking';

interface BookingViewProps {
  selectedServiceId: string;
  setSelectedServiceId: (id: string) => void;
  onAddBooking: (booking: Booking) => void;
  setCurrentPage: (page: string) => void;
}

export default function BookingView({ selectedServiceId, setSelectedServiceId, onAddBooking, setCurrentPage }: BookingViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState(selectedServiceId || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stylistId, setStylistId] = useState('');
  const [notes, setNotes] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Available slots array
  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  // Block yesterday's and previous dates
  const todayString = new Date().toISOString().split('T')[0];

  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Validate details
    if (!name.trim()) errors.name = 'Full name is required';
    if (!phone.trim() || phone.length < 8) errors.phone = 'Valid phone is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
    if (!serviceId) errors.service = 'Please select a salon service';
    if (!date) errors.date = 'Appointment date is required';
    if (!time) errors.time = 'Appointment time is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setErrorText('');
    setSubmitting(true);

    // Retrieve service specs
    const matchedService = servicesData.find(s => s.id === serviceId);
    const matchedStylist = stylistsData.find(st => st.id === stylistId);

    const serviceName = matchedService ? matchedService.title : 'General Wellness Appointment';
    const servicePrice = matchedService ? matchedService.price : 6000;
    const stylistName = matchedStylist ? matchedStylist.name : 'First Available Expert';

    const newBooking: Omit<Booking, 'id'> = {
      customerName: name,
      phone,
      email,
      serviceId,
      serviceName,
      stylistId: stylistId || 'any',
      stylistName,
      date,
      time,
      notes,
      status: 'pending',
      price: servicePrice,
      createdAt: new Date().toISOString()
    };

    try {
      const createdId = await createBooking(newBooking);
      const bookingRecord: Booking = {
        id: createdId,
        ...newBooking
      };
      
      // Save locally to display checkmark confirmation details
      setCreatedBooking(bookingRecord);
      setIsSuccess(true);

      // Trigger potential parent state additions
      onAddBooking(bookingRecord);

      // Reset controls
      setName('');
      setPhone('');
      setEmail('');
      setServiceId('');
      setSelectedServiceId('');
      setDate('');
      setTime('');
      setStylistId('');
      setNotes('');
    } catch (err: any) {
      console.error('Firebase Booking Error:', err);
      setErrorText('Failed to transmit reservation securely to Firestore. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in bg-warm-ivory min-h-screen">
      
      {/* 1. Introductory Titles */}
      <div className="text-center space-y-4 mb-12">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-rose-gold block">
          Online Placement Calendar
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-charcoal leading-tight">
          Secure Your <span className="font-semibold text-rose-gold font-serif">Luxury Bridal Slot</span>
        </h1>
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-soft-grey leading-relaxed">
          Book instantly. All weekend appointments feature our complimentary jasmine infusion drinks, premium floral garlands, and VIP consultation services at Banjara Hills, Hyderabad.
        </p>
      </div>

      {isSuccess && createdBooking ? (
        /* Success container showing complete details */
        <div className="rounded-3xl border border-blush-pink bg-white p-8 sm:p-12 text-center space-y-6 shadow-soft animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-baby-pink text-rose-gold border border-rose-gold/20 animate-bounce">
            <CheckCircle className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-charcoal">Appointment Register Success!</h2>
            <p className="text-xs text-soft-grey leading-relaxed">
              Dearest <span className="font-bold text-rose-gold">{createdBooking.customerName}</span>, your royal reservation receipt and digital calendar invite has been dispatched to <span className="font-semibold">{createdBooking.email}</span>.
            </p>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-warm-ivory border border-blush-pink rounded-2xl p-6 text-left max-w-md mx-auto space-y-3.5 shadow-xs">
            <div className="text-[10px] font-bold text-rose-gold uppercase tracking-widest border-b border-blush-pink/60 pb-2">Reservation Ticket Details</div>
            <div className="text-sm font-bold text-charcoal">{createdBooking.serviceName}</div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block text-soft-grey text-[10px] font-semibold uppercase tracking-wider">Expert Stylist</span>
                <span className="font-bold text-charcoal">{createdBooking.stylistName}</span>
              </div>
              <div>
                <span className="block text-soft-grey text-[10px] font-semibold uppercase tracking-wider">Est. Fee</span>
                <span className="font-bold text-rose-gold">₹{createdBooking.price.toLocaleString('en-IN')}</span>
              </div>
              <div>
                <span className="block text-soft-grey text-[10px] font-semibold uppercase tracking-wider font-sans">Date</span>
                <span className="font-bold text-charcoal">{createdBooking.date}</span>
              </div>
              <div>
                <span className="block text-soft-grey text-[10px] font-semibold uppercase tracking-wider">Work Hour</span>
                <span className="font-bold text-charcoal">{createdBooking.time}</span>
              </div>
            </div>
            {createdBooking.notes && (
              <div className="pt-2 border-t border-blush-pink/60">
                <span className="block text-rose-gold uppercase text-[9px] font-bold">Special Care Instructions</span>
                <p className="text-[11px] text-soft-grey leading-relaxed italic">"{createdBooking.notes}"</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsSuccess(false)}
              className="rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/25 px-8 py-3 text-xs font-bold uppercase tracking-wider"
            >
              Book Another Session
            </button>
            <button
              onClick={() => { setCurrentPage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-rose-gold hover:underline uppercase tracking-wider"
            >
              Examine Bookings Ledger
            </button>
          </div>
        </div>
      ) : (
        /* The Booking Appointment Form */
        <form onSubmit={handleFormSubmit} className="bg-white border border-blush-pink rounded-3xl p-6 sm:p-10 shadow-soft space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-blush-pink/60">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79]">1. Customer Details</h3>
              
              {/* Full Name field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="booking-name">Full Name</label>
                <div className="relative flex items-center border rounded-xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60">
                  <User className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5" />
                  <input
                    type="text"
                    id="booking-name"
                    placeholder="Enter full name..."
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (formErrors.name) setFormErrors(p => ({ ...p, name: '' })); }}
                    className="w-full bg-transparent text-xs text-charcoal placeholder-soft-grey/60 focus:outline-none"
                  />
                </div>
                {formErrors.name && <span className="text-[10px] text-red-500">{formErrors.name}</span>}
              </div>

              {/* Phone Number field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="booking-phone">Phone Number</label>
                <div className="relative flex items-center border rounded-xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60">
                  <Phone className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5" />
                  <input
                    type="tel"
                    id="booking-phone"
                    placeholder="Enter mobile..."
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); if (formErrors.phone) setFormErrors(p => ({ ...p, phone: '' })); }}
                    className="w-full bg-transparent text-xs text-charcoal placeholder-soft-grey/60 focus:outline-none"
                  />
                </div>
                {formErrors.phone && <span className="text-[10px] text-red-500">{formErrors.phone}</span>}
              </div>

              {/* Email Address field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="booking-email">Email Address</label>
                <div className="relative flex items-center border rounded-xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60">
                  <Mail className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5" />
                  <input
                    type="email"
                    id="booking-email"
                    placeholder="yourname@domain.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (formErrors.email) setFormErrors(p => ({ ...p, email: '' })); }}
                    className="w-full bg-transparent text-xs text-charcoal placeholder-soft-grey/60 focus:outline-none"
                  />
                </div>
                {formErrors.email && <span className="text-[10px] text-red-500">{formErrors.email}</span>}
              </div>

            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79]">2. Treatment & Artisan Selection</h3>
              
              {/* Service Selection dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="booking-service">Service Treatment Package</label>
                <div className="relative flex items-center border rounded-xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60">
                  <Scissors className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5" />
                  <select
                    id="booking-service"
                    value={serviceId}
                    onChange={(e) => { setServiceId(e.target.value); if (formErrors.service) setFormErrors(p => ({ ...p, service: '' })); }}
                    className="w-full bg-transparent text-xs text-charcoal focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    <option value="">Select Curated treatment...</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (₹{s.price.toLocaleString('en-IN')} - {srvCategoryLabel(s.category)})
                      </option>
                    ))}
                  </select>
                </div>
                {formErrors.service && <span className="text-[10px] text-red-500">{formErrors.service}</span>}
              </div>

              {/* Stylist Selection dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="booking-stylist">Prefer Specialty Artisan</label>
                <div className="relative flex items-center border rounded-xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60">
                  <User className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5" />
                  <select
                    id="booking-stylist"
                    value={stylistId}
                    onChange={(e) => setStylistId(e.target.value)}
                    className="w-full bg-transparent text-xs text-charcoal focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    <option value="">First Available Master Artisan</option>
                    {stylistsData.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Promotional banners, loyalty rewards hint inside the form */}
              <div className="rounded-2xl border border-blush-pink bg-baby-pink/35 p-3.5 flex items-start space-x-2.5">
                <Gift className="h-4.5 w-4.5 text-rose-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-soft-grey leading-normal">
                  Our bookings register automatically inside Saanvi's elite ledger system to accumulate <span className="font-bold text-rose-gold border-b border-rose-gold">200 Bonus Glow Points</span> immediately upon check-in!
                </p>
              </div>

            </div>
          </div>

          {/* Time and details scheduling block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79]">3. Live Time-Slot Reservation</h3>
              <div className="grid grid-cols-1 gap-4">
                
                {/* Date Picker */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-charcoal" htmlFor="booking-date">Target Date</label>
                  <div className="relative flex items-center border rounded-xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60">
                    <Calendar className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5" />
                    <input
                      type="date"
                      id="booking-date"
                      min={todayString}
                      value={date}
                      onChange={(e) => { setDate(e.target.value); if (formErrors.date) setFormErrors(p => ({ ...p, date: '' })); }}
                      className="w-full bg-transparent text-xs text-charcoal focus:outline-none cursor-pointer"
                    />
                  </div>
                  {formErrors.date && <span className="text-[10px] text-red-500">{formErrors.date}</span>}
                </div>

                {/* Time Picker */}
                <div className="space-y-1 bg-warm-ivory border border-blush-pink p-3.5 rounded-2xl">
                  <label className="text-xs font-bold text-charcoal block mb-2">Available Work Hour</label>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {availableTimes.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => { setTime(item); if (formErrors.time) setFormErrors(p => ({ ...p, time: '' })); }}
                        className={`rounded-full py-1.5 text-center text-[10px] font-bold tracking-wide transition-all ${
                          time === item
                            ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/25 font-bold scale-102 shadow-xs'
                            : 'bg-white border border-blush-pink text-soft-grey hover:bg-baby-pink/20 hover:text-rose-gold'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  {formErrors.time && <span className="text-[10px] text-red-500 block mt-1">{formErrors.time}</span>}
                </div>

              </div>
            </div>

            {/* Notes Field */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79]">4. Custom Request Log</h3>
              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal" htmlFor="booking-notes">Detailed Instructions & Allergens</label>
                <div className="relative flex items-start border rounded-2xl bg-warm-ivory px-3.5 py-2.5 border-blush-pink/60 h-44">
                  <MessageSquare className="h-4.5 w-4.5 text-rose-gold shrink-0 mr-2.5 mt-0.5" />
                  <textarea
                    id="booking-notes"
                    placeholder="We customize everything. Mention any skin considerations, favorite traditional flower requests (jasmine/marigold/rose), or scheduling alerts..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent text-xs text-charcoal placeholder-soft-grey/60 focus:outline-none resize-none h-full"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-blush-pink/60 space-y-4">
            {errorText && (
              <div className="flex items-start space-x-2 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600">
                <AlertCircle className="h-4.5 w-4.5 text-red-550 shrink-0 mt-0.5" />
                <span>{errorText}</span>
              </div>
            )}

            {/* Primary gradient pill button with hover zoom */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold text-xs uppercase tracking-wider font-extrabold border border-rose-gold/25 py-4 shadow-soft hover:scale-[1.01] active:scale-98 transition-all disabled:opacity-60 cursor-pointer"
              id="booking-submit-button"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting Secure Verification...</span>
                </>
              ) : (
                <span>Verify & Book Curated Slot</span>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
}

// category formatter
function srvCategoryLabel(cat: string): string {
  switch(cat) {
    case 'hair': return 'Hair Care';
    case 'skin': return 'Clinical Skin';
    case 'makeup': return 'Cosmetics';
    case 'nails': return 'Gel Nail Art';
    case 'spa': return 'Body Spa';
    default: return 'Curated Luxury';
  }
}
