import initialState from './initialState';
import { SET_USERNAME } from '../constants/headerConstants';

const header = (state = initialState.header, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_USERNAME:
      newState.username = action.payload;
      return { ...newState };
    default:
      return state;
  }
};
export default header;
