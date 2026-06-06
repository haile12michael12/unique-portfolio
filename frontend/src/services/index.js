/**
 * Portfolio Service Index
 * Central export point for domain and API services.
 */

export { projectsService } from './projects.service';
export { blogService } from './blog.service';
export { contactService } from './contact.service';
export { githubService } from './github/github.service';
export { analytics } from './analytics/analytics.service';
export { sendChatMessage, openPortfolioChat, CHAT_OPEN_EVENT } from './chat.service';

export {
  postsApi,
  usersApi,
  categoriesApi,
  commentsApi,
  contactApi,
} from './api';

export { projectsService as default } from './projects.service';
