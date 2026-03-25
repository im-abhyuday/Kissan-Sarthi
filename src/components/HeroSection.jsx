import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingCart, Sprout, ArrowDown, Truck, Shield, Users, TrendingUp, TrendingDown, MapPin, Package, ShieldCheck, Store, ChevronRight, ShoppingBag, Star, CheckCircle2, PlayCircle } from 'lucide-react';

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

  const mandiPrices = [
    { name: 'Red Onion', loc: 'Nashik', price: '₹22/kg', change: '+2.5%', trend: 'up' },
    { name: 'Tomato', loc: 'Indore', price: '₹18/kg', change: '-1.2%', trend: 'down' },
    { name: 'Potato', loc: 'Agra', price: '₹15/kg', change: '0.0%', trend: 'flat' },
    { name: 'Cauliflower', loc: 'Pune', price: '₹40/kg', change: '+5.1%', trend: 'up' },
    { name: 'Carrot', loc: 'Ooty', price: '₹65/kg', change: '-3.4%', trend: 'down' },
    { name: 'Wheat', loc: 'Punjab', price: '₹2200/qtl', change: '+1.1%', trend: 'up' },
    { name: 'Basmati Rice', loc: 'Haryana', price: '₹8500/qtl', change: '+0.5%', trend: 'up' }
  ];

  const featuredProducts = [
    { name: 'Organic Red Onions', farmer: 'Ramesh Patil', location: 'Nashik, MH', price: '22', unit: 'kg', rating: 4.8 },
    { name: 'Desi Tomatoes', farmer: 'Sunita Devi', location: 'Indore, MP', price: '18', unit: 'kg', rating: 4.9 },
    { name: 'Premium Wheat', farmer: 'Harjit Singh', location: 'Ludhiana, PB', price: '2200', unit: 'qtl', rating: 5.0 },
    { name: 'Fresh Carrots', farmer: 'Kumari Farm', location: 'Ooty, TN', price: '65', unit: 'kg', rating: 4.7 }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 animate-gradient-shift"></div>
      
      {/* Live Mandi Ticker */}
      <div className="absolute top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 overflow-hidden flex items-center h-10">
        <div className="absolute left-0 z-10 bg-gradient-to-r from-green-900 to-transparent w-8 h-full"></div>
        <div className="animate-marquee hover:pause whitespace-nowrap flex items-center gap-8 px-4 text-xs font-medium">
          {/* Double the array to create a seamless loop effect */}
          {[...mandiPrices, ...mandiPrices].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white/90">
              <span className="opacity-60">•</span>
              <span className="font-bold text-white">{item.name}</span>
              <span className="text-white/60">({item.loc})</span>
              <span className="text-emerald-300 ml-1">{item.price}</span>
              <span className={`flex items-center text-[10px] ${item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                {item.trend === 'up' && <TrendingUp size={12} className="mr-0.5" />}
                {item.trend === 'down' && <TrendingDown size={12} className="mr-0.5" />}
                {item.change}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute right-0 z-10 bg-gradient-to-l from-emerald-900 to-transparent w-8 h-full"></div>
      </div>
      
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
        <p className="animate-slide-up-delay text-lg sm:text-xl text-green-100/80 text-center max-w-2xl mb-8 leading-relaxed">
          {t('heroSubtext')}
        </p>

        {/* Floating Trust Chips (Option 5) */}
        <div className="animate-slide-up-delay flex flex-wrap justify-center gap-3 mb-10">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-100 uppercase tracking-wider">
            <ShieldCheck size={14} className="text-emerald-400" /> {t('secureEscrow')}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-100 uppercase tracking-wider">
            <CheckCircle2 size={14} className="text-emerald-400" /> {t('verifiedOrganic')}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] sm:text-xs font-semibold text-emerald-100 uppercase tracking-wider">
            <Truck size={14} className="text-emerald-400" /> {t('transparentLogistics')}
          </span>
        </div>

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

        {/* Trust & Certification Partner Tape (Option 3) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 py-5 overflow-hidden flex items-center mb-16 shadow-2xl">
          <div className="absolute left-0 z-20 bg-gradient-to-r from-emerald-900 to-transparent w-16 h-full"></div>
          <div className="animate-marquee hover:pause whitespace-nowrap flex items-center gap-16 px-8 text-white/50 font-bold uppercase tracking-widest text-[13px]">
             {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><ShieldCheck size={18} className="text-emerald-500" /> {t('rbiCompliant')}</span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">Razorpay Route</span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><CheckCircle2 size={18} className="text-emerald-500" /> {t('fssai')}</span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">{t('cashfreePayments')}</span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default"><Leaf size={18} className="text-emerald-500" /> {t('verifiedOrganic')}</span>
                  <span className="flex items-center gap-2 hover:text-white transition-colors cursor-default">Startup India</span>
                </React.Fragment>
             ))}
          </div>
          <div className="absolute right-0 z-20 bg-gradient-to-l from-emerald-900 to-transparent w-16 h-full"></div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce-slow mt-4 mb-16 z-10 relative">
          <ArrowDown size={28} className="text-white/40" />
        </div>
      </div>

      {/* The Seed-to-Sale Visual Journey Segment */}
      <div className="relative z-10 bg-stone-50 py-24 px-4 overflow-hidden border-t border-gray-200">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-4">The Kissan Sarthi Journey</h2>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-20 text-lg">A robust, secure, and transparent bridge direct from the farm origin to the buyer's storefront.</p>
        
        <div className="max-w-6xl mx-auto relative">
          {/* Connector Line (Hidden on Mobile) */}
          <div className="hidden md:block absolute top-[50px] left-[10%] w-[80%] h-1 bg-gradient-to-r from-emerald-200 via-green-300 to-green-600 rounded-full"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="relative group text-center flex flex-col items-center animate-slide-up">
              <div className="w-24 h-24 bg-white rounded-full shadow-xl shadow-emerald-900/10 border-4 border-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Sprout size={40} className="text-emerald-600" />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Step 01</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('farmerHarvest')}</h3>
              <p className="text-gray-500 leading-relaxed px-4">Farmers list their freshly harvested, organic produce directly on the platform at fair, algorithmically-backed prices.</p>
            </div>

            {/* Step 2 */}
            <div className="relative group text-center flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 bg-white rounded-full shadow-xl shadow-green-900/10 border-4 border-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={40} className="text-green-600" />
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Step 02</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('secureEscrowBrief')}</h3>
              <p className="text-gray-500 leading-relaxed px-4">Buyer funds are held securely. The Kissan Sarthi backend handles B2B quality verification, logistics, and instant split payouts.</p>
            </div>

            {/* Step 3 */}
            <div className="relative group text-center flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-24 h-24 bg-white rounded-full shadow-xl shadow-teal-900/10 border-4 border-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Store size={40} className="text-teal-600" />
              </div>
              <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">Step 03</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('buyerDelivery')}</h3>
              <p className="text-gray-500 leading-relaxed px-4">Restaurants, wholesalers, and consumers receive farm-fresh agricultural goods with 100% digital traceability.</p>
            </div>
          </div>
        </div>

        {/* Action Call */}
        <div className="text-center mt-20 animate-fade-in-delay">
          <p className="text-gray-600 text-lg mb-4">Ready to bypass the middlemen and join the revolution?</p>
          <button 
            onClick={() => setView('market')} 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {t('goToMarket')} <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
