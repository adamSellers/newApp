// src/pages/RostersPage.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRosters,
  createRoster,
  updateRoster,
  deleteRoster,
} from '../actions/rosterActions';
import { getLocations } from '../actions/locationActions';
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Updated imports for date pickers
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RostersPage = () => {
  const dispatch = useDispatch();
  const { rosters, error } = useSelector((state) => state.rosters);
  const { locations } = useSelector((state) => state.locations);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentRoster, setCurrentRoster] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    locationId: '',
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    dispatch(getRosters());
    dispatch(getLocations());
  }, [dispatch]);

  const handleOpenDialog = (roster = null) => {
    if (roster) {
      setCurrentRoster(roster);
      setFormData({
        name: roster.name,
        locationId: roster.location._id,
        startDate: roster.startDate ? new Date(roster.startDate) : null,
        endDate: roster.endDate ? new Date(roster.endDate) : null,
      });
    } else {
      setCurrentRoster(null);
      setFormData({
        name: '',
        locationId: '',
        startDate: null,
        endDate: null,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRoster(null);
    setFormData({
      name: '',
      locationId: '',
      startDate: null,
      endDate: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rosterData = {
      name: formData.name,
      locationId: formData.locationId,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    if (currentRoster) {
      dispatch(updateRoster(currentRoster._id, rosterData));
    } else {
      dispatch(createRoster(rosterData));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this roster?')) {
      dispatch(deleteRoster(id));
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Manage Rosters
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
          Add New Roster
        </Button>
        <List>
          {rosters.map((roster) => (
            <ListItem
              key={roster._id}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleOpenDialog(roster)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(roster._id)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={roster.name}
                secondary={`Location: ${roster.location.name}, Dates: ${new Date(
                  roster.startDate
                ).toLocaleDateString()} - ${new Date(
                  roster.endDate
                ).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
        {/* Dialog for Add/Edit Roster */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentRoster ? 'Edit Roster' : 'Add New Roster'}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Roster Name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  value={formData.locationId}
                  label="Location"
                  onChange={(e) =>
                    setFormData({ ...formData, locationId: e.target.value })
                  }
                >
                  {locations.map((loc) => (
                    <MenuItem key={loc._id} value={loc._id}>
                      {loc.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(date) => setFormData({ ...formData, startDate: date })}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth required />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(date) => setFormData({ ...formData, endDate: date })}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {currentRoster ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default RostersPage;
