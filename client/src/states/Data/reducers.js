import {
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_FAILURE,
    FETCH_EVENT_TYPES_REQUEST,
    FETCH_EVENT_TYPES_SUCCESS,
    FETCH_EVENT_TYPES_FAILURE,
    FETCH_VENDOR_TYPES_REQUEST,
    FETCH_VENDOR_TYPES_SUCCESS,
    FETCH_VENDOR_TYPES_FAILURE
} from "./actions";

// initial state
const initialState = {
    cities: {
        data: {},
        loading: false,
        error: null
    },
    eventTypes: {
        data: {},
        loading: false,
        error: null
    },
    vendorTypes: {
        data: {},
        loading: false,
        error: null
    }
};

// reducer
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITIES_REQUEST:
            return {
                ...state,
                cities: {
                    ...state.cities,
                    loading: true,
                    error: null
                }
            };
        case FETCH_CITIES_SUCCESS:
            return {
                ...state,
                cities: {
                    ...state.cities,
                    loading: false,
                    data: action.payload
                }
            };
        case FETCH_CITIES_FAILURE:
            return {
                ...state,
                cities: {
                    ...state.cities,
                    loading: false,
                    error: action.error
                }
            };
        case FETCH_EVENT_TYPES_REQUEST:
            return {
                ...state,
                eventTypes: {
                    ...state.eventTypes,
                    loading: true,
                    error: null
                }
            };
        case FETCH_EVENT_TYPES_SUCCESS:
            return {
                ...state,
                eventTypes: {
                    ...state.eventTypes,
                    loading: false,
                    data: action.payload
                }
            };
        case FETCH_EVENT_TYPES_FAILURE:
            return {
                ...state,
                eventTypes: {
                    ...state.eventTypes,
                    loading: false,
                    error: action.error
                }
            };
        case FETCH_VENDOR_TYPES_REQUEST:
            return {
                ...state,
                vendorTypes: {
                    ...state.vendorTypes,
                    loading: true,
                    error: null
                }
            };
        case FETCH_VENDOR_TYPES_SUCCESS:
            return {
                ...state,
                vendorTypes: {
                    ...state.vendorTypes,
                    loading: false,
                    data: action.payload
                }
            };
        case FETCH_VENDOR_TYPES_FAILURE:
            return {
                ...state,
                vendorTypes: {
                    ...state.vendorTypes,
                    loading: false,
                    error: action.error
                }
            };
        default:
            return state;
    }
};

export default dataReducer;