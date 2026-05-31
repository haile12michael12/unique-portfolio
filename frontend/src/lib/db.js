/**
 * Centralized database client with fallback mock.
 * This ensures the application doesn't crash in environments where __B44_DB__ is not provided.
 */

import { findChatResponse } from '@/data/chat.data';

const mockDb = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    logout: async () => {},
    redirectToLogin: () => {},
  },
  entities: new Proxy({}, {
    get: () => ({
      filter: async () => [],
      get: async () => null,
      create: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
    }),
  }),
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '' }),
    },
  },
  agents: new Proxy({}, {
    get: () => ({
      subscribeToConversation: (id, callback) => {
        // Return a mock unsubscribe function
        return () => {};
      },
      createConversation: async () => ({ id: 'mock-conv-' + Date.now() }),
      addMessage: async (_conv, message) => ({
        role: 'assistant',
        content: findChatResponse(message.content),
      }),
    }),
  }),
};

export const db = globalThis.__B44_DB__ || mockDb;
