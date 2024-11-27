import { useState, useCallback } from 'react';
import { baserowApi } from '../lib/baserow/api';
import { toast } from 'react-hot-toast';

export function useBaserow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleBaserowOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    {
      loadingMessage = 'Carregando...',
      successMessage,
      errorMessage = 'Ocorreu um erro. Tente novamente.',
    }: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ): Promise<T | null> => {
    const toastId = toast.loading(loadingMessage);
    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      toast.dismiss(toastId);
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (error: any) {
      console.error('Baserow operation error:', error);
      toast.dismiss(toastId);
      toast.error(errorMessage);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    handleBaserowOperation,
  };
}