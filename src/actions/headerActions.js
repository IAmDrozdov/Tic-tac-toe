import * as types from '../constants/headerConstants';

export const setUsernameAction = (username) => ({
  type: types.SET_USERNAME,
  payload: username
});