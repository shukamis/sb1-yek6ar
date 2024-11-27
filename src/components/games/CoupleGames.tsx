import React from 'react';
import { GamepadIcon, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePremiumStore } from '../../store/usePremiumStore';
import clsx from 'clsx';

interface Game {
  title: string;
  description: string;
  category: 'fun' | 'intimate' | 'romantic';
  premiumOnly: boolean;
  rules?: string[];
}

const COUPLE_GAMES: Game[] = [
  {
    title: 'Verdade ou Desafio Romântico',
    description: 'Jogo clássico com um toque romântico',
    category: 'fun',
    premiumOnly: false,
    rules: [
      'Alternem entre verdade e desafio',
      'Mantenham o clima leve e divertido',
      'Respeitem os limites um do outro'
    ]
  },
  {
    title: '21 Perguntas Picantes',
    description: 'Perguntas para conhecer melhor seu parceiro(a) 🔥',
    category: 'intimate',
    premiumOnly: true,
  },
  {
    title: 'Caça ao Tesouro Sensual',
    description: 'Uma aventura romântica pelo ambiente',
    category: 'intimate',
    premiumOnly: true,
  },
  {
    title: 'Dados do Amor',
    description: 'Role os dados para descobrir a próxima ação romântica',
    category: 'romantic',
    premiumOnly: true,
  }
];

interface CoupleGamesProps {
  isPremium: boolean;
}

export function CoupleGames({ isPremium }: CoupleGamesProps) {
  const { setShowPremiumModal } = usePremiumStore();
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <GamepadIcon className="text-pink-500 mr-2" /> Jogos para o Casal
        </h2>
      </div>

      <div className="space-y-4">
        {COUPLE_GAMES.map((game, index) => (
          <div
            key={index}
            className={clsx(
              'p-4 rounded-lg relative overflow-hidden cursor-pointer transition-all',
              game.premiumOnly && !isPremium ? 'bg-gray-100' : 'bg-pink-50 hover:bg-pink-100'
            )}
            onClick={() => {
              if (!game.premiumOnly || isPremium) {
                setSelectedGame(selectedGame?.title === game.title ? null : game);
              } else {
                setShowPremiumModal(true);
              }
            }}
          >
            {game.premiumOnly && !isPremium && (
              <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-600">Premium</p>
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{game.title}</h3>
                <span className={clsx(
                  'text-xs px-2 py-1 rounded-full',
                  {
                    'bg-blue-100 text-blue-700': game.category === 'fun',
                    'bg-red-100 text-red-700': game.category === 'intimate',
                    'bg-purple-100 text-purple-700': game.category === 'romantic'
                  }
                )}>
                  {game.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{game.description}</p>
              
              {selectedGame?.title === game.title && game.rules && (
                <div className="mt-4 pt-4 border-t border-pink-200">
                  <h4 className="font-medium mb-2">Como Jogar:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {game.rules.map((rule, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{rule}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {!isPremium && (
          <Button
            onClick={() => setShowPremiumModal(true)}
            variant="outline"
            className="w-full mt-4"
          >
            Desbloqueie Jogos Premium
          </Button>
        )}
      </div>
    </Card>
  );
}