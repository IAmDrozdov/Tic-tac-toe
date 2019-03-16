import { combineReducers } from 'redux';
import header from './headerReducer';

const rootReducer = combineReducers({
  header
});

export default rootReducer;