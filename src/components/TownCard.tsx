
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
    if (isCurrent) return 'border-blue-300 bg-blue-50 shadow-sm';
    if (isNext) return 'border-green-300 bg-green-50 shadow-sm';
    return 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md';
  };

  const getStatusText = () => {
    if (isCurrent) return 'You are here';
    if (isNext) return 'Next destination';
    return null;
  };

  const getStatusColor = () => {
    if (isCurrent) return 'text-blue-700 bg-blue-100';
    if (isNext) return 'text-green-700 bg-green-100';
    return '';
  };

  const getIconColor = () => {
    if (isCurrent) return 'text-blue-600';
    if (isNext) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${getBorderColor()}`}
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
      
      <div className="text-sm text-gray-600 font-medium mb-2">
        {town.distance} km • {town.elevation}m
      </div>
      
      {/* Shade information */}
      <div className="flex items-center gap-1 mb-2 text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
        <TreePine className="h-3 w-3 text-gray-600" />
        <span className="truncate">{town.shade}</span>
      </div>
      
      <div className="text-xs text-gray-400 font-medium text-right">
        Tap for details
      </div>
    </Card>
  );
};

export default TownCard;
