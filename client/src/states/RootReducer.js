import { combineReducers } from 'redux';
import { searchBoxFilterReducer } from './SearchBoxFilter';
import { userInfoReducer } from './UserInfo';

const rootReducer = combineReducers({
  searchBoxFilter: searchBoxFilterReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;