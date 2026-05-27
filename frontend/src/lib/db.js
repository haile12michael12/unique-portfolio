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
      subscribeToConversation: (id, callback) => {
        // Return a mock unsubscribe function
        return () => {};
      },
      createConversation: async () => ({ id: 'mock-conv-' + Date.now() }),
      addMessage: async (conv, message) => {
        // Simple mock response logic based on keywords
        const text = message.content.toLowerCase();
        let response = "I'm a system-trained AI assistant. I can tell you about my architectural decisions, tech stack, and professional experience at companies like Vercel, Stripe, and Google.";
        
        if (text.includes('vercel') || text.includes('cold start') || text.includes('runtime')) {
          response = "At Vercel, I led the infrastructure team to optimize edge runtime performance. We reduced cold start times by 40% using custom eBPF probes and a specialized Rust-based async runtime.";
        } else if (text.includes('stripe') || text.includes('payment') || text.includes('fraud')) {
          response = "During my time at Stripe, I focused on core payment pipelines and built a real-time fraud scoring engine using Go and Kafka, which scaled to handle 3x peak volume.";
        } else if (text.includes('google') || text.includes('kubernetes') || text.includes('k8s')) {
          response = "At Google, I was part of the Kubernetes core team. I specifically worked on scheduling efficiency and node lifecycle management for large-scale clusters.";
        } else if (text.includes('titan') || text.includes('orchestrator')) {
          response = "The Titan Orchestrator is a custom control plane I designed to manage 100K+ nodes. It uses hierarchical etcd clusters and probabilistic scheduling to achieve 10x the scale of vanilla K8s.";
        } else if (text.includes('stack') || text.includes('tech') || text.includes('language')) {
          response = "My primary stack includes Go, Rust, TypeScript, and Python. For infrastructure, I use K8s, Terraform, and AWS/GCP. I specialize in distributed systems and performance optimization.";
        } else if (text.includes('nexus')) {
          response = "Nexus Engine is a distributed transaction platform I built that handles 2M+ events/sec with <5ms latency using Go and a custom Raft implementation.";
        }

        // In a real app, this would be handled by the backend AI agent
        console.log(`[Mock AI] User: ${message.content} -> Response: ${response.substring(0, 50)}...`);
        return { role: 'assistant', content: response };
      },
    }),
  }),
};

export const db = globalThis.__B44_DB__ || mockDb;
