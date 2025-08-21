import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  WorkOutline,
  Schedule,
  OpenInNew,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, clearCurrentJob } from '../features/jobs/jobsSlice';
import { toggleBookmark } from '../features/bookmarks/bookmarksSlice';
import { selectCurrentJob, selectJobsLoading, selectJobsError } from '../features/jobs/jobsSelectors';
import { selectIsBookmarked } from '../features/bookmarks/bookmarksSlice';
import { formatDate } from '../utils/formatDate';
import { parseHTML } from '../utils/parseHTML';
import LoadingSpinner from '../components/common/LoadingSpinner';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get job data from navigation state or Redux store
  const jobFromState = location.state?.jobData;
  const jobFromRedux = useSelector(selectCurrentJob);
  const loading = useSelector(selectJobsLoading);
  const error = useSelector(selectJobsError);
  
  // Use job data from navigation state first, then from Redux
  const job = jobFromState || jobFromRedux;
  
  // Handle both mock and real API data structures
  const jobId = job?.slug || job?.id || id; // Prioritize slug for real API
  const isBookmarked = useSelector(state => selectIsBookmarked(state, jobId));

  useEffect(() => {
    // Only fetch job if we don't have it from navigation state
    if (!jobFromState && id) {
      dispatch(fetchJobById(id));
    }

    return () => {
      // Only clear current job if we fetched it
      if (!jobFromState) {
        dispatch(clearCurrentJob());
      }
    };
  }, [id, dispatch, jobFromState]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBookmarkToggle = () => {
    if (job) {
      const jobData = {
        id: jobId, // This will be slug for real API
        title: job.title,
        company: job.company || job.company_name,
        location: job.location,
        remote: job.remote,
        tags: job.tags || [],
        job_type: job.job_type || job.job_types?.[0],
        url: job.url,
        created_at: job.created_at,
      };
      dispatch(toggleBookmark(jobData));
    }
  };

  const handleApply = () => {
    if (job?.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Show loading only if we're fetching from API
  if (loading && !jobFromState) {
    return <LoadingSpinner message="Loading job details..." />;
  }

  if (error && !jobFromState) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <Typography variant="body1">
            {error}
          </Typography>
          <Button 
            variant="outlined" 
            onClick={handleBack} 
            sx={{ mt: 1 }}
          >
            Go Back
          </Button>
        </Alert>
      </Box>
    );
  }

  if (!job) {
    return (
      <Box p={3}>
        <Alert severity="warning">
          <Typography variant="body1">
            Job not found
          </Typography>
          <Button 
            variant="outlined" 
            onClick={handleBack} 
            sx={{ mt: 1 }}
          >
            Go Back
          </Button>
        </Alert>
      </Box>
    );
  }

  // Handle both mock and real API data structures
  const jobTitle = job.title;
  const jobCompany = job.company || job.company_name;
  const jobLocation = job.location;
  const jobRemote = job.remote;
  const jobType = job.job_type || job.job_types?.[0];
  const jobTags = job.tags || [];
  const jobDescription = job.description;
  const jobUrl = job.url;
  const jobCreatedAt = job.created_at;

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={handleBack}
          sx={{ cursor: 'pointer' }}
        >
          Jobs
        </Link>
        <Typography color="text.primary">{jobTitle}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>

      {/* Job Details */}
      <Paper elevation={2} sx={{ p: 4 }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box flex={1}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {jobTitle}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {jobCompany}
            </Typography>
          </Box>
          <Tooltip title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
            <IconButton onClick={handleBookmarkToggle} size="large">
              {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Job Info */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={1}>
            <LocationOn color="action" />
            <Typography variant="body2" color="text.secondary">
              {jobLocation || 'Location not specified'}
            </Typography>
          </Box>
          
          {jobType && (
            <Box display="flex" alignItems="center" gap={1}>
              <WorkOutline color="action" />
              <Typography variant="body2" color="text.secondary">
                {jobType}
              </Typography>
            </Box>
          )}
          
          <Box display="flex" alignItems="center" gap={1}>
            <Schedule color="action" />
            <Typography variant="body2" color="text.secondary">
              Posted {formatDate(jobCreatedAt)}
            </Typography>
          </Box>
        </Box>

        {/* Tags */}
        {jobTags && jobTags.length > 0 && (
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>
              Skills & Technologies
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {jobTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Box
            dangerouslySetInnerHTML={{
              __html: parseHTML(jobDescription),
            }}
            sx={{
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                mt: 2,
                mb: 1,
                fontWeight: 600,
              },
              '& p': {
                mb: 2,
                lineHeight: 1.6,
              },
              '& ul, & ol': {
                mb: 2,
                pl: 3,
              },
              '& li': {
                mb: 0.5,
              },
              '& a': {
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          />
        </Box>

        {/* Apply Button */}
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            size="large"
            onClick={handleApply}
            startIcon={<OpenInNew />}
            sx={{ minWidth: 200 }}
          >
            Apply for this position
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobDetailPage;
