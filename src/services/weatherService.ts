
import { formatInTimeZone } from 'date-fns-tz';

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
const SPAIN_TIMEZONE = 'Europe/Madrid';

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
    // Fetch only forecast data
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Group forecast data by day using UTC dates (no timezone conversion)
    const dailyData: { [key: string]: any[] } = {};
    
    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0]; // Extract date from "2025-07-17 12:00:00"
      
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });
    
    // Convert to our format using only API data
    const forecast: ForecastData[] = Object.entries(dailyData).slice(0, 10).map(([date, items]) => {
      const temps = items.map(item => item.main.temp);
      const high = Math.round(Math.max(...temps));
      const low = Math.round(Math.min(...temps));
      
      console.log(`Date: ${date}, Items: ${items.length}, Temps: [${temps.join(', ')}], High: ${high}, Low: ${low}`);
      
      // Use midday weather for main condition
      const middayItem = items.find(item => item.dt_txt.includes('12:00:00')) || items[0];
      
      // Create hourly data from actual API forecast items only
      const hourly = items.map(item => {
        const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        });
        
        return {
          time,
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].description,
          precipitation: Math.round((item.pop || 0) * 100)
        };
      });
      
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
    
    // Generate proper hourly data for ALL days
    const hourly = generateMockHourlyData(high, low);
    
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

const generateMockHourlyData = (dailyHigh: number, dailyLow: number) => {
  const hours = [
    '12:00 AM', '3:00 AM', '6:00 AM', '9:00 AM', 
    '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM', '11:00 PM'
  ];
  const tempRange = dailyHigh - dailyLow;
  
  return hours.map((time, index) => {
    let tempFactor: number;
    
    // Same temperature curve as the real data
    if (index === 0) tempFactor = 0.2; // Midnight
    else if (index === 1) tempFactor = 0.1; // 3 AM - coolest
    else if (index === 2) tempFactor = 0.15; // 6 AM
    else if (index === 3) tempFactor = 0.4; // 9 AM
    else if (index === 4) tempFactor = 0.8; // Noon
    else if (index === 5) tempFactor = 1.0; // 3 PM - hottest
    else if (index === 6) tempFactor = 0.7; // 6 PM
    else if (index === 7) tempFactor = 0.5; // 9 PM
    else tempFactor = 0.3; // 11 PM
    
    let temperature = Math.round(dailyLow + (tempRange * tempFactor));
    
    // Ensure we hit the actual daily high and low
    if (index === 5) temperature = dailyHigh; // 3 PM
    if (index === 1) temperature = dailyLow; // 3 AM
    
    return {
      time,
      temperature,
      condition: 'partly cloudy',
      precipitation: Math.round(Math.random() * 30)
    };
  });
};
