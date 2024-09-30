// src/actions/shiftActions.js

import axios from "../axiosInstance";

// Get all shifts for a specific roster
export const getShiftsByRoster = (rosterId) => async (dispatch) => {
    try {
        const res = await axios.get(`/shifts/roster/${rosterId}`);
        dispatch({ type: "GET_SHIFTS_SUCCESS", payload: res.data.shifts });
    } catch (err) {
        dispatch({
            type: "GET_SHIFTS_FAIL",
            payload: err.response?.data?.msg || "Failed to get shifts",
        });
    }
};

// Create a new shift
export const createShift = (shiftData) => async (dispatch) => {
    try {
        const res = await axios.post("/shifts", shiftData);
        dispatch({ type: "CREATE_SHIFT_SUCCESS", payload: res.data.shift });
    } catch (err) {
        dispatch({
            type: "CREATE_SHIFT_FAIL",
            payload: err.response?.data?.msg || "Failed to create shift",
        });
    }
};

// Update a shift
export const updateShift = (id, shiftData) => async (dispatch) => {
    try {
        const res = await axios.put(`/shifts/${id}`, shiftData);
        dispatch({ type: "UPDATE_SHIFT_SUCCESS", payload: res.data.shift });
    } catch (err) {
        dispatch({
            type: "UPDATE_SHIFT_FAIL",
            payload: err.response?.data?.msg || "Failed to update shift",
        });
    }
};

// Delete a shift
export const deleteShift = (id) => async (dispatch) => {
    try {
        await axios.delete(`/shifts/${id}`);
        dispatch({ type: "DELETE_SHIFT_SUCCESS", payload: id });
    } catch (err) {
        dispatch({
            type: "DELETE_SHIFT_FAIL",
            payload: err.response?.data?.msg || "Failed to delete shift",
        });
    }
};
