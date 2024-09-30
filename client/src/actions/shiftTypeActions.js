// src/actions/shiftTypeActions.js
import axios from "../axiosInstance";

// Get all shift types
export const getShiftTypes = () => async (dispatch) => {
    try {
        const res = await axios.get("/shift-types");
        dispatch({
            type: "GET_SHIFT_TYPES_SUCCESS",
            payload: res.data.shiftTypes,
        });
    } catch (err) {
        dispatch({
            type: "GET_SHIFT_TYPES_FAIL",
            payload: err.response?.data?.msg || "Failed to get shift types",
        });
    }
};

// Create a new shift type
export const createShiftType = (shiftTypeData) => async (dispatch) => {
    try {
        const res = await axios.post("/shift-types", shiftTypeData);
        dispatch({
            type: "CREATE_SHIFT_TYPE_SUCCESS",
            payload: res.data.shiftType,
        });
    } catch (err) {
        dispatch({
            type: "CREATE_SHIFT_TYPE_FAIL",
            payload: err.response?.data?.msg || "Failed to create shift type",
        });
    }
};

// Update a shift type
export const updateShiftType = (id, shiftTypeData) => async (dispatch) => {
    try {
        const res = await axios.put(`/shift-types/${id}`, shiftTypeData);
        dispatch({
            type: "UPDATE_SHIFT_TYPE_SUCCESS",
            payload: res.data.shiftType,
        });
    } catch (err) {
        dispatch({
            type: "UPDATE_SHIFT_TYPE_FAIL",
            payload: err.response?.data?.msg || "Failed to update shift type",
        });
    }
};

// Delete a shift type
export const deleteShiftType = (id) => async (dispatch) => {
    try {
        await axios.delete(`/shift-types/${id}`);
        dispatch({ type: "DELETE_SHIFT_TYPE_SUCCESS", payload: id });
    } catch (err) {
        dispatch({
            type: "DELETE_SHIFT_TYPE_FAIL",
            payload: err.response?.data?.msg || "Failed to delete shift type",
        });
    }
};
