import React, { useState, useEffect } from 'react';
import "./App.css";
import { TRANSLATIONS } from './data/translations';

// Services
import { getCurrentSessionUser, signOut } from './services/authService';
import { getProducts, addProduct, deleteProduct } from './services/productService';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoginScreen from './components/LoginScreen';
import FarmerSignup from './components/FarmerSignup';
import BuyerSignup from './components/BuyerSignup';
import FarmerDashboard from './components/FarmerDashboard';
import Marketplace from './components/Marketplace';
import CartView from './components/CartView';
import CheckoutPayment from './components/CheckoutPayment';
import SuccessScreen from './components/SuccessScreen';
import Footer from './components/Footer';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import AgroChatbot from './components/AgroChatbot';

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  // Initialize App (Session & Products)
  useEffect(() => {
    const initApp = async () => {
      // Fetch Products
      const { data: productsData } = await getProducts();
      setProducts(productsData || []);

      // Check Session
      const { user: sessionUser } = await getCurrentSessionUser();
      if (sessionUser) {
        setUser(sessionUser);
        setView(sessionUser.role === 'farmer' ? 'dashboard' : 'market');
      }
      setLoading(false);
    };
    initApp();
  }, []);

  // Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
    setView(userData.role === 'farmer' ? 'dashboard' : 'market');
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setView('landing');
    setCart([]);
  };

  // Product handlers
  const handleAddProduct = async (newProduct, imageFile) => {
    const { data, error } = await addProduct(newProduct, imageFile);
    if (data) {
      setProducts(prev => [data, ...prev]);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleDeleteProduct = async (productId) => {
    const { error } = await deleteProduct(productId);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  // Cart handlers
  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCart = (productId) => {
    const idx = cart.findIndex(item => item.id === productId);
    if (idx !== -1) {
      setCart(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    }
  };
  const calculateTotal = () => {
    const grouped = cart.reduce((acc, item) => {
      acc[item.id] = (acc[item.id] || 0) + 1;
      return acc;
    }, {});
    
    // Applying a 15% Wholesale Discount for B2B orders (quantity >= 5)
    return Math.floor(cart.reduce((sum, item) => {
      const qty = grouped[item.id];
      const discount = qty >= 5 ? 0.15 : 0;
      return sum + parseInt(item.price) * (1 - discount);
    }, 0));
  };

  // Determine views
  const showNavbar = view !== 'landing';
  const showFooter = true;

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Kissan Sarthi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-900 flex flex-col">
      {showNavbar && (
        <Navbar 
          user={user} 
          cart={cart} 
          lang={lang} 
          setLang={setLang} 
          setView={setView} 
          onLogout={handleLogout} 
          t={t} 
        />
      )}
      
      <main className="flex-1">
        <div key={view} className="animate-fade-in">
          {view === 'landing' && <HeroSection setView={setView} t={t} />}
          {view === 'terms' && <TermsOfService setView={setView} t={t} />}
          {view === 'privacy' && <PrivacyPolicy setView={setView} t={t} />}
          {view === 'login' && <LoginScreen setView={setView} onLogin={handleLogin} t={t} />}
          {view === 'farmer-signup' && <FarmerSignup setView={setView} onLogin={handleLogin} t={t} />}
          {view === 'buyer-signup' && <BuyerSignup setView={setView} onLogin={handleLogin} t={t} />}
          {view === 'dashboard' && (
            <FarmerDashboard 
              user={user} 
              products={products} 
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              t={t} 
            />
          )}
          {view === 'market' && <Marketplace products={products} addToCart={addToCart} t={t} />}
          {view === 'cart' && (
            <CartView 
              cart={cart} 
              addToCart={addToCart}
              removeFromCart={removeFromCart} 
              calculateTotal={calculateTotal} 
              setView={setView} 
              t={t} 
            />
          )}
          {view === 'checkout' && (
            <CheckoutPayment 
              calculateTotal={calculateTotal} 
              setCart={setCart} 
              setView={setView} 
              t={t} 
            />
          )}
          {view === 'success' && <SuccessScreen setView={setView} t={t} />}
        </div>
      </main>

      {showFooter && <Footer t={t} setView={setView} />}
      <AgroChatbot />
    </div>
  );
}