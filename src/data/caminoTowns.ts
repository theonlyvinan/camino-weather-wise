
export interface CaminoTown {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  coordinates: { lat: number; lng: number };
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
    id: '1',
    name: 'Saint-Jean-Pied-de-Port',
    distance: 0,
    elevation: 169,
    coordinates: { lat: 43.1633, lng: -1.2364 },
    weather: {
      temperature: 18,
      condition: 'partly cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 15
    }
  },
  {
    id: '2',
    name: 'Roncesvalles',
    distance: 25,
    elevation: 952,
    coordinates: { lat: 43.0089, lng: -1.3195 },
    weather: {
      temperature: 14,
      condition: 'cloudy',
      humidity: 78,
      windSpeed: 8,
      visibility: 12
    }
  },
  {
    id: '3',
    name: 'Pamplona',
    distance: 67,
    elevation: 449,
    coordinates: { lat: 42.8125, lng: -1.6458 },
    weather: {
      temperature: 22,
      condition: 'sunny',
      humidity: 55,
      windSpeed: 15,
      visibility: 20
    }
  },
  {
    id: '4',
    name: 'Puente la Reina',
    distance: 92,
    elevation: 346,
    coordinates: { lat: 42.6667, lng: -1.8167 },
    weather: {
      temperature: 25,
      condition: 'sunny',
      humidity: 45,
      windSpeed: 10,
      visibility: 25
    }
  },
  {
    id: '5',
    name: 'Estella',
    distance: 112,
    elevation: 421,
    coordinates: { lat: 42.6711, lng: -2.0281 },
    weather: {
      temperature: 24,
      condition: 'partly cloudy',
      humidity: 50,
      windSpeed: 12,
      visibility: 18
    }
  },
  {
    id: '6',
    name: 'Los Arcos',
    distance: 134,
    elevation: 444,
    coordinates: { lat: 42.5678, lng: -2.1858 },
    weather: {
      temperature: 26,
      condition: 'sunny',
      humidity: 42,
      windSpeed: 14,
      visibility: 22
    }
  },
  {
    id: '7',
    name: 'Logroño',
    distance: 156,
    elevation: 384,
    coordinates: { lat: 42.4627, lng: -2.4449 },
    weather: {
      temperature: 28,
      condition: 'sunny',
      humidity: 38,
      windSpeed: 16,
      visibility: 28
    }
  },
  {
    id: '8',
    name: 'Nájera',
    distance: 185,
    elevation: 496,
    coordinates: { lat: 42.4167, lng: -2.7333 },
    weather: {
      temperature: 27,
      condition: 'partly cloudy',
      humidity: 48,
      windSpeed: 11,
      visibility: 20
    }
  },
  {
    id: '9',
    name: 'Santo Domingo de la Calzada',
    distance: 205,
    elevation: 639,
    coordinates: { lat: 42.4394, lng: -2.9522 },
    weather: {
      temperature: 23,
      condition: 'cloudy',
      humidity: 62,
      windSpeed: 9,
      visibility: 16
    }
  },
  {
    id: '10',
    name: 'Belorado',
    distance: 230,
    elevation: 770,
    coordinates: { lat: 42.4264, lng: -3.1875 },
    weather: {
      temperature: 21,
      condition: 'partly cloudy',
      humidity: 58,
      windSpeed: 13,
      visibility: 18
    }
  },
  {
    id: '11',
    name: 'San Juan de Ortega',
    distance: 253,
    elevation: 1020,
    coordinates: { lat: 42.3833, lng: -3.4167 },
    weather: {
      temperature: 17,
      condition: 'cloudy',
      humidity: 72,
      windSpeed: 8,
      visibility: 14
    }
  },
  {
    id: '12',
    name: 'Burgos',
    distance: 274,
    elevation: 856,
    coordinates: { lat: 42.3439, lng: -3.6968 },
    weather: {
      temperature: 20,
      condition: 'partly cloudy',
      humidity: 60,
      windSpeed: 12,
      visibility: 17
    }
  },
  {
    id: '13',
    name: 'Castrojeriz',
    distance: 318,
    elevation: 808,
    coordinates: { lat: 42.2844, lng: -4.1375 },
    weather: {
      temperature: 24,
      condition: 'sunny',
      humidity: 45,
      windSpeed: 15,
      visibility: 24
    }
  },
  {
    id: '14',
    name: 'Frómista',
    distance: 343,
    elevation: 780,
    coordinates: { lat: 42.2639, lng: -4.4056 },
    weather: {
      temperature: 26,
      condition: 'sunny',
      humidity: 40,
      windSpeed: 18,
      visibility: 26
    }
  },
  {
    id: '15',
    name: 'Carrión de los Condes',
    distance: 360,
    elevation: 840,
    coordinates: { lat: 42.3372, lng: -4.6031 },
    weather: {
      temperature: 25,
      condition: 'partly cloudy',
      humidity: 52,
      windSpeed: 14,
      visibility: 21
    }
  },
  {
    id: '16',
    name: 'Sahagún',
    distance: 394,
    elevation: 823,
    coordinates: { lat: 42.3717, lng: -4.9406 },
    weather: {
      temperature: 23,
      condition: 'cloudy',
      humidity: 65,
      windSpeed: 10,
      visibility: 15
    }
  },
  {
    id: '17',
    name: 'León',
    distance: 447,
    elevation: 822,
    coordinates: { lat: 42.5987, lng: -5.5671 },
    weather: {
      temperature: 19,
      condition: 'partly cloudy',
      humidity: 68,
      windSpeed: 11,
      visibility: 16
    }
  },
  {
    id: '18',
    name: 'Astorga',
    distance: 494,
    elevation: 869,
    coordinates: { lat: 42.4569, lng: -6.0644 },
    weather: {
      temperature: 18,
      condition: 'cloudy',
      humidity: 75,
      windSpeed: 8,
      visibility: 13
    }
  },
  {
    id: '19',
    name: 'Ponferrada',
    distance: 544,
    elevation: 534,
    coordinates: { lat: 42.5500, lng: -6.5833 },
    weather: {
      temperature: 22,
      condition: 'partly cloudy',
      humidity: 58,
      windSpeed: 12,
      visibility: 19
    }
  },
  {
    id: '20',
    name: 'Sarria',
    distance: 663,
    elevation: 454,
    coordinates: { lat: 42.7833, lng: -7.4167 },
    weather: {
      temperature: 16,
      condition: 'rainy',
      humidity: 85,
      windSpeed: 6,
      visibility: 8
    }
  },
  {
    id: '21',
    name: 'Santiago de Compostela',
    distance: 775,
    elevation: 260,
    coordinates: { lat: 42.8805, lng: -8.5456 },
    weather: {
      temperature: 15,
      condition: 'rainy',
      humidity: 88,
      windSpeed: 7,
      visibility: 10
    }
  }
];

