
import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchForecastData } from '@/services/weatherService';

interface WeatherState {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  isLoading: boolean;
  error: string | null;
}

interface ForecastState {
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    hourly: Array<{
      time: string;
      temperature: number;
      condition: string;
      precipitation: number;
    }>;
  }>;
  isLoading: boolean;
  error: string | null;
}

export const useWeather = (lat: number, lng: number) => {
  const [weather, setWeather] = useState<WeatherState>({
    temperature: 0,
    condition: '',
    humidity: 0,
    windSpeed: 0,
    visibility: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadWeather = async () => {
      setWeather(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const data = await fetchWeatherData(lat, lng);
        setWeather({
          ...data,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setWeather(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load weather'
        }));
      }
    };

    if (lat && lng) {
      loadWeather();
    }
  }, [lat, lng]);

  return weather;
};

export const useForecast = (lat: number, lng: number) => {
  const [forecast, setForecast] = useState<ForecastState>({
    forecast: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadForecast = async () => {
      setForecast(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const data = await fetchForecastData(lat, lng);
        setForecast({
          forecast: data,
          isLoading: false,
          error: null
        });
      } catch (error) {
        setForecast(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load forecast'
        }));
      }
    };

    if (lat && lng) {
      loadForecast();
    }
  }, [lat, lng]);

  return forecast;
};
