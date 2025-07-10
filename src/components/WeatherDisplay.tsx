
import React from 'react';
import { Thermometer, Droplets, Wind, Loader2 } from 'lucide-react';
import { useWeather, useForecast } from '@/hooks/useWeather';

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
  const forecast = useForecast(lat, lng);

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

  // Temperature color functions that always use original Celsius values
  const getHighTempColor = (tempCelsius: number) => {
    if (tempCelsius >= 30) return 'text-red-400';
    if (tempCelsius >= 25) return 'text-orange-400';
    if (tempCelsius >= 20) return 'text-yellow-400';
    return 'text-foreground';
  };

  const getLowTempColor = (tempCelsius: number) => {
    if (tempCelsius <= 5) return 'text-blue-400';
    if (tempCelsius <= 10) return 'text-cyan-400';
    if (tempCelsius <= 15) return 'text-slate-400';
    return 'text-muted-foreground';
  };

  const classes = getSizeClasses();

  if (weather.isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading weather...</span>
      </div>
    );
  }

  if (weather.error) {
    return (
      <div className="text-sm text-destructive">
        Weather unavailable
      </div>
    );
  }

  // Get today's forecast for min/max temps
  const todaysForecast = forecast.forecast?.find(day => {
    const today = new Date().toISOString().split('T')[0];
    return day.date === today;
  });

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className={`text-foreground ${classes.temp}`}>
          {convertTemp(weather.temperature)}°{isCelsius ? 'C' : 'F'}
        </div>
        <div className={`text-muted-foreground font-medium capitalize ${classes.condition}`}>
          {weather.condition}
        </div>
      </div>
      
      {/* Show min/max temps if forecast is available */}
      {todaysForecast && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            <span className={`${getHighTempColor(todaysForecast.high)}`}>
              H: {convertTemp(todaysForecast.high)}°
            </span>
            {' / '}
            <span className={`${getLowTempColor(todaysForecast.low)}`}>
              L: {convertTemp(todaysForecast.low)}°
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
