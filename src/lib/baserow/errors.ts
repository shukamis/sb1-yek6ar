export class BaserowError extends Error {
  constructor(
    message: string,
    public originalError?: unknown,
    public code?: string
  ) {
    super(message);
    this.name = 'BaserowError';
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      stack: this.stack,
    };
  }
}

export class ValidationError extends BaserowError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends BaserowError {
  constructor(message = 'Authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
    this.code = 'AUTH_ERROR';
  }
}

export class NetworkError extends BaserowError {
  constructor(message = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
    this.code = 'NETWORK_ERROR';
  }
}