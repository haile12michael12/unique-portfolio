/**
 * Environment configuration for backend integration.
 * Values are injected at build time via Vite (VITE_* prefix).
 */

const env = import.meta.env;

export const config = {
  api: {
    baseUrl: env.VITE_API_BASE_URL || '/api/v1',
    timeout: Number(env.VITE_API_TIMEOUT) || 15000,
    useBackend: env.VITE_USE_BACKEND_API !== 'false',
  },
  auth: {
    tokenKey: 'portfolio_auth_token',
    userKey: 'portfolio_auth_user',
  },
  app: {
    name: env.VITE_APP_NAME || 'Hailemichael Portfolio',
    env: env.MODE || 'development',
    isDev: env.DEV,
    isProd: env.PROD,
  },
};

export default config;
