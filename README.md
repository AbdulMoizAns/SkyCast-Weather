# SkyCast Weather Dashboard

A modern, responsive weather dashboard featuring a stunning glassmorphism "Immersive UI". Built with React, TypeScript, Tailwind CSS, and the Open-Meteo API, it provides real-time weather updates, geolocation support, and a 5-day forecast.

![SkyCast Weather Dashboard Preview](https://via.placeholder.com/1024x768.png?text=SkyCast+Weather+Dashboard)

## ✨ Features

- **Real-Time Weather:** Get current temperature, weather conditions, and detailed metrics (humidity, wind speed, visibility, UV index, pressure, and rainfall).
- **5-Day Forecast:** Plan ahead with a clear and concise 5-day weather outlook.
- **Geolocation Support:** Automatically fetch weather data for your current location with a single click.
- **Smart Insights:** Actionable daily advice based on current weather conditions (e.g., "It's raining. Don't forget an umbrella!").
- **Immersive UI:** A polished, modern glassmorphism aesthetic with atmospheric background gradients and fluid layouts.
- **Unit Toggling:** Switch seamlessly between Celsius (°C) and Fahrenheit (°F).
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## 🛠️ Tech Stack

- **Framework:** React 19 (Functional Components & Hooks)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Weather APIs:** 
  - [Open-Meteo Forecast API](https://open-meteo.com/) (No API key required)
  - [Open-Meteo Geocoding API](https://open-meteo.com/)
  - OpenStreetMap Nominatim (for reverse geocoding)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdulMoizAns/skycast-weather-dashboard.git
   cd skycast-weather-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` to view the application.

## 📦 Project Structure

```text
src/
├── components/       # Reusable UI components (SearchBar, CurrentWeather, etc.)
├── hooks/            # Custom React hooks (useWeather)
├── types/            # TypeScript interfaces and types
├── App.tsx           # Main application layout and logic
├── index.css         # Global styles and Tailwind configuration
└── main.tsx          # Application entry point
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
