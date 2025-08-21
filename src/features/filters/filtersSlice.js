import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  remote: 'all', // 'all', 'remote', 'onsite'
  location: '',
  tags: [],
  jobType: '',
  viewMode: 'grid', // 'grid' or 'list'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRemote: (state, action) => {
      state.remote = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    addTag: (state, action) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      state.tags = state.tags.filter(tag => tag !== action.payload);
    },
    setJobType: (state, action) => {
      state.jobType = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    clearFilters: (state) => {
      state.search = '';
      state.remote = 'all';
      state.location = '';
      state.tags = [];
      state.jobType = '';
    },
    clearSearch: (state) => {
      state.search = '';
    },
  },
});

export const {
  setSearch,
  setRemote,
  setLocation,
  setTags,
  addTag,
  removeTag,
  setJobType,
  setViewMode,
  clearFilters,
  clearSearch,
} = filtersSlice.actions;

// Selectors
export const selectFilters = (state) => state.filters;
export const selectSearch = (state) => state.filters.search;
export const selectRemote = (state) => state.filters.remote;
export const selectLocation = (state) => state.filters.location;
export const selectTags = (state) => state.filters.tags;
export const selectJobType = (state) => state.filters.jobType;
export const selectViewMode = (state) => state.filters.viewMode;

export default filtersSlice.reducer;
