import React from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: 'Admin Command Center',
    subtitle: 'Real-time analytics for Pune operations',
    stats: {
      bookings: 'Total Bookings',
      revenue: 'Revenue',
      pandits: 'Active Pandits',
      areas: 'Pune Areas',
    },
    recentBookings: 'Recent Bookings',
    viewAll: 'View All',
    table: {
      user: 'User',
      puja: 'Puja',
      area: 'Area',
      status: 'Status',
      time: 'Time',
    },
    demand: 'Area-wise Demand',
    statuses: {
      confirmed: 'Confirmed',
      completed: 'Completed',
      pending: 'Pending',
    }
  },
  mr: {
    title: 'प्रशासक नियंत्रण केंद्र',
    subtitle: 'पुणे ऑपरेशन्ससाठी रिअल-टाइम विश्लेषण',
    stats: {
      bookings: 'एकूण बुकिंग',
      revenue: 'महसूल',
      pandits: 'सक्रिय पंडित',
      areas: 'पुणे क्षेत्रे',
    },
    recentBookings: 'अलीकडील बुकिंग',
    viewAll: 'सर्व पहा',
    table: {
      user: 'वापरकर्ता',
      puja: 'पूजा',
      area: 'क्षेत्र',
      status: 'स्थिती',
      time: 'वेळ',
    },
    demand: 'क्षेत्रनिहाय मागणी',
    statuses: {
      confirmed: 'निश्चित',
      completed: 'पूर्ण',
      pending: 'प्रलंबित',
    }
  },
  hi: {
    title: 'एडमिन कमांड सेंटर',
    subtitle: 'पुणे संचालन के लिए रीयल-टाइम विश्लेषण',
    stats: {
      bookings: 'कुल बुकिंग',
      revenue: 'राजस्व',
      pandits: 'सक्रिय पंडित',
      areas: 'पुणे क्षेत्र',
    },
    recentBookings: 'हाल की बुकिंग',
    viewAll: 'सभी देखें',
    table: {
      user: 'उपयोगकर्ता',
      puja: 'पूजा',
      area: 'क्षेत्र',
      status: 'स्थिति',
      time: 'समय',
    },
    demand: 'क्षेत्रवार मांग',
    statuses: {
      confirmed: 'पुष्ट',
      completed: 'पूरा हुआ',
      pending: 'लंबित',
    }
  }
};

export default function AdminDashboard() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];

  const STATS = [
    { label: t.stats.bookings, value: '1,284', icon: Calendar, color: 'bg-blue-500' },
    { label: t.stats.revenue, value: '₹4.2L', icon: TrendingUp, color: 'bg-green-500' },
    { label: t.stats.pandits, value: '42', icon: Users, color: 'bg-primary' },
    { label: t.stats.areas, value: '12', icon: MapPin, color: 'bg-secondary' },
  ];

  const RECENT_BOOKINGS = [
    { id: '1', user: 'Rahul M.', puja: 'Griha Pravesh', area: 'Kothrud', status: t.statuses.confirmed, time: '2h ago' },
    { id: '2', user: 'Sneha K.', puja: 'Satyanarayan', area: 'Baner', status: t.statuses.completed, time: '5h ago' },
    { id: '3', user: 'Amit P.', puja: 'Ganesh Puja', area: 'Wakad', status: t.statuses.pending, time: '1d ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-secondary">{t.title}</h1>
            <p className="text-slate-500">{t.subtitle}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-bold text-slate-600">
            {new Date().toLocaleDateString(language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-secondary">{t.recentBookings}</h2>
              <button className="text-primary text-sm font-bold">{t.viewAll}</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">{t.table.user}</th>
                    <th className="px-6 py-4">{t.table.puja}</th>
                    <th className="px-6 py-4">{t.table.area}</th>
                    <th className="px-6 py-4">{t.table.status}</th>
                    <th className="px-6 py-4">{t.table.time}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {RECENT_BOOKINGS.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{booking.user}</td>
                      <td className="px-6 py-4 text-slate-600">{booking.puja}</td>
                      <td className="px-6 py-4 text-slate-600">{booking.area}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === t.statuses.confirmed ? 'bg-green-100 text-green-600' : 
                          booking.status === t.statuses.completed ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{booking.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Area Analytics */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <h2 className="font-bold text-secondary mb-6">{t.demand}</h2>
            <div className="space-y-6">
              {[
                { area: 'Kothrud', percentage: 85, color: 'bg-primary' },
                { area: 'Baner', percentage: 72, color: 'bg-blue-500' },
                { area: 'Viman Nagar', percentage: 64, color: 'bg-green-500' },
                { area: 'Wakad', percentage: 58, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-600">{item.area}</span>
                    <span className="text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
