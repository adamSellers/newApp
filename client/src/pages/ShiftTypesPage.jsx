// src/pages/ShiftTypesPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getShiftTypes,
  createShiftType,
  updateShiftType,
  deleteShiftType,
} from '../actions/shiftTypeActions';
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

const ShiftTypesPage = () => {
  const dispatch = useDispatch();
  const { shiftTypes, error } = useSelector((state) => state.shiftTypes);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentShiftType, setCurrentShiftType] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getShiftTypes());
  }, [dispatch]);

  const handleOpenDialog = (shiftType = null) => {
    if (shiftType) {
      setCurrentShiftType(shiftType);
      setName(shiftType.name);
    } else {
      setCurrentShiftType(null);
      setName('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentShiftType(null);
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentShiftType) {
      dispatch(updateShiftType(currentShiftType._id, { name }));
    } else {
      dispatch(createShiftType({ name }));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this shift type?')) {
      dispatch(deleteShiftType(id));
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Manage Shift Types
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
          Add New Shift Type
        </Button>
        <List>
          {shiftTypes.map((shiftType) => (
            <ListItem key={shiftType._id} secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleOpenDialog(shiftType)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(shiftType._id)}>
                  <Delete />
                </IconButton>
              </>
            }>
              <ListItemText primary={shiftType.name} />
            </ListItem>
          ))}
        </List>
        {/* Dialog for Add/Edit Shift Type */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentShiftType ? 'Edit Shift Type' : 'Add New Shift Type'}</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Shift Type Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {currentShiftType ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default ShiftTypesPage;
