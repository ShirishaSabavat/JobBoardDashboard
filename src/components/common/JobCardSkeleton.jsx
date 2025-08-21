import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const JobCardSkeleton = ({ variant = 'grid' }) => {
  if (variant === 'list') {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={20} />
            </Box>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
          
          <Box display="flex" gap={1} mb={2}>
            <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 16 }} />
            <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 16 }} />
            <Skeleton variant="rectangular" width={60} height={32} sx={{ borderRadius: 16 }} />
          </Box>
          
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="70%" height={20} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Skeleton variant="text" width="70%" height={28} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
        
        <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={18} sx={{ mb: 2 }} />
        
        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Skeleton variant="rectangular" width={70} height={28} sx={{ borderRadius: 14 }} />
          <Skeleton variant="rectangular" width={80} height={28} sx={{ borderRadius: 14 }} />
          <Skeleton variant="rectangular" width={60} height={28} sx={{ borderRadius: 14 }} />
        </Box>
        
        <Box flex={1}>
          <Skeleton variant="text" width="100%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="90%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="80%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="60%" height={16} />
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 18 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCardSkeleton;
