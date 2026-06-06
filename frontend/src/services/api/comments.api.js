import { apiGet, apiPost, apiPut, apiDelete } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { config } from '@/config/env';

function unwrapList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.comments)) return response.comments;
  return [];
}

function unwrapEntity(response) {
  if (response?.data && typeof response.data === 'object') return response.data;
  return response;
}

export const commentsApi = {
  getAll: async (params = {}) => {
    if (!config.api.useBackend) return [];
    const response = await apiGet(API_ENDPOINTS.comments.base, params);
    return unwrapList(response);
  },

  getByPost: async (postId) => {
    const response = await apiGet(API_ENDPOINTS.comments.byPost(postId));
    return unwrapList(response);
  },

  create: async (payload) => {
    const response = await apiPost(API_ENDPOINTS.comments.base, payload);
    return unwrapEntity(response);
  },

  update: async (id, payload) => {
    const response = await apiPut(API_ENDPOINTS.comments.byId(id), payload);
    return unwrapEntity(response);
  },

  remove: async (id) => {
    return apiDelete(API_ENDPOINTS.comments.byId(id));
  },
};

export default commentsApi;
