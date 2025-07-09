
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Thermometer, Droplets, Wind, Eye, Sun, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface WeatherDetailProps {
  town: {
    name: string;
    distance: number;
    elevation: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    hourly?: Array<{
      time: string;
      temperature: number;
      condition: string;
      precipitation: number;
    }>;
  }>;
  onBack: () => void;
  isCelsius: boolean;
  onToggleUnit: (isCelsius: boolean) => void;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ 
  town, 
  forecast, 
  onBack, 
  isCelsius, 
  onToggleUnit 
}) => {
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('sunny') || condition.includes('clear')) {
      return <Sun className="h-5 w-5" />;
    }
    return <Cloud className="h-5 w-5" />;
  };

  const todaysForecast = forecast[0];
  const isToday = (dateString: string) => {
    const today = new Date();
    const forecastDate = new Date(dateString);
    return today.toDateString() === forecastDate.toDateString();
  };

  // Calculate chart positions for hourly temperatures
  const getChartPosition = (temp: number, minTemp: number, maxTemp: number) => {
    if (maxTemp === minTemp) return 50; // Center if all temps are the same
    return ((maxTemp - temp) / (maxTemp - minTemp)) * 80 + 10; // 10-90% range
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{town.name}</h1>
            <p className="text-gray-600 text-sm">{town.distance} km • {town.elevation} m elevation</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className={`${isCelsius ? 'text-black font-medium' : 'text-gray-500'}`}>°C</span>
            <Switch
              checked={!isCelsius}
              onCheckedChange={(checked) => onToggleUnit(!checked)}
            />
            <span className={`${!isCelsius ? 'text-black font-medium' : 'text-gray-500'}`}>°F</span>
          </div>
        </div>

        {/* Today's Hourly Forecast Chart */}
        {todaysForecast && isToday(todaysForecast.date) && todaysForecast.hourly && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-3">Today's Hourly Forecast</h2>
            <Card className="p-4 border border-gray-200">
              <div className="relative">
                {/* Temperature Chart */}
                <div className="relative h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Temperature curve */}
                    <path
                      d={`M ${todaysForecast.hourly.map((hour, index) => {
                        const x = (index / (todaysForecast.hourly!.length - 1)) * 100;
                        const minTemp = Math.min(...todaysForecast.hourly!.map(h => h.temperature));
                        const maxTemp = Math.max(...todaysForecast.hourly!.map(h => h.temperature));
                        const y = getChartPosition(hour.temperature, minTemp, maxTemp);
                        return `${x},${y}`;
                      }).join(' L ')}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      className="drop-shadow-sm"
                    />
                    {/* Temperature dots */}
                    {todaysForecast.hourly.map((hour, index) => {
                      const x = (index / (todaysForecast.hourly!.length - 1)) * 100;
                      const minTemp = Math.min(...todaysForecast.hourly!.map(h => h.temperature));
                      const maxTemp = Math.max(...todaysForecast.hourly!.map(h => h.temperature));
                      const y = getChartPosition(hour.temperature, minTemp, maxTemp);
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="2"
                          fill="#3b82f6"
                          className="drop-shadow-sm"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Temperature labels */}
                  <div className="absolute inset-0 flex justify-between items-start">
                    {todaysForecast.hourly.map((hour, index) => {
                      const minTemp = Math.min(...todaysForecast.hourly!.map(h => h.temperature));
                      const maxTemp = Math.max(...todaysForecast.hourly!.map(h => h.temperature));
                      const topPosition = getChartPosition(hour.temperature, minTemp, maxTemp);
                      return (
                        <div
                          key={index}
                          className="text-xs font-medium text-black"
                          style={{ 
                            position: 'absolute',
                            left: `${(index / (todaysForecast.hourly!.length - 1)) * 100}%`,
                            top: `${Math.max(0, topPosition - 8)}%`,
                            transform: 'translateX(-50%)'
                          }}
                        >
                          {convertTemp(hour.temperature)}°
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Weather icons and times */}
                <div className="flex justify-between items-center">
                  {todaysForecast.hourly.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center text-center min-w-0">
                      <div className="text-gray-600 mb-1">
                        {getWeatherIcon(hour.condition)}
                      </div>
                      <div className="text-xs text-gray-600">{hour.time}</div>
                      <div className="text-xs text-blue-600 mt-1">{hour.precipitation}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 10-Day Forecast */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-black">10-Day Forecast</h2>
          {forecast.map((day, index) => (
            <Card key={index} className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-gray-600">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <div>
                    <div className="font-medium text-black">
                      {index === 0 && isToday(day.date) ? 'Today' : 
                        new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })
                      }
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {day.condition}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-black">
                    {convertTemp(day.high)}° / <span className="text-gray-600">{convertTemp(day.low)}°</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-600">{day.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-600">{day.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cloud className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-600">{day.precipitation}%</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
