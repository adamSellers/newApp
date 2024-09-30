// src/pages/BusinessPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBusiness, createBusiness, updateBusiness } from '../actions/businessActions';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const BusinessPage = () => {
  const dispatch = useDispatch();
  const { business, error } = useSelector((state) => state.business);

  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getBusiness());
  }, [dispatch]);

  useEffect(() => {
    if (business) {
      setName(business.name);
    }
  }, [business]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (business) {
      dispatch(updateBusiness(name));
    } else {
      dispatch(createBusiness(name));
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          {business ? 'Update Business Information' : 'Create Your Business'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Business Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {business ? 'Update Business' : 'Create Business'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BusinessPage;
