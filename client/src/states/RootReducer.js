import { combineReducers } from 'redux';
import { searchBoxFilterReducer } from './SearchBoxFilter';

const rootReducer = combineReducers({
  searchBoxFilter: searchBoxFilterReducer,
});

export default rootReducer;