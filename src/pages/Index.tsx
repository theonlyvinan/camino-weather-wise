
import React, { useState } from 'react';
import { Navigation, MapPin, Thermometer } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import TownCard from '@/components/TownCard';
import WeatherDetail from '@/components/WeatherDetail';
import WeatherDisplay from '@/components/WeatherDisplay';
import { useLocationService } from '@/components/LocationService';
import { useForecast } from '@/hooks/useWeather';
import { caminoTowns, CaminoTown } from '@/data/caminoTowns';

const Index = () => {
  const [selectedTown, setSelectedTown] = useState<CaminoTown | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const { currentTown, nextTown, userLocation } = useLocationService();
  const currentTownForecast = useForecast(
    selectedTown?.coordinates.lat || 0, 
    selectedTown?.coordinates.lng || 0
  );

  const handleTownClick = (town: CaminoTown) => {
    setSelectedTown(town);
  };

  const handleBackClick = () => {
    setSelectedTown(null);
  };

  if (selectedTown) {
    return (
      <WeatherDetail
        town={selectedTown}
        forecast={currentTownForecast.forecast}
        onBack={handleBackClick}
        isCelsius={isCelsius}
        isLoading={currentTownForecast.isLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto bg-card min-h-screen shadow-sm">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Navigation className="h-6 w-6" />
              <h1 className="text-xl font-bold">Camino Weather</h1>
            </div>
            
            {/* Temperature Unit Toggle */}
            <div className="flex items-center gap-2 text-sm bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <Thermometer className="h-4 w-4" />
              <span className={`${isCelsius ? 'text-white font-medium' : 'text-white/60'}`}>°C</span>
              <Switch
                checked={!isCelsius}
                onCheckedChange={(checked) => setIsCelsius(!checked)}
                className="data-[state=checked]:bg-white/20 data-[state=unchecked]:bg-white/20"
              />
              <span className={`${!isCelsius ? 'text-white font-medium' : 'text-white/60'}`}>°F</span>
            </div>
          </div>
          
          <p className="text-primary-foreground/80 text-sm">
            Live weather forecast for the Camino Frances Way
          </p>
          {userLocation && (
            <div className="flex items-center gap-2 mt-2 text-xs text-primary-foreground/90">
              <MapPin className="h-3 w-3" />
              <span>Location detected</span>
            </div>
          )}
        </div>

        {/* Current Location Summary */}
        {currentTown && (
          <div className="p-4 bg-muted border-b">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">Your Journey</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground text-lg">Current: {currentTown.name}</p>
                {nextTown && (
                  <p className="text-sm text-muted-foreground">Next: {nextTown.name}</p>
                )}
              </div>
              <div className="text-right">
                <WeatherDisplay
                  lat={currentTown.coordinates.lat}
                  lng={currentTown.coordinates.lng}
                  isCelsius={isCelsius}
                  size="large"
                  showDetails={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Towns List */}
        <div className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">All Towns</h2>
          {caminoTowns.map((town) => (
            <TownCard
              key={town.id}
              town={town}
              isCurrent={currentTown?.id === town.id}
              isNext={nextTown?.id === town.id}
              onClick={() => handleTownClick(town)}
              isCelsius={isCelsius}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-muted-foreground border-t bg-muted/50">
          <p className="font-medium">¡Buen Camino! Live weather updates for your journey. 🌟</p>
          <p className="text-muted-foreground mt-1">Weather data from OpenWeatherMap</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
