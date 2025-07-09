
import { useState, useEffect } from 'react';
import { CaminoTown, caminoTowns } from '@/data/caminoTowns';

interface LocationResult {
  currentTown: CaminoTown | null;
  nextTown: CaminoTown | null;
  userLocation: {
    lat: number;
    lng: number;
  } | null;
}

export const useLocationService = (): LocationResult => {
  const [locationResult, setLocationResult] = useState<LocationResult>({
    currentTown: null,
    nextTown: null,
    userLocation: null
  });

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const findClosestTowns = (userLat: number, userLng: number) => {
    let closestTown: CaminoTown | null = null;
    let minDistance = Infinity;
    let closestIndex = -1;

    caminoTowns.forEach((town, index) => {
      const distance = calculateDistance(userLat, userLng, town.coordinates.lat, town.coordinates.lng);
      if (distance < minDistance) {
        minDistance = distance;
        closestTown = town;
        closestIndex = index;
      }
    });

    const nextTown = closestIndex < caminoTowns.length - 1 ? caminoTowns[closestIndex + 1] : null;

    return { currentTown: closestTown, nextTown };
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const { currentTown, nextTown } = findClosestTowns(latitude, longitude);
          
          setLocationResult({
            currentTown,
            nextTown,
            userLocation: { lat: latitude, lng: longitude }
          });
        },
        (error) => {
          console.log('Location access denied or failed:', error);
          // Default to starting location if geolocation fails
          setLocationResult({
            currentTown: caminoTowns[0],
            nextTown: caminoTowns[1],
            userLocation: null
          });
        }
      );
    } else {
      // Fallback for browsers without geolocation
      setLocationResult({
        currentTown: caminoTowns[0],
        nextTown: caminoTowns[1],
        userLocation: null
      });
    }
  }, []);

  return locationResult;
};
