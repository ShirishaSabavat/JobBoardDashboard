import React, { memo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocationOn,
  WorkOutline,
  Bookmark,
  BookmarkBorder,
  OpenInNew,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleBookmark } from '../../features/bookmarks/bookmarksSlice';
import { selectIsBookmarked } from '../../features/bookmarks/bookmarksSlice';
import { formatDate } from '../../utils/formatDate';
import { truncateText } from '../../utils/parseHTML';

const JobCard = memo(({ job, variant = 'grid', onViewDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Handle both mock and real API data structures
  const jobId = job.slug || job.id; // Prioritize slug for real API
  const jobTitle = job.title;
  const jobCompany = job.company || job.company_name;
  const jobLocation = job.location;
  const jobRemote = job.remote;
  const jobType = job.job_type || job.job_types?.[0];
  const jobTags = job.tags || [];
  const jobDescription = job.description;
  const jobUrl = job.url;
  const jobCreatedAt = job.created_at;
  
  const isBookmarked = useSelector(state => selectIsBookmarked(state, jobId));

  const handleBookmarkToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleBookmark({
      id: jobId, // This will be slug for real API
      title: jobTitle,
      company: jobCompany,
      location: jobLocation,
      remote: jobRemote,
      tags: jobTags,
      job_type: jobType,
      url: jobUrl,
      created_at: jobCreatedAt,
    }));
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(job);
    } else {
      // Pass the job data through navigation state
      navigate(`/job/${jobId}`, { 
        state: { jobData: job }
      });
    }
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if (jobUrl) {
      window.open(jobUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getRemoteStatus = (remote) => {
    if (remote) return { label: 'Remote', color: 'success' };
    return { label: 'On-Site', color: 'default' };
  };

  const remoteStatus = getRemoteStatus(jobRemote);

  if (variant === 'list') {
    return (
      <Card 
        sx={{ 
          mb: 2, 
          cursor: 'pointer',
          '&:hover': { boxShadow: 3 }
        }}
        onClick={handleViewDetails}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {jobTitle}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {jobCompany}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {jobLocation || 'Location not specified'}
                </Typography>
              </Box>
            </Box>
            <Tooltip title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
              <IconButton onClick={handleBookmarkToggle} color="primary">
                {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Tooltip>
          </Box>

          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
            <Chip
              label={remoteStatus.label}
              color={remoteStatus.color}
              size="small"
              variant="outlined"
            />
            {jobType && (
              <Chip
                label={jobType}
                size="small"
                variant="outlined"
                icon={<WorkOutline />}
              />
            )}
            {jobTags && jobTags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" paragraph>
            {truncateText(jobDescription, 200)}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              Posted {formatDate(jobCreatedAt)}
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={handleApply}
              endIcon={<OpenInNew />}
            >
              Apply Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 }
      }}
      onClick={handleViewDetails}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            {jobTitle}
          </Typography>
          <Tooltip title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
            <IconButton onClick={handleBookmarkToggle} size="small">
              {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="body1" color="text.secondary" gutterBottom>
          {jobCompany}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {jobLocation || 'Location not specified'}
          </Typography>
        </Box>

        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Chip
            label={remoteStatus.label}
            color={remoteStatus.color}
            size="small"
            variant="outlined"
          />
          {jobType && (
            <Chip
              label={jobType}
              size="small"
              variant="outlined"
              icon={<WorkOutline />}
            />
          )}
        </Box>

        {jobTags && jobTags.length > 0 && (
          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
            {jobTags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
              />
            ))}
            {jobTags.length > 2 && (
              <Chip
                label={`+${jobTags.length - 2}`}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        )}

        <Box flex={1} mb={2}>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            {truncateText(jobDescription, 120)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
          <Typography variant="caption" color="text.secondary">
            {formatDate(jobCreatedAt)}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleApply}
            endIcon={<OpenInNew />}
          >
            Apply
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;
