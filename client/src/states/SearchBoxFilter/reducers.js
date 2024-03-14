import { SET_DATA } from "./actions";

const initialState = {
    cityName: "",
    bookingDate: "",
    clientBudget: "",
    vendorType: "" 
  };
  
export default function SearchBoxFilterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}