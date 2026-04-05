import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Facebook, Twitter, Shield, CheckCircle, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl transition-transform group-hover:rotate-12">ॐ</div>
              <span className="text-3xl font-serif font-bold">Book My Pandit</span>
            </Link>
            <p className="text-white/60 max-w-md mb-10 leading-relaxed">
              Bringing sacred rituals to your doorstep with verified pandits. Experience the divine with ease and authenticity. 
              A flagship project of Admayra Infotech, dedicated to preserving Vedic traditions in the modern world.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                >
                  <social.icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-accent font-bold mb-8 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/puja/1" className="hover:text-primary transition-colors">Griha Pravesh</Link></li>
              <li><Link to="/puja/2" className="hover:text-primary transition-colors">Satyanarayan Puja</Link></li>
              <li><Link to="/puja/3" className="hover:text-primary transition-colors">Ganesh Puja</Link></li>
              <li><Link to="/puja/4" className="hover:text-primary transition-colors">Navagraha Shanti</Link></li>
              <li><Link to="/#pujas" className="hover:text-primary transition-colors">View All Pujas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-bold mb-8 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-6 text-white/60">
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-primary shrink-0" />
                <div>
                  <div className="text-white font-bold mb-1">+91 95235 11286</div>
                  <div className="text-xs">Mon - Sun, 6:00 AM - 9:00 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-primary shrink-0" />
                <div>
                  <div className="text-white font-bold mb-1">Pune, Maharashtra</div>
                  <div className="text-xs">Serving all areas of Pune</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-primary shrink-0" />
                <div>
                  <div className="text-white font-bold mb-1">contact@bookmypandit.in</div>
                  <div className="text-xs">We respond within 24 hours</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/40 text-sm">
            © 2026 Book My Pandit. All sacred rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors">Pandit Login</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/20 uppercase font-bold tracking-tighter">Powered by</span>
            <span className="text-sm font-bold text-white/60">Admayra Infotech</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
