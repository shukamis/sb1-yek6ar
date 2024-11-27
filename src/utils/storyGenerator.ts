import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';

interface StoryTemplate {
  id: string;
  name: string;
  dimensions: { width: number; height: number };
  layout: 'portrait' | 'square' | 'landscape';
}

interface GenerateStoryOptions {
  template: StoryTemplate;
  content: {
    title: string;
    subtitle?: string;
    image?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

export async function generateStory(
  elementRef: React.RefObject<HTMLDivElement>,
  options: GenerateStoryOptions
): Promise<{ url: string; blob: Blob } | null> {
  if (!elementRef.current) return null;

  try {
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: options.content.backgroundColor || '#ffffff',
    });

    const url = canvas.toDataURL('image/png');
    const blob = await (await fetch(url)).blob();

    return { url, blob };
  } catch (error) {
    console.error('Error generating story:', error);
    toast.error('Erro ao gerar imagem');
    return null;
  }
}

export async function shareStory(
  storyData: { url: string; blob: Blob },
  shareText: string
): Promise<boolean> {
  try {
    if (navigator.share) {
      const file = new File([storyData.blob], 'story.png', { type: 'image/png' });
      await navigator.share({
        title: 'Nossa História ❤️',
        text: shareText,
        files: [file],
      });
      return true;
    } else {
      const link = document.createElement('a');
      link.href = storyData.url;
      link.download = 'story.png';
      link.click();
      return true;
    }
  } catch (error) {
    console.error('Error sharing story:', error);
    toast.error('Erro ao compartilhar história');
    return false;
  }
}