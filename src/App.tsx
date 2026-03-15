import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Star, 
  Menu, 
  X, 
  ArrowRight,
  Shield,
  Clock,
  CreditCard,
  Volume2,
  VolumeX
} from 'lucide-react';
import Hero3D from './components/Hero3D';

// --- Types ---
interface Puja {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  category: string;
}

interface Pandit {
  id: string;
  name: string;
  experience: number;
  rating: number;
  languages: string[];
  image: string;
  verified: boolean;
}

// --- Mock Data ---
const PUJAS: Puja[] = [
  { id: '1', title: 'Griha Pravesh', description: 'Sacred housewarming ritual to bring peace and prosperity.', duration: '3-4 hrs', price: 5100, image: 'https://picsum.photos/seed/home/400/300', category: 'Home' },
  { id: '2', title: 'Satyanarayan Puja', description: 'Thanksgiving ritual for success and well-being.', duration: '2 hrs', price: 3100, image: 'https://picsum.photos/seed/puja/400/300', category: 'Prosperity' },
  { id: '3', title: 'Ganesh Puja', description: 'Invocation of Lord Ganesha for new beginnings.', duration: '1.5 hrs', price: 2100, image: 'https://picsum.photos/seed/ganesh/400/300', category: 'Beginnings' },
  { id: '4', title: 'Navagraha Shanti', description: 'Pacifying the nine planets for harmony.', duration: '3 hrs', price: 4500, image: 'https://picsum.photos/seed/stars/400/300', category: 'Planetary' },
];

const PANDITS: Pandit[] = [
  { id: '1', name: 'Pandit Rajesh Sharma', experience: 15, rating: 4.9, languages: ['Marathi', 'Hindi', 'Sanskrit'], image: 'https://picsum.photos/seed/p1/200/200', verified: true },
  { id: '2', name: 'Pandit Vivek Kulkarni', experience: 20, rating: 5.0, languages: ['Marathi', 'Sanskrit'], image: 'https://picsum.photos/seed/p2/200/200', verified: true },
  { id: '3', name: 'Pandit Amit Joshi', experience: 12, rating: 4.8, languages: ['Hindi', 'English', 'Marathi'], image: 'https://picsum.photos/seed/p3/200/200', verified: true },
];

// --- Components ---

const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">ॐ</div>
          <span className={`text-2xl font-serif font-bold ${isScrolled ? 'text-secondary' : 'text-white'}`}>Book My Pandit</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Pujas', 'Pandits', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`font-medium hover:text-primary transition-colors ${isScrolled ? 'text-slate-700' : 'text-white/90'}`}>
              {item}
            </a>
          ))}
          <button 
            onClick={onAdminClick}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Admin Panel
          </button>
        </div>

        <button className="md:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-secondary text-white py-16">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">ॐ</div>
          <span className="text-2xl font-serif font-bold">Book My Pandit</span>
        </div>
        <p className="text-white/70 max-w-md mb-8">
          Bringing sacred rituals to your doorstep with verified pandits. Experience the divine with ease and authenticity.
          A flagship project of Admayra Infotech.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">FB</a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">IG</a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">TW</a>
        </div>
      </div>
      
      <div>
        <h4 className="text-accent font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
        <ul className="space-y-4 text-white/70">
          <li><a href="#" className="hover:text-white transition-colors">Griha Pravesh</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Satyanarayan Puja</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Wedding Services</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pandit Registration</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-accent font-bold mb-6 uppercase tracking-wider">Contact Us</h4>
        <ul className="space-y-4 text-white/70">
          <li className="flex items-center gap-3"><Phone size={18} /> +91 95235 11286</li>
          <li className="flex items-center gap-3"><MapPin size={18} /> Pune, Maharashtra</li>
          <li className="mt-6">
            <span className="block text-xs text-white/40 mb-2">Powered by</span>
            <span className="font-bold text-white">Admayra Infotech</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
      © 2026 Book My Pandit. All sacred rights reserved.
    </div>
  </footer>
);

import BookingModal from './components/BookingModal';

import { AuthProvider, useAuth } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';

