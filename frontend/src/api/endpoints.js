/**
 * Backend API route map.
 * Mirrors backend/server.js mount points.
 */

export const API_ENDPOINTS = {
  users: {
    base: '/users',
    register: '/users/register',
    login: '/users/login',
    profile: '/users/profile',
    logout: '/users/logout',
    forgotPassword: '/users/forgot-password',
    resetPassword: '/users/reset-password',
    verifyEmail: '/users/verify-email',
  },
  categories: {
    base: '/categories',
    byId: (id) => `/categories/${id}`,
  },
  posts: {
    base: '/posts',
    byId: (id) => `/posts/${id}`,
    bySlug: (slug) => `/posts/slug/${slug}`,
    likes: (id) => `/posts/${id}/likes`,
    views: (id) => `/posts/${id}/views`,
  },
  comments: {
    base: '/comments',
    byId: (id) => `/comments/${id}`,
    byPost: (postId) => `/comments/post/${postId}`,
  },
  contact: {
    base: '/contact',
    newsletter: '/contact/newsletter',
    support: '/contact/support',
  },
};

export default API_ENDPOINTS;
