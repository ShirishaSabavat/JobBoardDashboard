import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Work,
  Bookmark,
  Menu,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookmarkCount } from '../../features/bookmarks/bookmarksSlice';

const Navbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const bookmarkCount = useSelector(selectBookmarkCount);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo/Brand */}
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          <Work sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Job Board
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Links */}
        {!isMobile && (
          <Box display="flex" gap={2}>
            <Button
              color="inherit"
              onClick={() => handleNavigation('/')}
              sx={{
                fontWeight: isActive('/') ? 600 : 400,
                borderBottom: isActive('/') ? '2px solid white' : 'none',
              }}
            >
              Jobs
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation('/bookmarks')}
              sx={{
                fontWeight: isActive('/bookmarks') ? 600 : 400,
                borderBottom: isActive('/bookmarks') ? '2px solid white' : 'none',
              }}
            >
              Bookmarks
            </Button>
          </Box>
        )}

        {/* Bookmark Counter */}
        <Box display="flex" alignItems="center" ml={2}>
          <IconButton
            color="inherit"
            onClick={() => handleNavigation('/bookmarks')}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={bookmarkCount} color="secondary">
              <Bookmark />
            </Badge>
          </IconButton>
        </Box>

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={onMenuClick}
            sx={{ ml: 1 }}
          >
            <Menu />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
