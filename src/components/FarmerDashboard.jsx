import React, { useState, useEffect, useMemo } from 'react';
import { User, Plus, Leaf, Package, IndianRupee, ShoppingBag, TrendingUp, Trash2, Cloud, Droplets, Thermometer, Wind, Upload, BookOpen, Building2, LayoutDashboard, ScanSearch } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import AgroWidget from './AgroWidget';
import SchemeTracker from './SchemeTracker';
import CommunityForum from './CommunityForum';
import AICropSurgeon from './AICropSurgeon';

export default function FarmerDashboard({ user, products, onAddProduct, onDeleteProduct, t }) {
  const myProducts = products.filter(p => p.sellerId === user.id || p.seller === (user.profile?.fullName || user.email));
  
  // Dashboard Tabs State
  const [activeTab, setActiveTab] = useState('overview');

  // Animated counter
  const [displayRevenue, setDisplayRevenue] = useState(0);

  // Realistic mock data calculations
  const totalListings = myProducts.length;
  // Assume around 40% of the stock of listed products has been ordered
  const totalOrders = Math.floor(myProducts.reduce((sum, p) => sum + (p.stock || 100) * 0.4, 0));
  const totalRevenue = myProducts.reduce((sum, p) => sum + parseInt(p.price) * (p.stock || 100) * 0.4, 0);

  // Generate 6 months of sales data based on our total revenue
  const chartData = useMemo(() => {
    if (totalRevenue === 0) {
      return [
        { name: 'Oct', revenue: 0 }, { name: 'Nov', revenue: 0 }, { name: 'Dec', revenue: 0 },
        { name: 'Jan', revenue: 0 }, { name: 'Feb', revenue: 0 }, { name: 'Mar', revenue: 0 }
      ];
    }
    return [
      { name: 'Oct', revenue: Math.floor(totalRevenue * 0.12) },
      { name: 'Nov', revenue: Math.floor(totalRevenue * 0.18) },
      { name: 'Dec', revenue: Math.floor(totalRevenue * 0.10) },
      { name: 'Jan', revenue: Math.floor(totalRevenue * 0.22) },
      { name: 'Feb', revenue: Math.floor(totalRevenue * 0.13) },
      { name: 'Mar', revenue: Math.floor(totalRevenue * 0.25) },
    ];
  }, [totalRevenue]);
  
  useEffect(() => {
    let start = 0;
    const step = totalRevenue / 30;
    const interval = setInterval(() => {
      start += step;
      if (start >= totalRevenue) {
        setDisplayRevenue(totalRevenue);
        clearInterval(interval);
      } else {
        setDisplayRevenue(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [totalRevenue]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', unit: 'kg', category: 'Vegetables', stock: 100 });
  const [imageFile, setImageFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setIsSubmitting(true);
    setErrorMsg('');
    
    const result = await onAddProduct({
      ...newProduct,
      seller: user.profile?.fullName || user.email,
      sellerId: user.id,
    }, imageFile);

    if (result && result.error) {
      setErrorMsg(result.error);
      setIsSubmitting(false);
      return;
    }

    setNewProduct({ name: '', price: '', unit: 'kg', category: 'Vegetables', stock: 100 });
    setImageFile(null);
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = [
    { icon: <Package size={24} />, label: t('totalListings'), value: totalListings, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
    { icon: <IndianRupee size={24} />, label: 'Est. Revenue', value: `₹${displayRevenue.toLocaleString()}`, color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50' },
    { icon: <ShoppingBag size={24} />, label: t('totalOrders'), value: totalOrders, color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8 animate-slide-up">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-xl">
            <User size={28} className="text-green-600" />
          </div>
          {t('welcome')}, {user.profile?.fullName || user.email} 👋
        </h2>
        <p className="text-gray-500 mt-1 ml-14">{t('dashboard')} — Kissan Sarthi Workspace</p>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 border-b border-gray-200 hide-scrollbar w-full">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200'}`}
        >
          <LayoutDashboard size={18} /> Overview & Market
        </button>
        <button 
          onClick={() => setActiveTab('forum')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'forum' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200'}`}
        >
          <BookOpen size={18} /> Krishi Samvad (Forum)
        </button>
        <button 
          onClick={() => setActiveTab('schemes')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'schemes' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200'}`}
        >
          <Building2 size={18} /> Govt Schemes
        </button>
        <button 
          onClick={() => setActiveTab('surgeon')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'surgeon' ? 'bg-yellow-500 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200 border-l-2 border-l-yellow-400 pl-4'}`}
        >
          <ScanSearch size={18} /> AI Crop Surgeon
        </button>
      </div>

      {/* TABS CONTENT */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in space-y-8">
          {/* Stats Cards & Weather */}
          <div className="grid lg:grid-cols-4 gap-4 items-start">
        {/* Left Side: Stats and Graph */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={`${stat.bg} rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <p className="text-2xl font-extrabold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp size={14} /> +12% from last month
                </div>
              </div>
            ))}
          </div>

          {/* Recharts Graph */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500"/>
              Revenue Overview (Last 6 Months)
            </h3>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Right Side: AgroWidget - Takes native height */}
        <div className="lg:col-span-1 min-h-[400px]">
          <AgroWidget city={user.profile?.district} state={user.profile?.state} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
              <Plus size={20} className="text-green-600" /> {t('addProduct')}
            </h3>

            {showSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl animate-slide-up flex items-center gap-2">
                <Leaf size={16} /> Product added successfully!
              </div>
            )}
            
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl animate-shake flex items-center gap-2">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={submitProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">{t('productName')}</label>
                <input 
                  required 
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-gray-50" 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Fresh Tomatoes"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{t('price')}</label>
                  <input 
                    required 
                    type="number" 
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-gray-50" 
                    value={newProduct.price} 
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{t('unit')}</label>
                  <input 
                    required 
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-gray-50" 
                    value={newProduct.unit} 
                    onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                    placeholder="kg"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{t('category')}</label>
                  <select 
                    className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all cursor-pointer" 
                    value={newProduct.category} 
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    <option value="Vegetables">{t('vegetables')}</option>
                    <option value="Fruits">{t('fruits')}</option>
                    <option value="Grains">{t('grains')}</option>
                    <option value="Pulses">{t('pulses')}</option>
                    <option value="Spices">{t('spices')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Stock Amount</label>
                  <input 
                    required 
                    type="number" 
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-gray-50" 
                    value={newProduct.stock} 
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Product Image</label>
                <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50 hover:bg-green-50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={e => setImageFile(e.target.files[0])}
                  />
                  {imageFile ? (
                    <div className="text-sm font-medium text-green-700 flex items-center justify-center gap-2">
                      <Leaf size={16} /> {imageFile.name}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 flex flex-col items-center gap-1">
                      <Upload size={20} className="text-gray-400" />
                      <span>Click to upload image</span>
                    </div>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex justify-center items-center gap-2 ${
                  isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? 'Uploading...' : <><Plus size={18} /> {t('add')}</>}
              </button>
            </form>
          </div>
        </div>

        {/* Listings */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
            <Leaf size={20} className="text-green-600" /> {t('yourListings')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {myProducts.length === 0 ? (
              <div className="col-span-2 text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                <Leaf size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-400 text-lg">No products listed yet.</p>
                <p className="text-gray-400 text-sm mt-1">Add your first product from the form!</p>
              </div>
            ) : (
              myProducts.map((product, i) => (
                <div 
                  key={product.id} 
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 animate-slide-up group"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Product image */}
                  <div className="h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Leaf size={32} className="text-green-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{product.category}</span>
                      <h4 className="font-bold text-lg mt-1">{product.name}</h4>
                      <p className="text-green-700 font-bold text-xl mt-1">₹{product.price}<span className="text-sm text-gray-500 font-normal">/{product.unit}</span></p>
                    </div>
                    <button 
                      onClick={() => onDeleteProduct && onDeleteProduct(product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {product.stock && (
                    <p className="text-xs text-gray-400 mt-2">Stock: {product.stock} {product.unit}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
      )}

      {activeTab === 'forum' && (
        <div className="animate-fade-in">
          <CommunityForum user={user} />
        </div>
      )}

      {activeTab === 'schemes' && (
        <div className="animate-fade-in">
          <SchemeTracker userState={user.profile?.state} />
        </div>
      )}

      {activeTab === 'surgeon' && (
        <div className="animate-fade-in">
          <AICropSurgeon />
        </div>
      )}

    </div>
  );
}
