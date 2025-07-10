
import React from 'react';
import { MapPin, TreePine } from 'lucide-react';
import { Card } from '@/components/ui/card';
import WeatherDisplay from './WeatherDisplay';

interface TownCardProps {
  town: {
    id: string;
    name: string;
    distance: number;
    elevation: number;
    coordinates: { lat: number; lng: number };
    shade: string;
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
      </div>
      
      {getStatusText() && (
        <div className={`text-xs font-medium mb-2 px-2 py-1 rounded-full inline-block ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      )}
      
      <div className="mb-2">
        <WeatherDisplay
          lat={town.coordinates.lat}
          lng={town.coordinates.lng}
          isCelsius={isCelsius}
          size="medium"
          showDetails={true}
        />
      </div>
      
      <div className="text-sm text-purple-600 font-medium mb-2">
        {town.distance} km • {town.elevation}m
      </div>
      
      {/* Shade information */}
      <div className="flex items-center gap-1 mb-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-md">
        <TreePine className="h-3 w-3 text-green-600" />
        <span className="truncate">{town.shade}</span>
      </div>
      
      <div className="text-xs text-pink-500 font-medium text-right">
        Tap for details
      </div>
    </Card>
  );
};

export default TownCard;
