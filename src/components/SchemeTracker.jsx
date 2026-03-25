import React, { useState } from 'react';
import { Search, MapPin, Building2, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { schemesData } from '../data/schemesData';

export default function SchemeTracker({ userState = 'All' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Central', 'State'
  const [expandedId, setExpandedId] = useState(null);

  // Filter Logic
  const filteredSchemes = schemesData.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'All' ? true : scheme.type === activeTab;
    
    // For 'State' tab, you could prioritize the user's specific state (e.g., if user profile says Madhya Pradesh)
    return matchesSearch && matchesTab;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      {/* Header & Search */}
      <div className="p-6 bg-gradient-to-r from-emerald-800 to-green-700 text-white">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Building2 size={24} /> 
          Government Schemes Tracker
        </h2>
        <p className="text-emerald-100 mb-6 text-sm">Discover and apply for Central and State subsidies tailored for Indian Farmers.</p>
        
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm shadow-sm"
            placeholder="Search for schemes (e.g., 'Tractor', 'Insurance', 'PM-KISAN')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-stone-50 px-6">
        {['All', 'Central', 'State'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab 
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab === 'All' ? 'All Schemes' : `${tab} Government`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-500">{filteredSchemes.length} schemes found</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded px-2 py-1">
            <Filter size={14} /> Filtered
          </div>
        </div>

        <div className="space-y-4">
          {filteredSchemes.map((scheme) => {
            const isExpanded = expandedId === scheme.id;
            const isCentral = scheme.type === 'Central';
            
            return (
              <div 
                key={scheme.id} 
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${isExpanded ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'border-stone-200 hover:border-emerald-300 hover:shadow-sm'}`}
              >
                {/* Card Header (Clickable) */}
                <div 
                  className={`p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isExpanded ? 'bg-emerald-50/30' : 'bg-white'}`}
                  onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isCentral ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        {scheme.type}
                      </span>
                      {scheme.state && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 flex items-center gap-1">
                          <MapPin size={10} /> {scheme.state}
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200">
                        {scheme.target}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{scheme.title}</h3>
                    <p className={`text-sm text-gray-600 mt-1 transition-all ${isExpanded ? 'line-clamp-none' : 'line-clamp-1'}`}>
                      {scheme.description}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-100 text-gray-400'}`}>
                       <svg className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-5 bg-white border-t border-stone-100 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                        <h4 className="text-sm font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                          <CheckCircle size={16} className="text-emerald-500" />
                          Key Benefits
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{scheme.benefits}</p>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                        <h4 className="text-sm font-bold text-gray-800 mb-2">Eligibility Criteria</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{scheme.eligibility}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <a 
                        href={scheme.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md"
                      >
                        Visit Official Portal <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredSchemes.length === 0 && (
            <div className="text-center py-12 bg-stone-50 rounded-xl border border-dashed border-stone-300">
              <p className="text-gray-500 font-medium">No active schemes found matching your search.</p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
