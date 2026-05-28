/**
 * GitHub Service
 * Handles GitHub API interactions
 */

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'yourusername'; // Replace with actual username

export const githubService = {
  /**
   * Fetch user profile
   */
  getUserProfile: async (username = GITHUB_USERNAME) => {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
      if (!response.ok) {
        throw new Error(`GitHub user "${username}" not found`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      throw error;
    }
  },

  /**
   * Fetch user repositories
   */
  getRepositories: async (username = GITHUB_USERNAME, options = {}) => {
    try {
      const params = new URLSearchParams({
        sort: options.sort || 'stars',
        per_page: options.perPage || 30,
        ...options.params,
      });

      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/repos?${params}`
      );
      if (!response.ok) {
        throw new Error('Error fetching repositories');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  },

  /**
   * Fetch single repository
   */
  getRepository: async (owner, repo) => {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
      if (!response.ok) {
        throw new Error(`Repository "${owner}/${repo}" not found`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw error;
    }
  },

  /**
   * Fetch repository languages
   */
  getRepositoryLanguages: async (owner, repo) => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`
      );
      if (!response.ok) {
        throw new Error('Error fetching repository languages');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching repository languages:', error);
      throw error;
    }
  },

  /**
   * Fetch repository statistics
   */
  getRepositoryStats: async (owner, repo) => {
    try {
      const repoData = await githubService.getRepository(owner, repo);
      const languages = await githubService.getRepositoryLanguages(owner, repo);

      return {
        name: repoData.name,
        description: repoData.description,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        issues: repoData.open_issues_count,
        language: repoData.language,
        languages,
        topics: repoData.topics,
        createdAt: repoData.created_at,
        updatedAt: repoData.updated_at,
        pushedAt: repoData.pushed_at,
      };
    } catch (error) {
      console.error('Error fetching repository stats:', error);
      throw error;
    }
  },

  /**
   * Fetch user's GitHub activity (recent commits)
   */
  getUserActivity: async (username = GITHUB_USERNAME) => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${username}/events/public?per_page=20`
      );
      if (!response.ok) {
        throw new Error('Error fetching user activity');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user activity:', error);
      throw error;
    }
  },

  /**
   * Get trending repositories (mock - GitHub API doesn't have official endpoint)
   */
  getTrendingRepositories: async (language = '', options = {}) => {
    try {
      // This is a simplified mock as GitHub Trending API requires scraping
      const query = `stars:>${options.minStars || 1000} ${language ? `language:${language}` : ''}`;
      const params = new URLSearchParams({
        q: query,
        sort: options.sort || 'stars',
        per_page: options.perPage || 10,
      });

      const response = await fetch(`${GITHUB_API_BASE}/search/repositories?${params}`);
      if (!response.ok) {
        throw new Error('Error fetching trending repositories');
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching trending repositories:', error);
      throw error;
    }
  },

  /**
   * Search repositories
   */
  searchRepositories: async (query, options = {}) => {
    try {
      if (!query) {
        throw new Error('Search query is required');
      }

      const params = new URLSearchParams({
        q: query,
        sort: options.sort || 'stars',
        per_page: options.perPage || 30,
      });

      const response = await fetch(`${GITHUB_API_BASE}/search/repositories?${params}`);
      if (!response.ok) {
        throw new Error('Error searching repositories');
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error searching repositories:', error);
      throw error;
    }
  },
};

export default githubService;
