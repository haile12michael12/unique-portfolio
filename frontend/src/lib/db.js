/**
 * Centralized database client with fallback mock.
 * This ensures the application doesn't crash in environments where __B44_DB__ is not provided.
 */

const mockDb = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
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
      subscribeToConversation: () => () => {},
      createConversation: async () => ({ id: 'mock-conv' }),
      addMessage: async () => ({}),
    }),
  }),
};

export const db = globalThis.__B44_DB__ || mockDb;
