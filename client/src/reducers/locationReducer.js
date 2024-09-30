// src/reducers/locationReducer.js
const initialState = {
    locations: [],
    error: null,
};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LOCATIONS_SUCCESS":
            return { ...state, locations: action.payload, error: null };
        case "CREATE_LOCATION_SUCCESS":
            return {
                ...state,
                locations: [...state.locations, action.payload],
                error: null,
            };
        case "UPDATE_LOCATION_SUCCESS":
            return {
                ...state,
                locations: state.locations.map((loc) =>
                    loc._id === action.payload._id ? action.payload : loc
                ),
                error: null,
            };
        case "DELETE_LOCATION_SUCCESS":
            return {
                ...state,
                locations: state.locations.filter(
                    (loc) => loc._id !== action.payload
                ),
                error: null,
            };
        case "GET_LOCATIONS_FAIL":
        case "CREATE_LOCATION_FAIL":
        case "UPDATE_LOCATION_FAIL":
        case "DELETE_LOCATION_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default locationReducer;
