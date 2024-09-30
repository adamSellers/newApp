// src/actions/rosterActions.js
import axios from "../axiosInstance";

// Get all rosters
export const getRosters = () => async (dispatch) => {
    try {
        const res = await axios.get("/rosters");
        dispatch({ type: "GET_ROSTERS_SUCCESS", payload: res.data.rosters });
    } catch (err) {
        dispatch({
            type: "GET_ROSTERS_FAIL",
            payload: err.response?.data?.msg || "Failed to get rosters",
        });
    }
};

// Get a specific roster by ID
export const getRosterById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/rosters/${id}`);
        dispatch({ type: "GET_ROSTER_SUCCESS", payload: res.data.roster });
    } catch (err) {
        dispatch({
            type: "GET_ROSTER_FAIL",
            payload: err.response?.data?.msg || "Failed to get roster",
        });
    }
};

// Create a new roster
export const createRoster = (rosterData) => async (dispatch) => {
    try {
        const res = await axios.post("/rosters", rosterData);
        dispatch({ type: "CREATE_ROSTER_SUCCESS", payload: res.data.roster });
    } catch (err) {
        dispatch({
            type: "CREATE_ROSTER_FAIL",
            payload: err.response?.data?.msg || "Failed to create roster",
        });
    }
};

// Update a roster
export const updateRoster = (id, rosterData) => async (dispatch) => {
    try {
        const res = await axios.put(`/rosters/${id}`, rosterData);
        dispatch({ type: "UPDATE_ROSTER_SUCCESS", payload: res.data.roster });
    } catch (err) {
        dispatch({
            type: "UPDATE_ROSTER_FAIL",
            payload: err.response?.data?.msg || "Failed to update roster",
        });
    }
};

// Delete a roster
export const deleteRoster = (id) => async (dispatch) => {
    try {
        await axios.delete(`/rosters/${id}`);
        dispatch({ type: "DELETE_ROSTER_SUCCESS", payload: id });
    } catch (err) {
        dispatch({
            type: "DELETE_ROSTER_FAIL",
            payload: err.response?.data?.msg || "Failed to delete roster",
        });
    }
};
