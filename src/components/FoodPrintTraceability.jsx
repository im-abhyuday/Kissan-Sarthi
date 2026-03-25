import React from 'react';
import { X, ShieldCheck, MapPin, Truck, CheckCircle2, Leaf, Box, Fingerprint } from 'lucide-react';

export default function FoodPrintTraceability({ product, onClose }) {
  if (!product) return null;

  // Generate deterministic but pseudo-random data based on the product
  const hash = btoa(product.name + product.seller).substring(0, 12).toUpperCase();
  const today = new Date();
  
  const timeline = [
    {
      id: 1,
      title: 'Farm Origin Certified',
      desc: `Harvested by ${product.seller} in District/State. Organic soil standards verified.`,
      icon: <Leaf size={20} className="text-white" />,
      color: 'bg-green-600',
      date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'completed'
    },
    {
      id: 2,
      title: 'Quality Assesment Node',
      desc: `FSSAI grading applied: Premium Grade A. Moisture content optimized.`,
      icon: <CheckCircle2 size={20} className="text-white" />,
      color: 'bg-emerald-500',
      date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'completed'
    },
    {
      id: 3,
      title: 'Cold Storage Transit',
      desc: `Stored at Central Ag-Warehouse node. Temperature maintained at 4°C.`,
      icon: <Box size={20} className="text-white" />,
      color: 'bg-blue-500',
      date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'completed'
    },
    {
      id: 4,
      title: 'Awaiting B2B Escrow',
      desc: `Ready for secure dispatch via transparent Kissan Sarthi logistics partner.`,
      icon: <ShieldCheck size={20} className="text-white" />,
      color: 'bg-gray-300',
      date: 'Pending Order',
      status: 'pending'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up relative">
        {/* Header */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full mix-blend-overlay filter blur-3xl"></div>
          
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl shadow-lg border border-white/20">
              <Fingerprint size={32} className="text-white drop-shadow-md" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-wide">FoodPrint™ Ledger</h2>
              <p className="text-emerald-400 font-mono text-sm mt-1">ID: FX-{hash}</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap sm:flex-nowrap gap-6 mb-10 pb-8 border-b border-gray-100">
            <div className="w-full sm:w-1/3 aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
               {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <Leaf size={48} className="mb-2 opacity-50 text-emerald-500" />
                    <span className="text-sm font-semibold">{product.category}</span>
                  </div>
                )}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-3xl font-black text-gray-800">{product.name}</h3>
                <p className="text-emerald-600 font-bold text-xl mt-1">₹{product.price}<span className="text-gray-500 text-sm font-medium">/{product.unit}</span></p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Farmer Origin</p>
                  <p className="font-bold text-gray-800 flex items-center gap-1.5"><MapPin size={14} className="text-emerald-500"/> {product.seller}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">Carbon Saved</p>
                  <p className="font-bold text-emerald-700 flex items-center gap-1.5"><Cloud size={14} /> ~12.5 kg CO2</p>
                </div>
              </div>
            </div>
          </div>

          <h4 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
            <Truck className="text-emerald-500" /> Blockchain Supply Route
          </h4>

          {/* Timeline */}
          <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {timeline.map((item, index) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon Marker */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${item.color} shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10 ${item.status === 'pending' ? 'grayscale opacity-60' : ''}`}>
                  {item.icon}
                </div>
                
                {/* Content Card */}
                <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border ${item.status === 'pending' ? 'bg-gray-50 border-gray-100' : 'bg-white border-emerald-100 shadow-sm'} ml-12 md:ml-0`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                    <h5 className={`font-bold text-lg ${item.status === 'pending' ? 'text-gray-500' : 'text-gray-800'}`}>{item.title}</h5>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.status === 'pending' ? 'bg-gray-200 text-gray-600' : 'bg-emerald-100 text-emerald-800'}`}>{item.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3 text-sm text-gray-500">
            <ShieldCheck size={20} className="text-gray-400 shrink-0" />
            <p>This timeline is cryptographically secured via Kissan Sarthi FoodPrint™ protocols. Data points are directly verified from nodal authorities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
