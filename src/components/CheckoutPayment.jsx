import React, { useState } from 'react';
import { CreditCard, Lock, Shield, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function CheckoutPayment({ calculateTotal, setCart, setView, t }) {
  const [loading, setLoading] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  
  const baseTotal = calculateTotal();
  const finalTotal = isSubscription ? Math.floor(baseTotal * 0.9) : baseTotal;

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCart([]);
      setView('success');
    }, 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-green-50"></div>
      
      <div className="relative max-w-md w-full animate-slide-up">
        <div className="bg-white rounded-3xl shadow-2xl shadow-green-900/10 overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-700 px-6 py-5">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <CreditCard size={22} />
              </div>
              {t('paymentGateway')}
            </h2>
            <div className="flex items-center gap-1 mt-2 text-green-200 text-xs">
              <Shield size={12} /> 256-bit SSL Encrypted
            </div>
          </div>

          <div className="p-6">
            {/* Amount */}
            <div className="mb-6 pb-5 border-b border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-1">{isSubscription ? 'Recurring Weekly Total' : `${t('total')} ${t('pay')}`}</p>
              <div className="flex items-center justify-center gap-2">
                {isSubscription && <span className="text-xl text-gray-400 line-through">₹{baseTotal}</span>}
                <p className="text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  ₹{finalTotal} {isSubscription && <span className="text-sm text-gray-500 font-medium">/ week</span>}
                </p>
              </div>
            </div>

            {/* Subscription Toggle (CSA Model) */}
            <div 
              onClick={() => setIsSubscription(!isSubscription)}
              className={`mb-6 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                isSubscription ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 bg-white hover:border-emerald-300'
              }`}
            >
              {isSubscription && (
                <div className="absolute top-0 right-0 p-3">
                  <CheckCircle2 size={24} className="text-emerald-500 animate-fade-in" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-1 ${isSubscription ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                  <RefreshCw size={20} className={isSubscription ? 'text-emerald-600' : 'text-gray-500'} />
                </div>
                <div>
                  <h4 className={`font-bold ${isSubscription ? 'text-emerald-800' : 'text-gray-800'}`}>Weekly Farm Box Delivery</h4>
                  <p className="text-xs text-gray-500 mt-1">Subscribe to get this exact cart delivered fresh from the farm every week.</p>
                  <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1">
                    <span className="bg-emerald-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Save 10% Extra</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('cardNumber')}</label>
                <div className="relative">
                  <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    required 
                    type="text" 
                    placeholder="0000 0000 0000 0000" 
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-lg tracking-widest" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('expiry')}</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-center text-lg" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('cvv')}</label>
                  <div className="relative">
                    <input 
                      required 
                      type="password" 
                      placeholder="•••" 
                      maxLength={4}
                      className="w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-center text-lg" 
                    />
                    <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform active:scale-95 ${
                  loading 
                    ? 'bg-gray-300 text-gray-500' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-green-500/30 hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {isSubscription ? <RefreshCw size={18} /> : <CreditCard size={18} />}
                    {isSubscription ? `Start Subscription (₹${finalTotal}/wk)` : `${t('pay')} ₹${finalTotal}`}
                  </span>
                )}
              </button>
            </form>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1"><Lock size={12} /> Secure</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Shield size={12} /> Verified</span>
              <span>•</span>
              <span>RBI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
