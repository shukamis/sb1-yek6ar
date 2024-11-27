import React from 'react';
import { Crown, Calendar, Image, Heart, GamepadIcon, Lock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePremiumStore } from '../../store/usePremiumStore';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const PREMIUM_FEATURES: Feature[] = [
  {
    icon: Image,
    title: 'Galeria Expandida',
    description: 'Adicione até 4 fotos especiais do casal',
  },
  {
    icon: Calendar,
    title: 'Lembretes Personalizados',
    description: 'Nunca esqueça datas importantes',
  },
  {
    icon: Heart,
    title: 'Sugestões de Encontros',
    description: 'Ideias românticas para surpreender',
  },
  {
    icon: GamepadIcon,
    title: 'Jogos para Casal',
    description: 'Atividades divertidas e românticas',
  },
];

export function PremiumFeatures() {
  const { setShowPremiumModal } = usePremiumStore();

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Crown className="h-6 w-6 text-yellow-400" />
          <h2 className="text-xl font-semibold">Premium</h2>
        </div>
        <Button
          onClick={() => setShowPremiumModal(true)}
          variant="primary"
          size="sm"
        >
          Upgrade
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PREMIUM_FEATURES.map((feature, index) => (
          <div
            key={index}
            className="bg-white/50 p-4 rounded-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Lock className="h-6 w-6 text-gray-600" />
            </div>
            <feature.icon className="h-6 w-6 text-pink-500 mb-2" />
            <h3 className="font-medium mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}