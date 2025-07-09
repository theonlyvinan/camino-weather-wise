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
    shade: string; // Adding shade information
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
      visibility: 15,
      shade: 'Partial shade in town center'
    }
  },
  {
    id: '1a',
    name: 'Honto',
    distance: 8,
    elevation: 180,
    coordinates: { lat: 43.1456, lng: -1.2789 },
    weather: {
      temperature: 17,
      condition: 'cloudy',
      humidity: 70,
      windSpeed: 10,
      visibility: 12,
      shade: 'Good tree cover'
    }
  },
  {
    id: '1b',
    name: 'Orisson',
    distance: 15,
    elevation: 790,
    coordinates: { lat: 43.0812, lng: -1.3054 },
    weather: {
      temperature: 15,
      condition: 'partly cloudy',
      humidity: 75,
      windSpeed: 14,
      visibility: 18,
      shade: 'Limited shade, exposed mountain'
    }
  },
  {
    id: '1c',
    name: 'Borda',
    distance: 20,
    elevation: 850,
    coordinates: { lat: 43.0234, lng: -1.3187 },
    weather: {
      temperature: 14,
      condition: 'cloudy',
      humidity: 80,
      windSpeed: 16,
      visibility: 10,
      shade: 'Minimal shade, open plateau'
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
      visibility: 12,
      shade: 'Forest shade available'
    }
  },
  {
    id: '2a',
    name: 'Burguete',
    distance: 28,
    elevation: 884,
    coordinates: { lat: 43.0167, lng: -1.3333 },
    weather: {
      temperature: 15,
      condition: 'partly cloudy',
      humidity: 72,
      windSpeed: 9,
      visibility: 14,
      shade: 'Village shade, some trees'
    }
  },
  {
    id: '2b',
    name: 'Espinal',
    distance: 31,
    elevation: 870,
    coordinates: { lat: 43.0234, lng: -1.3456 },
    weather: {
      temperature: 16,
      condition: 'sunny',
      humidity: 68,
      windSpeed: 11,
      visibility: 16,
      shade: 'Limited shade along road'
    }
  },
  {
    id: '2c',
    name: 'Viskarret',
    distance: 45,
    elevation: 773,
    coordinates: { lat: 42.9876, lng: -1.4567 },
    weather: {
      temperature: 18,
      condition: 'sunny',
      humidity: 62,
      windSpeed: 13,
      visibility: 18,
      shade: 'Some roadside trees'
    }
  },
  {
    id: '2d',
    name: 'Linzoain',
    distance: 52,
    elevation: 650,
    coordinates: { lat: 42.9234, lng: -1.5123 },
    weather: {
      temperature: 19,
      condition: 'partly cloudy',
      humidity: 60,
      windSpeed: 12,
      visibility: 17,
      shade: 'Village buildings provide shade'
    }
  },
  {
    id: '2e',
    name: 'Zubiri',
    distance: 58,
    elevation: 520,
    coordinates: { lat: 42.8876, lng: -1.5678 },
    weather: {
      temperature: 20,
      condition: 'sunny',
      humidity: 58,
      windSpeed: 14,
      visibility: 19,
      shade: 'River trees, good shade'
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
      visibility: 20,
      shade: 'Urban shade, parks available'
    }
  },
  {
    id: '3a',
    name: 'Cizur Menor',
    distance: 72,
    elevation: 471,
    coordinates: { lat: 42.7892, lng: -1.6891 },
    weather: {
      temperature: 23,
      condition: 'sunny',
      humidity: 52,
      windSpeed: 16,
      visibility: 22,
      shade: 'Some suburban shade'
    }
  },
  {
    id: '3b',
    name: 'Zariquiegui',
    distance: 78,
    elevation: 710,
    coordinates: { lat: 42.7456, lng: -1.7234 },
    weather: {
      temperature: 21,
      condition: 'partly cloudy',
      humidity: 56,
      windSpeed: 14,
      visibility: 20,
      shade: 'Hill village, limited shade'
    }
  },
  {
    id: '3c',
    name: 'Uterga',
    distance: 83,
    elevation: 510,
    coordinates: { lat: 42.7123, lng: -1.7567 },
    weather: {
      temperature: 22,
      condition: 'sunny',
      humidity: 54,
      windSpeed: 15,
      visibility: 21,
      shade: 'Roadside trees'
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
      visibility: 25,
      shade: 'Bridge area, some urban shade'
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
      visibility: 18,
      shade: 'Historic town, good shade'
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
      visibility: 22,
      shade: 'Plaza shade available'
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
      visibility: 28,
      shade: 'City parks and buildings'
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
      visibility: 20,
      shade: 'River valley, good shade'
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
      visibility: 16,
      shade: 'Cathedral area, urban shade'
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
      visibility: 18,
      shade: 'Mountain town, some shade'
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
      visibility: 14,
      shade: 'High altitude, limited shade'
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
      visibility: 17,
      shade: 'Gothic city, good shade'
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
      visibility: 24,
      shade: 'Hill town, castle shade'
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
      visibility: 26,
      shade: 'Church area, limited shade'
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
      visibility: 21,
      shade: 'Historic center, some shade'
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
      visibility: 15,
      shade: 'Monastery area, good shade'
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
      visibility: 16,
      shade: 'Major city, plenty of shade'
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
      visibility: 13,
      shade: 'Roman city, urban shade'
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
      visibility: 19,
      shade: 'Castle area, river shade'
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
      visibility: 8,
      shade: 'Forest area, natural shade'
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
      visibility: 10,
      shade: 'Cathedral city, excellent shade'
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

// Generate hourly forecast for today - always generate to ensure graph shows
const generateHourlyForecast = (baseTemp: number, condition: string) => {
  const hours = [];
  
  for (let i = 0; i < 24; i += 3) { // Every 3 hours
    const hour = i;
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
