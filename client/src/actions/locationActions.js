// src/actions/locationActions.js
import axios from "../axiosInstance";

// Get all locations
export const getLocations = () => async (dispatch) => {
    try {
        const res = await axios.get("/locations");
        dispatch({
            type: "GET_LOCATIONS_SUCCESS",
            payload: res.data.locations,
        });
    } catch (err) {
        dispatch({
            type: "GET_LOCATIONS_FAIL",
            payload: err.response?.data?.msg || "Failed to get locations",
        });
    }
};

// Create a new location
export const createLocation = (locationData) => async (dispatch) => {
    try {
        const res = await axios.post("/locations", locationData);
        dispatch({
            type: "CREATE_LOCATION_SUCCESS",
            payload: res.data.location,
        });
    } catch (err) {
        dispatch({
            type: "CREATE_LOCATION_FAIL",
            payload: err.response?.data?.msg || "Failed to create location",
        });
    }
};

// Update a location
export const updateLocation = (id, locationData) => async (dispatch) => {
    try {
        const res = await axios.put(`/locations/${id}`, locationData);
        dispatch({
            type: "UPDATE_LOCATION_SUCCESS",
            payload: res.data.location,
        });
    } catch (err) {
        dispatch({
            type: "UPDATE_LOCATION_FAIL",
            payload: err.response?.data?.msg || "Failed to update location",
        });
    }
};

// Delete a location
export const deleteLocation = (id) => async (dispatch) => {
    try {
        await axios.delete(`/locations/${id}`);
        dispatch({ type: "DELETE_LOCATION_SUCCESS", payload: id });
    } catch (err) {
        dispatch({
            type: "DELETE_LOCATION_FAIL",
            payload: err.response?.data?.msg || "Failed to delete location",
        });
    }
};
