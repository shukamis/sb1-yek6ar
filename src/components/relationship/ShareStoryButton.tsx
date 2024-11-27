import React from 'react';
import { Share2, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import { formatDateToLocal } from '../../utils/dateUtils';

interface ShareStoryButtonProps {
  currentMonth: number;
  startDate: string;
  photo?: string;
}

export function ShareStoryButton({ currentMonth, startDate, photo }: ShareStoryButtonProps) {
  const storyRef = React.useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateStory = async () => {
    if (!storyRef.current) return;

    try {
      setIsGenerating(true);
      toast.loading('Gerando imagem...');
      
      const canvas = await html2canvas(storyRef.current);
      const image = canvas.toDataURL('image/png');
      toast.dismiss();
      
      if (navigator.share) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], 'monthiversary.png', { type: 'image/png' });
        await navigator.share({
          title: 'Nosso Mêsversário ❤️',
          text: `Comemorando ${currentMonth} ${currentMonth === 1 ? 'mês' : 'meses'} juntos!`,
          files: [file],
        });
        toast.success('Imagem compartilhada com sucesso!');
      } else {
        const link = document.createElement('a');
        link.href = image;
        link.download = 'monthiversary.png';
        link.click();
        toast.success('Imagem baixada com sucesso!');
      }
    } catch (error) {
      console.error('Error generating story:', error);
      toast.error('Erro ao gerar imagem');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        onClick={generateStory}
        loading={isGenerating}
        className="w-full flex items-center justify-center space-x-2"
      >
        <Share2 className="h-5 w-5" />
        <span>Postar nos Stories</span>
      </Button>

      <div
        ref={storyRef}
        className="fixed left-[-9999px]"
        style={{ width: '1080px', height: '1920px' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 p-12 flex flex-col items-center justify-center text-white">
          {photo && (
            <div 
              className="w-96 h-96 rounded-full bg-cover bg-center mb-8 border-8 border-white shadow-2xl"
              style={{ backgroundImage: `url(${photo})` }}
            />
          )}
          <h1 className="text-6xl font-bold mb-6">
            {currentMonth} {currentMonth === 1 ? 'Mês' : 'Meses'}
          </h1>
          <p className="text-3xl opacity-90 mb-8">de muito amor ❤️</p>
          <div className="text-xl opacity-75">
            {formatDateToLocal(startDate)}
          </div>
          <div className="absolute bottom-12 right-12 flex items-center">
            <Heart className="h-6 w-6 mr-2" />
            <p className="text-2xl font-medium">LoveTracker</p>
          </div>
        </div>
      </div>
    </>
  );
}