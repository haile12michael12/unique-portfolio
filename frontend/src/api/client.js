import axios from 'axios';
import { config } from '@/config/env';
import { ApiError } from '@/api/errors';

const TOKEN_KEY = config.auth.tokenKey;

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((request) => {
  const token = getAuthToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(ApiError.fromAxios(error))
);

export async function apiGet(url, params) {
  return apiClient.get(url, { params });
}

export async function apiPost(url, data) {
  return apiClient.post(url, data);
}

export async function apiPut(url, data) {
  return apiClient.put(url, data);
}

export async function apiPatch(url, data) {
  return apiClient.patch(url, data);
}

export async function apiDelete(url) {
  return apiClient.delete(url);
}

export default apiClient;
