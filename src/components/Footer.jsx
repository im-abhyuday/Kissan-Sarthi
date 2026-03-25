import React from 'react';
import { Sprout, Mail, Phone, MapPin, Leaf } from 'lucide-react';

export default function Footer({ t }) {
  return (
    <footer className="relative bg-gradient-to-b from-green-900 via-green-950 to-black text-green-200 overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500"></div>
      
      {/* Floating leaf decorations */}
      <div className="absolute top-10 left-10 opacity-5 animate-float">
        <Leaf size={80} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-5 animate-float" style={{ animationDelay: '2s' }}>
        <Leaf size={60} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-xl bg-green-800/50">
                <Sprout size={28} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('appTitle')}</h3>
                <p className="text-xs text-green-400">{t('tagline')}</p>
              </div>
            </div>
            <p className="text-sm text-green-300/70 leading-relaxed mb-4">
              {t('footerAbout')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('quickLinks')}</h4>
            <ul className="space-y-2.5">
              {[t('aboutUs'), t('howItWorks'), t('market'), t('support')].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-green-300/70 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {[t('termsOfService'), t('privacyPolicy')].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-green-300/70 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('contactUs')}</h4>
            <div className="space-y-3">
              <a href="mailto:support@kissansarthi.in" className="flex items-center gap-3 text-sm text-green-300/70 hover:text-yellow-400 transition-colors">
                <Mail size={16} className="flex-shrink-0" /> support@kissansarthi.in
              </a>
              <a href="tel:+911800123456" className="flex items-center gap-3 text-sm text-green-300/70 hover:text-yellow-400 transition-colors">
                <Phone size={16} className="flex-shrink-0" /> 1800-123-456 (Toll Free)
              </a>
              <div className="flex items-start gap-3 text-sm text-green-300/70">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" /> New Delhi, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-green-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-green-400/50">&copy; 2025 Kissan Sarthi. Empowering Farmers Across India.</p>
          <p className="text-xs text-green-400/50">Made with 💚 for Indian Farmers</p>
        </div>
      </div>
    </footer>
  );
}
