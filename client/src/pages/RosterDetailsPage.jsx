// src/pages/RosterDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRosterById } from '../actions/rosterActions';
import {
  getShiftsByRoster,
  createShift,
  updateShift,
  deleteShift,
} from '../actions/shiftActions';
import { getShiftTypes } from '../actions/shiftTypeActions';
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RosterDetailsPage = () => {
  const { id } = useParams(); // Roster ID from URL
  const dispatch = useDispatch();

  const { roster } = useSelector((state) => state.rosters);
  const { shifts, error } = useSelector((state) => state.shifts);
  const { shiftTypes } = useSelector((state) => state.shiftTypes);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [formData, setFormData] = useState({
    shiftTypeId: '',
    date: null,
    startTime: '',
    endTime: '',
    numberOfStaff: 1,
  });

  useEffect(() => {
    dispatch(getRosterById(id));
    dispatch(getShiftsByRoster(id));
    dispatch(getShiftTypes());
  }, [dispatch, id]);

  const handleOpenDialog = (shift = null) => {
    if (shift) {
      setCurrentShift(shift);
      setFormData({
        shiftTypeId: shift.shiftType._id,
        date: shift.date ? new Date(shift.date) : null,
        startTime: shift.startTime,
        endTime: shift.endTime,
        numberOfStaff: shift.numberOfStaff,
      });
    } else {
      setCurrentShift(null);
      setFormData({
        shiftTypeId: '',
        date: null,
        startTime: '',
        endTime: '',
        numberOfStaff: 1,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentShift(null);
    setFormData({
      shiftTypeId: '',
      date: null,
      startTime: '',
      endTime: '',
      numberOfStaff: 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftData = {
      rosterId: id,
      shiftTypeId: formData.shiftTypeId,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      numberOfStaff: formData.numberOfStaff,
    };
    if (currentShift) {
      dispatch(updateShift(currentShift._id, shiftData));
    } else {
      dispatch(createShift(shiftData));
    }
    handleCloseDialog();
  };

  const handleDelete = (shiftId) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      dispatch(deleteShift(shiftId));
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        {roster && (
          <>
            <Typography variant="h4" gutterBottom>
              {roster.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Location: {roster.location.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Dates: {new Date(roster.startDate).toLocaleDateString()} -{' '}
              {new Date(roster.endDate).toLocaleDateString()}
            </Typography>
          </>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
          Add New Shift
        </Button>
        <List>
          {shifts.map((shift) => (
            <ListItem
              key={shift._id}
              secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleOpenDialog(shift)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(shift._id)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`${shift.shiftType.name} on ${new Date(shift.date).toLocaleDateString()} from ${
                  shift.startTime
                } to ${shift.endTime}`}
                secondary={`Number of Staff: ${shift.numberOfStaff}`}
              />
            </ListItem>
          ))}
        </List>
        {/* Dialog for Add/Edit Shift */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentShift ? 'Edit Shift' : 'Add New Shift'}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="shift-type-label">Shift Type</InputLabel>
                <Select
                  labelId="shift-type-label"
                  value={formData.shiftTypeId}
                  label="Shift Type"
                  onChange={(e) =>
                    setFormData({ ...formData, shiftTypeId: e.target.value })
                  }
                >
                  {shiftTypes.map((st) => (
                    <MenuItem key={st._id} value={st._id}>
                      {st.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={(date) => setFormData({ ...formData, date })}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth required />
                  )}
                />
              </LocalizationProvider>
              <TextField
                margin="normal"
                fullWidth
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 minutes
                }}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 minutes
                }}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Number of Staff"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.numberOfStaff}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfStaff: e.target.value })
                }
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {currentShift ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default RosterDetailsPage;
