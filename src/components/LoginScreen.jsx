import React, { useState } from 'react';
import { Sprout, Leaf, ShoppingCart, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { signIn } from '../services/authService';

export default function LoginScreen({ setView, onLogin, t }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    setLoading(true);
    setError('');
    
    const { user, error: authError } = await signIn(email, password);
    
    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    onLogin(user);
    setLoading(false);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md animate-slide-up">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-green-900/10 border border-white/50">
          {/* Header */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30">
              <Sprout size={40} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{t('login')}</h2>
          <p className="text-center text-gray-500 text-sm mb-8">{t('tagline')}</p>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl animate-shake">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300"
                  placeholder="farmer@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">{t('password')}</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Logging in...
                </span>
              ) : t('login')}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-3 bg-green-50 rounded-xl border border-green-100">
            <p className="text-xs text-green-700 font-semibold mb-2">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
              <div className="flex items-center gap-1"><Leaf size={12} /> ramlal@example.com</div>
              <div>Pass: farmer123</div>
              <div className="flex items-center gap-1"><ShoppingCart size={12} /> buyer@example.com</div>
              <div>Pass: buyer123</div>
            </div>
          </div>

          {/* Signup links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-500">{t('dontHaveAccount')}</p>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setView('farmer-signup')}
                className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 hover:underline transition-colors"
              >
                <Leaf size={14} /> {t('signupAsFarmer')}
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setView('buyer-signup')}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 hover:underline transition-colors"
              >
                <ShoppingCart size={14} /> {t('signupAsBuyer')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
