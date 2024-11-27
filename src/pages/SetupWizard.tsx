import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Calendar, Users } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DatePicker } from '../components/relationship/DatePicker';
import { useAuthStore } from '../store/useAuthStore';
import { useRelationship } from '../hooks/useRelationship';
import { createRelationship } from '../lib/relationship';
import { toast } from 'react-hot-toast';

export function SetupWizard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { setRelationship } = useRelationship();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [partner1Name, setPartner1Name] = React.useState('');
  const [partner2Name, setPartner2Name] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const validateNames = () => {
    if (!partner1Name.trim() || !partner2Name.trim()) {
      toast.error('Por favor, preencha os nomes dos parceiros');
      return false;
    }
    return true;
  };

  const handleFinish = async () => {
    if (!user) {
      toast.error('Usuário não encontrado');
      return;
    }

    if (!validateNames()) return;

    try {
      setIsSubmitting(true);
      
      const relationship = await createRelationship(user.id, startDate, {
        partner1Name: partner1Name.trim(),
        partner2Name: partner2Name.trim()
      });
      
      setRelationship(relationship);
      
      toast.success('Perfil criado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating relationship:', error);
      toast.error('Erro ao criar perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: 'Bem-vindo ao LoveTracker',
      description: 'Vamos configurar seu perfil de relacionamento',
      icon: Heart,
      content: (
        <div className="text-center space-y-4">
          <Heart className="w-16 h-16 text-pink-500 mx-auto" />
          <h2 className="text-2xl font-bold">Bem-vindo ao LoveTracker</h2>
          <p className="text-gray-600">
            Vamos configurar seu perfil para você começar a registrar os momentos especiais do seu relacionamento.
          </p>
        </div>
      ),
    },
    {
      title: 'Nomes do Casal',
      description: 'Como vocês se chamam?',
      icon: Users,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Como vocês se chamam?</h2>
          <div className="space-y-4">
            <Input
              label="Seu nome"
              value={partner1Name}
              onChange={(e) => setPartner1Name(e.target.value)}
              placeholder="Digite seu nome"
              maxLength={50}
            />
            <Input
              label="Nome do seu PAR"
              value={partner2Name}
              onChange={(e) => setPartner2Name(e.target.value)}
              placeholder="Digite o nome do seu par"
              maxLength={50}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Data do Início',
      description: 'Quando começou seu relacionamento?',
      icon: Calendar,
      content: (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quando começou seu relacionamento?</h2>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            label="Data de início do relacionamento"
          />
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-8">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index > 0 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    index < currentStep ? 'bg-pink-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {currentStepData.content}

          <div className="flex justify-between pt-6">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0 || isSubmitting}
            >
              Voltar
            </Button>
            <Button
              variant="primary"
              onClick={
                currentStep === steps.length - 1
                  ? handleFinish
                  : () => {
                      if (currentStep === 1 && !validateNames()) return;
                      setCurrentStep((prev) => prev + 1);
                    }
              }
              disabled={isSubmitting}
            >
              {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}