
import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, TreePine } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TownCardProps {
  town: {
    id: string;
    name: string;
    distance: number;
    elevation: number;
    weather: {
      temperature: number;
      condition: string;
      humidity: number;
      windSpeed: number;
      visibility: number;
      shade: string;
    };
  };
  isCurrent?: boolean;
  isNext?: boolean;
  onClick: () => void;
  isCelsius: boolean;
}

const TownCard: React.FC<TownCardProps> = ({ 
  town, 
  isCurrent, 
  isNext, 
  onClick, 
  isCelsius 
}) => {
  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  const getBorderColor = () => {
    if (isCurrent) return 'border-blue-500 bg-blue-50';
    if (isNext) return 'border-green-500 bg-green-50';
    return 'border-gray-200 hover:border-gray-400';
  };

  const getStatusText = () => {
    if (isCurrent) return 'You are here';
    if (isNext) return 'Next destination';
    return null;
  };

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${getBorderColor()}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className={`h-4 w-4 ${isCurrent ? 'text-blue-500' : isNext ? 'text-green-500' : 'text-gray-500'}`} />
          <h3 className="font-semibold text-black">{town.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-black">
            {convertTemp(town.weather.temperature)}°{isCelsius ? 'C' : 'F'}
          </div>
        </div>
      </div>
      
      {getStatusText() && (
        <div className={`text-xs font-medium mb-2 ${isCurrent ? 'text-blue-600' : 'text-green-600'}`}>
          {getStatusText()}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span className="capitalize">{town.weather.condition}</span>
        <span>{town.distance} km • {town.elevation}m</span>
      </div>
      
      {/* Shade information */}
      <div className="flex items-center gap-1 mb-2 text-xs text-green-700">
        <TreePine className="h-3 w-3" />
        <span className="truncate">{town.weather.shade}</span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            <span>{town.weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            <span>{town.weather.windSpeed} km/h</span>
          </div>
        </div>
        <div className="text-gray-400">
          Tap for details
        </div>
      </div>
    </Card>
  );
};

export default TownCard;
