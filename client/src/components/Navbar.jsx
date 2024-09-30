// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            MyApp
          </Link>
        </Typography>
        {isAuthenticated ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button color="inherit" component={Link} to="/business">
                Business
              </Button>
              <Button color="inherit" component={Link} to="/locations">
                Locations
              </Button>
              <Button color="inherit" component={Link} to="/shift-types">
                Shift Types
              </Button>
              <Button color="inherit" component={Link} to="/rosters">
                Rosters
              </Button>
              {/* Add more links as needed */}
            </Box>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hello, {user?.username}
            </Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
