import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Home, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      p={3}
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <Typography variant="h1" color="text.secondary" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          You might want to check the URL or try searching for jobs instead.
        </Typography>

        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mt={4}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={handleGoHome}
            size="large"
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Search />}
            onClick={handleGoBack}
            size="large"
          >
            Go Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
