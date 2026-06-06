/**
 * Normalized API error for consistent handling across services and UI.
 */

export class ApiError extends Error {
  constructor(message, { status, data, code } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status ?? 500;
    this.data = data ?? null;
    this.code = code ?? 'API_ERROR';
  }

  static fromAxios(error) {
    const status = error.response?.status;
    const data = error.response?.data;
    const message =
      data?.message ||
      data?.error ||
      error.message ||
      'An unexpected API error occurred';

    return new ApiError(message, {
      status,
      data,
      code: data?.code || 'API_ERROR',
    });
  }
}

export function getErrorMessage(error, fallback = 'Something went wrong') {
  if (error instanceof ApiError) return error.message;
  if (error?.message) return error.message;
  return fallback;
}

export default ApiError;
