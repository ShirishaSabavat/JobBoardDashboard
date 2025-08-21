import { combineReducers } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import filtersReducer from '../features/filters/filtersSlice';

const rootReducer = combineReducers({
  jobs: jobsReducer,
  bookmarks: bookmarksReducer,
  filters: filtersReducer,
});

export default rootReducer;
