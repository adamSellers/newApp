// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import businessReducer from "./reducers/businessReducer";
import locationReducer from "./reducers/locationReducer";
import shiftTypeReducer from "./reducers/shiftTypeReducer";
import rosterReducer from "./reducers/rosterReducer";
import shiftReducer from "./reducers/shiftReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        business: businessReducer,
        locations: locationReducer,
        shiftTypes: shiftTypeReducer,
        rosters: rosterReducer,
        shifts: shiftReducer,
        // Include other reducers as you add them
    },
});

export default store;
