import axios from 'axios';

// Use the real Arbeitnow API endpoint
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://www.arbeitnow.com/api/job-board-api';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any request modifications here (e.g., auth tokens)
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      
      // Handle CORS errors specifically
      if (error.response.status === 403 && error.response.data?.includes('cors')) {
        console.error('CORS Error: The API might require authentication or the endpoint is not publicly accessible');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received - this might be a CORS issue');
    } else {
      // Something else happened
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
