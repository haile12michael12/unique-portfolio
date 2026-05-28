/**
 * Blog Service
 * Handles all blog-related operations
 */

const MOCK_BLOG_POSTS = [
  {
    id: 'post-001',
    title: 'The Cost of Distributed Consensus in 2024',
    slug: 'cost-of-distributed-consensus-2024',
    category: 'Systems Engineering',
    excerpt: 'Deep dive into Raft, Paxos, and other consensus algorithms in production systems.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1551288049-bbda4833effb?q=80&w=800',
    author: 'Your Name',
    publishedAt: new Date('2024-05-15'),
    readTime: 8,
    tags: ['distributed-systems', 'consensus', 'architecture'],
  },
  {
    id: 'post-002',
    title: 'Building Real-Time Systems with CRDTs',
    slug: 'building-realtime-systems-crdts',
    category: 'Distributed Systems',
    excerpt: 'A practical guide to Conflict-free Replicated Data Types for collaborative applications.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800',
    author: 'Your Name',
    publishedAt: new Date('2024-05-01'),
    readTime: 12,
    tags: ['crdt', 'real-time', 'collaboration'],
  },
  {
    id: 'post-003',
    title: 'Zero-Trust Architecture: Beyond the Hype',
    slug: 'zero-trust-architecture-beyond-hype',
    category: 'Security',
    excerpt: 'Implementing zero-trust in production: lessons learned and pitfalls to avoid.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
    author: 'Your Name',
    publishedAt: new Date('2024-04-20'),
    readTime: 10,
    tags: ['security', 'zero-trust', 'compliance'],
  },
];

export const blogService = {
  /**
   * Fetch all blog posts
   */
  getAllPosts: async () => {
    try {
      // In production, this would call your backend/CMS API
      return MOCK_BLOG_POSTS.sort((a, b) => b.publishedAt - a.publishedAt);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  /**
   * Fetch a single blog post by slug
   */
  getPostBySlug: async (slug) => {
    try {
      const post = MOCK_BLOG_POSTS.find(p => p.slug === slug);
      if (!post) {
        throw new Error(`Blog post "${slug}" not found`);
      }
      return post;
    } catch (error) {
      console.error(`Error fetching blog post:`, error);
      throw error;
    }
  },

  /**
   * Get posts by category
   */
  getPostsByCategory: async (category) => {
    try {
      return MOCK_BLOG_POSTS.filter(post => post.category === category);
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }
  },

  /**
   * Get posts by tag
   */
  getPostsByTag: async (tag) => {
    try {
      return MOCK_BLOG_POSTS.filter(post => post.tags.includes(tag));
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      throw error;
    }
  },

  /**
   * Search blog posts
   */
  searchPosts: async (query) => {
    try {
      const lowerQuery = query.toLowerCase();
      return MOCK_BLOG_POSTS.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.includes(lowerQuery))
      );
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }
  },

  /**
   * Get related posts
   */
  getRelatedPosts: async (postId, limit = 3) => {
    try {
      const currentPost = MOCK_BLOG_POSTS.find(p => p.id === postId);
      if (!currentPost) {
        throw new Error(`Post ${postId} not found`);
      }

      const related = MOCK_BLOG_POSTS.filter(post => {
        if (post.id === postId) return false;
        return post.tags.some(tag => currentPost.tags.includes(tag));
      });

      return related.slice(0, limit);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      throw error;
    }
  },

  /**
   * Get all unique categories
   */
  getCategories: async () => {
    try {
      const categories = new Set(MOCK_BLOG_POSTS.map(post => post.category));
      return Array.from(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Get all unique tags
   */
  getTags: async () => {
    try {
      const tags = new Set();
      MOCK_BLOG_POSTS.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },
};

export default blogService;
