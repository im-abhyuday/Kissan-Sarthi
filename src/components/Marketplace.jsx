import React, { useState } from 'react';
import { ShoppingCart, Leaf, Sprout, Star, Filter } from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts';

export default function Marketplace({ products, addToCart, t }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedId, setAddedId] = useState(null);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const handleAdd = (product) => {
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
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-1 animate-slide-up"
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
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Leaf size={12} className="text-green-500" /> {t('seller')}: {product.seller}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-2xl font-extrabold text-green-700">₹{product.price}</span>
                  <span className="text-sm text-gray-400 font-normal">/{product.unit}</span>
                </div>
                <button 
                  onClick={() => handleAdd(product)}
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
    </div>
  );
}
