import { SET_DATA } from "./actions";

const initialState = {  
    bookingDate: "",
    bookingDay: "",
    startTime: "",
    endTime: "",
    errorInfo: "",
  };
  
export default function bookingInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}