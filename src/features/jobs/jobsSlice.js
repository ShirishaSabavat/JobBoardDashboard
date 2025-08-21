import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Async thunk for fetching jobs using real API
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ page = 1, limit = 20, search = '', filters = {} }, { rejectWithValue }) => {
    try {
      // For the real API, we'll fetch jobs and filter client-side
      const params = new URLSearchParams({
        page: page.toString(),
      });

      // Only add search parameter if provided (API supports this)
      if (search) {
        params.append('search', search);
      }

      const response = await axiosInstance.get(`?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Failed to fetch jobs');
    }
  }
);

// Async thunk for fetching a single job using real API
export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (jobId, { rejectWithValue, getState }) => {
    try {
      // First, try to find the job in the existing jobs data
      const state = getState();
      const existingJobs = state.jobs.jobs;
      
      // Look for job by slug or id
      let job = existingJobs.find(job => 
        job.slug === jobId || job.id === parseInt(jobId)
      );
      
      // If not found in existing jobs, fetch from API
      if (!job) {
        const response = await axiosInstance.get(`?page=1&per_page=1000`);
        job = response.data.data.find(job => 
          job.slug === jobId || job.id === parseInt(jobId)
        );
      }
      
      if (!job) {
        throw new Error('Job not found');
      }
      
      return {
        data: job
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch job details');
    }
  }
);

const initialState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  hasMore: true,
  currentPage: 1,
  totalJobs: 0,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobs: (state) => {
      state.jobs = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.error = null;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        const { data, meta, links } = action.payload;
        
        // If it's the first page, replace jobs, otherwise append
        if (meta.current_page === 1) {
          state.jobs = data;
        } else {
          state.jobs = [...state.jobs, ...data];
        }
        
        state.currentPage = meta.current_page;
        state.totalJobs = meta.total || data.length;
        state.hasMore = !!links.next; // Check if there's a next page
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch jobs';
      })
      // Fetch single job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload.data;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch job details';
      });
  },
});

export const { clearJobs, clearCurrentJob, clearError, setCurrentPage } = jobsSlice.actions;
export default jobsSlice.reducer;
