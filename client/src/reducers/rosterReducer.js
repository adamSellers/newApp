// src/reducers/rosterReducer.js
const initialState = {
    rosters: [],
    error: null,
};

const rosterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ROSTERS_SUCCESS":
            return { ...state, rosters: action.payload, error: null };
        case "CREATE_ROSTER_SUCCESS":
            return {
                ...state,
                rosters: [...state.rosters, action.payload],
                error: null,
            };
        case "UPDATE_ROSTER_SUCCESS":
            return {
                ...state,
                rosters: state.rosters.map((roster) =>
                    roster._id === action.payload._id ? action.payload : roster
                ),
                error: null,
            };
        case "DELETE_ROSTER_SUCCESS":
            return {
                ...state,
                rosters: state.rosters.filter(
                    (roster) => roster._id !== action.payload
                ),
                error: null,
            };
        case "GET_ROSTERS_FAIL":
        case "CREATE_ROSTER_FAIL":
        case "UPDATE_ROSTER_FAIL":
        case "DELETE_ROSTER_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default rosterReducer;
