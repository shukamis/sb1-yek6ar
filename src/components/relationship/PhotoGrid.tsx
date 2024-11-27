import React from 'react';
import { Camera, Lock, Plus, X, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { usePremiumStore } from '../../store/usePremiumStore';
import { toast } from 'react-hot-toast';

interface PhotoGridProps {
  isPremium: boolean;
  photos: string[];
  onAddPhoto?: (photo: File) => Promise<void>;
  onRemovePhoto?: (index: number) => Promise<void>;
}

export function PhotoGrid({ isPremium, photos, onAddPhoto, onRemovePhoto }: PhotoGridProps) {
  const maxPhotos = isPremium ? 4 : 1;
  const remainingSlots = maxPhotos - photos.length;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = React.useState<number | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      setIsUploading(true);
      await onAddPhoto?.(file);
      toast.success('Foto adicionada com sucesso!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Erro ao adicionar foto');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = async (index: number) => {
    try {
      await onRemovePhoto?.(index);
      toast.success('Foto removida com sucesso!');
    } catch (error) {
      console.error('Error removing photo:', error);
      toast.error('Erro ao remover foto');
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Camera className="text-pink-500 mr-2" /> Fotos do Casal
        </h2>
        {!isPremium && (
          <span className="text-sm text-gray-500 flex items-center">
            <Lock className="h-4 w-4 mr-1" /> 1/1 fotos
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="aspect-square relative group"
            onMouseEnter={() => setHoveredPhotoIndex(index)}
            onMouseLeave={() => setHoveredPhotoIndex(null)}
          >
            <img
              src={photo}
              alt={`Foto ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {hoveredPhotoIndex === index && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleRemovePhoto(index)}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
        
        {remainingSlots > 0 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
          >
            {isUploading ? (
              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
            ) : (
              <>
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-500">Adicionar foto</span>
              </>
            )}
          </button>
        )}
        
        {!isPremium && Array(3).fill(0).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </Card>
  );
}