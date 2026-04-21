import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCard } from './components/ForecastCard';
import { CloudRain, AlertCircle } from 'lucide-react';

export default function App() {
  const { 
    data, 
    loading, 
    error, 
    unit, 
    searchCity, 
    getCurrentLocation, 
    toggleUnit 
  } = useWeather();

  // Load default city on mount
  useEffect(() => {
    searchCity('London');
  }, [searchCity]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 relative overflow-hidden">
      <div className="atmosphere"></div>
      
      <div className="max-w-[1024px] mx-auto h-screen p-4 md:p-10 overflow-y-auto md:overflow-hidden">
        <header className="hidden">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
            <CloudRain className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Weather Dashboard
          </h1>
          <p className="text-slate-500 mt-2">Real-time weather updates and forecasts</p>
        </header>

        <main className="h-full">
          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] h-full gap-8">
            {/* Left Column */}
            <div className="flex flex-col justify-between">
              <div>
                <SearchBar 
                  onSearch={searchCity} 
                  onLocationClick={getCurrentLocation} 
                  loading={loading} 
                />

                {error && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-top-4">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Oops! Something went wrong</h3>
                      <p className="text-sm opacity-90">{error}</p>
                    </div>
                  </div>
                )}

                {loading && !data && (
                  <div className="animate-pulse">
                    <div className="bg-white/10 h-64 rounded-3xl mb-8"></div>
                  </div>
                )}

                {data && !loading && (
                  <div className="animate-in fade-in duration-500">
                    <CurrentWeather 
                      data={data} 
                      unit={unit} 
                      onToggleUnit={toggleUnit} 
                    />
                  </div>
                )}
              </div>

              {data && !loading && (
                <div className="mt-10 bg-[rgba(255,255,255,0.05)] p-6 rounded-3xl border border-[rgba(255,255,255,0.12)]">
                  <h3 className="text-[12px] uppercase tracking-[2px] text-[rgba(255,255,255,0.6)] mb-2">Daily Insight</h3>
                  <p className="text-base leading-relaxed">
                    {data.current.weatherCode >= 51 && data.current.weatherCode <= 67 
                      ? "It's raining. Don't forget to take an umbrella!" 
                      : data.current.temp > 25 
                        ? "It's quite warm today. Stay hydrated!" 
                        : data.current.temp < 10 
                          ? "It's chilly outside. Wear a warm coat." 
                          : "The weather is mild. Enjoy your day!"}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="flex flex-col relative h-full">
              {loading && !data && (
                <div className="animate-pulse mt-[120px]">
                  <div className="grid grid-cols-3 gap-5 mb-8">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white/10 h-24 rounded-3xl"></div>
                    ))}
                  </div>
                  <div className="bg-white/10 h-48 rounded-3xl"></div>
                </div>
              )}

              {data && !loading && (
                <div className="animate-in fade-in duration-500 flex flex-col h-full">
                  <div className="absolute top-0 right-0 flex bg-[rgba(255,255,255,0.08)] p-1 rounded-xl border border-[rgba(255,255,255,0.12)]">
                    <button
                      onClick={toggleUnit}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${unit === 'C' ? 'bg-blue-500 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      °C
                    </button>
                    <button
                      onClick={toggleUnit}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${unit === 'F' ? 'bg-blue-500 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                      °F
                    </button>
                  </div>
                  
                  <div className="h-[120px] shrink-0"></div>
                  
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-6 rounded-3xl text-center">
                      <p className="text-[12px] text-[rgba(255,255,255,0.6)] uppercase tracking-[1px] mb-3">Humidity</p>
                      <p className="text-2xl font-semibold">{data.current.humidity}%</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-6 rounded-3xl text-center">
                      <p className="text-[12px] text-[rgba(255,255,255,0.6)] uppercase tracking-[1px] mb-3">Wind Speed</p>
                      <p className="text-2xl font-semibold">{data.current.windSpeed} km/h</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-6 rounded-3xl text-center">
                      <p className="text-[12px] text-[rgba(255,255,255,0.6)] uppercase tracking-[1px] mb-3">Visibility</p>
                      <p className="text-2xl font-semibold">10 km</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-6 rounded-3xl text-center">
                      <p className="text-[12px] text-[rgba(255,255,255,0.6)] uppercase tracking-[1px] mb-3">UV Index</p>
                      <p className="text-2xl font-semibold">Low 2</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-6 rounded-3xl text-center">
                      <p className="text-[12px] text-[rgba(255,255,255,0.6)] uppercase tracking-[1px] mb-3">Pressure</p>
                      <p className="text-2xl font-semibold">1012 hPa</p>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] p-6 rounded-3xl text-center">
                      <p className="text-[12px] text-[rgba(255,255,255,0.6)] uppercase tracking-[1px] mb-3">Rainfall</p>
                      <p className="text-2xl font-semibold">0.2 mm</p>
                    </div>
                  </div>

                  <ForecastCard 
                    forecast={data.forecast} 
                    unit={unit} 
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
