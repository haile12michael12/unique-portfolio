import { apiGet, apiPost, apiPut, apiDelete } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { config } from '@/config/env';

function unwrapList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.categories)) return response.categories;
  return [];
}

function unwrapEntity(response) {
  if (response?.data && typeof response.data === 'object') return response.data;
  return response;
}

export const categoriesApi = {
  getAll: async () => {
    if (!config.api.useBackend) return [];
    const response = await apiGet(API_ENDPOINTS.categories.base);
    return unwrapList(response);
  },

  getById: async (id) => {
    const response = await apiGet(API_ENDPOINTS.categories.byId(id));
    return unwrapEntity(response);
  },

  create: async (payload) => {
    const response = await apiPost(API_ENDPOINTS.categories.base, payload);
    return unwrapEntity(response);
  },

  update: async (id, payload) => {
    const response = await apiPut(API_ENDPOINTS.categories.byId(id), payload);
    return unwrapEntity(response);
  },

  remove: async (id) => {
    return apiDelete(API_ENDPOINTS.categories.byId(id));
  },
};

export default categoriesApi;
