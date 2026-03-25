const AGRO_BASE = 'https://api.agromonitoring.com/agro/1.0';
const API_KEY = import.meta.env.VITE_AGRO_API_KEY;

/**
 * Geocode a location string into lat/lon using OpenStreetMap Nominatim.
 * Falls back to New Delhi if not found.
 */
export const getCoordinates = async (locationString) => {
  if (!locationString) return { lat: 28.6139, lon: 77.2090, name: 'Delhi' };
  
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationString)}&format=json&limit=1`);
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        name: data[0].name.split(',')[0] || locationString
      };
    }
    return { lat: 28.6139, lon: 77.2090, name: 'Delhi' }; // Fallback
  } catch (err) {
    console.error("Geocoding failed:", err);
    return { lat: 28.6139, lon: 77.2090, name: 'Delhi' }; // Fallback
  }
};

/**
 * Fetch all required AgroData in parallel.
 * @param {number} lat 
 * @param {number} lon 
 */
export const fetchAgroData = async (lat, lon) => {
  if (!API_KEY || API_KEY === 'YOUR_AGRO_API_KEY_HERE') throw new Error("Missing Agromonitoring API Key");

  try {
    const [weatherRes, soilRes, uviRes] = await Promise.all([
      fetch(`${AGRO_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
      fetch(`${AGRO_BASE}/soil?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
      fetch(`${AGRO_BASE}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    ]);

    let weatherData = null;
    let soilData = null;
    let uviData = null;

    if (weatherRes.ok) weatherData = await weatherRes.json();
    // Soil and UVI may fail depending on tier/region, so we don't block weather
    if (soilRes.ok) soilData = await soilRes.json();
    if (uviRes.ok) uviData = await uviRes.json();

    if (!weatherData) throw new Error("Weather data fetch failed");

    // Weather API temp format: usually Kelvin if no units specified, similar to OpenWeather
    const tempK = weatherData.main.temp;
    const tempC = tempK > 150 ? tempK - 273.15 : tempK;

    // Soil temp is typically in Kelvin
    const soilTempC = soilData ? (soilData.t10 > 150 ? soilData.t10 - 273.15 : soilData.t10) : null;
    const moisture = soilData ? soilData.moisture : null;

    return {
      weather: {
        temp: tempC,
        humidity: weatherData.main.humidity,
        desc: weatherData.weather[0].main,
        wind: weatherData.wind.speed
      },
      soil: soilData ? {
        temp: soilTempC,
        moisture: moisture, // e.g. 0.28 (28%)
      } : null,
      uvi: uviData ? uviData.uvi : null
    };

  } catch (error) {
    console.error("Failed to fetch agro data:", error);
    throw error;
  }
};
