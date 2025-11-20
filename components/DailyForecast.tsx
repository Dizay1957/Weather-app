'use client';

interface DailyForecastItem {
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
}

interface DailyForecastProps {
  daily: DailyForecastItem[];
}

export default function DailyForecast({ daily }: DailyForecastProps) {
  const nextDays = daily.slice(0, 8);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20">
      <h3 className="text-3xl font-bold mb-6 text-white">
        8-Day Forecast
      </h3>
      <div className="space-y-3">
        {nextDays.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/10"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-32">
                <p className="font-semibold text-white text-lg">
                  {formatDate(day.dt)}
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-2">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="w-14 h-14"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-200 capitalize font-medium">
                  {day.weather[0].description}
                </p>
                {day.pop > 0 && (
                  <p className="text-xs text-blue-300 mt-1">
                    {Math.round(day.pop * 100)}% precipitation
                    {day.rain && ` • ${day.rain.toFixed(1)}mm`}
                    {day.snow && ` • ${day.snow.toFixed(1)}mm snow`}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-3">
                <span className="text-lg text-gray-300">
                  {Math.round(day.temp.min)}°
                </span>
                <span className="text-3xl font-bold text-white">
                  {Math.round(day.temp.max)}°
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
