import React from 'react';
import { Timer } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDuration, formatDateToLocal } from '../../utils/dateUtils';
import { useTimer } from '../../hooks/useTimer';

interface CounterCardProps {
  startDate: string;
  photo?: string;
  partner1Name: string;
  partner2Name: string;
}

export function CounterCard({ startDate, photo, partner1Name, partner2Name }: CounterCardProps) {
  const time = useTimer(startDate);

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {partner1Name} & {partner2Name}
        </h2>
        
        <div className="space-y-2">
          <p className="text-4xl font-bold text-pink-600">
            1 mês
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

        {photo && (
          <div className="mt-4">
            <img
              src={photo}
              alt="Foto do Casal"
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-white shadow-lg"
            />
          </div>
        )}
      </div>
    </Card>
  );
}