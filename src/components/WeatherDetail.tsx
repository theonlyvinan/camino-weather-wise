
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Thermometer, Droplets, Wind, Eye, Sun, Cloud, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface WeatherDetailProps {
  town: {
    name: string;
    distance: number;
    elevation: number;
    weather: {
      shade: string;
    };
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
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const getTemperatureColor = (temp: number) => {
    const celsius = isCelsius ? temp : (temp - 32) * 5/9;
    if (celsius >= 30) return '#ef4444'; // hot red
    if (celsius >= 25) return '#f97316'; // warm orange
    if (celsius >= 20) return '#eab308'; // mild yellow
    if (celsius >= 15) return '#22c55e'; // cool green
    if (celsius >= 10) return '#06b6d4'; // cold cyan
    return '#3b82f6'; // very cold blue
  };

  const getTemperatureGradient = (temp: number) => {
    const celsius = isCelsius ? temp : (temp - 32) * 5/9;
    if (celsius >= 25) return 'from-red-500 to-orange-500';
    if (celsius >= 15) return 'from-yellow-500 to-green-500';
    return 'from-cyan-500 to-blue-500';
  };

  const getDayTempColors = (high: number, low: number) => {
    const avgTemp = (high + low) / 2;
    const celsius = isCelsius ? avgTemp : (avgTemp - 32) * 5/9;
    
    if (celsius >= 25) return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800' };
    if (celsius >= 15) return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800' };
    return { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800' };
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('sunny') || condition.includes('clear')) {
      return <Sun className="h-5 w-5" />;
    }
    return <Cloud className="h-5 w-5" />;
  };

  // Create smooth curve path
  const createSmoothPath = (points: Array<{x: number, y: number}>) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      } else {
        // Subsequent curves
        const prevPrev = points[i - 2];
        const cp1x = prev.x + (curr.x - prevPrev.x) * 0.15;
        const cp1y = prev.y + (curr.y - prevPrev.y) * 0.15;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      }
    }
    
    return path;
  };

  const selectedForecast = forecast[selectedDayIndex];

  // Calculate chart positions for hourly temperatures
  const getChartPosition = (temp: number, minTemp: number, maxTemp: number) => {
    if (maxTemp === minTemp) return 50;
    return ((maxTemp - temp) / (maxTemp - minTemp)) * 70 + 15; // 15-85% range
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 hover:bg-white/60 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{town.name}</h1>
            <p className="text-gray-600 text-sm">{town.distance} km • {town.elevation} m elevation</p>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/70 backdrop-blur-sm rounded-lg p-2">
            <span className={`${isCelsius ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>°C</span>
            <Switch
              checked={!isCelsius}
              onCheckedChange={(checked) => onToggleUnit(!checked)}
            />
            <span className={`${!isCelsius ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>°F</span>
          </div>
        </div>

        {/* Shade Information */}
        <div className="mb-6">
          <Card className="p-4 border border-green-200 bg-green-50/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <TreePine className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Shade Information</h3>
                <p className="text-sm text-green-700">{town.weather.shade}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Day Selection Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {forecast.map((day, index) => {
              const colors = getDayTempColors(day.high, day.low);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDayIndex(index)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDayIndex === index
                      ? `${colors.bg} ${colors.border} ${colors.text} border-2`
                      : 'bg-white/60 border border-gray-200 text-gray-600 hover:bg-white/80'
                  }`}
                >
                  {index === 0 ? 'Today' : 
                    new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })
                  }
                </button>
              );
            })}
          </div>
        </div>

        {/* Hourly Forecast Chart */}
        {selectedForecast && selectedForecast.hourly && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {selectedDayIndex === 0 ? "Today's" : "Selected Day's"} Hourly Forecast
            </h2>
            <Card className="p-4 border border-white/60 bg-white/70 backdrop-blur-sm">
              <div className="relative">
                {/* Temperature Chart */}
                <div className="relative h-40 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        {selectedForecast.hourly.map((hour, index) => (
                          <stop
                            key={index}
                            offset={`${(index / (selectedForecast.hourly!.length - 1)) * 100}%`}
                            stopColor={getTemperatureColor(hour.temperature)}
                          />
                        ))}
                      </linearGradient>
                      <linearGradient id="tempArea" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="url(#tempGradient)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="url(#tempGradient)" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    
                    {/* Area under curve */}
                    <path
                      d={(() => {
                        const minTemp = Math.min(...selectedForecast.hourly!.map(h => h.temperature));
                        const maxTemp = Math.max(...selectedForecast.hourly!.map(h => h.temperature));
                        const points = selectedForecast.hourly!.map((hour, index) => ({
                          x: (index / (selectedForecast.hourly!.length - 1)) * 100,
                          y: getChartPosition(hour.temperature, minTemp, maxTemp)
                        }));
                        const smoothPath = createSmoothPath(points);
                        return smoothPath + ` L 100,90 L 0,90 Z`;
                      })()}
                      fill="url(#tempArea)"
                    />
                    
                    {/* Temperature curve */}
                    <path
                      d={(() => {
                        const minTemp = Math.min(...selectedForecast.hourly!.map(h => h.temperature));
                        const maxTemp = Math.max(...selectedForecast.hourly!.map(h => h.temperature));
                        const points = selectedForecast.hourly!.map((hour, index) => ({
                          x: (index / (selectedForecast.hourly!.length - 1)) * 100,
                          y: getChartPosition(hour.temperature, minTemp, maxTemp)
                        }));
                        return createSmoothPath(points);
                      })()}
                      fill="none"
                      stroke="url(#tempGradient)"
                      strokeWidth="3"
                      className="drop-shadow-sm"
                    />
                    
                    {/* Temperature dots */}
                    {selectedForecast.hourly.map((hour, index) => {
                      const x = (index / (selectedForecast.hourly!.length - 1)) * 100;
                      const minTemp = Math.min(...selectedForecast.hourly!.map(h => h.temperature));
                      const maxTemp = Math.max(...selectedForecast.hourly!.map(h => h.temperature));
                      const y = getChartPosition(hour.temperature, minTemp, maxTemp);
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={getTemperatureColor(hour.temperature)}
                          stroke="white"
                          strokeWidth="2"
                          className="drop-shadow-sm"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Temperature labels */}
                  <div className="absolute inset-0 flex justify-between items-start">
                    {selectedForecast.hourly.map((hour, index) => {
                      const minTemp = Math.min(...selectedForecast.hourly!.map(h => h.temperature));
                      const maxTemp = Math.max(...selectedForecast.hourly!.map(h => h.temperature));
                      const topPosition = getChartPosition(hour.temperature, minTemp, maxTemp);
                      return (
                        <div
                          key={index}
                          className="text-xs font-bold text-white bg-black/50 rounded px-1"
                          style={{ 
                            position: 'absolute',
                            left: `${(index / (selectedForecast.hourly!.length - 1)) * 100}%`,
                            top: `${Math.max(0, topPosition - 12)}%`,
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
                  {selectedForecast.hourly.map((hour, index) => (
                    <div key={index} className="flex flex-col items-center text-center min-w-0">
                      <div className="text-gray-600 mb-1">
                        {getWeatherIcon(hour.condition)}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{hour.time}</div>
                      <div className="text-xs text-blue-600 mt-1 font-medium">{hour.precipitation}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 10-Day Forecast */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">10-Day Forecast</h2>
          {forecast.map((day, index) => {
            const colors = getDayTempColors(day.high, day.low);
            return (
              <Card key={index} className={`p-4 border ${colors.bg} ${colors.border} backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {index === 0 ? 'Today' : 
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
                    <div className="font-bold text-gray-900">
                      <span style={{ color: getTemperatureColor(day.high) }}>
                        {convertTemp(day.high)}°
                      </span>
                      {' / '}
                      <span className="text-gray-600" style={{ color: getTemperatureColor(day.low) }}>
                        {convertTemp(day.low)}°
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200/50">
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
