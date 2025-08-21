// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://www.arbeitnow.com/api/job-board-api',
  TIMEOUT: 10000,
  DEFAULT_LIMIT: 20,
};

// Job Types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
  'Temporary',
];

// Remote Options
export const REMOTE_OPTIONS = [
  { value: 'all', label: 'All Jobs' },
  { value: true, label: 'Remote Only' },
  { value: false, label: 'On-Site Only' },
];

// View Modes
export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Debounce Delay
export const DEBOUNCE_DELAY = 300;

// Local Storage Keys
export const STORAGE_KEYS = {
  BOOKMARKS: 'bookmarks',
  FILTERS: 'filters',
  VIEW_MODE: 'viewMode',
};

// Error Messages
export const ERROR_MESSAGES = {
  FETCH_JOBS: 'Failed to fetch jobs. Please try again.',
  FETCH_JOB_DETAILS: 'Failed to fetch job details. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  BOOKMARK_ADDED: 'Job added to bookmarks',
  BOOKMARK_REMOVED: 'Job removed from bookmarks',
  FILTERS_CLEARED: 'All filters cleared',
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints
export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 960,
  LG: 1280,
  XL: 1920,
};
