import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Bookmark, Clear } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectBookmarks } from '../features/bookmarks/bookmarksSlice';
import { clearBookmarks } from '../features/bookmarks/bookmarksSlice';
import JobList from '../components/jobs/JobList';

const BookmarksPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector(selectBookmarks);

  const handleClearBookmarks = () => {
    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
      dispatch(clearBookmarks());
    }
  };

  const handleViewJobDetails = (job) => {
    // Navigate to job details page with job data
    const jobId = job.slug || job.id;
    navigate(`/job/${jobId}`, { 
      state: { jobData: job }
    });
  };

  const handleBrowseJobs = () => {
    navigate('/');
  };

  if (bookmarks.length === 0) {
    return (
      <Box>
        {/* Page Header */}
        <Box mb={3}>
          <Typography variant="h4" gutterBottom>
            My Bookmarks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Save interesting jobs to view them later.
          </Typography>
        </Box>

        {/* Empty State */}
        <Paper
          elevation={1}
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: 'background.default',
          }}
        >
          <Bookmark
            sx={{
              fontSize: 64,
              color: 'text.secondary',
              mb: 2,
            }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No bookmarks yet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Start browsing jobs and bookmark the ones that interest you.
          </Typography>
          <Button
            variant="contained"
            onClick={handleBrowseJobs}
          >
            Browse Jobs
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            My Bookmarks
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {bookmarks.length} saved job{bookmarks.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<Clear />}
          onClick={handleClearBookmarks}
          color="error"
        >
          Clear All
        </Button>
      </Box>

      {/* Bookmarks List */}
      <JobList
        jobs={bookmarks}
        loading={false}
        error={null}
        onViewDetails={handleViewJobDetails}
        showSkeletons={false}
      />
    </Box>
  );
};

export default BookmarksPage;
