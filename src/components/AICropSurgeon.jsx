import React, { useState, useEffect } from 'react';
import { ScanSearch, UploadCloud, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Bug, Droplets } from 'lucide-react';

export default function AICropSurgeon() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setResult({
              disease: 'Early Blight (Alternaria solani)',
              confidence: 94.2,
              severity: 'Moderate',
              affectedArea: '22%',
              recommendations: [
                { id: 1, name: 'Premium Copper Fungicide', type: 'Organic', price: '₹450', link: '#' },
                { id: 2, name: 'Neem Oil Extract 10000 PPM', type: 'Organic', price: '₹299', link: '#' }
              ]
            });
            return 100;
          }
          return p + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setResult(null);
        setScanProgress(0);
        setIsScanning(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScanner = () => {
    setImagePreview(null);
    setResult(null);
    setScanProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 right-32 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 flex items-start gap-6">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <ScanSearch size={40} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
              Kissan AI Crop Surgeon <span className="bg-emerald-500 text-xs px-2 py-1 rounded-full uppercase tracking-widest font-bold">Beta</span>
            </h2>
            <p className="text-emerald-100/90 text-lg max-w-xl leading-relaxed">
              Upload a clear photo of an infected leaf. Our Vision API will detect over 40+ diseases instantly and prescribe precision organic remedies.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload / Scanner Window */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          {!imagePreview ? (
            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer group relative">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageUpload}
              />
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tap to Upload Photo</h3>
              <p className="text-gray-400 text-sm text-center max-w-[250px]">Supports JPG, PNG formats. Ensure the leaf is well-lit and centered.</p>
            </div>
          ) : (
            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img src={imagePreview} alt="Uploaded Crop" className={`max-w-full max-h-[350px] object-contain ${isScanning ? 'opacity-50' : 'opacity-100'} transition-opacity`} />
              
              {/* Scanning Animation Render */}
              {isScanning && (
                <>
                  <div className="absolute inset-0 bg-emerald-900/30"></div>
                  <div 
                    className="absolute left-0 w-full h-1 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)] z-20"
                    style={{ top: `${scanProgress}%`, transition: 'top 0.05s linear' }}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                    <ScanSearch size={48} className="text-yellow-400 animate-pulse mb-4" />
                    <p className="text-white font-bold text-xl tracking-widest uppercase">Analyzing Tissue...</p>
                    <p className="text-emerald-400 font-mono mt-2">{scanProgress}% Computed</p>
                  </div>
                </>
              )}

              {/* Reset Button (Only when done) */}
              {!isScanning && (
                <button 
                  onClick={resetScanner}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors"
                >
                  Scan New Image
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Window */}
        <div className={`bg-white rounded-3xl border border-gray-100 shadow-lg p-6 flex flex-col transition-all duration-500 ${result ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600" /> Diagnostic Report
          </h3>

          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                <Bug size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-400">Awaiting image upload to generate AI diagnostic report.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-fade-in-up">
              {/* Alert Banner */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-4">
                <AlertTriangle className="text-amber-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-black text-amber-900 text-lg mb-1">{result.disease}</h4>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">Confidence: {result.confidence}%</span>
                    <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">Severity: {result.severity}</span>
                  </div>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Affected Tissues</span>
                  <span className="font-bold text-gray-800">{result.affectedArea}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-500">Spread Risk</span>
                  <span className="font-bold text-red-600">High (Action Required)</span>
                </div>
              </div>

              {/* Recommendations */}
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Droplets className="text-emerald-500" size={18} /> Recommended Action Plan
              </h4>
              <div className="space-y-3 mb-6 flex-1">
                {result.recommendations.map(rec => (
                  <div key={rec.id} className="flex items-center justify-between p-3 border border-emerald-100 bg-emerald-50/50 rounded-xl hover:bg-emerald-50 transition-colors">
                    <div>
                      <p className="font-bold text-emerald-900">{rec.name}</p>
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mt-1">{rec.type} Formula</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-800">{rec.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-xl shadow-gray-900/20 group">
                Order Remedial Inputs from Marketplace <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
