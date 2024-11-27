import React from 'react';
import { Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { ShareStoryButton } from './ShareStoryButton';
import { formatDateToLocal } from '../../utils/dateUtils';
import { useMonthiversary } from '../../hooks/useMonthiversary';

interface MonthiversaryCardProps {
  startDate: string;
  photo?: string;
}

export function MonthiversaryCard({ startDate, photo }: MonthiversaryCardProps) {
  const { daysUntilNext, isMonthiversaryToday, currentMonth, nextDate } = useMonthiversary(startDate);

  return (
    <Card className={isMonthiversaryToday ? 'bg-pink-100 animate-pulse' : 'bg-white'}>
      <div className="text-center space-y-4">
        <Clock className="h-6 w-6 mx-auto text-pink-500" />
        {isMonthiversaryToday ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-pink-600 mb-2">
                Hoje é nosso mêsversário! 🎉
              </h3>
              <p className="text-gray-600">
                Comemorando {currentMonth} {currentMonth === 1 ? 'mês' : 'meses'} de amor e companheirismo
              </p>
            </div>
            <ShareStoryButton 
              currentMonth={currentMonth} 
              startDate={startDate}
              photo={photo}
            />
          </div>
        ) : (
          <div className="space-y-2">
            {daysUntilNext === 1 ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-pink-600">
                  Amanhã é nosso mêsversário! 🎉
                </p>
                <p className="text-sm text-gray-600">
                  {formatDateToLocal(nextDate)}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg text-gray-700">
                  Faltam <span className="font-semibold text-pink-600">{daysUntilNext}</span> dias
                </p>
                <p className="text-gray-600">
                  para nosso próximo mêsversário
                </p>
                <p className="text-sm text-gray-500">
                  {formatDateToLocal(nextDate)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}