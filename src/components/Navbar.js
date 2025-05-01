import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  Assignment as AssignmentIcon,
  ListAlt as ListAltIcon,
  Grade as GradeIcon,
  Analytics as AnalyticsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();

  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Define Homework', icon: <AssignmentIcon />, path: '/define-homework' },
    { text: 'Review Submissions', icon: <ListAltIcon />, path: '/review-submissions' },
    { text: 'Grade Submissions', icon: <GradeIcon />, path: '/grade-submissions' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Homework Grader
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              component={RouterLink}
              to={item.path}
              color="inherit"
              startIcon={item.icon}
            >
              {item.text}
            </Button>
          ))}
        </Box>
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 