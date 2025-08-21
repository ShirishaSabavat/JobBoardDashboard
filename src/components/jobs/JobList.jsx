import React, { memo } from 'react';
import { Grid, Box, Typography, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import JobCard from './JobCard';
import JobCardSkeleton from '../common/JobCardSkeleton';
import { selectJobsLoading, selectJobsError } from '../../features/jobs/jobsSelectors';
import { selectViewMode } from '../../features/filters/filtersSlice';
import { selectBookmarks } from '../../features/bookmarks/bookmarksSlice';

const JobList = memo(({ jobs, loading, error, onViewDetails, showSkeletons = true }) => {
  const viewMode = useSelector(selectViewMode);
  const isLoading = useSelector(selectJobsLoading);
  const jobsError = useSelector(selectJobsError);
  const bookmarks = useSelector(selectBookmarks);

  // Helper function to get job ID (prioritizes slug for real API)
  const getJobId = (job) => job.slug || job.id;

  // Add bookmark status to jobs
  const jobsWithBookmarks = jobs.map(job => ({
    ...job,
    isBookmarked: bookmarks.some(bookmark => bookmark.id === getJobId(job))
  }));

  // Use provided jobs or fallback to Redux state
  const displayJobs = jobsWithBookmarks;
  const displayLoading = loading !== undefined ? loading : isLoading;
  const displayError = error || jobsError;

  if (displayError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <Typography variant="body1">
            {displayError}
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (displayLoading && showSkeletons) {
    const skeletonCount = 12;
    return (
      <Grid container spacing={3}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <JobCardSkeleton variant={viewMode} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!displayJobs || displayJobs.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight={400}
        p={3}
      >
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No jobs found
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Try adjusting your search criteria or filters to find more opportunities.
        </Typography>
      </Box>
    );
  }

  if (viewMode === 'list') {
    return (
      <Box>
        {displayJobs.map((job) => (
          <JobCard
            key={getJobId(job)}
            job={job}
            variant="list"
            onViewDetails={onViewDetails}
          />
        ))}
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {displayJobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={getJobId(job)}>
          <JobCard
            job={job}
            variant="grid"
            onViewDetails={onViewDetails}
          />
        </Grid>
      ))}
    </Grid>
  );
});

JobList.displayName = 'JobList';

export default JobList;
