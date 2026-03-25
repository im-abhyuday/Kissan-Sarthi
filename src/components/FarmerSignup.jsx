import React, { useState } from 'react';
import { Leaf, ChevronRight, ChevronLeft, Eye, EyeOff, User, Phone, Mail, Lock, MapPin, Tractor, Sprout } from 'lucide-react';
import { INDIAN_STATES } from '../data/translations';
import { signUp } from '../services/authService';

const CROP_OPTIONS = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices'];

export default function FarmerSignup({ setView, onLogin, t }) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    district: '',
    village: '',
    farmSize: '',
    primaryCrops: [],
    idNumber: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleCrop = (crop) => {
    setForm(prev => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(crop)
        ? prev.primaryCrops.filter(c => c !== crop)
        : [...prev.primaryCrops, crop]
    }));
  };

  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!form.fullName.trim()) { setError('Please enter your full name.'); return false; }
      if (!form.phone.match(/^[6-9]\d{9}$/)) { setError('Please enter a valid 10-digit Indian mobile number.'); return false; }
      if (!form.email.includes('@')) { setError('Please enter a valid email.'); return false; }
      if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return false; }
      if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return false; }
    }
    if (step === 2) {
      if (!form.state) { setError('Please select your state.'); return false; }
      if (!form.district.trim()) { setError('Please enter your district.'); return false; }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError('');

    const { user, error: authError } = await signUp({
      email: form.email,
      password: form.password,
      role: 'farmer',
      profile: {
        fullName: form.fullName,
        phone: form.phone,
        state: form.state,
        district: form.district,
        village: form.village,
        farmSize: parseFloat(form.farmSize) || 0,
        primaryCrops: form.primaryCrops,
        idNumber: form.idNumber,
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

  const inputClass = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300";

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50"></div>
      <div className="absolute top-10 right-20 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-lg animate-slide-up">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-green-900/10 border border-white/50">
          {/* Header */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30">
              <Leaf size={32} className="text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{t('signupAsFarmer')}</h2>
          <p className="text-center text-gray-500 text-sm mb-6">{t('tagline')}</p>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8 px-2">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    s <= step 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30 scale-110' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {s}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${s <= step ? 'text-green-600' : 'text-gray-400'}`}>
                    {s === 1 ? t('personalDetails') : s === 2 ? t('farmDetails') : t('cropDetails')}
                  </span>
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded transition-all duration-500 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl animate-shake">
              {error}
            </div>
          )}

          {/* Step 1: Personal Details */}
          <div className={`transition-all duration-500 ${step === 1 ? 'opacity-100 translate-x-0' : 'hidden'}`}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')} *</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)} className={inputClass} placeholder="Ram Lal Sharma" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneNumber')} *</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className={inputClass} placeholder="9876543210" maxLength={10} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')} *</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className={inputClass} placeholder="ramlal@example.com" required />
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
            </div>
          </div>

          {/* Step 2: Farm Details */}
          <div className={`transition-all duration-500 ${step === 2 ? 'opacity-100 translate-x-0' : 'hidden'}`}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('state')} *</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={form.state} onChange={e => update('state', e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('district')} *</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={form.district} onChange={e => update('district', e.target.value)} className={inputClass} placeholder="Lucknow" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('village')}</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={form.village} onChange={e => update('village', e.target.value)} className={inputClass} placeholder="Chinhat" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('farmSize')}</label>
                <div className="relative">
                  <Tractor size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="number" step="0.5" min="0" value={form.farmSize} onChange={e => update('farmSize', e.target.value)} className={inputClass} placeholder="5" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Crops & ID */}
          <div className={`transition-all duration-500 ${step === 3 ? 'opacity-100 translate-x-0' : 'hidden'}`}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('primaryCrops')}</label>
                <div className="flex flex-wrap gap-2">
                  {CROP_OPTIONS.map(crop => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        form.primaryCrops.includes(crop)
                          ? 'bg-green-500 text-white shadow-md shadow-green-500/30 scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      {crop === 'Vegetables' ? '🥬' : crop === 'Fruits' ? '🍎' : crop === 'Grains' ? '🌾' : crop === 'Pulses' ? '🫘' : '🌶️'} {t(crop.toLowerCase())}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('idNumber')}</label>
                <div className="relative">
                  <Sprout size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={form.idNumber} onChange={e => update('idNumber', e.target.value)} className={inputClass} placeholder="XXXX-XXXX-XXXX" />
                </div>
                <p className="text-xs text-gray-400 mt-1">Optional — used for farmer verification</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {step > 1 ? (
              <button 
                onClick={() => { setStep(prev => prev - 1); setError(''); }}
                className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors"
              >
                <ChevronLeft size={18} /> {t('previous')}
              </button>
            ) : <div></div>}
            
            {step < totalSteps ? (
              <button 
                onClick={handleNext}
                className="flex items-center gap-1 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('next')} <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                ) : <Leaf size={18} />}
                {t('createAccount')}
              </button>
            )}
          </div>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {t('alreadyHaveAccount')}{' '}
              <button onClick={() => setView('login')} className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                {t('login')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
