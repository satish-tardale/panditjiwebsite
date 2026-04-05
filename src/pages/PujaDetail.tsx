import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle, ArrowLeft, Phone, Calendar, MapPin, Shield, CreditCard, Star } from 'lucide-react';
import { PUJAS, PANDITS } from './Home';
import BookingModal from '../components/BookingModal';

export default function PujaDetail() {
  const { id } = useParams();
  const puja = PUJAS.find(p => p.id === id);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!puja) return <div className="pt-32 text-center">Puja not found</div>;

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I want to book ${puja.title} in Pune.`);
    window.open(`https://wa.me/919523511286?text=${message}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/#pujas" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to All Pujas
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="relative h-96">
                <img src={puja.image} alt={puja.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="px-4 py-1 bg-primary rounded-full text-xs font-bold mb-4 inline-block">{puja.category}</div>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{puja.title}</h1>
                  <div className="flex items-center gap-6 text-white/80">
                    <div className="flex items-center gap-2"><Clock size={20} /> {puja.duration}</div>
                    <div className="flex items-center gap-2"><Star size={20} fill="currentColor" className="text-accent" /> 4.9 (240+ Bookings)</div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-12">
                <section>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">About the Puja</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {puja.description} This sacred ritual is performed to invoke the blessings of the divine for peace, prosperity, and success. 
                    Our experienced pandits follow the authentic Vedic traditions to ensure the highest spiritual impact. 
                    The puja includes chanting of powerful mantras, offering of sacred items, and a detailed explanation of the significance of each step.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">What's Included?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Verified Pandit", desc: "Experienced and knowledgeable Vedic scholar" },
                      { title: "Puja Samagri", desc: "All required sacred items and materials" },
                      { title: "Dakshina", desc: "Pandit's honorarium is included in the price" },
                      { title: "Travel Charges", desc: "No extra charges for travel within Pune" },
                      { title: "Digital Muhurat", desc: "Consultation for the most auspicious time" },
                      { title: "Prasad Guidance", desc: "Instructions for preparing sacred offerings" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <CheckCircle size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-secondary mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Process & Rituals</h2>
                  <div className="space-y-6">
                    {[
                      { step: "01", title: "Sankalpam", desc: "The ritual begins with a solemn vow to perform the puja for a specific purpose." },
                      { step: "02", title: "Ganesh Puja", desc: "Invocation of Lord Ganesha to remove all obstacles." },
                      { step: "03", title: "Main Ritual", desc: "The core ceremony with specific mantras and offerings." },
                      { step: "04", title: "Aarti & Prasad", desc: "Concluding with the sacred fire and distribution of offerings." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="text-3xl font-serif font-bold text-primary/20">{item.step}</div>
                        <div>
                          <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                          <p className="text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-32">
              <div className="text-sm text-slate-400 mb-2 uppercase tracking-widest font-bold">Total Price</div>
              <div className="text-4xl font-bold text-primary mb-8">₹{puja.price}</div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <Shield size={20} className="text-primary" />
                  <span className="font-medium">Verified Pandits Only</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <CreditCard size={20} className="text-primary" />
                  <span className="font-medium">Secure Payment via Razorpay</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock size={20} className="text-primary" />
                  <span className="font-medium">On-Time Guarantee</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all mb-4"
              >
                Book This Puja
              </button>
              <button 
                onClick={openWhatsApp}
                className="w-full py-4 border border-green-500 text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} /> Chat on WhatsApp
              </button>
              
              <div className="mt-8 pt-8 border-t border-slate-50">
                <h4 className="font-bold text-secondary mb-4">Available Pandits</h4>
                <div className="space-y-4">
                  {PANDITS.slice(0, 2).map((pandit) => (
                    <div key={pandit.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <img src={pandit.image} alt={pandit.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-bold text-secondary">{pandit.name}</div>
                        <div className="text-xs text-accent flex items-center gap-1"><Star size={12} fill="currentColor" /> {pandit.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            puja={puja} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
