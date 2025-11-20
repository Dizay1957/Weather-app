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
    <div className="bg-red-500/20 backdrop-blur-md border-2 border-red-400/50 rounded-3xl shadow-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-7 h-7 text-red-400" />
        <h3 className="text-3xl font-bold text-red-200">
          Weather Alerts
        </h3>
      </div>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-red-400/30"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-red-100 text-xl">
                {alert.event}
              </h4>
              <span className="text-sm text-red-200 bg-red-500/30 px-3 py-1 rounded-full">
                {alert.sender_name}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              <strong>From:</strong> {formatDate(alert.start)}<br />
              <strong>To:</strong> {formatDate(alert.end)}
            </p>
            <p className="text-gray-100">{alert.description}</p>
            {alert.tags && alert.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {alert.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs bg-red-500/30 text-red-100 px-3 py-1 rounded-full"
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
