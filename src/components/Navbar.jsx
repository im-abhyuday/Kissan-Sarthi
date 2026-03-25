import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sprout, Globe, Menu, X, LogOut } from 'lucide-react';
import { LANGUAGES } from '../data/translations';

export default function Navbar({ user, cart, lang, setLang, setView, onLogout, t }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-green-100' 
        : 'bg-gradient-to-r from-green-800 via-green-700 to-emerald-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group" 
            onClick={() => user ? setView(user.role === 'farmer' ? 'dashboard' : 'market') : setView('landing')}
          >
            <div className={`p-1.5 rounded-lg transition-all duration-300 group-hover:scale-110 ${
              scrolled ? 'bg-green-100' : 'bg-white/20'
            }`}>
              <Sprout size={28} className={`transition-colors duration-300 ${scrolled ? 'text-green-600' : 'text-yellow-300'}`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold leading-none transition-colors duration-300 ${scrolled ? 'text-green-800' : 'text-white'}`}>
                {t('appTitle')}
              </h1>
              <p className={`text-[10px] hidden sm:block transition-colors duration-300 ${scrolled ? 'text-green-600' : 'text-green-200'}`}>
                {t('tagline')}
              </p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative group">
              <button className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                scrolled ? 'text-green-700 hover:bg-green-50' : 'text-white/90 hover:text-yellow-300 hover:bg-white/10'
              }`}>
                <Globe size={16} />
                <span className="text-sm">{LANGUAGES.find(l => l.code === lang)?.name}</span>
              </button>
              <div className="absolute right-0 pt-2 w-36 hidden group-hover:block z-50">
                <div className="bg-white rounded-xl shadow-2xl py-1 border border-green-100 overflow-hidden">
                  {LANGUAGES.map((l) => (
                    <button 
                      key={l.code} 
                      onClick={() => setLang(l.code)}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-all duration-200 ${
                        lang === l.code 
                          ? 'bg-green-50 text-green-700 font-semibold' 
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {user && (
              <>
                <span className={`text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-green-700' : 'text-green-100'}`}>
                  {t('welcome')}, {user.profile?.fullName || user.email}
                </span>
                
                {user.role === 'buyer' && (
                  <button 
                    onClick={() => setView('cart')} 
                    className={`relative p-2 rounded-full transition-all duration-300 ${
                      scrolled ? 'hover:bg-green-50 text-green-700' : 'hover:bg-white/10 text-white'
                    }`}
                  >
                    <ShoppingCart size={22} />
                    {cart.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce-subtle shadow-lg">
                        {cart.length}
                      </span>
                    )}
                  </button>
                )}
                
                <button 
                  onClick={onLogout} 
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    scrolled 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <LogOut size={15} /> 
                  <span>{t('logout')}</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${scrolled ? 'text-green-700' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`pb-4 px-4 space-y-3 ${scrolled ? 'bg-white' : 'bg-green-800'}`}>
          <div className="py-2 border-b border-green-700/30">
            <p className={`text-sm mb-2 ${scrolled ? 'text-green-600' : 'text-green-300'}`}>{t('selectLang')}</p>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button 
                  key={l.code} 
                  onClick={() => { setLang(l.code); setIsMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    lang === l.code 
                      ? 'bg-yellow-400 text-green-900 font-semibold shadow-md' 
                      : scrolled ? 'bg-green-50 text-green-700' : 'bg-green-700 text-white'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
          
          {user && (
            <div className="space-y-2">
              {user.role === 'buyer' && (
                <button 
                  onClick={() => { setView('cart'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center space-x-2 py-2.5 px-3 rounded-lg transition-colors ${
                    scrolled ? 'text-green-700 hover:bg-green-50' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <ShoppingCart size={20} /> <span>{t('cart')} ({cart.length})</span>
                </button>
              )}
              <button 
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} 
                className={`w-full flex items-center space-x-2 py-2.5 px-3 rounded-lg transition-colors ${
                  scrolled ? 'text-red-600 hover:bg-red-50' : 'text-red-200 hover:bg-white/10'
                }`}
              >
                <LogOut size={20} /> <span>{t('logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
