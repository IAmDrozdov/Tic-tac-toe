const INITIAL_STATE = {
  listener: null,
  unread: []
};

const applySubscribeUnreadActivities = (state, action) => ({
  ...state,
  listener: action.listener
});

const applyAddUnreadActivity = (state, action) => ({
  ...state,
  unread: [...state.unread, action.activity]
});
const applyRemoveUnreadActivity = (state, action) => {
  const newUnread = state.unread.filter(a => a !== action.activity);
  return {
    ...state,
    unread: newUnread
  };
};

const activityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ACTIVITY_UNREAD_SUBSCRIBE': {
      return applySubscribeUnreadActivities(state, action);
    }
    case 'ACTIVITY_UNREAD_ADD': {
      return applyAddUnreadActivity(state, action);
    }
    case 'ACTIVITY_UNREAD_REMOVE': {
      return applyRemoveUnreadActivity(state, action);

    }
    default:
      return state;
  }
};

export default activityReducer;
