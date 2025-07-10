interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
}

interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
    precipitation: number;
  }>;
}

// API key for OpenWeatherMap
const API_KEY = '57b7c2030d5a783496f29ad6fff3f8d8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (lat: number, lng: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 15
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return generateMockWeather();
  }
};

export const fetchForecastData = async (lat: number, lng: number): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Group forecast data by day
    const dailyData: { [key: string]: any[] } = {};
    
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });
    
    // Convert to our format
    const forecast: ForecastData[] = Object.entries(dailyData).slice(0, 10).map(([date, items], dayIndex) => {
      const temps = items.map(item => item.main.temp);
      const high = Math.round(Math.max(...temps));
      const low = Math.round(Math.min(...temps));
      
      // Use midday weather for main condition
      const middayItem = items.find(item => item.dt_txt.includes('12:00:00')) || items[0];
      
      // Generate hourly data for today only (first day in the list)
      const hourly = dayIndex === 0 ? 
        items.map(item => {
          const itemDate = new Date(item.dt * 1000);
          return {
            time: itemDate.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              hour12: true 
            }),
            temperature: Math.round(item.main.temp),
            condition: item.weather[0].description,
            precipitation: Math.round((item.pop || 0) * 100)
          };
        }) : [];
      
      return {
        date,
        high,
        low,
        condition: middayItem.weather[0].description,
        humidity: middayItem.main.humidity,
        windSpeed: Math.round(middayItem.wind.speed * 3.6),
        precipitation: Math.round((middayItem.pop || 0) * 100),
        hourly
      };
    });
    
    return forecast;
  } catch (error) {
    console.error('Failed to fetch forecast data:', error);
    return generateMockForecast();
  }
};

// Fallback mock data generators
const generateMockWeather = (): WeatherData => ({
  temperature: Math.round(15 + Math.random() * 15),
  condition: ['sunny', 'partly cloudy', 'cloudy', 'light rain'][Math.floor(Math.random() * 4)],
  humidity: Math.round(40 + Math.random() * 40),
  windSpeed: Math.round(5 + Math.random() * 15),
  visibility: Math.round(10 + Math.random() * 15)
});

const generateMockForecast = (): ForecastData[] => {
  const forecast = [];
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const baseTemp = 15 + Math.random() * 15;
    const high = Math.round(baseTemp + Math.random() * 5);
    const low = Math.round(baseTemp - Math.random() * 5);
    
    const conditions = ['sunny', 'partly cloudy', 'cloudy', 'light rain'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const hourly = i === 0 ? Array.from({ length: 8 }, (_, j) => ({
      time: `${(j * 3 + 6)}:00 ${j * 3 + 6 < 12 ? 'AM' : 'PM'}`,
      temperature: Math.round(baseTemp + Math.random() * 6 - 3),
      condition,
      precipitation: Math.round(Math.random() * 30)
    })) : [];
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      high,
      low,
      condition,
      humidity: Math.round(40 + Math.random() * 40),
      windSpeed: Math.round(5 + Math.random() * 15),
      precipitation: Math.round(Math.random() * 30),
      hourly
    });
  }
  
  return forecast;
};
