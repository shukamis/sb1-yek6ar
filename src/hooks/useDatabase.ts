import { useState, useCallback } from 'react';
import { db } from '../lib/database';
import { toast } from 'react-hot-toast';
import { formatError } from '../lib/database/utils';

export function useDatabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await operation();
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (error: any) {
      const errorMessage = formatError(error);
      setError(error);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    handleOperation,
  };
}