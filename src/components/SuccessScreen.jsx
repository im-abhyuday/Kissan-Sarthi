import React from 'react';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SuccessScreen({ setView, t }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Background confetti-like elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full animate-confetti"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `-10%`,
              backgroundColor: ['#22c55e', '#eab308', '#3b82f6', '#ef4444', '#a855f7'][i % 5],
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 animate-slide-up">
        {/* Success icon */}
        <div className="relative inline-flex mb-8">
          <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping-slow"></div>
          <div className="relative p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-2xl shadow-green-500/30">
            <CheckCircle size={56} className="text-white" />
          </div>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">{t('paymentSuccess')}</h2>
        <p className="text-gray-500 max-w-md mb-2 text-lg">{t('orderPlaced')}</p>
        <p className="text-sm text-gray-400 mb-8">Order ID: #KS{Date.now().toString().slice(-6)}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => setView('market')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <ShoppingBag size={18} /> {t('continueShopping')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
