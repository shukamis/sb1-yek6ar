import React from 'react';
import { Sparkles, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePremiumStore } from '../../store/usePremiumStore';
import clsx from 'clsx';

interface DateIdea {
  title: string;
  description: string;
  category: string;
  premiumOnly: boolean;
}

const SAMPLE_IDEAS: DateIdea[] = [
  {
    title: 'Piquenique ao Pôr do Sol',
    description: 'Prepare uma cesta com comidas favoritas e aproveite o momento.',
    category: 'romantic',
    premiumOnly: false,
  },
  {
    title: 'Noite de Jogos Picantes',
    description: 'Jogos especiais para apimentar a relação 🔥',
    category: 'intimate',
    premiumOnly: true,
  },
  {
    title: 'Caça ao Tesouro Romântico',
    description: 'Pistas que levam a momentos especiais.',
    category: 'adventure',
    premiumOnly: true,
  },
];

interface DateIdeasProps {
  isPremium: boolean;
}

export function DateIdeas({ isPremium }: DateIdeasProps) {
  const { setShowPremiumModal } = usePremiumStore();

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Sparkles className="text-pink-500 mr-2" /> Ideias para Encontros
        </h2>
      </div>

      <div className="space-y-4">
        {SAMPLE_IDEAS.map((idea, index) => (
          <div
            key={index}
            className={clsx(
              'p-4 rounded-lg relative overflow-hidden',
              idea.premiumOnly && !isPremium ? 'bg-gray-100' : 'bg-pink-50'
            )}
          >
            {idea.premiumOnly && !isPremium && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Premium</p>
                </div>
              </div>
            )}
            <div>
              <h3 className="font-medium">{idea.title}</h3>
              <p className="text-sm text-gray-600">{idea.description}</p>
            </div>
          </div>
        ))}

        {!isPremium && (
          <Button
            onClick={() => setShowPremiumModal(true)}
            variant="outline"
            className="w-full mt-4"
          >
            Desbloqueie Ideias Premium
          </Button>
        )}
      </div>
    </Card>
  );
}