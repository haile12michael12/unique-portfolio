/**
 * Navigation Data
 * Centralized navigation configuration with advanced features
 */

export const NAV_ITEMS = [
  {
    label: 'Full-Stack',
    path: '/',
    displayPath: 'root/dev/fullstack',
    category: 'core',
    icon: 'Code2',
    description: 'Complete overview and hero section',
  },
  {
    label: 'Services',
    path: '/services',
    displayPath: 'root/dev/services',
    category: 'work',
    icon: 'Wrench',
    description: 'Engineering services and engagement models',
  },
  {
    label: 'Solutions',
    path: '/projects',
    displayPath: 'root/dev/solutions',
    category: 'work',
    icon: 'Zap',
    description: 'Featured projects and case studies',
  },
  {
    label: 'Architecture',
    path: '/case-studies',
    displayPath: 'root/dev/architecture',
    category: 'work',
    icon: 'Layers',
    description: 'Deep-dive architecture analysis',
  },
  {
    label: 'Experience',
    path: '/',
    displayPath: 'root/dev/history',
    hash: '#experience',
    category: 'profile',
    icon: 'Briefcase',
    description: 'Work experience and timeline',
  },
  {
    label: 'Journal',
    path: '/blog',
    displayPath: 'root/dev/journal',
    category: 'writing',
    icon: 'BookOpen',
    description: 'Technical blog posts and insights',
  },
  {
    label: 'Resume',
    path: '/',
    displayPath: 'root/dev/manifest',
    hash: '#resume',
    category: 'profile',
    icon: 'FileText',
    description: 'CV and credentials',
  },
  {
    label: 'Terminal',
    path: '/contact',
    displayPath: 'root/dev/terminal',
    category: 'contact',
    icon: 'MessageSquare',
    description: 'Contact and communication',
  },
];

export const KEYBOARD_SHORTCUTS = [
  { key: 'Cmd+K / Ctrl+K', action: 'Open Command Palette', context: 'Global' },
  { key: 'Cmd+/ / Ctrl+/', action: 'Show keyboard shortcuts', context: 'Global' },
  { key: 'Escape', action: 'Close modals and palettes', context: 'Modal' },
  { key: 'Enter', action: 'Execute command', context: 'Command Palette' },
  { key: 'Arrow Up/Down', action: 'Navigate commands', context: 'Command Palette' },
];

export const PAGE_ROUTES = {
  home: '/',
  services: '/services',
  projects: '/projects',
  caseStudies: '/case-studies',
  blog: '/blog',
  contact: '/contact',
};

export const QUICK_ACCESS = [
  { label: 'GitHub', shortcut: 'gh', url: 'https://github.com' },
  { label: 'Resume', shortcut: 'cv', hash: '#resume' },
  { label: 'Projects', shortcut: 'projects', path: '/projects' },
  { label: 'Contact', shortcut: 'email', path: '/contact' },
];

export const NAVIGATION_CATEGORIES = {
  core: { label: 'Core', color: 'primary' },
  work: { label: 'Work', color: 'accent' },
  profile: { label: 'Profile', color: 'emerald' },
  writing: { label: 'Writing', color: 'blue' },
  contact: { label: 'Contact', color: 'violet' },
};

export default {
  NAV_ITEMS,
  KEYBOARD_SHORTCUTS,
  PAGE_ROUTES,
  QUICK_ACCESS,
  NAVIGATION_CATEGORIES,
};
