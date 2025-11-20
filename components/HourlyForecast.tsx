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
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20">
      <h3 className="text-3xl font-bold mb-6 text-white">
        24-Hour Forecast
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3 pb-4">
          {next24Hours.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/10"
            >
              <p className="text-sm font-semibold text-gray-300 mb-3">
                {formatTime(hour.dt)}
              </p>
              <div className="bg-white/10 rounded-lg p-2 mb-2">
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                  className="w-12 h-12 mx-auto"
                />
              </div>
              <p className="text-xl font-bold text-white mb-1">
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
