
import React, { useState } from 'react';
import { Navigation, MapPin, Thermometer } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import TownCard from '@/components/TownCard';
import WeatherDetail from '@/components/WeatherDetail';
import { useLocationService } from '@/components/LocationService';
import { caminoTowns, generateForecast, CaminoTown } from '@/data/caminoTowns';

const Index = () => {
  const [selectedTown, setSelectedTown] = useState<CaminoTown | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const { currentTown, nextTown, userLocation } = useLocationService();

  const handleTownClick = (town: CaminoTown) => {
    setSelectedTown(town);
  };

  const handleBackClick = () => {
    setSelectedTown(null);
  };

  const convertTemp = (temp: number) => {
    return isCelsius ? temp : Math.round((temp * 9/5) + 32);
  };

  if (selectedTown) {
    return (
      <WeatherDetail
        town={selectedTown}
        forecast={generateForecast(selectedTown)}
        onBack={handleBackClick}
        isCelsius={isCelsius}
        onToggleUnit={setIsCelsius}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-black text-white p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Navigation className="h-6 w-6" />
              <h1 className="text-xl font-bold">Camino Weather</h1>
            </div>
            
            {/* Temperature Unit Toggle */}
            <div className="flex items-center gap-2 text-sm">
              <Thermometer className="h-4 w-4" />
              <span className={`${isCelsius ? 'text-white font-medium' : 'text-gray-400'}`}>°C</span>
              <Switch
                checked={!isCelsius}
                onCheckedChange={(checked) => setIsCelsius(!checked)}
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-600"
              />
              <span className={`${!isCelsius ? 'text-white font-medium' : 'text-gray-400'}`}>°F</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm">
            Weather forecast for the Camino Frances Way
          </p>
          {userLocation && (
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
              <MapPin className="h-3 w-3" />
              <span>Location detected</span>
            </div>
          )}
        </div>

        {/* Current Location Summary */}
        {currentTown && (
          <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-50 border-b">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Your Journey</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-black">Current: {currentTown.name}</p>
                {nextTown && (
                  <p className="text-sm text-gray-600">Next: {nextTown.name}</p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-black">
                  {convertTemp(currentTown.weather.temperature)}°{isCelsius ? 'C' : 'F'}
                </div>
                <div className="text-xs text-gray-600 capitalize">
                  {currentTown.weather.condition}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Towns List */}
        <div className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-black mb-4">All Towns</h2>
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
        <div className="p-4 text-center text-xs text-gray-500 border-t">
          <p>¡Buen Camino! Safe travels on your journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
