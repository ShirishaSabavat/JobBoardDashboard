import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Typography,
  Autocomplete,
  Divider,
} from '@mui/material';
import {
  Search,
  Clear,
  FilterList,
  ViewList,
  ViewModule,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  setRemote,
  setLocation,
  setTags,
  setJobType,
  setViewMode,
  clearFilters,
  selectFilters,
} from '../../features/filters/filtersSlice';
import { fetchJobs, clearJobs } from '../../features/jobs/jobsSlice';
import { JOB_TYPES, REMOTE_OPTIONS } from '../../utils/constants';

// Common tags that might appear in job listings
const COMMON_TAGS = [
  'React', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'C#',
  'Node.js', 'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'Rust',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch',
  'Machine Learning', 'AI', 'Data Science', 'DevOps', 'Frontend',
  'Backend', 'Full Stack', 'Mobile', 'iOS', 'Android', 'Flutter',
  'React Native', 'UX Design', 'UI Design', 'Product Management',
  'Agile', 'Scrum', 'Testing', 'QA', 'Security', 'Blockchain'
];

const JobFilters = ({ onFiltersChange, originalJobs = [] }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [availableTags, setAvailableTags] = useState(COMMON_TAGS);

  // Extract unique tags from original jobs data
  useEffect(() => {
    if (originalJobs && originalJobs.length > 0) {
      const allTags = originalJobs.reduce((tags, job) => {
        const jobTags = job.tags || [];
        return [...tags, ...jobTags];
      }, []);
      
      const uniqueTags = [...new Set(allTags)].filter(tag => tag && tag.trim() !== '');
      setAvailableTags([...COMMON_TAGS, ...uniqueTags]);
    }
  }, [originalJobs]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        dispatch(setSearch(localSearch));
        // Call jobs API with search parameter
        dispatch(clearJobs());
        dispatch(fetchJobs({ page: 1, search: localSearch }));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, filters.search, dispatch]);

  const handleRemoteChange = (event) => {
    dispatch(setRemote(event.target.value));
  };

  const handleLocationChange = (event) => {
    dispatch(setLocation(event.target.value));
  };

  const handleTagsChange = (event, newValue) => {
    dispatch(setTags(newValue));
  };

  const handleJobTypeChange = (event) => {
    dispatch(setJobType(event.target.value));
  };

  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalSearch('');
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.remote !== 'all' ||
      filters.location ||
      filters.tags.length > 0 ||
      filters.jobType
    );
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <FilterList color="primary" />
        <Typography variant="h6">Search & Filters</Typography>
      </Box>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search jobs, companies, or keywords..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />,
          }}
          variant="outlined"
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Filters Row */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        {/* Remote Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Remote Status</InputLabel>
          <Select
            value={filters.remote}
            label="Remote Status"
            onChange={handleRemoteChange}
            size="small"
          >
            {REMOTE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Location Filter */}
        <TextField
          label="Location"
          placeholder="City, Country"
          value={filters.location}
          onChange={handleLocationChange}
          size="small"
          sx={{ minWidth: 200 }}
        />

        {/* Job Type Filter */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel sx={{marginTop: '-8px'}}>Job Type</InputLabel>
          <Select
            value={filters.jobType}
            label="Job Type"
            onChange={handleJobTypeChange}
            size="small"
          >
            <MenuItem value="">All Types</MenuItem>
            {JOB_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tags Filter */}
        <Autocomplete
          multiple
          options={availableTags}
          value={filters.tags}
          onChange={handleTagsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Select tags"
              size="small"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                size="small"
                {...getTagProps({ index })}
              />
            ))
          }
          sx={{ minWidth: 200 }}
        />
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleClearFilters}
            disabled={!hasActiveFilters()}
            size="small"
          >
            Clear Filters
          </Button>
        </Box>

        {/* View Mode Toggle */}
        <Box display="flex" gap={1}>
          <Button
            variant={filters.viewMode === 'grid' ? 'contained' : 'outlined'}
            startIcon={<ViewModule />}
            onClick={() => handleViewModeChange('grid')}
            size="small"
          >
            Grid
          </Button>
          <Button
            variant={filters.viewMode === 'list' ? 'contained' : 'outlined'}
            startIcon={<ViewList />}
            onClick={() => handleViewModeChange('list')}
            size="small"
          >
            List
          </Button>
        </Box>
      </Box>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Active Filters:
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {filters.search && (
              <Chip
                label={`Search: "${filters.search}"`}
                size="small"
                onDelete={() => {
                  setLocalSearch('');
                  dispatch(setSearch(''));
                }}
              />
            )}
            {filters.remote !== 'all' && (
              <Chip
                label={`Remote: ${REMOTE_OPTIONS.find(opt => opt.value === filters.remote)?.label}`}
                size="small"
                onDelete={() => dispatch(setRemote('all'))}
              />
            )}
            {filters.location && (
              <Chip
                label={`Location: ${filters.location}`}
                size="small"
                onDelete={() => dispatch(setLocation(''))}
              />
            )}
            {filters.jobType && (
              <Chip
                label={`Type: ${filters.jobType}`}
                size="small"
                onDelete={() => dispatch(setJobType(''))}
              />
            )}
            {filters.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => {
                  const newTags = filters.tags.filter(t => t !== tag);
                  dispatch(setTags(newTags));
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default JobFilters;
