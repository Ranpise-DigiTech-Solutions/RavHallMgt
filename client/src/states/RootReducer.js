import { combineReducers } from 'redux';
import { searchBoxFilterReducer } from './SearchBoxFilter';
import { userInfoReducer } from './UserInfo';
import { dataReducer } from './Data';

const rootReducer = combineReducers({
  searchBoxFilter: searchBoxFilterReducer,
  userInfo: userInfoReducer,
  data: dataReducer,
});

export default rootReducer;