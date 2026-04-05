import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.pujas': 'Pujas',
    'nav.pandits': 'Pandits',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin Panel',
    'nav.book': 'Book Now',
    'hero.city': 'Launch City: Pune',
    'hero.title': 'Book Verified Pandits for',
    'hero.subtitle': 'Every Sacred Occasion',
    'hero.desc': "Experience authentic rituals with Pune's most trusted spiritual platform. Verified Pandits. Transparent Pricing. Divine Peace.",
    'hero.cta.book': 'Book a Puja Now',
    'hero.cta.whatsapp': 'Chat on WhatsApp',
    'trust.verified': 'Verified Pandits',
    'trust.pricing': 'Transparent Pricing',
    'trust.payment': 'Secure Payment',
    'trust.guarantee': 'On-Time Guarantee',
    'pujas.title': 'Popular Pujas',
    'pujas.desc': 'Select from our range of authentic Vedic rituals performed by experienced pandits.',
    'pujas.book': 'Book Now',
    'how.title': 'Sacred Rituals. Simplified.',
    'how.desc': 'Book your puja in 4 simple steps',
    'how.step1.title': 'Select Puja',
    'how.step1.desc': 'Choose from 50+ Vedic rituals',
    'how.step2.title': 'Pick Area',
    'how.step2.desc': 'Available across all Pune areas',
    'how.step3.title': 'Choose Pandit',
    'how.step3.desc': 'Select your preferred verified pandit',
    'how.step4.title': 'Divine Peace',
    'how.step4.desc': 'Confirm booking & pay securely',
    'pandits.title': 'Our Verified Pandits',
    'pandits.desc': 'Highly experienced and knowledgeable Vedic scholars.',
    'pandits.viewAll': 'View All Pandits',
    'cta.title': 'Ready for a Divine Experience?',
    'cta.desc': 'Join thousands of happy families in Pune who trust Book My Pandit for their sacred rituals.',
    'cta.book': 'Book Your Puja Now',
    'cta.whatsapp': 'WhatsApp Inquiry',
    'footer.desc': 'Bringing sacred rituals to your doorstep with verified pandits. Experience the divine with ease and authenticity. A flagship project of Admayra Infotech.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.rights': '© 2026 Book My Pandit. All rights are reserved by Admayra Infotech.'
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.pujas': 'पूजा',
    'nav.pandits': 'पंडित',
    'nav.about': 'आमच्याबद्दल',
    'nav.contact': 'संपर्क',
    'nav.admin': 'अ‍ॅडमिन पॅनेल',
    'nav.book': 'आता बुक करा',
    'hero.city': 'सुरुवात शहर: पुणे',
    'hero.title': 'प्रत्येक पवित्र प्रसंगासाठी',
    'hero.subtitle': 'पडताळणी केलेले पंडित बुक करा',
    'hero.desc': "पुण्यातील सर्वात विश्वसनीय आध्यात्मिक प्लॅटफॉर्मसह अस्सल विधींचा अनुभव घ्या. पडताळणी केलेले पंडित. पारदर्शक किंमत. दैवी शांती.",
    'hero.cta.book': 'आता पूजा बुक करा',
    'hero.cta.whatsapp': 'व्हॉट्सअ‍ॅपवर चॅट करा',
    'trust.verified': 'पडताळणी केलेले पंडित',
    'trust.pricing': 'पारदर्शक किंमत',
    'trust.payment': 'सुरक्षित पेमेंट',
    'trust.guarantee': 'वेळेवर येण्याची हमी',
    'pujas.title': 'लोकप्रिय पूजा',
    'pujas.desc': 'अनुभवी पंडितांद्वारे केल्या जाणाऱ्या आमच्या अस्सल वैदिक विधींच्या श्रेणीतून निवडा.',
    'pujas.book': 'आता बुक करा',
    'how.title': 'पवित्र विधी. सोपे झाले.',
    'how.desc': '४ सोप्या चरणांमध्ये तुमची पूजा बुक करा',
    'how.step1.title': 'पूजा निवडा',
    'how.step1.desc': '५०+ वैदिक विधींमधून निवडा',
    'how.step2.title': 'परिसर निवडा',
    'how.step2.desc': 'पुण्यातील सर्व भागात उपलब्ध',
    'how.step3.title': 'पंडित निवडा',
    'how.step3.desc': 'तुमचा पसंतीचा पडताळणी केलेला पंडित निवडा',
    'how.step4.title': 'दैवी शांती',
    'how.step4.desc': 'बुकिंगची पुष्टी करा आणि सुरक्षितपणे पैसे द्या',
    'pandits.title': 'आमचे पडताळणी केलेले पंडित',
    'pandits.desc': 'अत्यंत अनुभवी आणि जाणकार वैदिक विद्वान.',
    'pandits.viewAll': 'सर्व पंडित पहा',
    'cta.title': 'दैवी अनुभवासाठी तयार आहात का?',
    'cta.desc': 'पुण्यातील हजारो आनंदी कुटुंबांमध्ये सामील व्हा जे त्यांच्या पवित्र विधींसाठी बुक माय पंडितवर विश्वास ठेवतात.',
    'cta.book': 'तुमची पूजा आता बुक करा',
    'cta.whatsapp': 'व्हॉट्सअ‍ॅप चौकशी',
    'footer.desc': 'पडताळणी केलेल्या पंडितांसह पवित्र विधी तुमच्या दारापर्यंत पोहोचवणे. सहजतेने आणि अस्सलतेने दैवी अनुभव घ्या. अदमयरा इन्फोटेकचा एक प्रमुख प्रकल्प.',
    'footer.links': 'द्रुत दुवे',
    'footer.contact': 'आमच्याशी संपर्क साधा',
    'footer.rights': '© २०२६ बुक माय पंडित. सर्व हक्क अदमयरा इन्फोटेककडे राखीव आहेत.'
  },
  hi: {
    'nav.home': 'होम',
    'nav.pujas': 'पूजा',
    'nav.pandits': 'पंडित',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.admin': 'एडमिन पैनल',
    'nav.book': 'अभी बुक करें',
    'hero.city': 'लॉन्च शहर: पुणे',
    'hero.title': 'हर पवित्र अवसर के लिए',
    'hero.subtitle': 'सत्यापित पंडित बुक करें',
    'hero.desc': "पुणे के सबसे भरोसेमंद आध्यात्मिक मंच के साथ प्रामाणिक अनुष्ठानों का अनुभव करें। सत्यापित पंडित। पारदर्शी मूल्य निर्धारण। दिव्य शांति।",
    'hero.cta.book': 'अभी पूजा बुक करें',
    'hero.cta.whatsapp': 'व्हाट्सएप पर चैट करें',
    'trust.verified': 'सत्यापित पंडित',
    'trust.pricing': 'पारदर्शी मूल्य निर्धारण',
    'trust.payment': 'सुरक्षित भुगतान',
    'trust.guarantee': 'समय पर आने की गारंटी',
    'pujas.title': 'लोकप्रिय पूजा',
    'pujas.desc': 'अनुभवी पंडितों द्वारा किए जाने वाले हमारे प्रामाणिक वैदिक अनुष्ठानों की श्रृंखला में से चुनें।',
    'pujas.book': 'अभी बुक करें',
    'how.title': 'पवित्र अनुष्ठान। सरल हुए।',
    'how.desc': '4 आसान चरणों में अपनी पूजा बुक करें',
    'how.step1.title': 'पूजा चुनें',
    'how.step1.desc': '50+ वैदिक अनुष्ठानों में से चुनें',
    'how.step2.title': 'क्षेत्र चुनें',
    'how.step2.desc': 'पुणे के सभी क्षेत्रों में उपलब्ध',
    'how.step3.title': 'पंडित चुनें',
    'how.step3.desc': 'अपना पसंदीदा सत्यापित पंडित चुनें',
    'how.step4.title': 'दिव्य शांति',
    'how.step4.desc': 'बुकिंग की पुष्टि करें और सुरक्षित रूप से भुगतान करें',
    'pandits.title': 'हमारे सत्यापित पंडित',
    'pandits.desc': 'अत्यंत अनुभवी और जानकार वैदिक विद्वान।',
    'pandits.viewAll': 'सभी पंडित देखें',
    'cta.title': 'दिव्य अनुभव के लिए तैयार हैं?',
    'cta.desc': 'पुणे के हजारों खुशहाल परिवारों में शामिल हों जो अपने पवित्र अनुष्ठानों के लिए बुक माय पंडित पर भरोसा करते हैं।',
    'cta.book': 'अपनी पूजा अभी बुक करें',
    'cta.whatsapp': 'व्हाट्सएप पूछताछ',
    'footer.desc': 'सत्यापित पंडितों के साथ पवित्र अनुष्ठान आपके दरवाजे तक पहुँचाना। सहजता और प्रामाणिकता के साथ दिव्य अनुभव प्राप्त करें। अदमयरा इन्फोटेक की एक प्रमुख परियोजना।',
    'footer.links': 'त्वरित लिंक',
    'footer.contact': 'संपर्क करें',
    'footer.rights': '© 2026 बुक माय पंडित। सभी अधिकार अदमयरा इन्फोटेक द्वारा सुरक्षित हैं।'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
