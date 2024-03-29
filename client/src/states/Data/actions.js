// action types
export const FETCH_CITIES_REQUEST = 'FETCH_CITIES_REQUEST';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';

export const FETCH_EVENT_TYPES_REQUEST = 'FETCH_EVENT_TYPES_REQUEST';
export const FETCH_EVENT_TYPES_SUCCESS = 'FETCH_EVENT_TYPES_SUCCESS';
export const FETCH_EVENT_TYPES_FAILURE = 'FETCH_EVENT_TYPES_FAILURE';

export const FETCH_VENDOR_TYPES_REQUEST = 'FETCH_VENDOR_TYPES_REQUEST';
export const FETCH_VENDOR_TYPES_SUCCESS = 'FETCH_VENDOR_TYPES_SUCCESS';
export const FETCH_VENDOR_TYPES_FAILURE = 'FETCH_VENDOR_TYPES_FAILURE';

// action creators
// CITIES
const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST
});

const fetchCitiesSuccess = (data) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: data
});

const fetchCitiesFailure = (error) => ({
  type: FETCH_CITIES_FAILURE,
  payload: error
});

// EVENT TYPES
const fetchEventTypesRequest = () => ({
  type: FETCH_EVENT_TYPES_REQUEST
});

const fetchEventTypesSuccess = (data) => ({
  type: FETCH_EVENT_TYPES_SUCCESS,
  payload: data
});

const fetchEventTypesFailure = (error) => ({
  type: FETCH_EVENT_TYPES_FAILURE,
  payload: error
});

// VENDOR TYPES
const fetchVendorTypesRequest = () => ({
  type: FETCH_VENDOR_TYPES_REQUEST
});

const fetchVendorTypesSuccess = (data) => ({
  type: FETCH_VENDOR_TYPES_SUCCESS,
  payload: data
});

const fetchVendorTypesFailure = (error) => ({
  type: FETCH_VENDOR_TYPES_FAILURE,
  payload: error
});

export { 
    fetchCitiesRequest,
    fetchCitiesSuccess,
    fetchCitiesFailure,
    fetchEventTypesRequest,
    fetchEventTypesSuccess,
    fetchEventTypesFailure,
    fetchVendorTypesRequest,
    fetchVendorTypesSuccess,
    fetchVendorTypesFailure,
};