'use client';

interface HourlyForecastItem {
  dt: number;
  temp: number;
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  pop: number;
  rain?: {
    '1h': number;
  };
}

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
}

export default function HourlyForecast({ hourly }: HourlyForecastProps) {
  const next24Hours = hourly.slice(0, 24);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/20">
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white px-1">
        24-Hour Forecast
      </h3>
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex gap-2 sm:gap-3 pb-2 sm:pb-4">
          {next24Hours.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-20 sm:w-24 text-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl active:bg-white/10 transition-all border border-white/10 touch-manipulation"
            >
              <p className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                {formatTime(hour.dt)}
              </p>
              <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 mb-1.5 sm:mb-2">
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                />
              </div>
              <p className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
                {Math.round(hour.temp)}°
              </p>
              {hour.pop > 0 && (
                <p className="text-xs text-blue-300 font-medium">
                  {Math.round(hour.pop * 100)}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
