import * as types from '../constants/headerConstants';

export const setUsername = (username) => ({
  type: types.SET_USERNAME,
  payload: username
});