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
    <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/20">
      <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white px-1">
        8-Day Forecast
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {nextDays.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl active:bg-white/10 transition-all border border-white/10 touch-manipulation"
          >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
              <div className="w-20 sm:w-24 md:w-32 flex-shrink-0">
                <p className="font-semibold text-white text-sm sm:text-base md:text-lg truncate">
                  {formatDate(day.dt)}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg sm:rounded-xl p-1.5 sm:p-2 flex-shrink-0">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-200 capitalize font-medium truncate">
                  {day.weather[0].description}
                </p>
                {day.pop > 0 && (
                  <p className="text-xs text-blue-300 mt-0.5 sm:mt-1 truncate">
                    {Math.round(day.pop * 100)}% precipitation
                    {day.rain && ` • ${day.rain.toFixed(1)}mm`}
                    {day.snow && ` • ${day.snow.toFixed(1)}mm snow`}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <span className="text-sm sm:text-lg text-gray-300">
                  {Math.round(day.temp.min)}°
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
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
