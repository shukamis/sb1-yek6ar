import React from 'react';
import { Heart, Timer } from 'lucide-react';
import { formatDuration, formatDateToLocal } from '../../utils/dateUtils';
import { useTimer } from '../../hooks/useTimer';

interface TimeDisplayProps {
  startDate: string;
  primary: string;
  secondary?: string;
}

export function TimeDisplay({ startDate, primary, secondary }: TimeDisplayProps) {
  const time = useTimer(startDate);

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-800">Tempo Juntos</h2>
      </div>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-pink-600">
          {primary}
          {secondary && <span className="text-2xl">{secondary}</span>}
        </p>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Timer className="h-4 w-4" />
          <p className="text-sm font-medium">
            {formatDuration(time.hours, time.minutes, time.seconds)}
          </p>
        </div>
        <p className="text-gray-600">
          desde {formatDateToLocal(startDate)}
        </p>
      </div>
    </div>
  );
}