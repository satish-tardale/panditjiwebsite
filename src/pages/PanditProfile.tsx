import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, CheckCircle, ArrowLeft, Phone, Calendar, MapPin, Languages, Award, Clock } from 'lucide-react';
import { PANDITS, PUJAS } from './Home';
import BookingModal from '../components/BookingModal';

export default function PanditProfile() {
  const { id } = useParams();
  const pandit = PANDITS.find(p => p.id === id);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState(PUJAS[0]);

  if (!pandit) return <div className="pt-32 text-center">Pandit not found</div>;

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I want to book ${pandit.name} in Pune.`);
    window.open(`https://wa.me/919523511286?text=${message}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/#pandits" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to All Pandits
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                <div className="relative">
                  <img src={pandit.image} alt={pandit.name} className="w-40 h-40 rounded-full object-cover border-4 border-slate-50 shadow-xl" referrerPolicy="no-referrer" />
                  {pandit.verified && (
                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full border-4 border-white">
                      <CheckCircle size={20} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-serif font-bold text-secondary mb-2">{pandit.name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                    <div className="flex items-center gap-1 text-accent font-bold">
                      <Star size={20} fill="currentColor" /> {pandit.rating}
                    </div>
                    <div className="text-slate-400">|</div>
                    <div className="text-slate-500 font-medium">{pandit.experience}+ Years Experience</div>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {pandit.languages.map(lang => (
                      <span key={lang} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-bold">{lang}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">About the Pandit</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {pandit.name} is a highly respected Vedic scholar from Pune with over {pandit.experience} years of experience in performing various sacred rituals. 
                    He specializes in Griha Pravesh, Satyanarayan Puja, and Wedding ceremonies. He has conducted over 1,000+ pujas across Pune and is known for his 
                    precise chanting and deep understanding of Vedic traditions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Expertise & Skills</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: Award, title: "Vedic Scholar", desc: "Certified from renowned Vedic institutions" },
                      { icon: Languages, title: "Multi-lingual", desc: "Fluent in Marathi, Hindi, and Sanskrit" },
                      { icon: MapPin, title: "Pune Specialist", desc: "Available across all areas of Pune" },
                      { icon: Clock, title: "Punctual", desc: "Known for on-time arrivals and procedures" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <item.icon size={24} />
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
                  <h2 className="text-2xl font-serif font-bold text-secondary mb-6">Services Offered</h2>
                  <div className="space-y-4">
                    {PUJAS.map((puja) => (
                      <div key={puja.id} className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-primary transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden">
                            <img src={puja.image} alt={puja.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">{puja.title}</h3>
                            <p className="text-xs text-slate-400">{puja.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-lg font-bold text-primary">₹{puja.price}</div>
                          <button 
                            onClick={() => { setSelectedPuja(puja); setIsBookingOpen(true); }}
                            className="px-6 py-2 bg-secondary text-white rounded-xl font-bold text-sm hover:bg-secondary/90 transition-all"
                          >
                            Book
                          </button>
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
              <h3 className="text-xl font-bold text-secondary mb-6">Availability</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar size={20} className="text-primary" />
                  <span className="font-medium">Available Next: Tomorrow</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock size={20} className="text-primary" />
                  <span className="font-medium">6:00 AM - 9:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin size={20} className="text-primary" />
                  <span className="font-medium">All Pune Areas</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all mb-4"
              >
                Book This Pandit
              </button>
              <button 
                onClick={openWhatsApp}
                className="w-full py-4 border border-green-500 text-green-600 rounded-2xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} /> Chat on WhatsApp
              </button>
              
              <div className="mt-8 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-2 text-accent font-bold mb-4">
                  <Star size={18} fill="currentColor" /> 4.9 (120+ Reviews)
                </div>
                <div className="space-y-4">
                  {[
                    { user: "Rahul M.", comment: "Very punctual and knowledgeable. Highly recommended!" },
                    { user: "Sneha K.", comment: "Performed the Griha Pravesh beautifully. Very satisfied." }
                  ].map((review, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-bold text-secondary mb-1">{review.user}</div>
                      <p className="text-slate-500 italic">"{review.comment}"</p>
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
            puja={selectedPuja} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
