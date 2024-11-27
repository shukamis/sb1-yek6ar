import { AxiosError } from 'axios';
import { BaserowError } from './errors';

export function handleApiError(error: unknown, defaultMessage: string): BaserowError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;

    switch (status) {
      case 400:
        return new BaserowError('Invalid request data', error);
      case 401:
        return new BaserowError('Authentication failed', error);
      case 403:
        return new BaserowError('Permission denied', error);
      case 404:
        return new BaserowError('Resource not found', error);
      case 429:
        return new BaserowError('Too many requests', error);
      default:
        return new BaserowError(
          data?.error || defaultMessage,
          error
        );
    }
  }

  return new BaserowError(defaultMessage, error);
}

export function validateDateString(date: string): boolean {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

export function normalizeDate(date: string | Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export function sanitizeRecord<T extends Record<string, any>>(data: T): T {
  const sanitized = { ...data };

  // Remove undefined/null values
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] == null) {
      delete sanitized[key];
    }
  });

  // Convert dates to ISO strings
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] instanceof Date) {
      sanitized[key] = sanitized[key].toISOString();
    }
  });

  return sanitized;
}