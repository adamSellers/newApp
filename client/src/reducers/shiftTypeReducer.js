// src/reducers/shiftTypeReducer.js
const initialState = {
    shiftTypes: [],
    error: null,
};

const shiftTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SHIFT_TYPES_SUCCESS":
            return { ...state, shiftTypes: action.payload, error: null };
        case "CREATE_SHIFT_TYPE_SUCCESS":
            return {
                ...state,
                shiftTypes: [...state.shiftTypes, action.payload],
                error: null,
            };
        case "UPDATE_SHIFT_TYPE_SUCCESS":
            return {
                ...state,
                shiftTypes: state.shiftTypes.map((st) =>
                    st._id === action.payload._id ? action.payload : st
                ),
                error: null,
            };
        case "DELETE_SHIFT_TYPE_SUCCESS":
            return {
                ...state,
                shiftTypes: state.shiftTypes.filter(
                    (st) => st._id !== action.payload
                ),
                error: null,
            };
        case "GET_SHIFT_TYPES_FAIL":
        case "CREATE_SHIFT_TYPE_FAIL":
        case "UPDATE_SHIFT_TYPE_FAIL":
        case "DELETE_SHIFT_TYPE_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default shiftTypeReducer;
