import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarks: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const job = action.payload;
      const existingIndex = state.bookmarks.findIndex(bookmark => bookmark.id === job.id);
      
      if (existingIndex === -1) {
        state.bookmarks.push({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          remote: job.remote,
          tags: job.tags,
          job_type: job.job_type,
          url: job.url,
          created_at: job.created_at,
          bookmarkedAt: new Date().toISOString(),
        });
      }
    },
    removeBookmark: (state, action) => {
      const jobId = action.payload;
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== jobId);
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
    toggleBookmark: (state, action) => {
      const job = action.payload;
      const existingIndex = state.bookmarks.findIndex(bookmark => bookmark.id === job.id);
      
      if (existingIndex === -1) {
        // Add bookmark
        state.bookmarks.push({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          remote: job.remote,
          tags: job.tags,
          job_type: job.job_type,
          url: job.url,
          created_at: job.created_at,
          bookmarkedAt: new Date().toISOString(),
        });
      } else {
        // Remove bookmark
        state.bookmarks.splice(existingIndex, 1);
      }
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks, toggleBookmark } = bookmarksSlice.actions;

// Selectors
export const selectBookmarks = (state) => state.bookmarks.bookmarks;
export const selectBookmarkCount = (state) => state.bookmarks.bookmarks.length;
export const selectIsBookmarked = (state, jobId) => 
  state.bookmarks.bookmarks.some(bookmark => bookmark.id === jobId);

export default bookmarksSlice.reducer;
