import { IApiService } from './types';
import { ApiClient } from './client';
import { MockApiAdapter } from './mockAdapter';

export * from './types';
export * from './storage';
export * from './client';
export * from './mockAdapter';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

// If EXPO_PUBLIC_API_BASE_URL is set, use real fetch client; otherwise fall back to mock adapter
export const apiService: IApiService = apiBaseUrl
  ? new ApiClient(apiBaseUrl)
  : new MockApiAdapter();
