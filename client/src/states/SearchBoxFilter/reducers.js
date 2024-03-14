import { SET_DATA } from "./actions";

const initialState = {
    cityName: "",
    bookingDate: null,
    clientBudget: null,
    vendorType: null 
  };
  
export default function SearchBoxFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}