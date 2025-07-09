
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
    if (isCurrent) return 'border-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-blue-200';
    if (isNext) return 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-200';
    return 'border-purple-200 bg-gradient-to-r from-white to-purple-50 hover:border-purple-400 hover:shadow-purple-200';
  };

  const getStatusText = () => {
    if (isCurrent) return 'You are here';
    if (isNext) return 'Next destination';
    return null;
  };

  const getStatusColor = () => {
    if (isCurrent) return 'text-blue-600 bg-blue-100';
    if (isNext) return 'text-green-600 bg-green-100';
    return '';
  };

  const getIconColor = () => {
    if (isCurrent) return 'text-blue-500';
    if (isNext) return 'text-green-500';
    return 'text-purple-500';
  };

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 shadow-md ${getBorderColor()}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className={`h-4 w-4 ${getIconColor()}`} />
          <h3 className="font-semibold text-gray-800">{town.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-orange-600">
            {convertTemp(town.weather.temperature)}°{isCelsius ? 'C' : 'F'}
          </div>
        </div>
      </div>
      
      {getStatusText() && (
        <div className={`text-xs font-medium mb-2 px-2 py-1 rounded-full inline-block ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span className="capitalize text-indigo-600 font-medium">{town.weather.condition}</span>
        <span className="text-purple-600 font-medium">{town.distance} km • {town.elevation}m</span>
      </div>
      
      {/* Shade information */}
      <div className="flex items-center gap-1 mb-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-md">
        <TreePine className="h-3 w-3 text-green-600" />
        <span className="truncate">{town.weather.shade}</span>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-blue-600">
            <Droplets className="h-3 w-3" />
            <span>{town.weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1 text-teal-600">
            <Wind className="h-3 w-3" />
            <span>{town.weather.windSpeed} km/h</span>
          </div>
        </div>
        <div className="text-pink-500 font-medium">
          Tap for details
        </div>
      </div>
    </Card>
  );
};

export default TownCard;
