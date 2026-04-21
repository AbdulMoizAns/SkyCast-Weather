import { WeatherData, Unit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface ForecastCardProps {
  forecast: WeatherData['forecast'];
  unit: Unit;
}

export function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const convertTemp = (tempC: number) => {
    if (unit === 'C') return Math.round(tempC);
    return Math.round((tempC * 9) / 5 + 32);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  return (
    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-xl border border-[rgba(255,255,255,0.12)] rounded-[32px] p-8 flex-1 flex flex-col justify-between">
      <h3 className="text-lg font-semibold mb-6">5-Day Forecast</h3>
      <div className="flex justify-between">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center gap-3 w-[15%]"
          >
            <span className="text-sm text-[rgba(255,255,255,0.6)]">{formatDate(day.date)}</span>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <WeatherIcon code={day.weatherCode} className="w-6 h-6" />
            </div>
            <span className="font-semibold text-lg">{convertTemp(day.maxTemp)}°</span>
            <span className="text-sm text-[rgba(255,255,255,0.6)]">{convertTemp(day.minTemp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
