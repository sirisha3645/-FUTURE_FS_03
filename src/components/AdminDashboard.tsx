import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Check,
  X,
  Calendar,
  DollarSign,
  Users,
  Trash,
  Plus,
  Lock,
  Unlock,
  LogOut,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Booking, ServiceItem } from '../types';
import { servicesData } from '../data/salonData';
import { loginAdmin, logoutAdmin, subscribeAuthState } from '../firebase/auth';
import {
  subscribeBookings,
  updateBookingStatus,
  deleteBooking
} from '../firebase/booking';
import {
  subscribeContactMessages,
  deleteContactMessage,
  ContactMessage
} from '../firebase/contact';
import {
  subscribeSubscribers,
  deleteSubscriber,
  Subscriber
} from '../firebase/newsletter';
import { User as FirebaseUser } from 'firebase/auth';

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Admin Data States
  const [activeTab, setActiveTab] = useState<'appointments' | 'customers' | 'services' | 'messages' | 'subscribers'>('appointments');
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState('');

  // Notifications
  const [actionNotification, setActionNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Service list locally modifiable
  const [services, setServices] = useState<ServiceItem[]>(servicesData);
  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvPrice, setNewSrvPrice] = useState(3500);
  const [newSrvCategory, setNewSrvCategory] = useState<'hair' | 'skin' | 'makeup' | 'nails' | 'spa' | 'bridal' | 'mehendi'>('makeup');

  // Track auth changes
  useEffect(() => {
    const unsubscribe = subscribeAuthState((currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to real-time collections when logged in
  useEffect(() => {
    if (!user) {
      setAppointments([]);
      setContactMessages([]);
      setSubscribers([]);
      return;
    }

    setLoadingData(true);
    setDataError('');

    const unsubBookings = subscribeBookings((data) => {
      setAppointments(data);
      setLoadingData(false);
    }, (err) => {
      console.error('Bookings Stream Error:', err);
      setDataError('Permission Denied or database access error loading appointments.');
      setLoadingData(false);
    });

    const unsubMessages = subscribeContactMessages((data) => {
      setContactMessages(data);
    }, (err) => {
      console.error('Messages Stream Error:', err);
    });

    const unsubSubscribers = subscribeSubscribers((data) => {
      setSubscribers(data);
    }, (err) => {
      console.error('Subscribers Stream Error:', err);
    });

    return () => {
      unsubBookings();
      unsubMessages();
      unsubSubscribers();
    };
  }, [user]);

  // Handle Login Form Submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please complete all identification fields.');
      return;
    }

    setLoginError('');
    setLoginSuccess('');
    setLoginSubmitting(true);

    try {
      await loginAdmin(loginEmail.trim(), loginPassword);
      setLoginSuccess('Access authorized! Welcome back, stylist.');
    } catch (err: any) {
      console.error('Login Failed:', err);
      let friendlyMessage = 'Invalid credentials or connection issue.';
      if (err.code === 'auth/invalid-credential') {
        friendlyMessage = 'Invalid email or administrator password.';
      } else if (err.code === 'auth/user-not-found') {
        friendlyMessage = 'No administrator record found on this project.';
      } else if (err.code === 'auth/wrong-password') {
        friendlyMessage = 'Combination of password & email matches incorrectly.';
      }
      setLoginError(friendlyMessage);
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Handle Signing Out
  const handleSignOut = async () => {
    try {
      await logoutAdmin();
      showNotification('success', 'Logged out successfully');
    } catch (err) {
      console.error('Sign Out Failed:', err);
      showNotification('error', 'Failed to end session securely.');
    }
  };

  // Utility to brief notifications
  const showNotification = (type: 'success' | 'error', message: string) => {
    setActionNotification({ type, message });
    setTimeout(() => {
      setActionNotification(null);
    }, 4005);
  };

  // Handle status updating
  const handleStatusChange = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await updateBookingStatus(id, status);
      showNotification('success', `Appointment marked as ${status} successfully.`);
    } catch (err) {
      console.error('Failed status change:', err);
      showNotification('error', 'Operation failed. Verify security rules.');
    }
  };

  // Handle booking deletion
  const handleBookingDelete = async (id: string) => {
    if (!window.confirm('Are you absolutely certain you wish to delete this appointment slot database record?')) {
      return;
    }
    try {
      await deleteBooking(id);
      showNotification('success', 'Appointment slot purged successfully.');
    } catch (err) {
      console.error('Delete Booking failed:', err);
      showNotification('error', 'Failed to purge booking record.');
    }
  };

  // Handle message deletion
  const handleMessageDelete = async (id: string) => {
    if (!window.confirm('Delete this user contact query from history permanently?')) {
      return;
    }
    try {
      await deleteContactMessage(id);
      showNotification('success', 'Contact query purged successfully.');
    } catch (err) {
      console.error('Delete message failed:', err);
      showNotification('error', 'Failed to purge contact message.');
    }
  };

  // Handle subscriber deletion
  const handleSubscriberDelete = async (email: string) => {
    if (!window.confirm(`Remove subscription profile for ${email}?`)) {
      return;
    }
    try {
      await deleteSubscriber(email);
      showNotification('success', 'Subscriber profile removed.');
    } catch (err) {
      console.error('Delete subscriber failed:', err);
      showNotification('error', 'Failed to remove subscriber.');
    }
  };

  // Service Addition Setup
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle.trim()) return;

    const newSrv: ServiceItem = {
      id: `s-${Date.now()}`,
      title: newSrvTitle,
      category: newSrvCategory,
      price: newSrvPrice,
      duration: '45 mins',
      description: 'Luxury treatment configured through administrative dashboard.',
      benefits: ['Customized professional results', 'Nourishing botanical formulation'],
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400'
    };

    setServices(prev => [...prev, newSrv]);
    setNewSrvTitle('');
    setNewSrvPrice(3500);
    showNotification('success', 'Service catalog rule added locally.');
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showNotification('success', 'Service catalog rule removed locally.');
  };

  // Stats Counters
  const countTotalAppointments = appointments.length;
  const countUpcoming = appointments.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  const countCompleted = appointments.filter(b => b.status === 'confirmed' && new Date(b.date) < new Date()).length;
  const activeRevenueVal = appointments.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0);

  // Loading Session Guard
  if (checkingAuth) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 bg-warm-ivory">
        <Loader2 className="h-10 w-10 animate-spin text-rose-gold" />
        <p className="text-[10px] font-sans font-bold tracking-widest text-[#B76E79] uppercase">Loading Saanvi tokens...</p>
      </div>
    );
  }

  // --- 1. RENDER PREMIUM LOGIN ROUTE GUARD ---
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 animate-fade-in bg-warm-ivory min-h-screen flex items-center justify-center">
        <div className="rounded-3xl border border-blush-pink bg-white p-8 shadow-soft space-y-8 w-full">
          
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-baby-pink text-rose-gold border border-rose-gold/20">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="font-serif text-2xl font-light text-charcoal">
              Studio <span className="font-semibold text-rose-gold">Luxe Guard</span>
            </h2>
            <p className="text-[11px] text-soft-grey tracking-wide leading-relaxed px-2">
              Enter credentials to securely authenticate into the Banjara Hills admin reservation register.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {loginError && (
              <div className="flex items-start space-x-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-600">
                <AlertCircle className="h-4.5 w-4.5 text-red-550 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {loginSuccess && (
              <div className="flex items-start space-x-2 rounded-xl bg-baby-pink border border-rose-gold/15 p-3.5 text-xs text-rose-gold">
                <CheckCircle2 className="h-4.5 w-4.5 text-rose-gold shrink-0 mt-0.5" />
                <span>{loginSuccess}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-charcoal" htmlFor="admin-email">Admin Username</label>
              <input
                type="email"
                id="admin-email"
                required
                disabled={loginSubmitting}
                placeholder="sirsha3645@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-charcoal" htmlFor="admin-pass">Security Token Code</label>
              <input
                type="password"
                id="admin-pass"
                required
                disabled={loginSubmitting}
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-xs rounded-xl border border-blush-pink bg-warm-ivory px-3.5 py-2.5 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold border border-rose-gold/20 py-3.5 text-xs font-bold uppercase tracking-wider shadow-soft transition-all duration-300 disabled:opacity-60 cursor-pointer"
            >
              {loginSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Unlocking Lounge Hub...</span>
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4" />
                  <span>Decrypt Ledger Screen</span>
                </>
              )}
            </button>

          </form>

          <div className="border-t border-blush-pink pt-4 text-center">
            <span className="text-[9px] text-[#B76E79] font-sans font-bold tracking-widest block uppercase">Banjara Hills, Hyderabad Hub</span>
          </div>

        </div>
      </div>
    );
  }

  // --- 2. RENDER THE PRIMARY SECURE ADMIN CONSOLE ---
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12 bg-warm-ivory min-h-screen">
      
      {/* Toast Notification HUD */}
      {actionNotification && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-3 rounded-2xl border px-5 py-3.5 shadow-lg bg-white border-blush-pink text-rose-gold animate-slide-up">
          <CheckCircle2 className="h-5 w-5 text-rose-gold shrink-0" />
          <span className="text-xs font-semibold">{actionNotification.message}</span>
        </div>
      )}

      {/* Header Segments */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6 border-blush-pink">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-baby-pink to-blush-pink border border-rose-gold/20 text-rose-gold">
            <LayoutDashboard className="h-5.5 w-5.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5 flex-wrap">
              <h1 className="font-serif text-3xl font-light text-charcoal">
                Saanvi Royal <span className="font-semibold text-rose-gold">Admin Lounge</span>
              </h1>
              <span className="rounded-full bg-rose-gold/15 px-3 py-0.5 text-[9px] font-sans tracking-widest text-[#B76E79] font-bold uppercase border border-rose-gold/10">LIVE LEDGER</span>
            </div>
            <p className="text-xs text-soft-grey mt-0.5">
              Securely authenticated as: <span className="font-bold text-charcoal">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Tab triggers & Session Out */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex flex-wrap gap-1 bg-white p-1 rounded-full border border-blush-pink shadow-xs">
            {[
              { id: 'appointments', label: 'Bookings' },
              { id: 'customers', label: 'Guests' },
              { id: 'messages', label: `Queries (${contactMessages.length})` },
              { id: 'subscribers', label: `subs (${subscribers.length})` },
              { id: 'services', label: 'rules' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-full px-4 py-1.5 text-[10.5px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-baby-pink to-blush-pink text-rose-gold shadow-xs font-extrabold'
                    : 'text-soft-grey hover:text-rose-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center space-x-1.5 rounded-full border border-blush-pink bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-rose-gold hover:bg-baby-pink/30 shadow-xs transform transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4 text-rose-gold" />
            <span>Out</span>
          </button>
        </div>
      </div>

      {/* Database sync issue error */}
      {dataError && (
        <div className="flex items-start space-x-2 rounded-2xl bg-red-50 border border-red-250 p-4 text-xs text-red-700 animate-pulse">
          <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
          <span>{dataError} - Verify Firestore rules config is active.</span>
        </div>
      )}

      {/* --- 3. CLOUD STATISTICAL OVERVIEW CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white border border-blush-pink p-5 rounded-3xl shadow-soft flex items-center space-x-4">
          <div className="h-11 w-11 rounded-2xl bg-baby-pink text-rose-gold border border-rose-gold/15 flex items-center justify-center">
            <Calendar className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="block text-[8px] text-[#B76E79] uppercase tracking-widest font-sans font-black">All Bookings</span>
            <span className="block text-xl font-black text-charcoal">
              {loadingData ? <Loader2 className="h-4 w-4 animate-spin text-rose-gold" /> : `${countTotalAppointments}`}
            </span>
            <span className="block text-[10px] text-soft-grey font-medium uppercase tracking-wider">Unresolved: {countUpcoming}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-blush-pink p-5 rounded-3xl shadow-soft flex items-center space-x-4">
          <div className="h-11 w-11 rounded-2xl bg-[#FFFDF9] text-rose-gold border border-blush-pink flex items-center justify-center">
            <span className="text-xl font-bold font-serif text-rose-gold">₹</span>
          </div>
          <div>
            <span className="block text-[8px] text-[#B76E79] uppercase tracking-widest font-sans font-black">Pipeline Value</span>
            <span className="block text-xl font-black text-rose-gold">
              ₹{activeRevenueVal.toLocaleString('en-IN')}
            </span>
            <span className="block text-[10px] text-soft-grey font-semibold uppercase tracking-wider">Approved Only</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-blush-pink p-5 rounded-3xl shadow-soft flex items-center space-x-4">
          <div className="h-11 w-11 rounded-2xl bg-baby-pink text-rose-gold border border-rose-gold/15 flex items-center justify-center">
            <MessageSquare className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="block text-[8px] text-[#B76E79] uppercase tracking-widest font-sans font-black">Client Inquiries</span>
            <span className="block text-xl font-black text-charcoal">{contactMessages.length}</span>
            <span className="block text-[10px] text-soft-grey font-semibold uppercase tracking-wider">Awaiting Reply</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-blush-pink p-5 rounded-3xl shadow-soft flex items-center space-x-4">
          <div className="h-11 w-11 rounded-2xl bg-[#FFFDF9] text-rose-gold border border-blush-pink flex items-center justify-center">
            <Users className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="block text-[8px] text-[#B76E79] uppercase tracking-widest font-sans font-black">Subscribers</span>
            <span className="block text-xl font-black text-charcoal">{subscribers.length}</span>
            <span className="block text-[10px] text-soft-grey font-bold uppercase tracking-wider">Mail ledger</span>
          </div>
        </div>

      </div>

      {/* --- 4. TABS VIEWS SECTION --- */}
      <div className="bg-white border border-blush-pink rounded-3xl shadow-soft overflow-hidden">
        
        {/* TAB 1: BOOKINGS */}
        {activeTab === 'appointments' && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-blush-pink/60 pb-3 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79]">Active Appointments Register</h3>
              {loadingData && <Loader2 className="h-4 w-4 animate-spin text-rose-gold" />}
            </div>
            
            {appointments.length === 0 ? (
              <div className="text-center py-20 text-soft-grey text-xs border border-dashed border-blush-pink bg-warm-ivory rounded-2xl space-y-2">
                <p>No active reservations retrieved from Firestore.</p>
                <p className="text-[10px]">Client bookings will stream live automatically as they finalize dates.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b border-blush-pink/60 text-[#B76E79] font-sans uppercase text-[9.5px] pb-3">
                      <th className="py-3">GUEST CLIENT</th>
                      <th className="py-3">SERVICE TYPE</th>
                      <th className="py-3">TARGET DATE / HOUR</th>
                      <th className="py-3 text-center">FEE</th>
                      <th className="py-3 text-center">STATE</th>
                      <th className="py-3 text-right">ACTION CONTROLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blush-pink/30 text-charcoal">
                    {appointments.map((item) => (
                      <tr key={item.id} className="hover:bg-baby-pink/10 transition-colors font-medium">
                        
                        {/* Guest details */}
                        <td className="py-4 space-y-0.5">
                          <div className="font-bold text-charcoal flex items-center space-x-1">
                            <span>{item.customerName}</span>
                          </div>
                          <div className="text-soft-grey text-[10px] font-mono">{item.phone} &bull; {item.email}</div>
                          {item.notes && (
                            <p className="text-[10px] text-[#B76E79] max-w-xs truncate italic mt-1 font-semibold">"{item.notes}"</p>
                          )}
                        </td>
                        
                        {/* service details */}
                        <td className="py-4">
                          <div className="font-bold text-charcoal">{item.serviceName}</div>
                          <div className="text-[10px] text-soft-grey italic">Suite Artisan: {item.stylistName}</div>
                        </td>

                        {/* calendar details */}
                        <td className="py-4 font-mono text-soft-grey">
                          <div>{item.date}</div>
                          <div className="text-rose-gold font-bold text-[10px]">{item.time}</div>
                        </td>

                        {/* fee details */}
                        <td className="py-4 font-sans font-bold text-center text-charcoal">
                          ₹{item.price.toLocaleString('en-IN')}
                        </td>

                        {/* status badge */}
                        <td className="py-4 text-center">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[8.5px] font-sans font-bold uppercase tracking-widest ${
                            item.status === 'confirmed' 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-250' 
                              : item.status === 'cancelled' 
                                ? 'bg-red-50 text-red-600 border border-red-200' 
                                : 'bg-baby-pink text-rose-gold border border-rose-gold/20'
                          }`}>
                            {item.status}
                          </span>
                        </td>

                        {/* actions */}
                        <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
                          {item.status !== 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'confirmed')}
                              className="p-1 rounded-full bg-emerald-55 border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer inline-flex items-center"
                              title="Confirm Appointment"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                          )}
                          {item.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'cancelled')}
                              className="p-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer inline-flex items-center"
                              title="Cancel Appointment"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                          <button
                            onClick={() => handleBookingDelete(item.id)}
                            className="p-1 rounded-full bg-red-50 border border-red-150 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer inline-flex items-center"
                            title="Purge record"
                          >
                            <Trash className="h-3 w-3" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CLIENT GUESTS ROSTER */}
        {activeTab === 'customers' && (
          <div className="p-4 sm:p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79] border-b border-blush-pink/60 pb-2 mb-4">Guest Customer Ledgers</h3>
            
            {appointments.length === 0 ? (
              <p className="text-xs text-soft-grey italic">No customer profiles compiled yet. Client bookings will compile ledgers automatically.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from(new Set(appointments.map(b => b.email))).map((emailIdx) => {
                  const matchB = appointments.find(b => b.email === emailIdx);
                  if (!matchB) return null;
                  return (
                    <div key={emailIdx} className="border border-blush-pink rounded-3xl p-5 space-y-3 bg-warm-ivory flex flex-col justify-between shadow-soft">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-baby-pink to-blush-pink border border-rose-gold/25 flex items-center justify-center text-rose-gold font-bold uppercase">
                            {matchB.customerName[0]}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-charcoal">{matchB.customerName}</h4>
                            <span className="text-[10px] text-soft-grey block font-mono font-semibold">{matchB.email}</span>
                          </div>
                        </div>
                        <div className="text-[10px] space-y-1 text-soft-grey border-t pt-2.5 border-blush-pink/50">
                          <div>Contact: <span className="font-bold text-charcoal">{matchB.phone}</span></div>
                          <div>Latest Room: <span className="font-bold text-rose-gold font-serif">{matchB.serviceName}</span></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT FORM SUBMISSIONS */}
        {activeTab === 'messages' && (
          <div className="p-4 sm:p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79] border-b border-blush-pink/60 pb-2 mb-4">Client Contact Queries</h3>
            
            {contactMessages.length === 0 ? (
              <div className="text-center py-20 text-soft-grey text-xs border border-dashed border-blush-pink bg-warm-ivory rounded-2xl">
                No mail queries retrieved from Firestore ledger.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="border border-blush-pink rounded-3xl p-5 bg-warm-ivory flex flex-col justify-between hover:border-rose-gold transition-colors shadow-soft">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between bg-white border border-blush-pink/40 rounded-2xl p-3">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-charcoal">{msg.name}</h4>
                          <span className="text-[10px] text-soft-grey block font-mono font-semibold">{msg.email} | {msg.phone || 'No phone'}</span>
                          <span className="inline-block text-[9px] font-sans font-bold text-rose-gold uppercase tracking-wider mt-1">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        
                        <button
                          onClick={() => msg.id && handleMessageDelete(msg.id)}
                          className="p-1 rounded-full text-rose-gold hover:bg-baby-pink border border-blush-pink/60 transition-colors"
                          title="Purge query"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="pt-1 text-xs text-charcoal leading-relaxed italic">
                        "{msg.message}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="p-4 sm:p-6 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B76E79] border-b border-blush-pink/60 pb-2 mb-4">Newsletter Subscribers</h3>
            
            {subscribers.length === 0 ? (
              <div className="text-center py-20 text-soft-grey text-xs border border-dashed border-blush-pink bg-warm-ivory rounded-2xl">
                No active subscriber profiles listed.
              </div>
            ) : (
              <div className="max-w-2xl mx-auto border border-blush-pink rounded-3xl bg-warm-ivory p-4 divide-y divide-blush-pink/45 shadow-soft">
                {subscribers.map((sub, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-charcoal flex items-center space-x-2">
                        <span>{sub.email}</span>
                      </div>
                      <span className="block text-[9px] text-[#B76E79] font-sans">Date subscribed: {new Date(sub.subscriptionDate).toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => handleSubscriberDelete(sub.email)}
                      className="text-rose-gold hover:text-red-650 p-1 bg-white border border-blush-pink/60 rounded-full transition-colors"
                      title="Purge subscription Profile"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SERVICES */}
        {activeTab === 'services' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side add form */}
            <form onSubmit={handleAddService} className="lg:col-span-4 bg-warm-ivory border border-blush-pink p-5 rounded-3xl space-y-4 h-fit shadow-soft animate-fade-in">
              <span className="text-[10px] font-bold tracking-widest text-rose-gold uppercase font-sans">Catalog Rules</span>
              <h4 className="font-serif text-sm font-bold text-charcoal">Inject Custom Service Item</h4>
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-charcoal">Curated Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Mehendi Suite"
                  value={newSrvTitle}
                  onChange={(e) => setNewSrvTitle(e.target.value)}
                  className="w-full text-xs rounded-xl border border-blush-pink bg-white px-3 py-2 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-charcoal">Category</label>
                  <select
                    value={newSrvCategory}
                    onChange={(e) => setNewSrvCategory(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-white px-2 py-2 text-charcoal focus:outline-none focus:ring-0 cursor-pointer"
                  >
                    <option value="makeup"> bridal makeup</option>
                    <option value="hair">Hair Style</option>
                    <option value="skin">Facials</option>
                    <option value="nails">Nail Art</option>
                    <option value="mehendi">Mehendi Hand</option>
                    <option value="spa">Body Rest</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-charcoal">Fee (₹)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newSrvPrice}
                    onChange={(e) => setNewSrvPrice(parseInt(e.target.value) || 2500)}
                    className="w-full text-xs rounded-xl border border-blush-pink bg-white px-3.5 py-2 text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-gold/45"
                  />
                </div>
              </div>

              {/* Pill button shape */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-1.5 rounded-full bg-gradient-to-r from-baby-pink to-blush-pink border border-rose-gold/15 py-2.5 text-xs font-bold text-rose-gold shadow-xs hover:scale-[1.01] transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Inject Row</span>
              </button>
            </form>

            {/* Right side list */}
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-xs font-bold text-[#B76E79] uppercase tracking-widest">Active Treatment Catalog Row Listings ({services.length})</h4>
              <div className="divide-y divide-blush-pink/35 max-h-[380px] overflow-y-auto border border-blush-pink rounded-3xl bg-warm-ivory p-4 shadow-soft">
                {services.map((s) => (
                  <div key={s.id} className="py-2.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-charcoal">{s.title}</div>
                      <span className="text-[10px] text-soft-grey capitalize font-semibold">{s.category} Treatment</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-sans text-xs font-bold text-rose-gold">₹{s.price.toLocaleString('en-IN')}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteService(s.id)}
                        className="text-rose-gold hover:text-red-500 p-1 bg-white border border-blush-pink/60 rounded-full cursor-pointer inline-flex items-center"
                        title="Delete service row"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
