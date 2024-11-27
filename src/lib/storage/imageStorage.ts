import { baserowApi } from '../baserow/api';
import { BASEROW_CONFIG } from '../baserow/config';
import { toast } from 'react-hot-toast';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface UploadOptions {
  file: File;
  userId: string;
  type: 'profile' | 'relationship' | 'progress';
  metadata?: Record<string, any>;
}

export async function uploadImage({ file, userId, type, metadata }: UploadOptions) {
  // Validate file
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Imagem muito grande. Máximo de 5MB.');
  }

  try {
    // Convert to base64 for Baserow storage
    const base64 = await fileToBase64(file);

    // Create media record
    const mediaRecord = await baserowApi.createRecord(
      BASEROW_CONFIG.TABLES.MEDIA,
      {
        user_id: userId,
        type,
        url: base64,
        created_at: new Date().toISOString(),
        metadata: JSON.stringify(metadata || {}),
      }
    );

    return mediaRecord;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Erro ao fazer upload da imagem');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function getImageUrl(mediaId: string): Promise<string> {
  try {
    const record = await baserowApi.getRecord(BASEROW_CONFIG.TABLES.MEDIA, mediaId);
    return record.url;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw new Error('Erro ao carregar imagem');
  }
}