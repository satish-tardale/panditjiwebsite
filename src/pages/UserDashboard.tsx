import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, User, ArrowRight, CheckCircle, XCircle, MoreVertical, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MOCK_BOOKINGS = [
  { id: '1', puja: 'Griha Pravesh', pandit: 'Pandit Rajesh Sharma', area: 'Kothrud', date: '2026-04-10', time: '09:00 AM', status: 'Confirmed', price: 5100 },
  { id: '2', puja: 'Satyanarayan Puja', pandit: 'Pandit Vivek Kulkarni', area: 'Baner', date: '2026-03-15', time: '11:00 AM', status: 'Completed', price: 3100 },
  { id: '3', puja: 'Ganesh Puja', pandit: 'Pandit Amit Joshi', area: 'Wakad', date: '2026-04-20', time: '08:30 AM', status: 'Pending', price: 2100 },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I have a question about my booking.`);
    window.open(`https://wa.me/919523511286?text=${message}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-secondary mb-2">Welcome, {user?.name}</h1>
            <p className="text-slate-500">Manage your sacred bookings and spiritual journey.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={openWhatsApp}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition-all"
            >
              <Phone size={18} /> Support
            </button>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all">
              Book New Puja
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Booking List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-8 border-b border-slate-200 mb-8">
              {['active', 'history'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-bold text-lg capitalize transition-all relative ${activeTab === tab ? 'text-primary' : 'text-slate-400'}`}
                >
                  {tab} Bookings
                  {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {MOCK_BOOKINGS
                .filter(b => activeTab === 'active' ? b.status !== 'Completed' : b.status === 'Completed')
                .map((booking) => (
                <motion.div 
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
                >
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Calendar size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-1">{booking.puja}</h3>
                      <p className="text-slate-500 font-medium mb-2">{booking.pandit}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1"><MapPin size={14} /> {booking.area}</div>
                        <div className="flex items-center gap-1"><Clock size={14} /> {booking.date} at {booking.time}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {booking.status}
                      </span>
                      <div className="text-xl font-bold text-secondary">₹{booking.price}</div>
                    </div>
                    <div className="flex gap-3 w-full">
                      <button className="flex-1 md:flex-none px-6 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        Cancel
                      </button>
                      <button className="flex-1 md:flex-none px-6 py-2 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-secondary/90 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar Stats */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-secondary mb-8">Spiritual Stats</h3>
              <div className="space-y-8">
                {[
                  { label: "Total Pujas", value: "12", icon: CheckCircle, color: "text-green-500" },
                  { label: "Hours Spent", value: "36", icon: Clock, color: "text-blue-500" },
                  { label: "Upcoming", value: "2", icon: Calendar, color: "text-primary" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                        <stat.icon size={20} />
                      </div>
                      <span className="text-slate-500 font-medium">{stat.label}</span>
                    </div>
                    <span className="text-xl font-bold text-secondary">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary p-8 rounded-3xl shadow-xl shadow-primary/20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Refer a Family</h3>
              <p className="text-white/80 text-sm mb-6 relative z-10">Invite your friends to Book My Pandit and get ₹500 off on your next booking.</p>
              <button className="w-full py-3 bg-white text-primary rounded-xl font-bold text-sm relative z-10">
                Invite Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