function MainContent() {
  const { user, logout } = useAuth();
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPuja, setSelectedPuja] = useState<Puja | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);

  const handleBookClick = (puja: Puja) => {
    setSelectedPuja(puja);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello, I want to book a pandit in Pune.");
    window.open(`https://wa.me/919523511286?text=${message}`, '_blank');
  };

  if (isAdminView) return <AdminDashboard />;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-primary text-6xl mb-4"
        >
          ॐ
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          className="h-1 bg-primary/30 rounded-full overflow-hidden"
        >
          <motion.div 
            animate={{ x: [-200, 200] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="h-full w-1/2 bg-primary"
          />
        </motion.div>
        <p className="text-white/50 mt-4 font-serif italic">Preparing your sacred experience...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar onAdminClick={() => setIsAdminView(true)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6">
        <Hero3D />
        
        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold mb-6 uppercase tracking-widest">
              Launch City: Pune
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Book Verified Pandits for <br />
              <span className="text-accent italic">Every Sacred Occasion</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Experience authentic rituals with Pune's most trusted spiritual platform. 
              Verified Pandits. Transparent Pricing. Divine Peace.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                Book a Puja Now <ArrowRight size={20} />
              </button>
              <button 
                onClick={openWhatsApp}
                className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} className="text-green-400" /> Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>

        {/* Audio Toggle */}
        <button 
          onClick={() => setIsAudioOn(!isAudioOn)}
          className="absolute bottom-10 left-10 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {isAudioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Shield, label: "Verified Pandits" },
            { icon: CreditCard, label: "Transparent Pricing" },
            { icon: CheckCircle, label: "Secure Payment" },
            { icon: Clock, label: "On-Time Guarantee" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
              <item.icon className="text-primary" size={24} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Pujas */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="pujas">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-secondary mb-4">Popular Pujas</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-slate-500 max-w-2xl mx-auto">Select from our range of authentic Vedic rituals performed by experienced pandits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PUJAS.map((puja) => (
            <motion.div 
              key={puja.id}
              whileHover={{ y: -10 }}
              className="premium-card overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={puja.image} alt={puja.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  {puja.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-2">{puja.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{puja.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={14} /> {puja.duration}
                  </div>
                  <div className="text-lg font-bold text-primary">₹{puja.price}</div>
                </div>
                <button 
                  onClick={() => handleBookClick(puja)}
                  className="w-full mt-6 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/90 transition-all"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isBookingOpen && selectedPuja && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
            puja={selectedPuja} 
          />
        )}
      </AnimatePresence>

      {/* How It Works */}
      <section className="py-24 bg-secondary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold mb-4">Sacred Rituals. Simplified.</h2>
            <p className="text-white/60">Book your puja in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Select Puja", desc: "Choose from 50+ Vedic rituals" },
              { step: "02", title: "Pick Area", desc: "Available across all Pune areas" },
              { step: "03", title: "Choose Pandit", desc: "Select your preferred verified pandit" },
              { step: "04", title: "Divine Peace", desc: "Confirm booking & pay securely" }
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-5xl font-serif font-bold text-primary/30 absolute top-4 right-6">{item.step}</span>
                <h3 className="text-xl font-bold mb-3 mt-4">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Pandits */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="pandits">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-serif font-bold text-secondary mb-4">Our Verified Pandits</h2>
            <p className="text-slate-500">Highly experienced and knowledgeable Vedic scholars.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Pandits <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PANDITS.map((pandit) => (
            <div key={pandit.id} className="premium-card p-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <img src={pandit.image} alt={pandit.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-lg" />
                {pandit.verified && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                    <CheckCircle size={14} fill="currentColor" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-1">{pandit.name}</h3>
              <div className="flex items-center gap-1 text-accent mb-4">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">{pandit.rating}</span>
                <span className="text-slate-400 text-sm font-normal">({pandit.experience}+ yrs exp)</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {pandit.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">{lang}</span>
                ))}
              </div>
              <button className="w-full py-3 border border-secondary text-secondary rounded-xl font-bold hover:bg-secondary hover:text-white transition-all">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto saffron-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <h2 className="text-4xl font-serif font-bold mb-6 relative z-10">Ready for a Divine Experience?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Join thousands of happy families in Pune who trust Book My Pandit for their sacred rituals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-xl transition-all">
              Book Your Puja Now
            </button>
            <button 
              onClick={openWhatsApp}
              className="px-10 py-4 bg-secondary text-white rounded-full font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} /> WhatsApp Inquiry
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-all group"
      >
        <Phone size={32} />
        <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us!
        </span>
      </motion.button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
