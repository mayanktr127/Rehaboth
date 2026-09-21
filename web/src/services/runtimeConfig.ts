const configuredApiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL?.trim();

export const runtimeConfig = {
  apiBaseUrl: configuredApiBaseUrl || '',
  operatorKey: (import.meta as any).env?.VITE_OPERATOR_KEY?.trim() || 'demo-operator-key',
  environment: (import.meta as any).env?.VITE_APP_ENV?.trim() || 'local',
} as const;

export const defaultAuthHeaders = {
  'X-Operator-Key': runtimeConfig.operatorKey,
  'X-Operator-Role': 'super_admin',
};
