// src/reducers/shiftReducer.js

const initialState = {
    shifts: [],
    error: null,
};

const shiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SHIFTS_SUCCESS":
            return { ...state, shifts: action.payload, error: null };
        case "CREATE_SHIFT_SUCCESS":
            return {
                ...state,
                shifts: [...state.shifts, action.payload],
                error: null,
            };
        case "UPDATE_SHIFT_SUCCESS":
            return {
                ...state,
                shifts: state.shifts.map((shift) =>
                    shift._id === action.payload._id ? action.payload : shift
                ),
                error: null,
            };
        case "DELETE_SHIFT_SUCCESS":
            return {
                ...state,
                shifts: state.shifts.filter(
                    (shift) => shift._id !== action.payload
                ),
                error: null,
            };
        case "GET_SHIFTS_FAIL":
        case "CREATE_SHIFT_FAIL":
        case "UPDATE_SHIFT_FAIL":
        case "DELETE_SHIFT_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default shiftReducer;
