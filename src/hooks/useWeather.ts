import { useState, useCallback } from 'react';
import { WeatherData, Unit } from '../types/weather';

const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<Unit>('C');

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number, locationName: string, country: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const result = await response.json();
      
      const weatherData: WeatherData = {
        current: {
          temp: result.current.temperature_2m,
          humidity: result.current.relative_humidity_2m,
          windSpeed: result.current.wind_speed_10m,
          condition: WEATHER_CODES[result.current.weather_code] || 'Unknown',
          isDay: result.current.is_day === 1,
          weatherCode: result.current.weather_code,
        },
        forecast: result.daily.time.slice(1, 6).map((time: string, index: number) => ({
          date: time,
          maxTemp: result.daily.temperature_2m_max[index + 1],
          minTemp: result.daily.temperature_2m_min[index + 1],
          weatherCode: result.daily.weather_code[index + 1],
        })),
        location: {
          name: locationName,
          country: country,
        }
      };

      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCity = useCallback(async (city: string) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      if (!geoResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const geoResult = await geoResponse.json();
      if (!geoResult.results || geoResult.results.length === 0) {
        throw new Error(`City "${city}" not found`);
      }
      
      const location = geoResult.results[0];
      await fetchWeatherByCoords(location.latitude, location.longitude, location.name, location.country || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  }, [fetchWeatherByCoords]);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Reverse geocoding to get city name
          const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
          let locationName = 'Current Location';
          let country = '';
          
          if (geoResponse.ok) {
            const geoResult = await geoResponse.json();
            locationName = geoResult.address.city || geoResult.address.town || geoResult.address.village || geoResult.address.county || 'Current Location';
            country = geoResult.address.country || '';
          }
          
          await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, locationName, country);
        } catch (err) {
          // Fallback if reverse geocoding fails
          await fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, 'Current Location', '');
        }
      },
      (err) => {
        setError('Unable to retrieve your location. Please check permissions.');
        setLoading(false);
      }
    );
  }, [fetchWeatherByCoords]);

  const toggleUnit = useCallback(() => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  }, []);

  return {
    data,
    loading,
    error,
    unit,
    searchCity,
    getCurrentLocation,
    toggleUnit
  };
}
