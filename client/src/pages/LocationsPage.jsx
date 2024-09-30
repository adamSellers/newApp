// src/pages/LocationsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../actions/locationActions';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const LocationsPage = () => {
  const dispatch = useDispatch();
  const { locations, error } = useSelector((state) => state.locations);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [formData, setFormData] = useState({ name: '', address: '' });

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const handleOpenDialog = (location = null) => {
    if (location) {
      setCurrentLocation(location);
      setFormData({ name: location.name, address: location.address });
    } else {
      setCurrentLocation(null);
      setFormData({ name: '', address: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentLocation(null);
    setFormData({ name: '', address: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentLocation) {
      dispatch(updateLocation(currentLocation._id, formData));
    } else {
      dispatch(createLocation(formData));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      dispatch(deleteLocation(id));
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Manage Locations
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
          Add New Location
        </Button>
        <List>
          {locations.map((location) => (
            <ListItem key={location._id} secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleOpenDialog(location)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(location._id)}>
                  <Delete />
                </IconButton>
              </>
            }>
              <ListItemText
                primary={location.name}
                secondary={location.address}
              />
            </ListItem>
          ))}
        </List>
        {/* Dialog for Add/Edit Location */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Location Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {currentLocation ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default LocationsPage;
