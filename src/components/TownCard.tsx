import React from 'react';
import { MapPin, Mountain, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import WeatherDisplay from './WeatherDisplay';
import { caminoTowns } from '@/data/caminoTowns';

interface TownCardProps {
  town: {
    id: string;
    name: string;
    distance: number;
    elevation: number;
    coordinates: { lat: number; lng: number };
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
    if (isCurrent) return 'border-primary bg-primary/5 shadow-sm';
    if (isNext) return 'border-primary/60 bg-primary/5 shadow-sm';
    return 'border-border bg-card hover:border-primary/40 hover:shadow-md';
  };

  const getStatusText = () => {
    if (isCurrent) return 'You are here';
    if (isNext) return 'Next destination';
    return null;
  };

  const getStatusColor = () => {
    if (isCurrent) return 'text-primary bg-primary/10';
    if (isNext) return 'text-primary bg-primary/10';
    return '';
  };

  const getIconColor = () => {
    if (isCurrent) return 'text-primary';
    if (isNext) return 'text-primary';
    return 'text-muted-foreground';
  };

  // Calculate elevation gain/loss to next town
  const getElevationChange = () => {
    const currentTownIndex = caminoTowns.findIndex(t => t.id === town.id);
    const nextTown = currentTownIndex < caminoTowns.length - 1 ? caminoTowns[currentTownIndex + 1] : null;
    
    if (!nextTown) return null;
    
    const elevationChange = nextTown.elevation - town.elevation;
    
    if (elevationChange > 0) {
      return {
        text: `+${elevationChange}m`,
        icon: <TrendingUp className="h-3 w-3 text-green-400" />,
        color: 'text-green-400'
      };
    } else if (elevationChange < 0) {
      return {
        text: `${elevationChange}m`,
        icon: <TrendingDown className="h-3 w-3 text-blue-400" />,
        color: 'text-blue-400'
      };
    } else {
      return {
        text: '0m',
        icon: <Minus className="h-3 w-3 text-muted-foreground" />,
        color: 'text-muted-foreground'
      };
    }
  };

  const elevationChange = getElevationChange();

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 ${getBorderColor()}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MapPin className={`h-4 w-4 ${getIconColor()}`} />
          <h3 className="font-semibold text-foreground">{town.name}</h3>
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
      
      <div className="flex items-center justify-between text-sm text-muted-foreground font-medium mb-2">
        <div className="flex items-center gap-3">
          <span>{town.distance} km</span>
          {elevationChange && (
            <div className="flex items-center gap-1">
              {elevationChange.icon}
              <span className={elevationChange.color}>{elevationChange.text}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Mountain className="h-3 w-3" />
          <span>{town.elevation}m</span>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground font-medium text-right">
        Tap for details
      </div>
    </Card>
  );
};

export default TownCard;
