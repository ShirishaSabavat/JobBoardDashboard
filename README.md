# Job Board Dashboard

A comprehensive Job Board Dashboard built with React.js, Redux Toolkit, and Material-UI that integrates with the Arbeitnow Jobs API.

## Features

- **Job Listing & Display**: Fetch and display jobs from Arbeitnow API with responsive grid/list view
- **Search & Filter**: Advanced filtering by remote status, location, tags, and job type
- **Bookmark System**: Save jobs for later viewing with persistent storage
- **Job Details**: Detailed job view with proper HTML rendering
- **Modern UI**: Material-UI components with consistent theming
- **Performance Optimized**: Debounced search, loading skeletons, and optimized re-renders

## Tech Stack

- **React 18** with Hooks
- **Redux Toolkit** for state management
- **Redux Persist** for data persistence
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API integration

## Project Structure

```
job-board-dashboard/
│── public/                     # Static assets
│── src/
│   │── api/                    # API configurations
│   │── app/                    # Redux store setup
│   │── assets/                 # Images and static assets
│   │── components/             # Reusable UI components
│   │── features/               # Redux slices and feature logic
│   │── hooks/                  # Custom hooks
│   │── pages/                  # Route-level components
│   │── routes/                 # App routing config
│   │── styles/                 # Global styles & themes
│   │── utils/                  # Utility functions
│   │── App.jsx                 # Root component
│   │── index.js                # Entry point
```

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-board-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_API_BASE_URL=https://www.arbeitnow.com/api/job-board-api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## API Integration

The application integrates with the Arbeitnow Jobs API:
- **Base URL**: `https://www.arbeitnow.com/api/job-board-api`
- **Features**: Job listing, search, and filtering
- **Error Handling**: Comprehensive error handling with retry options
- **Caching**: Request caching to reduce API calls

## Key Features Implementation

### Job Listing
- Responsive grid/list view toggle
- Infinite scroll pagination
- Loading skeletons for better UX
- Proper HTML content rendering

### Search & Filters
- Debounced search (300ms delay)
- Remote/On-site filter
- Location-based filtering
- Tag-based filtering
- Job type filtering
- Clear all filters functionality

### Bookmark System
- Add/remove bookmarks
- Persistent storage with Redux Persist
- Bookmark counter in navigation
- Dedicated bookmarks page

### State Management
- Redux Toolkit for global state
- Redux Persist for data persistence
- Optimized re-renders with React.memo
- Async operations with createAsyncThunk

## Performance Optimizations

- Debounced search to reduce API calls
- React.memo for component memoization
- useMemo and useCallback for expensive operations
- Loading skeletons for better perceived performance
- Error boundaries for graceful error handling

## Styling

- Material-UI components with consistent theming
- Centralized theme configuration
- Responsive design for all screen sizes
- Smooth transitions and animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License