// Generate mock 10-day forecast with hourly data for today
export const generateForecast = (town: CaminoTown) => {
  const today = new Date();
  const forecast = [];
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const baseTemp = town.weather.temperature;
    const tempVariation = Math.random() * 6 - 3; // -3 to +3 degrees variation
    const high = Math.round(baseTemp + tempVariation + Math.random() * 3);
    const low = Math.round(baseTemp + tempVariation - Math.random() * 3);
    
    const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'clear'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const dayForecast = {
      date: date.toISOString().split('T')[0],
      high: Math.max(high, low + 2),
      low: Math.min(high - 2, low),
      condition,
      humidity: town.weather.humidity + Math.floor(Math.random() * 20 - 10),
      windSpeed: town.weather.windSpeed + Math.floor(Math.random() * 10 - 5),
      precipitation: Math.floor(Math.random() * 30),
      hourly: i === 0 ? generateHourlyForecast(baseTemp, condition) : undefined
    };
    
    forecast.push(dayForecast);
  }
  
  return forecast;
};

// Generate hourly forecast for today
const generateHourlyForecast = (baseTemp: number, condition: string) => {
  const hours = [];
  const currentHour = new Date().getHours();
  
  for (let i = 0; i < 24; i += 3) { // Every 3 hours
    const hour = (currentHour + i) % 24;
    const timeString = hour === 0 ? '12 AM' : 
                     hour < 12 ? `${hour} AM` : 
                     hour === 12 ? '12 PM' : 
                     `${hour - 12} PM`;
    
    // Temperature variation throughout the day
    let tempVariation = 0;
    if (hour >= 6 && hour <= 14) {
      tempVariation = Math.random() * 4; // Warmer during day
    } else if (hour >= 20 || hour <= 4) {
      tempVariation = -(Math.random() * 3); // Cooler at night
    }
    
    const conditions = ['sunny', 'partly cloudy', 'cloudy', 'clear'];
    const hourlyCondition = Math.random() > 0.7 ? 
      conditions[Math.floor(Math.random() * conditions.length)] : 
      condition;
    
    hours.push({
      time: timeString,
      temperature: Math.round(baseTemp + tempVariation),
      condition: hourlyCondition,
      precipitation: Math.floor(Math.random() * 20)
    });
  }
  
  return hours;
};
