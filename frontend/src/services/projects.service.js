import { PROJECTS } from '@/data/projects-archive';

/**
 * Projects Service
 * Handles all project-related operations
 */

export const projectsService = {
  /**
   * Fetch all projects
   */
  getAllProjects: async () => {
    try {
      return PROJECTS;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  /**
   * Fetch a single project by ID
   */
  getProjectById: async (projectId) => {
    try {
      const project = PROJECTS.find(p => p.id === projectId);
      if (!project) {
        throw new Error(`Project ${projectId} not found`);
      }
      return project;
    } catch (error) {
      console.error(`Error fetching project ${projectId}:`, error);
      throw error;
    }
  },

  /**
   * Filter projects by technology stack
   */
  getProjectsByStack: async (technologies) => {
    try {
      return PROJECTS.filter(project =>
        technologies.some(tech => project.stack.includes(tech))
      );
    } catch (error) {
      console.error('Error filtering projects by stack:', error);
      throw error;
    }
  },

  /**
   * Filter projects by industry
   */
  getProjectsByIndustry: async (industries) => {
    try {
      return PROJECTS.filter(project =>
        industries.some(industry => project.industry.includes(industry))
      );
    } catch (error) {
      console.error('Error filtering projects by industry:', error);
      throw error;
    }
  },

  /**
   * Filter projects by architecture pattern
   */
  getProjectsByArchitecture: async (architectures) => {
    try {
      return PROJECTS.filter(project =>
        architectures.some(arch => project.architecture.includes(arch))
      );
    } catch (error) {
      console.error('Error filtering projects by architecture:', error);
      throw error;
    }
  },

  /**
   * Search projects by title or description
   */
  searchProjects: async (query) => {
    try {
      const lowerQuery = query.toLowerCase();
      return PROJECTS.filter(project =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  },

  /**
   * Get project statistics
   */
  getStatistics: async () => {
    try {
      const allTechs = new Set();
      const allIndustries = new Set();
      const allArchitectures = new Set();
      const allChallenges = new Set();

      PROJECTS.forEach(project => {
        project.stack.forEach(tech => allTechs.add(tech));
        project.industry.forEach(ind => allIndustries.add(ind));
        project.architecture.forEach(arch => allArchitectures.add(arch));
        project.challenges.forEach(challenge => allChallenges.add(challenge));
      });

      return {
        totalProjects: PROJECTS.length,
        technologies: Array.from(allTechs),
        industries: Array.from(allIndustries),
        architectures: Array.from(allArchitectures),
        challenges: Array.from(allChallenges),
      };
    } catch (error) {
      console.error('Error getting project statistics:', error);
      throw error;
    }
  },
};

export default projectsService;
