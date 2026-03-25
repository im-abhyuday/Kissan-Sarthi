<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Kissan Sarthi Logo" width="100"/>
  <h1>🌾 Kissan Sarthi</h1>
  <p><strong>Empowering Indian Farmers through a Modern AgTech Ecosystem</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white" />
  </p>
</div>

---

## 📖 About Kissan Sarthi

**Kissan Sarthi** is a comprehensive Agricultural Technology (AgTech) "Super App" built specifically for Indian farmers and buyers. It eliminates middlemen, ensures fair pricing, and acts as a one-stop digital workspace for crop management, e-commerce, and community advisory.

By leveraging a highly modern web stack (React 19 + Vite + Supabase + Tailwind), Kissan Sarthi delivers a fast, secure, and beautiful zero-latency experience directly to farmers' devices.

---

## ✨ Key Features

### 👨‍🌾 For Farmers (Super App Dashboard)
- **Direct Marketplace:** List crops, vegetables, and farming outputs directly to buyers without intermediaries.
- **Dynamic Agro Widget:** Real-time integration with OpenWeather/Agromonitoring APIs providing localized weather data, UV index, and soil insights.
- **Krishi Samvad (Community Forum):** A dedicated social feed where farmers can upload pictures of crop diseases (e.g., Whitefly infestations) and receive instant agronomy advice from peers and experts.
- **Government Schemes Tracker:** A robust, searchable database of *Central* (PM-KISAN, PMFBY) and *State* (Rythu Bandhu, KALIA) agricultural subsidies, explaining eligibility and linking to official application portals.
- **AgroChatbot AI:** A built-in, lightning-fast deterministic state-machine chatbot offering instant simulated Mandi Prices (via `data.gov.in`) and agronomy tips.
- **Analytics & Revenue:** Visualise 6-month historical revenue streams via integrated `Recharts` data visualization.

### 🛒 For Buyers
- **Fresh Produce Marketplace:** Browse and purchase fresh stock directly from the source.
- **Cart & Secure Checkout:** Manage purchases efficiently with a responsive Cart View and Checkout system.

---

## 🚀 Tech Stack

- **Frontend Framework:** React 19 (Hooks, Context) + Vite for blazing-fast HMR.
- **Styling:** Tailwind CSS (utility-first, responsive, glassmorphism design).
- **Icons & Visualization:** `lucide-react` for modern iconography, `recharts` for data visualization.
- **Backend as a Service (BaaS):** Supabase (PostgreSQL Database, GoTrue Auth, Storage).
- **Chatbot:** Custom React deterministic state-machine logic engine (Zero-LLM latency).
- **APIs:** Agromonitoring API (Weather/Soil), OpenStreetMap Nominatim (Geocoding).

---

## 🛠️ Local Development Setup

To run Kissan Sarthi locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/kissan-sarthi.git
cd kissan-sarthi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your API keys:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_AGRO_API_KEY=your_agromonitoring_api_key
```

### 4. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
kissan-sarthi/
├── src/
│   ├── components/         # React UI Components (Dashboard, Forum, Chatbot, etc.)
│   ├── data/               # Static datasets (e.g., schemesData.js, translations.js)
│   ├── services/           # External API integrations (Supabase, AgroService)
│   ├── App.jsx             # Main Application Router & Entry Point
│   ├── index.css           # Global Tailwind & Custom Styles
│   └── main.jsx            # React DOM Rendering
├── public/                 # Static assets
├── .env.local              # Environment Variables
├── tailwind.config.js      # Tailwind Configuration
└── package.json            # Project Dependencies
```

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/your-username/kissan-sarthi/issues).

## 📝 License
This project is licensed under the MIT License.

---
<div align="center">
  <i>"Jai Jawan, Jai Kisan"</i>
</div>
