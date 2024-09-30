// src/reducers/authReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: null, // Change from false to null
    user: null,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoaded(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null; // Reset error
        },
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null; // Reset error
        },
        registerSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null; // Reset error
        },
        authError(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null; // Don't set an error message here
        },
        loginFail(state, action) {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload || "Login Failed";
        },
        registerFail(state, action) {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload || "Registration Failed";
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    userLoaded,
    loginSuccess,
    registerSuccess,
    authError,
    loginFail,
    registerFail,
    logout,
} = authSlice.actions;

export default authSlice.reducer;
