// src/actions/authActions.js
import axios from "../axiosInstance";
import {
    userLoaded,
    loginSuccess,
    registerSuccess,
    authError,
    loginFail,
    registerFail,
    logout,
} from "../reducers/authReducer";

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        const res = await axios.get("/auth/user");
        dispatch(userLoaded(res.data.user));
    } catch (err) {
        dispatch(authError());
    }
};

// Register User
export const register = (username, password) => async (dispatch) => {
    try {
        const res = await axios.post("/auth/register", { username, password });
        dispatch(registerSuccess(res.data.user));
    } catch (err) {
        const errorMsg = err.response?.data?.msg || "Registration failed";
        dispatch(registerFail(errorMsg));
    }
};

// Login User
export const login = (username, password) => async (dispatch) => {
    try {
        const res = await axios.post("/auth/login", { username, password });
        dispatch(loginSuccess(res.data.user));
    } catch (err) {
        const errorMsg = err.response?.data?.msg || "Login failed";
        dispatch(loginFail(errorMsg));
    }
};

// Logout
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.post("/auth/logout");
        dispatch(logout());
    } catch (err) {
        console.error("Logout failed:", err);
    }
};
