import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const ONECALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// Interfaces pour Geocoding API
export interface GeocodingResult {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Interfaces pour One Call API 3.0
export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
}

export interface MinutelyForecast {
  dt: number;
  precipitation: number;
}

export interface HourlyForecast {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  pop: number; // Probability of precipitation
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
}

export interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface OneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  minutely?: MinutelyForecast[];
  hourly?: HourlyForecast[];
  daily?: DailyForecast[];
  alerts?: WeatherAlert[];
}

// Interface de compatibilité pour l'ancien code (avec toutes les données de l'API standard)
export interface WeatherData {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base?: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  clouds?: {
    all: number;
  };
  dt: number;
  sys?: {
    type?: number;
    id?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timezone?: number;
  id?: number;
  cod?: number;
}

// Fonction pour obtenir les coordonnées d'une ville
export async function getCityCoordinates(city: string): Promise<{ lat: number; lon: number; name: string }> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is missing. Please configure NEXT_PUBLIC_WEATHER_API_KEY in your .env file');
  }

  try {
    const response = await axios.get<GeocodingResult[]>(
      GEOCODING_URL,
      {
        params: {
          q: city,
          limit: 1,
          appid: API_KEY,
        },
      }
    );

    if (!response.data || response.data.length === 0) {
      throw new Error('City not found');
    }

    const result = response.data[0];
    return {
      lat: result.lat,
      lon: result.lon,
      name: result.name,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      if (status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (status === 404 || status === 400) {
        throw new Error('City not found');
      } else {
        throw new Error(`API Error: ${message || 'Error searching for city'}`);
      }
    }
    throw error;
  }
}

// Fonction principale pour obtenir les données One Call 3.0
export async function getOneCallWeather(
  lat: number,
  lon: number,
  exclude?: string[]
): Promise<OneCallResponse> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is missing. Please configure NEXT_PUBLIC_WEATHER_API_KEY in your .env file');
  }

  try {
    const params: Record<string, any> = {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'fr',
    };

    if (exclude && exclude.length > 0) {
      params.exclude = exclude.join(',');
    }

    const response = await axios.get<OneCallResponse>(ONECALL_URL, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      if (status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key. Make sure your account has access to One Call API 3.0.');
      } else if (status === 403) {
        throw new Error('Accès refusé. Vérifiez que votre compte est abonné à One Call API 3.0.');
      } else if (status === 429) {
        throw new Error('Limite de requêtes API atteinte. Veuillez réessayer plus tard.');
      } else {
        throw new Error(`API Error: ${message || 'Error fetching weather data'}`);
      }
    }
    throw error;
  }
}

// Fonction helper pour obtenir la météo complète d'une ville
export async function getCityWeather(city: string): Promise<OneCallResponse & { cityName: string }> {
  try {
    const coords = await getCityCoordinates(city);
    const weather = await getOneCallWeather(coords.lat, coords.lon);
    return { ...weather, cityName: coords.name };
  } catch (error) {
    // Si le geocoding échoue, on peut essayer de récupérer les coordonnées depuis l'API weather
    // mais pour l'instant, on propage l'erreur pour que le fallback se déclenche
    throw error;
  }
}

// Fonctions de compatibilité avec l'ancien code (pour transition en douceur)
export async function getCurrentWeather(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is missing. Please configure NEXT_PUBLIC_WEATHER_API_KEY in your .env file');
  }

  // Utiliser directement l'API standard pour avoir toutes les données
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}/weather`,
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
          lang: 'en',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data;
      const message = responseData?.message || error.message;
      
      // Log détaillé pour le débogage
      console.error('Weather API Error:', {
        status,
        message,
        responseData,
        apiKeyPresent: !!API_KEY,
        apiKeyLength: API_KEY?.length,
        apiKeyPrefix: API_KEY?.substring(0, 8) + '...',
      });
      
      if (status === 401) {
        const detailedMessage = responseData?.message || 'Invalid API key';
        throw new Error(`Invalid API key: ${detailedMessage}. Please verify that your API key is correct in the .env file and that it is active on OpenWeatherMap.`);
      } else if (status === 404) {
        throw new Error('City not found');
      } else if (status === 429) {
        throw new Error('Limite de requêtes API atteinte. Veuillez réessayer plus tard.');
      } else {
        throw new Error(`API Error (${status}): ${message || 'Error fetching weather data'}`);
      }
    }
    throw error;
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is missing. Please configure NEXT_PUBLIC_WEATHER_API_KEY in your .env file');
  }

  // Utiliser directement l'API standard pour avoir toutes les données
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL}/weather`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          lang: 'en',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      if (status === 401) {
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (status === 404) {
        throw new Error('Location not found');
      } else if (status === 429) {
        throw new Error('Limite de requêtes API atteinte. Veuillez réessayer plus tard.');
      } else {
        throw new Error(`API Error: ${message || 'Error fetching weather data'}`);
      }
    }
    throw error;
  }
}

// Ancienne fonction getForecast - maintenant utilise One Call
export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

// Fonction getForecast avec fallback vers API standards
export async function getForecast(city: string): Promise<ForecastData> {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API key is missing. Please configure NEXT_PUBLIC_WEATHER_API_KEY in your .env file');
  }

  // Essayer d'abord One Call, puis fallback vers API standards
  try {
    const oneCallData = await getCityWeather(city);
    
    // Convertir les données daily en format compatible
    if (!oneCallData.daily) {
      throw new Error('Données de prévision non disponibles');
    }

    return {
      list: oneCallData.daily.slice(0, 5).map(day => ({
        dt: day.dt,
        main: {
          temp: day.temp.day,
        },
        weather: day.weather.map(w => ({
          main: w.main,
          description: w.description,
          icon: w.icon,
        })),
        dt_txt: new Date(day.dt * 1000).toISOString(),
      })),
    };
  } catch (error) {
    // Fallback vers l'API standard /forecast
    try {
      const response = await axios.get<ForecastData>(
        `${BASE_URL}/forecast`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'fr',
          },
        }
      );
      return response.data;
    } catch (fallbackError) {
      if (axios.isAxiosError(fallbackError)) {
        const status = fallbackError.response?.status;
        const message = fallbackError.response?.data?.message || fallbackError.message;
        
        if (status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else if (status === 404) {
          throw new Error('City not found');
        } else if (status === 429) {
          throw new Error('Limite de requêtes API atteinte. Veuillez réessayer plus tard.');
        } else {
          throw new Error(`API Error: ${message || 'Error fetching forecast'}`);
        }
      }
      throw fallbackError;
    }
  }
}
