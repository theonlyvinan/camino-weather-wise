
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
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ town, forecast, onBack }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  
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
              onCheckedChange={(checked) => setIsCelsius(!checked)}
            />
            <span className={`${!isCelsius ? 'text-black font-medium' : 'text-gray-500'}`}>°F</span>
          </div>
        </div>

        {/* Today's Hourly Forecast */}
        {todaysForecast && isToday(todaysForecast.date) && todaysForecast.hourly && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-3">Today's Hourly Forecast</h2>
            <div className="flex gap-3 overflow-x-auto pb-3">
              {todaysForecast.hourly.map((hour, index) => (
                <Card key={index} className="flex-shrink-0 p-3 border border-gray-200 min-w-[80px]">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{hour.time}</div>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(hour.condition)}
                    </div>
                    <div className="font-bold text-black text-sm">
                      {convertTemp(hour.temperature)}°
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {hour.precipitation}%
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
