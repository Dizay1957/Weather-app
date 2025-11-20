'use client';

import { Cloud, Droplets, Wind, Gauge, MapPin, Eye, Sun, Compass } from 'lucide-react';

interface WeatherCardProps {
  name: string;
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  lat?: number;
  lon?: number;
  visibility?: number;
  clouds?: number;
  windDeg?: number;
  windGust?: number;
  rain?: number;
  snow?: number;
  sunrise?: number;
  sunset?: number;
  tempMin?: number;
  tempMax?: number;
}

export default function WeatherCard({
  name,
  temp,
  feelsLike,
  description,
  icon,
  humidity,
  pressure,
  windSpeed,
  lat,
  lon,
  visibility,
  clouds,
  windDeg,
  windGust,
  rain,
  snow,
  sunrise,
  sunset,
  tempMin,
  tempMax,
}: WeatherCardProps) {
  const getWindDirection = (deg?: number) => {
    if (!deg) return '';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(deg / 22.5) % 16];
  };

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '';
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-white backdrop-blur-sm border border-white/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">{name}</h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl capitalize text-blue-100">{description}</p>
          {tempMin !== undefined && tempMax !== undefined && (
            <p className="text-xs sm:text-sm opacity-90 mt-1 text-blue-200">
              Min: {Math.round(tempMin)}°C • Max: {Math.round(tempMax)}°C
            </p>
          )}
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl flex-shrink-0">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28"
          />
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-1 sm:mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          {Math.round(temp)}°C
        </div>
        <p className="text-base sm:text-lg md:text-xl opacity-90 text-blue-100">Feels like {Math.round(feelsLike)}°C</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
        <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
          <Droplets className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
          <p className="text-xs sm:text-sm opacity-90 text-blue-100">Humidity</p>
          <p className="text-xl sm:text-2xl font-bold">{humidity}%</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
          <Wind className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
          <p className="text-xs sm:text-sm opacity-90 text-blue-100">Wind</p>
          <p className="text-xl sm:text-2xl font-bold">{windSpeed} m/s</p>
          {windDeg && (
            <p className="text-xs opacity-75 mt-1 flex items-center gap-1 text-blue-200">
              <Compass className="w-3 h-3" />
              {getWindDirection(windDeg)}
            </p>
          )}
          {windGust && (
            <p className="text-xs opacity-75 text-blue-200">Gusts: {windGust} m/s</p>
          )}
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
          <Gauge className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
          <p className="text-xs sm:text-sm opacity-90 text-blue-100">Pressure</p>
          <p className="text-xl sm:text-2xl font-bold">{pressure} hPa</p>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
          <Cloud className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
          <p className="text-xs sm:text-sm opacity-90 text-blue-100">Clouds</p>
          <p className="text-xl sm:text-2xl font-bold">{clouds !== undefined ? `${clouds}%` : 'N/A'}</p>
        </div>
      </div>

      {(visibility !== undefined || rain !== undefined || snow !== undefined || sunrise || sunset) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {visibility !== undefined && (
            <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
              <p className="text-xs sm:text-sm opacity-90 text-blue-100">Visibility</p>
              <p className="text-lg sm:text-xl font-bold">{(visibility / 1000).toFixed(1)} km</p>
            </div>
          )}
          {rain !== undefined && rain > 0 && (
            <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
              <Droplets className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
              <p className="text-xs sm:text-sm opacity-90 text-blue-100">Rain</p>
              <p className="text-lg sm:text-xl font-bold">{rain.toFixed(1)} mm</p>
            </div>
          )}
          {snow !== undefined && snow > 0 && (
            <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
              <Cloud className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-blue-200" />
              <p className="text-xs sm:text-sm opacity-90 text-blue-100">Snow</p>
              <p className="text-lg sm:text-xl font-bold">{snow.toFixed(1)} mm</p>
            </div>
          )}
          {sunrise && sunset && (
            <>
              <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-yellow-300" />
                <p className="text-xs sm:text-sm opacity-90 text-blue-100">Sunrise</p>
                <p className="text-lg sm:text-xl font-bold">{formatTime(sunrise)}</p>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 active:bg-white/20 transition-all touch-manipulation">
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 mb-1 sm:mb-2 text-orange-300 rotate-180" />
                <p className="text-xs sm:text-sm opacity-90 text-blue-100">Sunset</p>
                <p className="text-lg sm:text-xl font-bold">{formatTime(sunset)}</p>
              </div>
            </>
          )}
        </div>
      )}

      {lat && lon && (
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-75 text-blue-200 text-center break-all">
          Coordinates: {lat.toFixed(4)}, {lon.toFixed(4)}
        </div>
      )}
    </div>
  );
}
