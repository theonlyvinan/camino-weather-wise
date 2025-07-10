
import React from 'react';
import { Thermometer, Droplets, Wind, Loader2 } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

interface WeatherDisplayProps {
  lat: number;
  lng: number;
  isCelsius: boolean;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  lat,
  lng,
  isCelsius,
  size = 'medium',
  showDetails = true
}) => {
  const weather = useWeather(lat, lng);

  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          temp: 'text-lg font-bold',
          condition: 'text-xs',
          details: 'text-xs'
        };
      case 'large':
        return {
          temp: 'text-3xl font-bold',
          condition: 'text-sm',
          details: 'text-sm'
        };
      default:
        return {
          temp: 'text-xl font-bold',
          condition: 'text-sm',
          details: 'text-xs'
        };
    }
  };

  const classes = getSizeClasses();

  if (weather.isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        <span className="text-sm text-gray-500">Loading weather...</span>
      </div>
    );
  }

  if (weather.error) {
    return (
      <div className="text-sm text-red-500">
        Weather unavailable
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className={`text-gray-900 ${classes.temp}`}>
          {convertTemp(weather.temperature)}°{isCelsius ? 'C' : 'F'}
        </div>
        <div className={`text-gray-600 font-medium capitalize ${classes.condition}`}>
          {weather.condition}
        </div>
      </div>
      
      {showDetails && (
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 text-gray-600 ${classes.details}`}>
            <Droplets className="h-3 w-3" />
            <span>{weather.humidity}%</span>
          </div>
          <div className={`flex items-center gap-1 text-gray-600 ${classes.details}`}>
            <Wind className="h-3 w-3" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
