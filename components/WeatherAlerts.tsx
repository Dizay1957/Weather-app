'use client';

import { AlertTriangle } from 'lucide-react';

interface WeatherAlert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

interface WeatherAlertsProps {
  alerts: WeatherAlert[];
}

export default function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-red-500/20 backdrop-blur-md border-2 border-red-400/50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-red-400 flex-shrink-0" />
        <h3 className="text-2xl sm:text-3xl font-bold text-red-200">
          Weather Alerts
        </h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 border border-red-400/30"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-2 gap-2">
              <h4 className="font-bold text-red-100 text-lg sm:text-xl break-words">
                {alert.event}
              </h4>
              <span className="text-xs sm:text-sm text-red-200 bg-red-500/30 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
                {alert.sender_name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mb-2">
              <strong>From:</strong> {formatDate(alert.start)}<br />
              <strong>To:</strong> {formatDate(alert.end)}
            </p>
            <p className="text-sm sm:text-base text-gray-100 break-words">{alert.description}</p>
            {alert.tags && alert.tags.length > 0 && (
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {alert.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs bg-red-500/30 text-red-100 px-2 sm:px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
