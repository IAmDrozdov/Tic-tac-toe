const INITIAL_STATE = {
  authUser: null,
  currentMatch: null
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

const applySetCurrentMatch = (state, action) => ({
  ...state,
  currentMatch: action.match
});

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return applySetAuthUser(state, action);
    }
    case 'CURRENT_MATCH_SET': {
      return applySetCurrentMatch(state, action);
    }
    default:
      return state;
  }
};

export default sessionReducer;
