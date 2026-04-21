import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, Moon } from 'lucide-react';

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  className?: string;
}

export function WeatherIcon({ code, isDay = true, className = "w-8 h-8" }: WeatherIconProps) {
  // Map WMO weather codes to Lucide icons
  if (code === 0) {
    return isDay ? <Sun className={`${className} text-yellow-500`} /> : <Moon className={`${className} text-blue-200`} />;
  }
  if (code === 1 || code === 2 || code === 3) {
    return <Cloud className={`${className} text-gray-400`} />;
  }
  if (code === 45 || code === 48) {
    return <CloudFog className={`${className} text-gray-400`} />;
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return <CloudRain className={`${className} text-blue-400`} />;
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return <Snowflake className={`${className} text-blue-200`} />;
  }
  if (code >= 95 && code <= 99) {
    return <CloudLightning className={`${className} text-purple-500`} />;
  }
  
  return <Cloud className={`${className} text-gray-400`} />;
}
