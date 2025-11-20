import { NextRequest, NextResponse } from 'next/server';
import { getOneCallWeather, getCityWeather, getCityCoordinates, getCurrentWeather, getWeatherByCoords, getForecast } from '@/lib/weather';

// Fonction pour convertir les données de l'API standard vers le format One Call
function convertToOneCallFormat(weatherData: any, forecastData?: any, cityName?: string) {
  return {
    lat: weatherData.coord.lat,
    lon: weatherData.coord.lon,
    timezone: 'UTC',
    timezone_offset: weatherData.timezone || 0,
    current: {
      dt: weatherData.dt || Math.floor(Date.now() / 1000),
      sunrise: weatherData.sys?.sunrise || 0,
      sunset: weatherData.sys?.sunset || 0,
      temp: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      dew_point: 0,
      uvi: 0,
      clouds: weatherData.clouds?.all || 0,
      visibility: weatherData.visibility || 10000,
      wind_speed: weatherData.wind.speed,
      wind_deg: weatherData.wind.deg || 0,
      wind_gust: weatherData.wind.gust,
      weather: weatherData.weather,
      rain: weatherData.rain,
      snow: weatherData.snow,
    },
    hourly: forecastData?.list?.slice(0, 24).map((item: any) => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like || item.main.temp,
      pressure: item.main.pressure || weatherData.main.pressure,
      humidity: item.main.humidity || weatherData.main.humidity,
      dew_point: 0,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: item.wind?.speed || weatherData.wind.speed,
      wind_deg: 0,
      weather: item.weather,
      pop: 0,
    })) || [],
    daily: forecastData?.list?.filter((_: any, i: number) => i % 8 === 0).slice(0, 8).map((item: any) => ({
      dt: item.dt,
      sunrise: 0,
      sunset: 0,
      moonrise: 0,
      moonset: 0,
      moon_phase: 0,
      summary: item.weather[0].description,
      temp: {
        day: item.main.temp,
        min: item.main.temp_min || item.main.temp,
        max: item.main.temp_max || item.main.temp,
        night: item.main.temp,
        eve: item.main.temp,
        morn: item.main.temp,
      },
      feels_like: {
        day: item.main.feels_like || item.main.temp,
        night: item.main.feels_like || item.main.temp,
        eve: item.main.feels_like || item.main.temp,
        morn: item.main.feels_like || item.main.temp,
      },
      pressure: item.main.pressure || weatherData.main.pressure,
      humidity: item.main.humidity || weatherData.main.humidity,
      dew_point: 0,
      wind_speed: item.wind?.speed || weatherData.wind.speed,
      wind_deg: 0,
      weather: item.weather,
      clouds: 0,
      pop: 0,
      uvi: 0,
    })) || [],
    alerts: [],
    cityName: cityName || weatherData.name,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const exclude = searchParams.get('exclude');

  try {
    let weatherData;
    
    // Essayer d'abord One Call API 3.0, sinon fallback vers API standards
    let useFallback = false;
    
    if (city) {
      // Essayer directement les API standards d'abord (plus fiable)
      // car elles acceptent le nom de la ville directement
      try {
        const standardWeather = await getCurrentWeather(city);
        let forecastData: any = null;
        
        try {
          forecastData = await getForecast(city);
        } catch (e) {
          console.warn('Impossible de récupérer les prévisions:', e);
        }
        
        // Essayer One Call API 3.0 si disponible (pour avoir plus de données)
        try {
          const coords = { lat: standardWeather.coord.lat, lon: standardWeather.coord.lon };
          const oneCallData = await getOneCallWeather(coords.lat, coords.lon);
          
          // Si One Call fonctionne, l'utiliser
          return NextResponse.json({
            ...oneCallData,
            cityName: standardWeather.name,
          });
        } catch (oneCallError: any) {
          // Si One Call échoue, utiliser les données standards converties
          console.log('One Call API 3.0 not available, using standard APIs...');
          
          const convertedData = convertToOneCallFormat(standardWeather, forecastData, standardWeather.name);
          
          return NextResponse.json({
            ...convertedData,
            _fallback: true,
            _message: 'Using standard APIs (One Call API 3.0 not available)',
          });
        }
      } catch (error) {
        // Si même les API standards échouent, propager l'erreur
        throw error;
      }
    } else if (lat && lon) {
      try {
        const excludeArray = exclude ? exclude.split(',') : undefined;
        weatherData = await getOneCallWeather(parseFloat(lat), parseFloat(lon), excludeArray);
      } catch (oneCallError: any) {
        const is403 = oneCallError.message?.includes('403') || 
                      (oneCallError.response?.status === 403) ||
                      (oneCallError.message?.includes('Accès refusé'));
        const is401 = oneCallError.message?.includes('401') || 
                      (oneCallError.response?.status === 401) ||
                      (oneCallError.message?.includes('Invalid API key'));
        
        if (is403 || is401) {
          useFallback = true;
          console.log('One Call API 3.0 non disponible, utilisation des API standards en fallback...');
        } else {
          throw oneCallError;
        }
      }
      
      if (useFallback) {
        const standardWeather = await getWeatherByCoords(parseFloat(lat), parseFloat(lon));
        const convertedData = convertToOneCallFormat(standardWeather, null, standardWeather.name);
        
        return NextResponse.json({
          ...convertedData,
          _fallback: true,
          _message: 'Utilisation des API standards (One Call API 3.0 non disponible)',
        });
      }
    } else {
      return NextResponse.json(
        { error: 'City or coordinates required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server error';
    const statusCode = errorMessage.includes('API key') || errorMessage.includes('Invalid API') || errorMessage.includes('401') ? 401 : 
                      errorMessage.includes('403') ? 403 : 500;
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}

