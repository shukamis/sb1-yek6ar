import { useState } from 'react';
import { uploadImage } from '../lib/storage/imageStorage';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuthStore();

  const handleUpload = async (
    file: File,
    type: 'profile' | 'relationship' | 'progress',
    metadata?: Record<string, any>
  ) => {
    if (!user) {
      toast.error('Usuário não autenticado');
      return null;
    }

    setUploading(true);
    try {
      const result = await uploadImage({
        file,
        userId: user.id,
        type,
        metadata,
      });
      toast.success('Imagem enviada com sucesso!');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar imagem');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    handleUpload,
    uploading,
  };
}