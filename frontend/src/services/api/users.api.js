import { apiGet, apiPost } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { setAuthToken, clearAuthToken } from '@/api/client';
import { config } from '@/config/env';

function unwrapEntity(response) {
  if (response?.data && typeof response.data === 'object') return response.data;
  return response;
}

export const usersApi = {
  register: async (payload) => {
    const response = await apiPost(API_ENDPOINTS.users.register, payload);
    const data = unwrapEntity(response);
    if (data?.token) setAuthToken(data.token);
    return data;
  },

  login: async (credentials) => {
    const response = await apiPost(API_ENDPOINTS.users.login, credentials);
    const data = unwrapEntity(response);
    if (data?.token) setAuthToken(data.token);
    return data;
  },

  getProfile: async () => {
    if (!config.api.useBackend) return null;
    const response = await apiGet(API_ENDPOINTS.users.profile);
    return unwrapEntity(response);
  },

  logout: async () => {
    try {
      await apiPost(API_ENDPOINTS.users.logout);
    } finally {
      clearAuthToken();
      localStorage.removeItem(config.auth.userKey);
    }
  },

  forgotPassword: async (email) => {
    return apiPost(API_ENDPOINTS.users.forgotPassword, { email });
  },

  resetPassword: async (payload) => {
    return apiPost(API_ENDPOINTS.users.resetPassword, payload);
  },

  verifyEmail: async (token) => {
    return apiPost(API_ENDPOINTS.users.verifyEmail, { token });
  },
};

export default usersApi;
