/**
 * Backend auth helpers for optional MERN API integration.
 * Use alongside or instead of Base44 auth when VITE_USE_BACKEND_API=true.
 */

import { usersApi } from '@/services/api/users.api';
import { config } from '@/config/env';
import { getAuthToken, clearAuthToken } from '@/api/client';

export async function getBackendUser() {
  if (!config.api.useBackend || !getAuthToken()) return null;
  try {
    return await usersApi.getProfile();
  } catch {
    clearAuthToken();
    return null;
  }
}

export async function loginWithBackend(credentials) {
  const result = await usersApi.login(credentials);
  if (result?.user) {
    localStorage.setItem(config.auth.userKey, JSON.stringify(result.user));
  }
  return result;
}

export async function registerWithBackend(payload) {
  const result = await usersApi.register(payload);
  if (result?.user) {
    localStorage.setItem(config.auth.userKey, JSON.stringify(result.user));
  }
  return result;
}

export async function logoutFromBackend() {
  await usersApi.logout();
  localStorage.removeItem(config.auth.userKey);
}

export function getStoredBackendUser() {
  const raw = localStorage.getItem(config.auth.userKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default {
  getBackendUser,
  loginWithBackend,
  registerWithBackend,
  logoutFromBackend,
  getStoredBackendUser,
};
