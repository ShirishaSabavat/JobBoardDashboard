import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectJobs = (state) => state.jobs.jobs;
export const selectAllJobs = (state) => state.jobs.allJobs;
export const selectFilteredJobs = (state) => state.jobs.filteredJobs;
export const selectCurrentJob = (state) => state.jobs.currentJob;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;
export const selectHasMore = (state) => state.jobs.hasMore;
export const selectCurrentPage = (state) => state.jobs.currentPage;
export const selectTotalJobs = (state) => state.jobs.totalJobs;

// Select bookmarks from state
export const selectBookmarks = (state) => state.bookmarks.bookmarks;

// Helper function to get job ID (prioritizes slug for real API)
const getJobId = (job) => job.slug || job.id;

// Memoized selectors
export const selectJobsWithBookmarkStatus = createSelector(
  [selectJobs, selectBookmarks],
  (jobs, bookmarks) => {
    return jobs.map(job => ({
      ...job,
      isBookmarked: bookmarks.some(bookmark => bookmark.id === getJobId(job))
    }));
  }
);

export const selectBookmarkedJobs = createSelector(
  [selectAllJobs, selectBookmarks],
  (allJobs, bookmarks) => {
    const bookmarkedIds = bookmarks.map(bookmark => bookmark.id);
    return allJobs.filter(job => bookmarkedIds.includes(getJobId(job)));
  }
);

export const selectJobById = createSelector(
  [selectAllJobs, (state, jobId) => jobId],
  (allJobs, jobId) => allJobs.find(job => getJobId(job) === jobId)
);

export const selectBookmarkedJobById = createSelector(
  [selectBookmarkedJobs, (state, jobId) => jobId],
  (bookmarkedJobs, jobId) => bookmarkedJobs.find(job => getJobId(job) === jobId)
);
