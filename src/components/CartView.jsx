import React from 'react';
import { ShoppingCart, Trash2, Leaf, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartView({ cart, removeFromCart, calculateTotal, setView, t }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8 animate-slide-up">
        <button onClick={() => setView('market')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart size={28} className="text-green-600" /> {t('cart')}
        </h2>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {cart.length} items
        </span>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 animate-slide-up">
          <div className="inline-flex p-6 bg-gray-50 rounded-full mb-4">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-400 text-lg mb-2">{t('emptyCart')}</p>
          <button 
            onClick={() => setView('market')} 
            className="mt-4 px-6 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            {t('goToMarket')}
          </button>
        </div>
      ) : (
        <div className="animate-slide-up">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            {cart.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className="flex justify-between items-center p-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Leaf size={20} className="text-green-300" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{t('seller')}: {item.seller}</p>
                    <p className="text-green-700 font-bold mt-0.5">₹{item.price} / {item.unit}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Total Footer */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('total')}</p>
              <p className="text-3xl font-extrabold text-green-800">₹{calculateTotal()}</p>
            </div>
            <button 
              onClick={() => setView('checkout')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t('checkout')} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
