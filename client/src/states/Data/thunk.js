import {
    fetchCitiesRequest,
    fetchCitiesSuccess,
    fetchCitiesFailure,
    fetchEventTypesRequest,
    fetchEventTypesSuccess,
    fetchEventTypesFailure,
    fetchVendorTypesRequest,
    fetchVendorTypesSuccess,
    fetchVendorTypesFailure,
} from './index.js';
import axios from 'axios';

// thunk action creator to fetch data asynchronously
const fetchCities = async (dispatch) => {
    dispatch(fetchCitiesRequest());
    try {
        const URL = "http://localhost:8000/eventify_server/countriesNow/";

        await axios
            .get(URL)
            .then((response) => {
                dispatch(fetchCitiesSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchCitiesFailure("Error fetching cities:- ", error.message));
            });
    } catch (error) {
        dispatch(fetchCitiesFailure(error.message));
    }
};

const fetchEventTypes = async (dispatch) => {
    dispatch(fetchEventTypesRequest());
    try {
        const URL = "http://localhost:8000/eventify_server/eventMaster/";

        await axios
            .get(URL)
            .then((response) => {
                dispatch(fetchEventTypesSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchEventTypesFailure("Error fetching Event types:- ", error.message));
            });
    } catch (error) {
        dispatch(fetchEventTypesFailure(error.message));
    }
};

const fetchVendorTypes = async (dispatch) => {
    dispatch(fetchVendorTypesRequest());
    try {
        const URL = "http://localhost:8000/eventify_server/vendorMaster";

        await axios
            .get(URL)
            .then((response) => {
                dispatch(fetchVendorTypesSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchVendorTypesFailure("Error fetching Vendor types:- ", error.message));
            });
    } catch (error) {
        dispatch(fetchVendorTypesFailure(error.message));
    }
};

export {
    fetchCities,
    fetchEventTypes, 
    fetchVendorTypes,
};