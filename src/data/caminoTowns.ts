
export interface CaminoTown {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  weather: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
  };
}

export const caminoTowns: CaminoTown[] = [
  {
    id: 'saint-jean-pied-de-port',
    name: 'Saint-Jean-Pied-de-Port',
    distance: 0,
    elevation: 169,
    coordinates: { lat: 43.1633, lng: -1.2356 },
    weather: {
      temperature: 18,
      condition: 'partly cloudy',
      humidity: 72,
      windSpeed: 8,
      visibility: 10
    }
  },
  {
    id: 'roncesvalles',
    name: 'Roncesvalles',
    distance: 25,
    elevation: 952,
    coordinates: { lat: 43.0072, lng: -1.3194 },
    weather: {
      temperature: 14,
      condition: 'cloudy',
      humidity: 85,
      windSpeed: 12,
      visibility: 8
    }
  },
  {
    id: 'pamplona',
    name: 'Pamplona',
    distance: 47,
    elevation: 449,
    coordinates: { lat: 42.8125, lng: -1.6458 },
    weather: {
      temperature: 22,
      condition: 'sunny',
      humidity: 58,
      windSpeed: 6,
      visibility: 15
    }
  },
  {
    id: 'puente-la-reina',
    name: 'Puente la Reina',
    distance: 68,
    elevation: 346,
    coordinates: { lat: 42.6742, lng: -1.8181 },
    weather: {
      temperature: 24,
      condition: 'sunny',
      humidity: 52,
      windSpeed: 9,
      visibility: 12
    }
  },
  {
    id: 'estella',
    name: 'Estella',
    distance: 91,
    elevation: 421,
    coordinates: { lat: 42.6706, lng: -2.0281 },
    weather: {
      temperature: 26,
      condition: 'partly cloudy',
      humidity: 48,
      windSpeed: 7,
      visibility: 14
    }
  },
  {
    id: 'logrono',
    name: 'Logroño',
    distance: 136,
    elevation: 384,
    coordinates: { lat: 42.4667, lng: -2.45 },
    weather: {
      temperature: 28,
      condition: 'sunny',
      humidity: 45,
      windSpeed: 5,
      visibility: 16
    }
  },
  {
    id: 'najera',
    name: 'Nájera',
    distance: 166,
    elevation: 490,
    coordinates: { lat: 42.4167, lng: -2.7333 },
    weather: {
      temperature: 25,
      condition: 'partly cloudy',
      humidity: 55,
      windSpeed: 8,
      visibility: 13
    }
  },
  {
    id: 'santo-domingo-de-la-calzada',
    name: 'Santo Domingo de la Calzada',
    distance: 187,
    elevation: 639,
    coordinates: { lat: 42.4389, lng: -2.9525 },
    weather: {
      temperature: 23,
      condition: 'cloudy',
      humidity: 62,
      windSpeed: 10,
      visibility: 11
    }
  },
  {
    id: 'burgos',
    name: 'Burgos',
    distance: 269,
    elevation: 856,
    coordinates: { lat: 42.3439, lng: -3.6969 },
    weather: {
      temperature: 21,
      condition: 'partly cloudy',
      humidity: 68,
      windSpeed: 11,
      visibility: 9
    }
  },
  {
    id: 'leon',
    name: 'León',
    distance: 451,
    elevation: 838,
    coordinates: { lat: 42.5987, lng: -5.5671 },
    weather: {
      temperature: 19,
      condition: 'rainy',
      humidity: 78,
      windSpeed: 14,
      visibility: 7
    }
  },
  {
    id: 'astorga',
    name: 'Astorga',
    distance: 497,
    elevation: 869,
    coordinates: { lat: 42.4572, lng: -6.0689 },
    weather: {
      temperature: 17,
      condition: 'cloudy',
      humidity: 75,
      windSpeed: 13,
      visibility: 8
    }
  },
  {
    id: 'ponferrada',
    name: 'Ponferrada',
    distance: 548,
    elevation: 543,
    coordinates: { lat: 42.5500, lng: -6.5833 },
    weather: {
      temperature: 20,
      condition: 'partly cloudy',
      humidity: 70,
      windSpeed: 9,
      visibility: 10
    }
  },
  {
    id: 'sarria',
    name: 'Sarria',
    distance: 672,
    elevation: 454,
    coordinates: { lat: 42.7833, lng: -7.4167 },
    weather: {
      temperature: 18,
      condition: 'drizzle',
      humidity: 82,
      windSpeed: 12,
      visibility: 6
    }
  },
  {
    id: 'santiago-de-compostela',
    name: 'Santiago de Compostela',
    distance: 785,
    elevation: 260,
    coordinates: { lat: 42.8806, lng: -8.5417 },
    weather: {
      temperature: 16,
      condition: 'rainy',
      humidity: 85,
      windSpeed: 15,
      visibility: 5
    }
  }
];

export const generateForecast = (baseTown: CaminoTown) => {
  const forecast = [];
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const tempVariation = Math.random() * 8 - 4; // ±4°C variation
    const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'clear'];
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      high: Math.round(baseTown.weather.temperature + tempVariation + Math.random() * 3),
      low: Math.round(baseTown.weather.temperature + tempVariation - Math.random() * 5),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: baseTown.weather.humidity + Math.floor(Math.random() * 20 - 10),
      windSpeed: baseTown.weather.windSpeed + Math.floor(Math.random() * 6 - 3),
      precipitation: Math.floor(Math.random() * 60)
    });
  }
  
  return forecast;
};
