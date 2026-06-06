/**
 * Blog Service
 * Fetches from backend posts API with local mock fallback.
 */

import { config } from '@/config/env';
import { postsApi } from '@/services/api/posts.api';

const MOCK_BLOG_POSTS = [
  {
    id: 'post-001',
    _id: 'post-001',
    title: 'The Cost of Distributed Consensus in 2024',
    slug: 'cost-of-distributed-consensus-2024',
    category: 'Systems Engineering',
    excerpt: 'Deep dive into Raft, Paxos, and other consensus algorithms in production systems.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1551288049-bbda4833effb?q=80&w=800',
    author: 'Your Name',
    publishedAt: new Date('2024-05-15'),
    createdAt: '2024-05-15',
    readTime: 8,
    tags: ['distributed-systems', 'consensus', 'architecture'],
  },
  {
    id: 'post-002',
    _id: 'post-002',
    title: 'Building Real-Time Systems with CRDTs',
    slug: 'building-realtime-systems-crdts',
    category: 'Distributed Systems',
    excerpt: 'A practical guide to Conflict-free Replicated Data Types for collaborative applications.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800',
    author: 'Your Name',
    publishedAt: new Date('2024-05-01'),
    createdAt: '2024-05-01',
    readTime: 12,
    tags: ['crdt', 'real-time', 'collaboration'],
  },
  {
    id: 'post-003',
    _id: 'post-003',
    title: 'Zero-Trust Architecture: Beyond the Hype',
    slug: 'zero-trust-architecture-beyond-hype',
    category: 'Security',
    excerpt: 'Implementing zero-trust in production: lessons learned and pitfalls to avoid.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
    author: 'Your Name',
    publishedAt: new Date('2024-04-20'),
    createdAt: '2024-04-20',
    readTime: 10,
    tags: ['security', 'zero-trust', 'compliance'],
  },
];

function normalizePost(post) {
  if (!post) return null;
  return {
    ...post,
    id: post.id || post._id,
    publishedAt: post.publishedAt || post.createdAt,
  };
}

function sortPosts(posts) {
  return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

async function fetchPostsFromApi(params) {
  if (!config.api.useBackend) return null;
  try {
    const posts = await postsApi.getAll(params);
    if (Array.isArray(posts) && posts.length > 0) {
      return sortPosts(posts.map(normalizePost));
    }
  } catch (error) {
    console.warn('[blogService] API unavailable, using mock data:', error.message);
  }
  return null;
}

export const blogService = {
  getAllPosts: async (params = {}) => {
    const apiPosts = await fetchPostsFromApi(params);
    if (apiPosts) return apiPosts;
    return sortPosts(MOCK_BLOG_POSTS.map(normalizePost));
  },

  getPostBySlug: async (slug) => {
    if (config.api.useBackend) {
      try {
        const post = await postsApi.getBySlug(slug);
        if (post) return normalizePost(post);
      } catch (error) {
        console.warn('[blogService] Slug lookup failed, using mock data:', error.message);
      }
    }

    const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) throw new Error(`Blog post "${slug}" not found`);
    return normalizePost(post);
  },

  getPostsByCategory: async (category) => {
    const posts = await blogService.getAllPosts();
    return posts.filter((post) => {
      const value = typeof post.category === 'object' ? post.category?.title : post.category;
      return value === category;
    });
  },

  getPostsByTag: async (tag) => {
    const posts = await blogService.getAllPosts();
    return posts.filter((post) => post.tags?.includes(tag));
  },

  searchPosts: async (query) => {
    const lowerQuery = query.toLowerCase();
    const posts = await blogService.getAllPosts();
    return posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(lowerQuery) ||
        post.excerpt?.toLowerCase().includes(lowerQuery) ||
        post.tags?.some((t) => t.includes(lowerQuery))
    );
  },

  getRelatedPosts: async (postId, limit = 3) => {
    const posts = await blogService.getAllPosts();
    const currentPost = posts.find((p) => p.id === postId || p._id === postId);
    if (!currentPost) throw new Error(`Post ${postId} not found`);

    return posts
      .filter(
        (post) =>
          (post.id !== postId && post._id !== postId) &&
          post.tags?.some((tag) => currentPost.tags?.includes(tag))
      )
      .slice(0, limit);
  },

  getCategories: async () => {
    const posts = await blogService.getAllPosts();
    const categories = new Set(
      posts.map((post) =>
        typeof post.category === 'object' ? post.category?.title : post.category
      )
    );
    return Array.from(categories).filter(Boolean);
  },

  getTags: async () => {
    const posts = await blogService.getAllPosts();
    const tags = new Set();
    posts.forEach((post) => post.tags?.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  },

  likePost: async (postId) => {
    if (config.api.useBackend) {
      return postsApi.like(postId);
    }
    return { success: true, postId };
  },
};

export default blogService;
