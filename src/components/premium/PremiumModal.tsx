import React from 'react';
import { X, Crown, Calendar, Image, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { usePremiumStore } from '../../store/usePremiumStore';
import { useAuthStore } from '../../store/useAuthStore';

export function PremiumModal() {
  const { showPremiumModal, setShowPremiumModal } = usePremiumStore();
  const { user } = useAuthStore();

  if (!showPremiumModal) return null;

  const features = [
    {
      icon: Image,
      title: 'Até 4 fotos do casal',
      description: 'Guarde mais memórias especiais',
    },
    {
      icon: Calendar,
      title: 'Lembretes de datas especiais',
      description: 'Nunca esqueça um mêsversário',
    },
    {
      icon: Heart,
      title: 'Sugestões de encontros',
      description: 'Ideias românticas para surpreender',
    },
  ];

  const handleUpgrade = async () => {
    // Implement Stripe checkout
    console.log('Upgrade to premium');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => setShowPremiumModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Upgrade para Premium</h2>
          <p className="text-gray-600">Desbloqueie recursos exclusivos</p>
        </div>

        <div className="space-y-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <feature.icon className="h-6 w-6 text-pink-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleUpgrade}
          variant="primary"
          className="w-full"
        >
          Upgrade por R$9,90/mês
        </Button>
      </div>
    </div>
  );
}