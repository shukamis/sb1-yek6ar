import axios, { AxiosError } from 'axios';
import { BASEROW_CONFIG } from './config';
import { baserowCache } from './cache';
import { NetworkError, AuthenticationError } from './errors';

export const baserowClient = axios.create({
  baseURL: BASEROW_CONFIG.API_URL,
  headers: {
    Authorization: `Token ${BASEROW_CONFIG.TOKEN}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
baserowClient.interceptors.request.use(
  (config) => {
    // Check cache for GET requests
    if (config.method?.toLowerCase() === 'get') {
      const cacheKey = `${config.url}${JSON.stringify(config.params)}`;
      const cachedData = baserowCache.get(cacheKey);
      
      if (cachedData) {
        return {
          ...config,
          adapter: () => Promise.resolve({
            data: cachedData,
            status: 200,
            statusText: 'OK',
            headers: config.headers,
            config,
          }),
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
baserowClient.interceptors.response.use(
  (response) => {
    // Cache GET responses
    if (response.config.method?.toLowerCase() === 'get') {
      const cacheKey = `${response.config.url}${JSON.stringify(response.config.params)}`;
      baserowCache.set(cacheKey, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      throw new NetworkError();
    }

    if (error.response.status === 401) {
      throw new AuthenticationError();
    }

    return Promise.reject(error);
  }
);