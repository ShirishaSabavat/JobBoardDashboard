import React, { useEffect, useCallback, useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchJobs, clearJobs } from '../features/jobs/jobsSlice';
import { selectFilters } from '../features/filters/filtersSlice';
import { selectJobsLoading, selectJobsError, selectHasMore } from '../features/jobs/jobsSelectors';
import JobFilters from '../components/jobs/JobFilters';
import JobList from '../components/jobs/JobList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectJobsLoading);
  const error = useSelector(selectJobsError);
  const hasMore = useSelector(selectHasMore);
  const reduxJobs = useSelector(state => state.jobs.jobs);
  
  // Local state for original and filtered jobs
  const [originalJobs, setOriginalJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Debounce search term
  const debouncedSearch = useDebounce(filters.search, 300);

  // Fetch initial jobs when component mounts
  useEffect(() => {
    dispatch(fetchJobs({ page: 1 }));
  }, [dispatch]);

  // Get jobs from Redux store and update local state
  useEffect(() => {
    if (reduxJobs && reduxJobs.length > 0) {
      setOriginalJobs(reduxJobs);
    }
  }, [reduxJobs]);

  // Apply filters locally when they change
  useEffect(() => {
    if (originalJobs.length === 0) return;

    let filtered = [...originalJobs];

    // Apply search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower)
        //  || (ob.company_name || job.company || '').toLowerCase().includes(searchLower) ||
        // job.description.toLowerCase().includes(searchLower) ||
        // (job.tags || []).some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply remote filter
    if (filters.remote !== 'all') {
      filtered = filtered.filter(job => job.remote === filters.remote);
    }

    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(job => 
        (job.location || '').toLowerCase().includes(locationLower)
      );
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(job => 
        filters.tags.some(tag => (job.tags || []).includes(tag))
      );
    }

    // Apply job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job => {
        const jobType = job.job_type || job.job_types?.[0];
        return jobType === filters.jobType;
      });
    }

    setFilteredJobs(filtered);
  }, [originalJobs, debouncedSearch, filters.remote, filters.location, filters.tags, filters.jobType]);

  // Load more jobs
  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchJobs({ 
        page: Math.ceil(originalJobs.length / 20) + 1
      }));
    }
  }, [loading, hasMore, originalJobs.length, dispatch]);

  // Handle filters change
  const handleFiltersChange = useCallback(() => {
    // No need to call API - filtering is done locally
    // The useEffect above will handle the filtering automatically
  }, []);

  // Handle job details view
  const handleViewJobDetails = useCallback((job) => {
    // Navigate to job details page with job data
    const jobId = job.slug || job.id;
    navigate(`/job/${jobId}`, { 
      state: { jobData: job }
    });
  }, [navigate]);

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <Typography variant="body1">
            {error}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()} 
            sx={{ mt: 1 }}
          >
            Retry
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          Find Your Next Opportunity
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover thousands of job opportunities with all the information you need. Its your future.
        </Typography>
      </Box>

      {/* Filters */}
      <JobFilters originalJobs={originalJobs} />

      {/* Job List */}
      <JobList
        jobs={filteredJobs}
        loading={loading}
        error={error}
        onViewDetails={handleViewJobDetails}
      />

      {/* Load More Button */}
      {hasMore && filteredJobs.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{ minWidth: 200 }}
          >
            {loading ? <LoadingSpinner size={20} /> : 'Load More Jobs'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
