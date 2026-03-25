import React, { useState } from 'react';
import { ShoppingCart, Leaf, Sprout, Star, Filter, MapPin, ShieldCheck, X, Calendar, Truck, Info } from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts';

export default function Marketplace({ products, addToCart, t }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleAdd = (product, e) => {
    e.stopPropagation(); // prevent modal opening
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const categoryEmoji = {
    'Vegetables': '🥬',
    'Fruits': '🍎',
    'Grains': '🌾',
    'Pulses': '🫘',
    'Spices': '🌶️',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{t('market')}</h2>
          <p className="text-gray-500 mt-1">{filteredProducts.length} products available</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
            !selectedCategory 
              ? 'bg-green-600 text-white shadow-md shadow-green-500/30' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600'
          }`}
        >
          <Filter size={14} /> {t('allCategories')}
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === cat 
                ? 'bg-green-600 text-white shadow-md shadow-green-500/30' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-600'
            }`}
          >
            {categoryEmoji[cat]} {t(cat.toLowerCase())}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, i) => (
          <div 
            key={product.id} 
            onClick={() => setSelectedProduct(product)}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1 animate-slide-up cursor-pointer"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Product Image */}
            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : null}
              {/* Category fallback icons */}
              <div className={`absolute inset-0 flex items-center justify-center ${product.image ? 'opacity-0' : 'opacity-100'}`}>
                {product.category === 'Vegetables' && <Leaf size={56} className="text-green-300" />}
                {product.category === 'Grains' && <Sprout size={56} className="text-yellow-400" />}
                {product.category === 'Fruits' && <div className="text-5xl">🍎</div>}
                {product.category === 'Pulses' && <div className="text-5xl">🫘</div>}
                {product.category === 'Spices' && <div className="text-5xl">🌶️</div>}
              </div>
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold text-green-700 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                  {categoryEmoji[product.category]} {product.category}
                </span>
              </div>
              {/* Rating badge */}
              {product.rating && (
                <div className="absolute top-3 right-3">
                  <span className="flex items-center gap-0.5 text-xs font-bold text-yellow-700 bg-yellow-50/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" /> {product.rating}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{product.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Leaf size={12} className="text-green-500" /> {t('seller')}: <span className="font-medium text-gray-700">{product.seller}</span>
              </p>
              <div className="flex items-center gap-1 mt-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-xs text-emerald-600 font-medium">Traceable Origin</span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-extrabold text-green-700">₹{product.price}</span>
                  <span className="text-sm text-gray-400 font-normal">/{product.unit}</span>
                </div>
                <button 
                  onClick={(e) => handleAdd(product, e)}
                  className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 shadow-md ${
                    addedId === product.id
                      ? 'bg-green-100 text-green-700 scale-95'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-green-500/30 hover:-translate-y-0.5'
                  }`}
                >
                  <ShoppingCart size={16} /> 
                  {addedId === product.id ? '✓ Added!' : t('add')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🌱</div>
          <p className="text-gray-400 text-lg">No products in this category yet.</p>
        </div>
      )}

      {/* Traceability Passport Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
            
            {/* Header image */}
            <div className="h-40 relative bg-stone-100">
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center">
                   <Leaf size={48} className="text-white/50" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                 <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all">
                   <X size={18} />
                 </button>
              </div>
              <div className="absolute -bottom-6 left-6 w-16 h-16 bg-white rounded-2xl shadow-lg border-4 border-white overflow-hidden flex items-center justify-center font-bold text-xl text-emerald-700">
                <img src={`https://ui-avatars.com/api/?name=${selectedProduct.seller}&background=047857&color=fff`} className="w-full h-full" alt="Seller" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={20} className="text-emerald-500" />
                <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">Digital Traceability Passport</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h3>
              <p className="text-gray-500 mb-6 flex items-center gap-2">Grown by <span className="font-bold text-gray-700">{selectedProduct.seller}</span></p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><MapPin size={20} /></div>
                  <div>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Farm Location</p>
                    <p className="font-bold text-gray-800">{selectedProduct.seller.length % 2 === 0 ? 'Indore, Madhya Pradesh' : 'Nashik, Maharashtra'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><Calendar size={20} /></div>
                  <div>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Harvested On</p>
                    <p className="font-bold text-gray-800">
                      {new Date(Date.now() - 2 * 86400000).toLocaleDateString()} (2 Days Ago)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><Info size={20} /></div>
                  <div>
                    <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Certifications</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200 font-bold">100% Organic</span>
                      <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded border border-sky-200 font-bold">Pesticide Free</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => { handleAdd(selectedProduct, {stopPropagation:()=>{}}); setSelectedProduct(null); }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart (₹{selectedProduct.price}/{selectedProduct.unit})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
