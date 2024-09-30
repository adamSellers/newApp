// src/reducers/businessReducer.js
const initialState = {
    business: null,
    error: null,
};

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BUSINESS_SUCCESS":
        case "CREATE_BUSINESS_SUCCESS":
        case "UPDATE_BUSINESS_SUCCESS":
            return { ...state, business: action.payload, error: null };
        case "GET_BUSINESS_FAIL":
        case "CREATE_BUSINESS_FAIL":
        case "UPDATE_BUSINESS_FAIL":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default businessReducer;
