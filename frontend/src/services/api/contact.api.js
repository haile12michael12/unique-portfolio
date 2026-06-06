import { apiPost } from '@/api/client';
import { API_ENDPOINTS } from '@/api/endpoints';

function unwrapEntity(response) {
  if (response?.data && typeof response.data === 'object') return response.data;
  return response;
}

export const contactApi = {
  submit: async (payload) => {
    const response = await apiPost(API_ENDPOINTS.contact.base, payload);
    return unwrapEntity(response);
  },

  subscribeNewsletter: async (email) => {
    const response = await apiPost(API_ENDPOINTS.contact.newsletter, { email });
    return unwrapEntity(response);
  },

  submitSupport: async (payload) => {
    const response = await apiPost(API_ENDPOINTS.contact.support, payload);
    return unwrapEntity(response);
  },
};

export default contactApi;
