import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Thermometer, Droplets, Wind, Eye, Sun, Cloud, Loader2, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { caminoTowns } from '@/data/caminoTowns';
import { formatInTimeZone } from 'date-fns-tz';
import FavoriteButton from './FavoriteButton';

interface WeatherDetailProps {
  town: {
    id: string;
    name: string;
    distance: number;
    elevation: number;
    coordinates: { lat: number; lng: number };
  };
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
  onBack: () => void;
  isCelsius: boolean;
  isLoading?: boolean;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ 
  town, 
  forecast, 
  onBack, 
  isCelsius,
  isLoading = false
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [currentSpainTime, setCurrentSpainTime] = useState('');

  // Spain timezone
  const SPAIN_TIMEZONE = 'Europe/Madrid';

  // Update Spain time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const spainTime = formatInTimeZone(now, SPAIN_TIMEZONE, 'h:mm a');
      setCurrentSpainTime(spainTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Helper function to check if a date is today in Spain
  const isToday = (dateString: string) => {
    const today = new Date();
    const todayInSpain = formatInTimeZone(today, SPAIN_TIMEZONE, 'yyyy-MM-dd');
    return dateString === todayInSpain;
  };

  // Helper function to format date for Spain timezone
  const formatDateForSpain = (dateString: string, format: string) => {
    const date = new Date(dateString + 'T12:00:00'); // Add time to avoid timezone issues
    return formatInTimeZone(date, SPAIN_TIMEZONE, format);
  };

  // Find current town and next town logic
  const currentTownIndex = caminoTowns.findIndex(t => t.id === town.id);
  const nextTown = currentTownIndex < caminoTowns.length - 1 ? caminoTowns[currentTownIndex + 1] : null;

  // convertTemp function
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const getTemperatureColor = (temp: number, isDisplayTemp = true) => {
    // Always calculate based on Celsius for consistent color mapping
    const celsius = isDisplayTemp ? 
      (isCelsius ? temp : (temp - 32) * 5/9) : 
      temp; // If temp is already in celsius (for original data)
    
    if (celsius >= 30) return 'hsl(0, 84%, 60%)'; // red
    if (celsius >= 25) return 'hsl(20, 84%, 60%)'; // orange-red
    if (celsius >= 20) return 'hsl(40, 84%, 60%)'; // yellow-red
    if (celsius >= 15) return 'hsl(0, 0%, 40%)'; // dark gray
    if (celsius >= 10) return 'hsl(0, 0%, 60%)'; // medium gray
    return 'hsl(0, 0%, 80%)'; // light gray
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

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('sunny') || condition.includes('clear')) {
      return <Sun className="h-5 w-5" />;
    }
    return <Cloud className="h-5 w-5" />;
  };

