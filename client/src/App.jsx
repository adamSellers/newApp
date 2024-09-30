// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/authActions';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// pages imported
import BusinessPage from './pages/BusinessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import ShiftTypesPage from './pages/ShiftTypesPage';
import RostersPage from './pages/RostersPage';
import RosterDetailsPage from './pages/RosterDetailsPage';

// common components imported
import Navbar from './components/Navbar';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const RequireAuth = ({ children }) => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar /> {/* Include Navbar */}
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/business"
          element={
            <RequireAuth>
              <BusinessPage />
            </RequireAuth>
          }
        />
        <Route
          path="/locations"
          element={
            <RequireAuth>
              <LocationsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/shift-types"
          element={
            <RequireAuth>
              <ShiftTypesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/rosters"
          element={
            <RequireAuth>
              <RostersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/rosters/:id"
          element={
            <RequireAuth>
              <RosterDetailsPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
