import { SET_DATA } from "./actions";

const initialState = {
    userLocation: "",
    userDetails: {},
    userAuthStateChangeFlag: false,
  };
  
export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
}