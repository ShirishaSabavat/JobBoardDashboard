# Quick Setup Guide

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp env.example .env
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Project Structure

```
job-board-dashboard/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration
│   ├── app/               # Redux store setup
│   ├── components/        # Reusable UI components
│   ├── features/          # Redux slices
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Route-level components
│   ├── routes/            # App routing
│   ├── styles/            # Global styles & themes
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Root component
│   └── index.js           # Entry point
├── package.json
├── README.md
└── .gitignore
```

## Features Implemented

✅ **Job Listing & Display**
- Fetch and display jobs from Arbeitnow API
- Responsive grid/list view toggle
- Proper HTML content rendering
- Load more pagination

✅ **Search & Filter Functionality**
- Debounced search (300ms delay)
- Remote/On-site filter
- Location-based filtering
- Tag-based filtering
- Job type filtering
- Clear all filters functionality

✅ **Bookmark System**
- Add/remove bookmarks
- Persistent storage with Redux Persist
- Bookmark counter in navigation
- Dedicated bookmarks page

✅ **Job Details**
- Detailed job view
- Proper HTML description rendering
- Apply button linking to external URL
- Bookmark toggle in detail view

✅ **Technical Requirements**
- React Router for navigation
- Axios with interceptors
- Redux Toolkit for state management
- Redux Persist for data persistence
- Material-UI components
- Error boundaries
- Loading skeletons
- Responsive design

## API Integration

The application integrates with the Arbeitnow Jobs API:
- Base URL: `https://www.arbeitnow.com/api/job-board-api`
- Comprehensive error handling
- Request caching
- Loading states

## Performance Optimizations

- Debounced search to reduce API calls
- React.memo for component memoization
- Loading skeletons for better UX
- Error boundaries for graceful error handling
- Optimized re-renders