  const handleElevationClick = () => {
    if (nextTown) {
      // Create Google Maps directions URL with proper encoding and walking directions
      const origin = `${town.coordinates.lat},${town.coordinates.lng}`;
      const destination = `${nextTown.coordinates.lat},${nextTown.coordinates.lng}`;
      const directionsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/data=!3m1!4b1!4m2!4m1!3e2`;
      window.open(directionsUrl, '_blank');
    } else {
      // If no next town, just show current location
      const googleMapsUrl = `https://www.google.com/maps/@${town.coordinates.lat},${town.coordinates.lng},15z`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  // Generate path elevation information
  const getPathElevationInfo = () => {
    if (!nextTown) {
      return {
        isComplete: true,
        distance: 0,
        elevationText: '',
        elevationIcon: null
      };
    }
    
    const distance = nextTown.distance - town.distance;
    const elevationChange = nextTown.elevation - town.elevation;
    
    let elevationText = '';
    let elevationIcon = null;
    
    if (elevationChange > 0) {
      elevationText = `+${elevationChange}m elevation gain`;
      elevationIcon = <TrendingUp className="h-4 w-4 text-green-400" />;
    } else if (elevationChange < 0) {
      elevationText = `${elevationChange}m elevation loss`;
      elevationIcon = <TrendingDown className="h-4 w-4 text-green-400" />;
    } else {
      elevationText = 'No elevation change';
      elevationIcon = <Minus className="h-4 w-4 text-green-400" />;
    }
    
    return { 
      isComplete: false,
      distance, 
      elevationText, 
      elevationIcon
    };
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2 hover:bg-muted/60"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">{town.name}</h1>
              <p className="text-muted-foreground text-sm">{town.distance} km • {town.elevation} m elevation</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-lg text-muted-foreground">Loading forecast...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pathInfo = getPathElevationInfo();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 hover:bg-muted/60"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{town.name}</h1>
            <p className="text-muted-foreground text-sm">{town.distance} km • {town.elevation} m</p>
          </div>
          <FavoriteButton townId={town.id} />
        </div>

        {/* Current Time in Spain */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
            <Clock className="h-4 w-4" />
            <span>Current time in Spain: {currentSpainTime}</span>
          </div>
        </div>

        {/* Path Information Cards */}
        <div className="mb-6 space-y-3">
          {pathInfo.isComplete ? (
            <Card className="p-4 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Journey Complete!</h3>
                  <p className="text-sm text-foreground font-bold">You've reached Santiago! Congratulations!</p>
                  <p className="text-xs text-muted-foreground mt-1 font-bold">Click to view location</p>
                </div>
              </div>
            </Card>
          ) : (
            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-colors border-border bg-card"
              onClick={handleElevationClick}
            >
              <div className="flex items-center gap-3">
                {pathInfo.elevationIcon}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">Elevation change to {nextTown!.name} ({pathInfo.distance}km)</h3>
                  <p className="text-sm text-foreground font-medium">{pathInfo.elevationText}</p>
                  <p className="text-xs text-muted-foreground mt-1">Click to see elevation in Google Maps</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Day Selection Tabs and Forecast */}
        {forecast.length > 0 && (
          <>
            {/* Day Selection Tabs */}
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {forecast.map((day, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDayIndex(index)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDayIndex === index
                          ? 'bg-primary text-primary-foreground border-2 border-primary'
                          : 'bg-card border border-border text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {isToday(day.date) ? 'Today' : 
                        formatDateForSpain(day.date, 'EEE, MMM d')
                      }
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hourly Forecast Chart */}
            {selectedForecast && selectedForecast.hourly && selectedForecast.hourly.length > 0 ? (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  {isToday(selectedForecast.date) ? "Today's" : 
                    formatDateForSpain(selectedForecast.date, 'EEEE, MMMM d')
                  } Hourly Forecast
                </h2>
                <Card className="p-4 border-border bg-card">
                  
                  <div className="relative">
                    {/* Temperature Chart */}
                    <div className="relative h-40 mb-4">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`tempGradient-${selectedDayIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            {selectedForecast.hourly.map((hour, index) => (
                              <stop
                                key={index}
                                offset={`${(index / (selectedForecast.hourly!.length - 1)) * 100}%`}
                                stopColor={getTemperatureColor(hour.temperature, false)}
                              />
                            ))}
                          </linearGradient>
                          <linearGradient id={`tempArea-${selectedDayIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={`url(#tempGradient-${selectedDayIndex})`} stopOpacity="0.15" />
                            <stop offset="100%" stopColor={`url(#tempGradient-${selectedDayIndex})`} stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        
                        {/* Area under curve - very subtle */}
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
                          fill={`url(#tempArea-${selectedDayIndex})`}
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
                            const pathData = createSmoothPath(points);
                            console.log('Chart debug - Town:', town?.name, 'Points:', points.length, 'Min/Max temp:', minTemp, maxTemp, 'Path:', pathData);
                            return pathData;
                          })()}
                          fill="none"
                          stroke={`url(#tempGradient-${selectedDayIndex})`}
                          strokeWidth={(() => {
                            const minTemp = Math.min(...selectedForecast.hourly!.map(h => h.temperature));
                            const maxTemp = Math.max(...selectedForecast.hourly!.map(h => h.temperature));
                            return minTemp === maxTemp ? "1.5" : "0.3"; // Thicker line for constant temperatures
                          })()}
                          className="drop-shadow-sm"
                        />
                        
                        {/* Temperature dots - very small filled circles */}
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
                              r="0.5"
                              fill={getTemperatureColor(hour.temperature, false)}
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
                          <div className="text-muted-foreground mb-1">
                            {getWeatherIcon(hour.condition)}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">{hour.time}</div>
                          <div className="text-xs text-primary mt-1 font-medium">{hour.precipitation}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            ) : selectedForecast ? (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  {isToday(selectedForecast.date) ? "Today's" : 
                    formatDateForSpain(selectedForecast.date, 'EEEE, MMMM d')
                  } Hourly Forecast
                </h2>
                <Card className="p-4 border-border bg-card">
                  <div className="text-center text-muted-foreground py-8">
                    <p>Hourly forecast data not available for this location</p>
                    <p className="text-sm mt-2">Showing daily forecast below</p>
                  </div>
                </Card>
              </div>
            ) : null}

            {/* 10-Day Forecast */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">10-Day Forecast</h2>
              {forecast.map((day, index) => {
                return (
                  <Card key={index} className="p-4 border-border bg-card hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-muted-foreground">
                          {getWeatherIcon(day.condition)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {isToday(day.date) ? 'Today' : 
                              formatDateForSpain(day.date, 'EEE, MMM d')
                            }
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {day.condition}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold">
                          <span className={`${getHighTempColor(day.high)}`}>
                            {convertTemp(day.high)}°
                          </span>
                          {' / '}
                          <span className={`${getLowTempColor(day.low)}`}>
                            {convertTemp(day.low)}°
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{day.humidity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wind className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{day.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Cloud className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{day.precipitation}%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherDetail;
