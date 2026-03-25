import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingCart, Sprout, ArrowDown, Truck, Shield, Users } from 'lucide-react';

export default function HeroSection({ setView, t }) {
  const [countFarmers, setCountFarmers] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countCities, setCountCities] = useState(0);

  // Count-up animation
  useEffect(() => {
    const animate = (setter, target, duration) => {
      let start = 0;
      const step = target / (duration / 16);
      const interval = setInterval(() => {
        start += step;
        if (start >= target) {
          setter(target);
          clearInterval(interval);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
      return interval;
    };
    const t1 = animate(setCountFarmers, 500, 2000);
    const t2 = animate(setCountProducts, 10000, 2500);
    const t3 = animate(setCountCities, 50, 1500);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const floatingIcons = [
    { icon: '🌾', delay: '0s', x: '10%', y: '20%', size: 'text-4xl' },
    { icon: '🥕', delay: '1s', x: '80%', y: '15%', size: 'text-3xl' },
    { icon: '🍅', delay: '2s', x: '70%', y: '70%', size: 'text-4xl' },
    { icon: '🌽', delay: '0.5s', x: '20%', y: '75%', size: 'text-3xl' },
    { icon: '🥭', delay: '1.5s', x: '85%', y: '45%', size: 'text-3xl' },
    { icon: '🌿', delay: '2.5s', x: '5%', y: '50%', size: 'text-2xl' },
    { icon: '🍋', delay: '3s', x: '50%', y: '10%', size: 'text-2xl' },
    { icon: '🧅', delay: '1.8s', x: '40%', y: '80%', size: 'text-3xl' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 animate-gradient-shift"></div>
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Floating Icons */}
      {floatingIcons.map((item, i) => (
        <div
          key={i}
          className={`absolute ${item.size} animate-float opacity-20 pointer-events-none select-none`}
          style={{ 
            left: item.x, 
            top: item.y, 
            animationDelay: item.delay,
            animationDuration: `${4 + i * 0.5}s`
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="animate-slide-down mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-green-200 text-sm font-medium">
            <Sprout size={16} className="text-yellow-400" />
            {t('tagline')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-slide-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center leading-tight max-w-4xl mb-6">
          <span className="block">{t('heroHeadline')}</span>
        </h1>

        {/* Subtext */}
        <p className="animate-slide-up-delay text-lg sm:text-xl text-green-100/80 text-center max-w-2xl mb-10 leading-relaxed">
          {t('heroSubtext')}
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row gap-4 mb-16">
          <button 
            onClick={() => setView('farmer-signup')}
            className="group relative px-8 py-4 bg-white text-green-800 rounded-2xl font-bold text-lg shadow-2xl shadow-green-900/30 hover:shadow-green-500/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Leaf size={22} className="group-hover:rotate-12 transition-transform duration-300" />
              {t('iAmFarmer')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button 
            onClick={() => setView('buyer-signup')}
            className="group relative px-8 py-4 bg-transparent border-2 border-white/40 text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-green-800 transition-all duration-500 hover:-translate-y-1 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform duration-300" />
              {t('iAmBuyer')}
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-delay grid grid-cols-3 gap-6 sm:gap-12 mb-12">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{countFarmers}+</div>
            <div className="text-green-300 text-sm sm:text-base mt-1">{t('statFarmers')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{countProducts.toLocaleString()}+</div>
            <div className="text-green-300 text-sm sm:text-base mt-1">{t('statProducts')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">{countCities}+</div>
            <div className="text-green-300 text-sm sm:text-base mt-1">{t('statCities')}</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce-slow absolute bottom-8">
          <ArrowDown size={24} className="text-white/50" />
        </div>
      </div>

      {/* How it Works Section */}
      <div className="relative z-10 bg-white/5 backdrop-blur-sm py-16 px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">{t('howItWorks')}</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <Users size={32} />, title: t('iAmFarmer'), desc: 'List your fresh produce directly. Set your own fair prices. Reach thousands of buyers.' },
            { icon: <Shield size={32} />, title: t('paymentGateway'), desc: 'Safe & secure payments. Money goes directly to farmers. No middlemen commissions.' },
            { icon: <Truck size={32} />, title: t('iAmBuyer'), desc: 'Browse fresh farm produce. Order directly. Get farm-fresh delivery to your door.' },
          ].map((item, i) => (
            <div 
              key={i} 
              className="group bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="inline-flex p-4 rounded-2xl bg-green-500/20 text-green-300 mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-green-200/70 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Already have account link */}
        <div className="text-center mt-12">
          <p className="text-green-200/60 text-sm">
            {t('alreadyHaveAccount')}{' '}
            <button onClick={() => setView('login')} className="text-yellow-400 hover:text-yellow-300 font-semibold underline underline-offset-4 transition-colors">
              {t('login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
