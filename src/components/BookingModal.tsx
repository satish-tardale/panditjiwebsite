import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  puja: any;
}

const TRANSLATIONS = {
  en: {
    book: 'Book',
    step: 'Step',
    of: 'of',
    selectArea: 'Select Pune Area',
    chooseArea: 'Choose an area...',
    pricingTier: 'Pricing Tier',
    continue: 'Continue',
    date: 'Date',
    time: 'Time',
    address: 'Full Address in',
    addressPlaceholder: 'House No, Society Name, Landmark...',
    back: 'Back',
    reviewPay: 'Review & Pay',
    service: 'Service',
    location: 'Location',
    dateTime: 'Date & Time',
    total: 'Total Amount',
    payConfirm: 'Pay & Confirm',
    secure: 'Secure payment powered by Razorpay',
    tiers: {
      silver: 'Silver',
      gold: 'Gold',
      royal: 'Royal'
    }
  },
  mr: {
    book: 'बुक करा',
    step: 'टप्पा',
    of: 'पैकी',
    selectArea: 'पुणे क्षेत्र निवडा',
    chooseArea: 'क्षेत्र निवडा...',
    pricingTier: 'किंमत श्रेणी',
    continue: 'पुढे जा',
    date: 'तारीख',
    time: 'वेळ',
    address: 'येथील पूर्ण पत्ता',
    addressPlaceholder: 'घर क्रमांक, सोसायटीचे नाव, खूण...',
    back: 'मागे',
    reviewPay: 'पुनरावलोकन आणि पेमेंट',
    service: 'सेवा',
    location: 'ठिकाण',
    dateTime: 'तारीख आणि वेळ',
    total: 'एकूण रक्कम',
    payConfirm: 'पेमेंट आणि कन्फर्म',
    secure: 'रेझरपे द्वारे सुरक्षित पेमेंट',
    tiers: {
      silver: 'सिल्व्हर',
      gold: 'गोल्ड',
      royal: 'रॉयल'
    }
  },
  hi: {
    book: 'बुक करें',
    step: 'चरण',
    of: 'का',
    selectArea: 'पुणे क्षेत्र चुनें',
    chooseArea: 'क्षेत्र चुनें...',
    pricingTier: 'मूल्य निर्धारण श्रेणी',
    continue: 'जारी रखें',
    date: 'तारीख',
    time: 'समय',
    address: 'में पूरा पता',
    addressPlaceholder: 'मकान नंबर, सोसायटी का नाम, लैंडमार्क...',
    back: 'पीछे',
    reviewPay: 'समीक्षा और भुगतान',
    service: 'सेवा',
    location: 'स्थान',
    dateTime: 'तारीख और समय',
    total: 'कुल राशि',
    payConfirm: 'भुगतान और पुष्टि',
    secure: 'रेज़रपे द्वारा सुरक्षित भुगतान',
    tiers: {
      silver: 'सिल्वर',
      gold: 'गोल्ड',
      royal: 'रॉयल'
    }
  }
};

export default function BookingModal({ isOpen, onClose, puja }: BookingModalProps) {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS];
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
              <h2 className="text-2xl font-serif font-bold text-secondary">{t.book} {puja?.title}</h2>
              <p className="text-slate-500 text-sm">{t.step} {step} {t.of} 3</p>
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
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.selectArea}</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                  >
                    <option value="">{t.chooseArea}</option>
                    <option value="kothrud">Kothrud</option>
                    <option value="baner">Baner / Balewadi</option>
                    <option value="viman-nagar">Viman Nagar</option>
                    <option value="wakad">Wakad / Hinjewadi</option>
                    <option value="camp">Camp / MG Road</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.pricingTier}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['silver', 'gold', 'royal'].map(tierKey => (
                      <button 
                        key={tierKey}
                        onClick={() => setFormData({...formData, tier: tierKey})}
                        className={`py-3 rounded-xl border-2 font-bold capitalize transition-all ${formData.tier === tierKey ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400'}`}
                      >
                        {t.tiers[tierKey as keyof typeof t.tiers]}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  disabled={!formData.area}
                  onClick={nextStep}
                  className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {t.continue}
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
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.date}</label>
                    <input 
                      type="date" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.time}</label>
                    <input 
                      type="time" 
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.address} {formData.area}</label>
                  <textarea 
                    rows={3}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder={t.addressPlaceholder}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 border border-slate-200 rounded-xl font-bold">{t.back}</button>
                  <button 
                    disabled={!formData.date || !formData.time || !formData.address}
                    onClick={nextStep} 
                    className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold"
                  >
                    {t.reviewPay}
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
                    <span className="text-slate-500">{t.service}</span>
                    <span className="font-bold text-secondary">{puja.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.location}</span>
                    <span className="font-bold text-secondary capitalize">{formData.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.dateTime}</span>
                    <span className="font-bold text-secondary">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-lg font-bold text-secondary">{t.total}</span>
                    <span className="text-2xl font-bold text-primary">₹{puja.price}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={prevStep} className="flex-1 py-4 border border-slate-200 rounded-xl font-bold">{t.back}</button>
                  <button 
                    onClick={handleBooking}
                    className="flex-[2] py-4 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    {t.payConfirm} <CheckCircle size={20} />
                  </button>
                </div>
                <p className="text-center text-xs text-slate-400">{t.secure}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
