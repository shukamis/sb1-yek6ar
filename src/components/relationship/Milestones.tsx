import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { differenceInDays } from 'date-fns';

interface MilestonesProps {
  startDate: string;
  isPremium: boolean;
}

const MILESTONES = [
  { days: 7, title: 'Primeira Semana', icon: '🎉' },
  { days: 30, title: 'Primeiro Mês', icon: '💝' },
  { days: 100, title: '100 Dias', icon: '🌟' },
  { days: 365, title: 'Primeiro Ano', icon: '👑' },
  { days: 730, title: 'Dois Anos', icon: '💑' },
];

export function Milestones({ startDate, isPremium }: MilestonesProps) {
  const daysInRelationship = differenceInDays(new Date(), new Date(startDate));

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Trophy className="text-pink-500 mr-2" /> Conquistas
        </h2>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{Math.floor((daysInRelationship / 1000) * 100)}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {MILESTONES.map((milestone, index) => {
          const isAchieved = daysInRelationship >= milestone.days;
          const isNext = !isAchieved && daysInRelationship < milestone.days;
          const daysLeft = milestone.days - daysInRelationship;

          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                isAchieved ? 'bg-pink-50' : 'bg-gray-50'
              } relative overflow-hidden`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{milestone.icon}</span>
                <div>
                  <h3 className="font-medium">{milestone.title}</h3>
                  {isAchieved ? (
                    <p className="text-sm text-green-600">Conquistado! 🎉</p>
                  ) : isNext ? (
                    <p className="text-sm text-blue-600">
                      Faltam {daysLeft} dias!
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Em breve...</p>
                  )}
                </div>
              </div>
              {isAchieved && (
                <div className="absolute top-0 right-0 p-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}