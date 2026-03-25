import React, { useState } from 'react';
import { ShoppingCart, Eye, EyeOff, User, Phone, Mail, Lock, MapPin, Home } from 'lucide-react';
import { INDIAN_STATES } from '../data/translations';
import { signUp } from '../services/authService';

export default function BuyerSignup({ setView, onLogin, t }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.fullName.trim()) { setError('Please enter your full name.'); return; }
    if (!form.phone.match(/^[6-9]\d{9}$/)) { setError('Please enter a valid 10-digit Indian mobile number.'); return; }
    if (!form.email.includes('@')) { setError('Please enter a valid email.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (!form.city.trim() || !form.state || !form.pincode.match(/^\d{6}$/)) { setError('Please fill in complete delivery address with valid 6-digit pincode.'); return; }

    setLoading(true);

    const { user, error: authError } = await signUp({
      email: form.email,
      password: form.password,
      role: 'buyer',
      profile: {
        fullName: form.fullName,
        phone: form.phone,
        address: form.street,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      }
    });

    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    onLogin(user);
    setLoading(false);
  };

  const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300";

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-10 left-20 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-lg animate-slide-up">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50">
          {/* Header */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
              <ShoppingCart size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{t('signupAsBuyer')}</h2>
          <p className="text-center text-gray-500 text-sm mb-6">{t('tagline')}</p>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')} *</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} className={inputClass} placeholder="Anjali Sharma" required />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneNumber')} *</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className={inputClass} placeholder="9123456789" maxLength={10} required />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')} *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={inputClass} placeholder="anjali@example.com" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')} *</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} className={inputClass} placeholder="••••••" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('confirmPassword')} *</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className={inputClass} placeholder="••••••" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Address Section */}
            <div className="pt-2 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Home size={16} className="text-blue-500" /> {t('deliveryAddress')}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('street')}</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={form.street} onChange={e => update('street', e.target.value)} className={inputClass} placeholder="42, MG Road, Near Park" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('city')} *</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={form.city} onChange={e => update('city', e.target.value)} className={inputClass} placeholder="Bangalore" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('state')} *</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select value={form.state} onChange={e => update('state', e.target.value)} className={inputClass + " appearance-none cursor-pointer text-sm"} required>
                        <option value="">State</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('pincode')} *</label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" value={form.pincode} onChange={e => update('pincode', e.target.value)} className={inputClass} placeholder="560001" maxLength={6} required />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <ShoppingCart size={18} /> {t('createAccount')}
                </span>
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {t('alreadyHaveAccount')}{' '}
              <button onClick={() => setView('login')} className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                {t('login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
