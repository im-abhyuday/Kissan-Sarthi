import React, { useMemo } from 'react';
import { ShoppingCart, Trash2, Leaf, ArrowLeft, ShoppingBag, Plus, Minus, Tag, Clock } from 'lucide-react';

export default function CartView({ cart, addToCart, removeFromCart, calculateTotal, setView, t }) {
  // Group identical items together
  const groupedCart = useMemo(() => {
    const groups = {};
    cart.forEach(item => {
      if (!groups[item.id]) {
        groups[item.id] = { ...item, quantity: 0, rawInstances: [] };
      }
      groups[item.id].quantity += 1;
      groups[item.id].rawInstances.push(item);
    });
    return Object.values(groups);
  }, [cart]);

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
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-6">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <Tag size={18} className="text-emerald-600" />
              <p className="text-sm text-gray-700"><strong>Wholesale Tip:</strong> Add 5 or more units of the same product to unlock a <span className="text-emerald-600 font-bold">15% Bulk B2B Discount!</span></p>
            </div>
            
            <div className="divide-y divide-gray-50">
              {groupedCart.map((item) => {
                const isWholesale = item.quantity >= 5;
                const unitPrice = parseInt(item.price);
                const originalTotal = unitPrice * item.quantity;
                const finalTotal = isWholesale ? Math.floor(originalTotal * 0.85) : originalTotal;
                
                return (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row justify-between sm:items-center p-5 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
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
                        <h4 className="font-bold text-gray-800 text-lg leading-tight">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-1">{t('seller')}: {item.seller}</p>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-green-700 font-bold">₹{unitPrice}/{item.unit}</span>
                          {isWholesale && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              Wholesale Applied (-15%)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item.rawInstances[0])}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="text-right min-w-[80px]">
                        <p className="font-extrabold text-xl text-gray-800">₹{finalTotal}</p>
                        {isWholesale && (
                          <p className="text-xs text-gray-400 line-through">₹{originalTotal}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
