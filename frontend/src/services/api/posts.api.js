import { apiGet, apiPost, apiPut, apiDelete } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';
import { config } from '@/config/env';

function unwrapList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.posts)) return response.posts;
  return [];
}

function unwrapEntity(response) {
  if (response?.data && typeof response.data === 'object') return response.data;
  return response;
}

export const postsApi = {
  getAll: async (params = {}) => {
    if (!config.api.useBackend) return [];
    const response = await apiGet(API_ENDPOINTS.posts.base, params);
    return unwrapList(response);
  },

  getById: async (id) => {
    const response = await apiGet(API_ENDPOINTS.posts.byId(id));
    return unwrapEntity(response);
  },

  getBySlug: async (slug) => {
    try {
      const response = await apiGet(API_ENDPOINTS.posts.bySlug(slug));
      return unwrapEntity(response);
    } catch {
      const posts = await postsApi.getAll();
      return posts.find((p) => p.slug === slug) ?? null;
    }
  },

  create: async (payload) => {
    const response = await apiPost(API_ENDPOINTS.posts.base, payload);
    return unwrapEntity(response);
  },

  update: async (id, payload) => {
    const response = await apiPut(API_ENDPOINTS.posts.byId(id), payload);
    return unwrapEntity(response);
  },

  remove: async (id) => {
    return apiDelete(API_ENDPOINTS.posts.byId(id));
  },

  like: async (id) => {
    const response = await apiPost(API_ENDPOINTS.posts.likes(id));
    return unwrapEntity(response);
  },

  addView: async (id) => {
    const response = await apiPost(API_ENDPOINTS.posts.views(id));
    return unwrapEntity(response);
  },
};

export default postsApi;
