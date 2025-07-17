
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
    
    // Group forecast data by day (accounting for Spain timezone)
    const dailyData: { [key: string]: any[] } = {};
    
    data.list.forEach((item: any) => {
      // Convert UTC timestamp to Spain date
      const utcDate = new Date(item.dt * 1000);
      const spainDate = new Date(utcDate.getTime() + (2 * 60 * 60 * 1000)); // UTC+2 for Spain
      const dateString = spainDate.toISOString().split('T')[0];
      
      if (!dailyData[dateString]) {
        dailyData[dateString] = [];
      }
      dailyData[dateString].push(item);
    });
    
    // Convert to our format
    const forecast: ForecastData[] = Object.entries(dailyData).slice(0, 10).map(([date, items]) => {
      const temps = items.map(item => item.main.temp);
      const high = Math.round(Math.max(...temps));
      const low = Math.round(Math.min(...temps));
      
      // Use midday weather for main condition
      const middayItem = items.find(item => item.dt_txt.includes('12:00:00')) || items[0];
      
      // Generate enhanced hourly data for ALL days, not just the first one
      const hourly = generateEnhancedHourlyData(items, high, low);
      
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

// Generate enhanced hourly data that properly reflects daily high/low with extended time range
const generateEnhancedHourlyData = (apiItems: any[], dailyHigh: number, dailyLow: number) => {
  // Create hourly entries from 12:00 AM to 11:00 PM (every 3 hours)
  const hours = [
    '12:00 AM', '3:00 AM', '6:00 AM', '9:00 AM', 
    '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM', '11:00 PM'
  ];
  
  // Map API items by hour for reference
  const apiItemsByHour: { [key: string]: any } = {};
  apiItems.forEach(item => {
    const hour = new Date(item.dt * 1000).getHours();
    apiItemsByHour[hour.toString()] = item;
  });
  
  return hours.map((timeStr, index) => {
    // Map time strings to 24-hour format
    const hourMapping = [0, 3, 6, 9, 12, 15, 18, 21, 23];
    const hour = hourMapping[index];
    
    // Use API data if available, otherwise interpolate
    const apiItem = apiItemsByHour[hour.toString()];
    
    let temperature: number;
    let condition: string;
    let precipitation: number;
    
    if (apiItem) {
      temperature = Math.round(apiItem.main.temp);
      condition = apiItem.weather[0].description;
      precipitation = Math.round((apiItem.pop || 0) * 100);
    } else {
      // Enhanced interpolation based on time of day with realistic temperature curves
      const tempRange = dailyHigh - dailyLow;
      let tempFactor: number;
      
      // More realistic temperature curve throughout the day
      if (hour === 0) tempFactor = 0.2; // Midnight - cool
      else if (hour === 3) tempFactor = 0.1; // 3 AM - coolest
      else if (hour === 6) tempFactor = 0.15; // 6 AM - still cool
      else if (hour === 9) tempFactor = 0.4; // 9 AM - warming up
      else if (hour === 12) tempFactor = 0.8; // Noon - getting hot
      else if (hour === 15) tempFactor = 1.0; // 3 PM - peak heat
      else if (hour === 18) tempFactor = 0.7; // 6 PM - cooling down
      else if (hour === 21) tempFactor = 0.5; // 9 PM - evening cool
      else tempFactor = 0.3; // 11 PM - night cool
      
      temperature = Math.round(dailyLow + (tempRange * tempFactor));
      
      // Ensure we actually hit the daily high and low at appropriate times
      if (hour === 15) { // 3 PM should be the hottest
        temperature = dailyHigh;
      } else if (hour === 3) { // 3 AM should be the coolest
        temperature = dailyLow;
      }
      
      // Vary conditions based on time and temperature
      const conditions = ['clear', 'partly cloudy', 'cloudy', 'light rain'];
      condition = conditions[Math.floor(Math.random() * conditions.length)];
      precipitation = Math.round(Math.random() * 25);
    }
    
    return {
      time: timeStr,
      temperature,
      condition,
      precipitation
    };
  });
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
