import { ValidationError } from './errors';
import { RecordType } from './types';

const REQUIRED_FIELDS: Record<RecordType, string[]> = {
  user: ['firebase_id', 'email', 'name'],
  relationship: ['user_id', 'partner1_name', 'partner2_name', 'start_date'],
};

export function validateRecord(data: any, type: RecordType): void {
  const requiredFields = REQUIRED_FIELDS[type];
  
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new ValidationError(
      `Missing required fields for ${type}: ${missingFields.join(', ')}`
    );
  }
}

export function sanitizeData(data: any): any {
  const sanitized = { ...data };

  // Remove undefined values
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === undefined) {
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

export function formatError(error: any): string {
  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  return 'An unexpected error occurred';
}