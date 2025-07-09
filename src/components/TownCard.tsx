
import React from 'react';
import { MapPin, Thermometer, Eye, Droplets, Wind } from 'lucide-react';
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
    };
  };
  isNext?: boolean;
  isCurrent?: boolean;
  onClick: () => void;
}

const TownCard: React.FC<TownCardProps> = ({ town, isNext, isCurrent, onClick }) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 ${
        isCurrent 
          ? 'bg-black text-white border-black' 
          : isNext 
            ? 'bg-gray-100 border-gray-400 border-dashed' 
            : 'bg-white border-gray-200 hover:border-gray-400'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <MapPin className={`h-4 w-4 ${isCurrent ? 'text-white' : 'text-gray-600'}`} />
          <h3 className={`font-semibold text-lg ${isCurrent ? 'text-white' : 'text-black'}`}>
            {town.name}
          </h3>
          {isNext && (
            <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
              NEXT
            </span>
          )}
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${isCurrent ? 'text-white' : 'text-black'}`}>
            {town.weather.temperature}°C
          </div>
          <div className={`text-sm ${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>
            {town.weather.condition}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm mb-2">
        <span className={`${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>
          Distance: {town.distance} km
        </span>
        <span className={`${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>
          Elevation: {town.elevation} m
        </span>
      </div>
      
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-1">
          <Droplets className={`h-3 w-3 ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`} />
          <span className={`${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
            {town.weather.humidity}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className={`h-3 w-3 ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`} />
          <span className={`${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
            {town.weather.windSpeed} km/h
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className={`h-3 w-3 ${isCurrent ? 'text-gray-300' : 'text-gray-500'}`} />
          <span className={`${isCurrent ? 'text-gray-300' : 'text-gray-500'}`}>
            {town.weather.visibility} km
          </span>
        </div>
      </div>
    </Card>
  );
};

export default TownCard;
