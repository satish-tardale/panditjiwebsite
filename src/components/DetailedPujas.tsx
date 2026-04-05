import React from 'react';
import { motion } from 'motion/react';
import { Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PujaOffering {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  duration: string;
  image: string;
}

const OFFERINGS: PujaOffering[] = [
  {
    id: 'satyanarayan',
    title: 'Satyanarayan Puja Services We Offer',
    subtitle: 'Complete Satyanarayan Puja Ceremony',
    description: 'Perform a traditional-style Satyanaryan Puja that contains Ganesh Puja, Sanklap, Satyanaryan Katha, and all essential rituals by an experienced and trained pandit with 15+ years of expertise.',
    features: [
      'Ganesh Puja & Kalash Sthapana',
      'Sankalp (Sacred Vow)',
      'Satyanarayan Katha',
      'Aarti & Prasad Distribution'
    ],
    duration: '1Hrs - 1.5Hrs',
    image: 'https://picsum.photos/seed/satyanarayan/800/500'
  },
  {
    id: 'grihapravesh',
    title: 'Griha Pravesh Puja Services We Offer',
    subtitle: 'Sacred Housewarming Ceremony',
    description: 'Purify your new home and invite divine blessings with a comprehensive Griha Pravesh ritual including Vastu Shanti and Navagraha Homa.',
    features: [
      'Vastu Shanti & Kalash Puja',
      'Gau Puja (Cow Worship)',
      'Navagraha Shanti Homa',
      'Dwar Puja & Entry Rituals'
    ],
    duration: '3Hrs - 4Hrs',
    image: 'https://picsum.photos/seed/house/800/500'
  },
  {
    id: 'ganesh',
    title: 'Ganesh Puja Services We Offer',
    subtitle: 'Vedic Ganesh Puja Ritual',
    description: 'Invoke the remover of obstacles for your new beginnings or business ventures with traditional Vedic procedures and authentic chants.',
    features: [
      'Shodashopachara Puja',
      '108 Names Chanting',
      'Modak Offering & Bhog',
      'Ganpati Atharvashirsha Path'
    ],
    duration: '1Hr - 1.5Hr',
    image: 'https://picsum.photos/seed/ganpati/800/500'
  },
  {
    id: 'navagraha',
    title: 'Navagraha Shanti Services We Offer',
    subtitle: 'Navagraha Shanti & Homa',
    description: 'Pacify the nine planetary deities to remove doshas and bring balance, health, and prosperity to your life through sacred fire rituals.',
    features: [
      'Nine Planet Invocation',
      'Specific Graha Mantras',
      'Homa (Fire Ritual)',
      'Shanti Path & Blessings'
    ],
    duration: '2.5Hrs - 3Hrs',
    image: 'https://picsum.photos/seed/planets/800/500'
  }
];

export default function DetailedPujas({ onBook }: { onBook: (puja: any) => void }) {
  const { language } = useLanguage();
  
  // Localized content for DetailedPujas
  const localizedOfferings = {
    en: OFFERINGS,
    mr: OFFERINGS.map(o => ({
      ...o,
      title: o.title.replace('Services We Offer', 'सेवा आम्ही प्रदान करतो'),
      subtitle: o.subtitle.replace('Complete', 'संपूर्ण').replace('Sacred', 'पवित्र').replace('Vedic', 'वैदिक'),
      description: o.description.replace('Perform a traditional-style', 'पारंपारिक पद्धतीने करा').replace('Purify your new home', 'तुमच्या नवीन घराचे शुद्धीकरण करा'),
      duration: o.duration.replace('Hrs', 'तास').replace('Hr', 'तास')
    })),
    hi: OFFERINGS.map(o => ({
      ...o,
      title: o.title.replace('Services We Offer', 'सेवाएं जो हम प्रदान करते हैं'),
      subtitle: o.subtitle.replace('Complete', 'संपूर्ण').replace('Sacred', 'पवित्र').replace('Vedic', 'वैदिक'),
      description: o.description.replace('Perform a traditional-style', 'पारंपरिक शैली में करें').replace('Purify your new home', 'अपने नए घर को शुद्ध करें'),
      duration: o.duration.replace('Hrs', 'घंटे').replace('Hr', 'घंटा')
    }))
  };

  const currentOfferings = localizedOfferings[language] || OFFERINGS;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">Puja Services We Offer</h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-lg">
            Authentic Hindu pujas and sacred rituals performed by experienced Pandits with complete Vedic procedures, 
            ensuring spiritual purity, divine blessings, and peaceful, auspicious outcomes.
          </p>
        </div>

        <div className="space-y-32">
          {currentOfferings.map((offering, index) => (
            <div 
              key={offering.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h3 className="text-primary font-bold text-lg mb-2 uppercase tracking-wider">{offering.title}</h3>
                <h4 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6 leading-tight">
                  {offering.subtitle}
                </h4>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                  {offering.description}
                </p>

                <ul className="space-y-4 mb-10">
                  {offering.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-slate-700 font-medium group">
                      <div className="flex items-center text-secondary">
                        <ChevronRight size={18} className="-mr-2" />
                        <ChevronRight size={18} />
                      </div>
                      <span className="group-hover:text-primary transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <Clock size={20} className="text-primary" />
                    <span>Duration: {offering.duration}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onBook(offering)}
                  className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                  Book This Service
                </button>
              </motion.div>

              {/* Image Content */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-1 relative"
              >
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <img 
                    src={offering.image} 
                    alt={offering.subtitle} 
                    className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Decorative Element */}
                <div className={`absolute -z-10 w-full h-full border-2 border-primary/20 rounded-[2rem] translate-x-6 translate-y-6 hidden lg:block`} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
