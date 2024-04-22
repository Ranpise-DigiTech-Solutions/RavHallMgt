import { SET_DATA } from "./actions";

const initialState = {  
    bookingDate: "",  // yyyy/mm/dd
    bookingDay: "", // Monday, Tuesday  etc..
    startTime: "",  // HH:MM
    endTime: "",  // HH:MM
    bookingDuration: "", // HH:MM
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