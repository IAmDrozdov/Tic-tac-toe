import { combineReducers } from 'redux';
import sessionReducer from './session';
import activityReducerReducer from './activity';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  activityState: activityReducerReducer
});

export default rootReducer;