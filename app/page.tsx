'use client';

import { useState, useEffect } from 'react';
import WeatherCard from '@/components/WeatherCard';
import DailyForecast from '@/components/DailyForecast';
import HourlyForecast from '@/components/HourlyForecast';
import WeatherAlerts from '@/components/WeatherAlerts';
import SearchBar from '@/components/SearchBar';
import { AlertCircle, MapPin } from 'lucide-react';

// Interface for One Call API 3.0
interface OneCallData {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    wind_deg?: number;
    wind_gust?: number;
    visibility?: number;
    clouds?: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    rain?: {
      '1h'?: number;
      '3h'?: number;
    };
    snow?: {
      '1h'?: number;
      '3h'?: number;
    };
  };
  hourly?: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
    rain?: { '1h': number };
  }>;
  daily?: Array<{
    dt: number;
    temp: {
      min: number;
      max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
    rain?: number;
    snow?: number;
  }>;
  alerts?: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }>;
  cityName?: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<OneCallData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('New York');

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/onecall?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching weather data');
      }
      const data: OneCallData = await response.json();
      setWeatherData(data);

      // Save location to database
      if (data.cityName) {
        try {
          await fetch('/api/locations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.cityName,
              latitude: data.lat,
              longitude: data.lon,
            }),
          });
        } catch (dbError) {
          console.error('Error saving location:', dbError);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(searchCity);
  }, []);

  const handleSearch = (city: string) => {
    setSearchCity(city);
    fetchWeather(city);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `/api/onecall?lat=${latitude}&lon=${longitude}`
            );
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Error fetching weather data');
            }
            const data: OneCallData = await response.json();
            setWeatherData(data);
            if (data.cityName) {
              setSearchCity(data.cityName);
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to get your location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 shadow-xl">
            <MapPin className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Weather App
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Real-time weather forecasts powered by OpenWeatherMap
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        {/* Location Button */}
        <div className="mb-6 text-center">
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-white/20"
          >
            <MapPin className="w-4 h-4" />
            Use My Location
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-red-100 rounded-xl flex items-center gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && !weatherData && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent shadow-lg"></div>
            <p className="mt-6 text-gray-300 text-lg font-medium">Loading weather data...</p>
          </div>
        )}

        {/* Weather Content */}
        {weatherData && (
          <div className="space-y-6 animate-fade-in">
            <WeatherCard
              name={weatherData.cityName || 'Unknown Location'}
              temp={weatherData.current.temp}
              feelsLike={weatherData.current.feels_like}
              description={weatherData.current.weather[0].description}
              icon={weatherData.current.weather[0].icon}
              humidity={weatherData.current.humidity}
              pressure={weatherData.current.pressure}
              windSpeed={weatherData.current.wind_speed}
              lat={weatherData.lat}
              lon={weatherData.lon}
              visibility={weatherData.current.visibility}
              clouds={weatherData.current.clouds}
              windDeg={weatherData.current.wind_deg}
              windGust={weatherData.current.wind_gust}
              rain={weatherData.current.rain?.['1h']}
              snow={weatherData.current.snow?.['1h']}
              sunrise={weatherData.current.sunrise}
              sunset={weatherData.current.sunset}
              tempMin={weatherData.daily?.[0]?.temp?.min}
              tempMax={weatherData.daily?.[0]?.temp?.max}
            />

            {weatherData.alerts && weatherData.alerts.length > 0 && (
              <WeatherAlerts alerts={weatherData.alerts} />
            )}

            {weatherData.hourly && weatherData.hourly.length > 0 && (
              <HourlyForecast hourly={weatherData.hourly} />
            )}

            {weatherData.daily && weatherData.daily.length > 0 && (
              <DailyForecast daily={weatherData.daily} />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
