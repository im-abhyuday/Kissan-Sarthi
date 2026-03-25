import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, Sprout, AlertTriangle, Wind } from 'lucide-react';
import { getCoordinates, fetchAgroData } from '../services/agroService';

export default function AgroWidget({ city, state }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState(city || state || 'Your Farm');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const query = city ? `${city}, India` : state ? `${state}, India` : 'New Delhi, India';
        const coords = await getCoordinates(query);
        setLocationName(coords.name || city || state || 'New Delhi');
        
        const agroData = await fetchAgroData(coords.lat, coords.lon);
        setData(agroData);
      } catch (err) {
        console.error("AgroWidget error:", err);
        setErrorMsg("API Key might be invalid or network error.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [city, state]);

  if (loading) return (
    <div className="animate-pulse h-full min-h-[200px] bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-300">
      Loading precision data...
    </div>
  );
  
  if (!data || errorMsg) return (
    <div className="p-6 bg-red-50 text-red-600 rounded-2xl h-full flex flex-col justify-center border border-red-100 shadow-sm animate-slide-up">
      <AlertTriangle className="mb-2 text-red-400" size={32} />
      <h3 className="font-bold">Failed to load farm data</h3>
      <p className="text-sm text-red-500 mt-1">{errorMsg || "Could not fetch data for this location."}</p>
    </div>
  );

  const { weather, soil, uvi } = data;

  // Generate smart tip
  let tip = "Weather conditions are optimal for general fieldwork today.";
  let tipType = "normal"; // normal, warning, danger
  
  if (soil && soil.moisture < 0.20) {
    tip = "Low soil moisture detected. Irrigation is highly recommended today.";
    tipType = "warning";
  } else if (weather.temp > 35) {
    tip = "High temperatures expected. Ensure adequate irrigation for delicate crops.";
    tipType = "warning";
  } else if (weather.humidity > 80) {
    tip = "High humidity. Watch out for fungal infections in vegetables.";
    tipType = "warning";
  }
  
  if (uvi !== null && uvi > 7 && tipType !== 'warning') {
    tip = "High UV Index. Prioritize worker safety and protect sensitive young plants.";
    tipType = "danger";
  } else if (uvi !== null && uvi > 7) {
    // If we already have a warning, append the UV warning
    tip += " Also, high UV Index detected. Protect sensitive plants.";
  }

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-6 text-white shadow-lg animate-slide-up h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Background Decor */}
      <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none transition-transform duration-1000 rotate-12">
         <Sprout size={180} />
      </div>

      <div className="relative z-10 flex flex-col h-full bg-transparent">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-emerald-100 flex items-center gap-2 tracking-wide text-sm opacity-90">
              <Cloud size={16} /> FARM CONDITIONS
            </h3>
            <div className="text-4xl font-extrabold mt-1 flex items-center gap-2 drop-shadow-sm">
              {Math.round(weather.temp)}°C
              {weather.desc === 'Rain' && <Droplets size={32} className="text-blue-200" />}
              {weather.desc === 'Clear' && <Sun size={32} className="text-yellow-300" />}
              {weather.desc === 'Clouds' && <Cloud size={32} className="text-gray-200" />}
            </div>
            <p className="text-emerald-50 mt-1 font-medium capitalize flex items-center gap-1 opacity-90">
              {weather.desc} in {locationName}
            </p>
          </div>
          <div className="flex flex-col gap-2 relative z-20">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-900 bg-emerald-100/90 hover:bg-white px-3 py-1.5 rounded-xl shadow-sm transition-colors whitespace-nowrap backdrop-blur-md">
              <Droplets size={14} className="text-teal-600" /> Hum: {weather.humidity}%
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-900 bg-emerald-100/90 hover:bg-white px-3 py-1.5 rounded-xl shadow-sm transition-colors whitespace-nowrap backdrop-blur-md">
              <Wind size={14} className="text-teal-600" /> Wind: {Math.round(weather.wind)}m/s
            </div>
          </div>
        </div>
        
        {/* Soil & UV Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
          {soil && (
            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-black/30 transition-colors group">
              <div className="text-emerald-300 text-[10px] font-bold tracking-wider mb-2 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <Sprout size={14} /> SOIL SENSOR
              </div>
              <div className="font-extrabold text-2xl tracking-tight">
                {Math.round(soil.temp * 10) / 10}°<span className="text-lg opacity-70">C</span>
              </div>
              <div className="text-sm text-emerald-100 mt-1 font-medium">
                {(soil.moisture * 100).toFixed(0)}% Moisture
              </div>
            </div>
          )}
          {uvi !== null && (
            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-black/30 transition-colors group">
              <div className="text-emerald-300 text-[10px] font-bold tracking-wider mb-2 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <Sun size={14} /> UV INDEX
              </div>
              <div className="font-extrabold text-2xl tracking-tight flex items-center gap-2">
                {uvi.toFixed(1)} 
                {uvi > 7 && <AlertTriangle size={18} className="text-yellow-400 animate-pulse" />}
              </div>
              <div className="text-sm text-emerald-100 mt-1 font-medium">
                {uvi <= 2 ? 'Low Risk' : uvi <= 5 ? 'Moderate Risk' : uvi <= 7 ? 'High Risk' : 'Extreme Risk'}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer info block */}
        <div className="mt-auto pt-4 border-t border-white/20">
          <div className={`p-3 rounded-xl text-sm flex items-start gap-3 backdrop-blur-md border border-white/10 shadow-inner ${
            tipType === 'danger' ? 'bg-red-500/20 text-red-50' : 
            tipType === 'warning' ? 'bg-yellow-500/20 text-yellow-50' : 
            'bg-white/10 text-emerald-50'
          }`}>
            <div className="mt-0.5 opacity-80">
              {tipType !== 'normal' ? <AlertTriangle size={16} /> : <Sprout size={16} />}
            </div>
            <p className="leading-snug">
              <strong className="block mb-0.5 text-xs opacity-80 font-bold tracking-wider uppercase">Agronomy Tip</strong>
              {tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
