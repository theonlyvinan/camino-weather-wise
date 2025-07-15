import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Thermometer, Clock, Heart } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import TownCard from '@/components/TownCard';
import WeatherDetail from '@/components/WeatherDetail';
import WeatherDisplay from '@/components/WeatherDisplay';
import SearchBox from '@/components/SearchBox';
import { useLocationService } from '@/components/LocationService';
import { useForecast } from '@/hooks/useWeather';
import { caminoTowns, CaminoTown } from '@/data/caminoTowns';
import { formatInTimeZone } from 'date-fns-tz';
import { FavoritesProvider, useFavorites } from '@/contexts/FavoritesContext';

const IndexContent = () => {
  const [selectedTown, setSelectedTown] = useState<CaminoTown | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentSpainTime, setCurrentSpainTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { currentTown, nextTown, userLocation } = useLocationService();
  const { favorites } = useFavorites();
  const currentTownForecast = useForecast(
    selectedTown?.coordinates.lat || 0, 
    selectedTown?.coordinates.lng || 0
  );

  // Spain timezone
  const SPAIN_TIMEZONE = 'Europe/Madrid';

  // Filter towns based on search query and favorites filter
  const filteredTowns = caminoTowns.filter(town => {
    const matchesSearch = town.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorites = showFavoritesOnly ? favorites.includes(town.id) : true;
    return matchesSearch && matchesFavorites;
  });

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
          
          {/* Current Time in Spain */}
          <div className="flex items-center gap-2 mt-2 text-xs text-primary-foreground/90 bg-white/10 rounded-lg px-2 py-1">
            <Clock className="h-3 w-3" />
            <span>Spain time: {currentSpainTime}</span>
          </div>
          
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
                <p className="font-semibold text-foreground text-base">Current: {currentTown.name}</p>
                {nextTown && (
                  <p className="text-sm text-muted-foreground">Next: {nextTown.name}</p>
                )}
              </div>
              <div className="text-right">
                <WeatherDisplay
                  lat={currentTown.coordinates.lat}
                  lng={currentTown.coordinates.lng}
                  isCelsius={isCelsius}
                  size="medium"
                  showDetails={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search towns..."
              />
            </div>
            
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="flex items-center gap-2 shrink-0"
            >
              <Heart className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              {showFavoritesOnly ? 'Favorites' : 'All'}
            </Button>
          </div>
        </div>

        {/* Towns List */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {showFavoritesOnly ? 'Favorite Towns' : 'All Towns'}
            </h2>
            {(searchQuery || showFavoritesOnly) && (
              <span className="text-sm text-muted-foreground">
                {filteredTowns.length} of {caminoTowns.length} towns
              </span>
            )}
          </div>
          
          {filteredTowns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {showFavoritesOnly ? (
                <div>
                  <Heart className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p>No favorite towns yet</p>
                  <p className="text-xs mt-1">Tap the heart icon on towns to add them to favorites</p>
                </div>
              ) : (
                <p>No towns found matching "{searchQuery}"</p>
              )}
            </div>
          ) : (
            filteredTowns.map((town) => (
              <TownCard
                key={town.id}
                town={town}
                isCurrent={currentTown?.id === town.id}
                isNext={nextTown?.id === town.id}
                onClick={() => handleTownClick(town)}
                isCelsius={isCelsius}
              />
            ))
          )}
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

const Index = () => {
  return (
    <FavoritesProvider>
      <IndexContent />
    </FavoritesProvider>
  );
};

export default Index;
