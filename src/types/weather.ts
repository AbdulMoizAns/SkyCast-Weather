export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    isDay: boolean;
    weatherCode: number;
  };
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    weatherCode: number;
  }>;
  location: {
    name: string;
    country: string;
  };
}

export type Unit = 'C' | 'F';
