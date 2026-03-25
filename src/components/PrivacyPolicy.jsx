import React from 'react';
import { Lock, ArrowLeft, ShieldAlert, FileKey } from 'lucide-react';

export default function PrivacyPolicy({ setView, t }) {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-800 font-sans selection:bg-emerald-200">
      {/* Header */}
      <div className="bg-stone-900 text-white p-8 sm:p-12 border-b-8 border-emerald-500">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setView('hero')} 
            className="flex items-center gap-2 text-stone-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Lock size={40} className="text-emerald-400" />
            <h1 className="text-4xl sm:text-5xl font-black">Privacy Policy</h1>
          </div>
          <p className="text-stone-300 text-lg">Fully Compliant with India's DPDP Act 2023</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 sm:p-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 space-y-8">
          
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
            <p className="text-emerald-900 font-medium">
              At Kissan Sarthi, Farmer and Buyer privacy is our highest priority. This Privacy Policy details how we collect, store, and process your personal data in strict compliance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <strong>IT Act, 2000</strong>.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileKey className="text-emerald-600" /> 1. Consent and Data Minimization
            </h2>
            <p className="leading-relaxed text-gray-600">
              We collect Personal Data only when Free, Specific, Informed, Unconditional, and Unambiguous consent is provided. We practice strict Data Minimization—collecting only what is absolutely necessary (e.g., GPS location for farm logistics, UPI/Bank details for Escrow payouts) to fulfill our core AgTech services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Data Processed</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Farmer Data:</strong> Name, Aadhar/KYC Verification (encrypted), Farm Geolocation maps, Crop yield history, and Bank records.</li>
              <li><strong>Buyer Data:</strong> Restaurant/Business registration, GSTIN, Delivery Addresses, and Transaction ledgers.</li>
              <li><strong>Automated Data:</strong> IP Addresses, Device IDs, and usage analytics routed through local Indian cloud servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="text-emerald-600" /> 3. Data Protection and Breach Notification
            </h2>
            <p className="leading-relaxed text-gray-600">
              Kissan Sarthi utilizes AES-256 military-grade encryption for resting data and TLS 1.3 for data in transit. In the highly unlikely event of a structural data breach, Kissan Sarthi is legally bound to notify the Data Protection Board of India and all affected Data Principals (users) immediately as mandated by the DPDP Act.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Principal Rights</h2>
            <p className="leading-relaxed text-gray-600 mb-4">
              Under the DPDP Act, you (the Data Principal) retain absolute authority over your data.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Right to Access:</strong> You can request a summary of the personal data we hold about you.</li>
              <li><strong>Right to Correction & Erasure:</strong> You can request immediate modification or deletion of your account and associated data.</li>
              <li><strong>Right to Nominate:</strong> You may nominate an individual to exercise your rights in the event of incapacity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Our Data Protection Officer (DPO)</h2>
            <p className="leading-relaxed text-gray-600">
              For any grievances regarding your personal data or to withdraw consent, contact our dedicated DPO at:<br/><br/>
              <strong>Email:</strong> privacy@kissansarthi.in<br/>
              <strong>Address:</strong> Data Governance Cell, Kissan Sarthi HQ, Bhopal, Madhya Pradesh.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
