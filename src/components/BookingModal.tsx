import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Clock, User, ArrowRight, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  puja: any;
}

export default function BookingModal({ isOpen, onClose, puja }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    area: '',
    date: '',
    time: '',
    address: '',
    tier: 'gold'
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleBooking = async () => {
    // Razorpay logic would go here
    const message = encodeURIComponent(`New Booking Request!\nPuja: ${puja.title}\nArea: ${formData.area}\nDate: ${formData.date}\nTime: ${formData.time}\nAddress: ${formData.address}`);
    window.open(`https://wa.me/919523511286?text=${message}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-secondary">Book {puja?.title}</h2>
              <p className="text-slate-500 text-sm">Step {step} of 3</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Select Pune Area</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                  >
                    <option value="">Choose an area...</option>
                    <option value="kothrud">Kothrud</option>
                    <option value="baner">Baner / Balewadi</option>
                    <option value="viman-nagar">Viman Nagar</option>
                    <option value="wakad">Wakad / Hinjewadi</option>
                    <option value="camp">Camp / MG Road</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Pricing Tier</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['silver', 'gold', 'royal'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setFormData({...formData, tier: t})}
                        className={`py-3 rounded-xl border-2 font-bold capitalize transition-all ${formData.tier === t ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  disabled={!formData.area}
                  onClick={nextStep}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
                    <input 
                      type="time" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Address in {formData.area}</label>
                  <textarea 
                    rows={3}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="House No, Society Name, Landmark..."
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 border border-slate-200 rounded-xl font-bold">Back</button>
                  <button 
                    disabled={!formData.date || !formData.time || !formData.address}
                    onClick={nextStep} 
                    className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold"
                  >
                    Review & Pay
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service</span>
                    <span className="font-bold text-secondary">{puja.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location</span>
                    <span className="font-bold text-secondary capitalize">{formData.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Time</span>
                    <span className="font-bold text-secondary">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-lg font-bold text-secondary">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{puja.price}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 border border-slate-200 rounded-xl font-bold">Back</button>
                  <button 
                    onClick={handleBooking}
                    className="flex-[2] py-4 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Pay & Confirm <CheckCircle size={20} />
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400">Secure payment powered by Razorpay</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
