import React from 'react';
import { ShieldCheck, ArrowLeft, Building2, Scale } from 'lucide-react';

export default function TermsOfService({ setView, t }) {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-800 font-sans selection:bg-emerald-200">
      {/* Header */}
      <div className="bg-emerald-900 text-white p-8 sm:p-12 border-b-8 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setView('hero')} 
            className="flex items-center gap-2 text-emerald-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Scale size={40} className="text-yellow-400" />
            <h1 className="text-4xl sm:text-5xl font-black">Terms of Service</h1>
          </div>
          <p className="text-emerald-100/80 text-lg">Last Updated: March 2026 • Valid for India Operations</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 sm:p-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="text-emerald-600" /> 1. Acceptance and Legal Age
            </h2>
            <p className="leading-relaxed text-gray-600">
              Welcome to Kissan Sarthi ("Platform"). By accessing or using our B2B AgTech marketplace, you agree to be bound by these Terms of Service. You affirm that you are 18 years of age or older and are competent to contract as per the Indian Contract Act, 1872. If you are registering on behalf of a registered business or farm, you vow that you hold the legal authority to bind that entity to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-emerald-600" /> 2. FSSAI & Quality Compliance
            </h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              As an entity operating under the <strong>Food Safety and Standards Authority of India (FSSAI)</strong> regulations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Farmers/Sellers must ensure all listed produce meets basic safety and unadulterated standards.</li>
              <li>B2B Sellers handling processed foods must possess a valid FSSAI registration or Central License.</li>
              <li>Perishable goods must possess a minimum shelf-life of 45 days or 30% of total shelf-life upon dispatch.</li>
              <li>Misleading representations regarding "100% Organic" certifications without valid PGS-India or NPOP documentation are strictly prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Escrow & Secure Payments</h2>
            <p className="leading-relaxed text-gray-600">
              Kissan Sarthi operates a secure nodal Escrow mechanism powered by Cashfree Payments / Razorpay. Buyer funds are held in trust upon order placement. Payouts to farmers are executed seamlessly only upon successful delivery verification. Returns or quality disputes will instantly lock funds and initiate our unbiased arbitration process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Dispute Resolution & Governing Law</h2>
            <p className="leading-relaxed text-gray-600">
              Any claims, conflicts, or B2B disputes arising from transactions on Kissan Sarthi shall first be attempted to be resolved amicably via our embedded Grievance Redressal Mechanism. If unresolved within 30 days, the dispute shall be subject to binding arbitration as per the <strong>Arbitration and Conciliation Act, 1996</strong>. The jurisdiction for all legal proceedings shall be the courts of Bhopal, Madhya Pradesh, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. IT Act 2000 Guidelines</h2>
            <p className="leading-relaxed text-gray-600">
              Kissan Sarthi acts as an "Intermediary" under the Information Technology Act, 2000. We reserve the right to remove non-compliant, fraudulent, or unlawful listings upon government notification or internal audit discovery without prior warning.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
