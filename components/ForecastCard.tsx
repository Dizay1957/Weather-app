'use client';

interface ForecastItem {
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
}

interface ForecastCardProps {
  forecast: ForecastItem[];
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  // Group forecast by day and take first 5 days
  const dailyForecast = forecast
    .filter((item, index) => index % 8 === 0) // Get one forecast per day (every 8 items = 24h)
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Prévisions sur 5 jours
      </h3>
      <div className="space-y-4">
        {dailyForecast.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-12 h-12"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {formatDate(item.dt_txt)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                  {item.weather[0].description}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(item.main.temp)}°C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

