import initialState from './initialState';
import { SET_USERNAME } from '../constants/headerConstants';

const header = (state = initialState.username, action) => {
  let newState;
  switch (action.type) {
    case SET_USERNAME:
      newState = action.payload.username;
      return newState;
    default:
      return state;
  }
};
export default header;
