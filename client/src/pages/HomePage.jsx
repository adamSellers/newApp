// src/pages/HomePage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.username}!
        </Typography>
        <Button variant="contained" color="primary" onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
