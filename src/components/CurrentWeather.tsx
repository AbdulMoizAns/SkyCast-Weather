import { WeatherData, Unit } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: Unit;
  onToggleUnit: () => void;
}

export function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const convertTemp = (tempC: number) => {
    if (unit === 'C') return Math.round(tempC);
    return Math.round((tempC * 9) / 5 + 32);
  };

  const currentTemp = convertTemp(data.current.temp);

  const formatDate = () => {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(new Date());
  };

  return (
    <div className="mt-auto">
      <h1 className="text-5xl font-bold mb-2 tracking-tight">
        {data.location.name}
      </h1>
      <p className="text-lg text-[rgba(255,255,255,0.6)] mb-10">
        {formatDate()}
      </p>
      
      <div className="flex items-start">
        <span className="text-[140px] font-extralight leading-none tracking-[-6px]">
          {currentTemp}
        </span>
        <span className="text-5xl font-light mt-5 opacity-50">
          °{unit}
        </span>
      </div>
      
      <div className="inline-flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-full text-sm font-semibold mt-5">
        <span>●</span> {data.current.condition}
      </div>
    </div>
  );
}
