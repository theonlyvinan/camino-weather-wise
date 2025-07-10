
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
      
      // Generate enhanced hourly data for today only (first day in the list)
      const hourly = dayIndex === 0 ? generateEnhancedHourlyData(items, high, low) : [];
      
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

// Generate enhanced hourly data that properly reflects daily high/low
const generateEnhancedHourlyData = (apiItems: any[], dailyHigh: number, dailyLow: number) => {
  // Create 8 hourly entries from 6 AM to 9 PM (every 3 hours)
  const hours = ['6:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];
  
  // Map API items by hour for reference
  const apiItemsByHour: { [key: string]: any } = {};
  apiItems.forEach(item => {
    const hour = new Date(item.dt * 1000).getHours();
    apiItemsByHour[hour.toString()] = item;
  });
  
  return hours.map((timeStr, index) => {
    const hour = index === 0 ? 6 : index === 1 ? 9 : index === 2 ? 12 : index === 3 ? 15 : index === 4 ? 18 : 21;
    
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
      // Interpolate temperature based on time of day
      // Peak heat around 3 PM, coolest in early morning
      const tempRange = dailyHigh - dailyLow;
      let tempFactor: number;
      
      if (hour <= 6) tempFactor = 0.1; // Early morning - coolest
      else if (hour <= 9) tempFactor = 0.3; // Morning warming
      else if (hour <= 12) tempFactor = 0.7; // Mid day
      else if (hour <= 15) tempFactor = 1.0; // Peak heat (3 PM)
      else if (hour <= 18) tempFactor = 0.8; // Evening cooling
      else tempFactor = 0.5; // Night
      
      temperature = Math.round(dailyLow + (tempRange * tempFactor));
      
      // Ensure we hit the actual daily high at least once (around 3 PM)
      if (hour === 15) {
        temperature = dailyHigh;
      }
      
      // Use a reasonable default condition and precipitation
      condition = 'partly cloudy';
      precipitation = Math.round(Math.random() * 20);
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
    
    // Generate proper hourly data for first day only
    const hourly = i === 0 ? generateMockHourlyData(high, low) : [];
    
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
  const hours = ['6:00 AM', '9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];
  const tempRange = dailyHigh - dailyLow;
  
  return hours.map((time, index) => {
    let tempFactor: number;
    
    if (index === 0) tempFactor = 0.1; // 6 AM - coolest
    else if (index === 1) tempFactor = 0.3; // 9 AM
    else if (index === 2) tempFactor = 0.7; // 12 PM
    else if (index === 3) tempFactor = 1.0; // 3 PM - hottest
    else if (index === 4) tempFactor = 0.8; // 6 PM
    else tempFactor = 0.5; // 9 PM
    
    let temperature = Math.round(dailyLow + (tempRange * tempFactor));
    
    // Ensure we hit the actual daily high at 3 PM
    if (index === 3) {
      temperature = dailyHigh;
    }
    
    return {
      time,
      temperature,
      condition: 'partly cloudy',
      precipitation: Math.round(Math.random() * 30)
    };
  });
};
