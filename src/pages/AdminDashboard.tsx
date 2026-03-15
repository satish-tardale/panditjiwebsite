import React from 'react';
import { motion } from 'motion/react';
import { Users, Calendar, TrendingUp, MapPin, CheckCircle, Clock } from 'lucide-react';

const STATS = [
  { label: 'Total Bookings', value: '1,284', icon: Calendar, color: 'bg-blue-500' },
  { label: 'Revenue', value: '₹4.2L', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Active Pandits', value: '42', icon: Users, color: 'bg-primary' },
  { label: 'Pune Areas', value: '12', icon: MapPin, color: 'bg-secondary' },
];

const RECENT_BOOKINGS = [
  { id: '1', user: 'Rahul M.', puja: 'Griha Pravesh', area: 'Kothrud', status: 'Confirmed', time: '2h ago' },
  { id: '2', user: 'Sneha K.', puja: 'Satyanarayan', area: 'Baner', status: 'Completed', time: '5h ago' },
  { id: '3', user: 'Amit P.', puja: 'Ganesh Puja', area: 'Wakad', status: 'Pending', time: '1d ago' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-serif font-bold text-secondary">Admin Command Center</h1>
            <p className="text-slate-500">Real-time analytics for Pune operations</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-sm font-bold text-slate-600">
            March 14, 2026
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
              <h2 className="font-bold text-secondary">Recent Bookings</h2>
              <button className="text-primary text-sm font-bold">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Puja</th>
                    <th className="px-6 py-4">Area</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Time</th>
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
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                          booking.status === 'Completed' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
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
            <h2 className="font-bold text-secondary mb-6">Area-wise Demand</h2>
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
