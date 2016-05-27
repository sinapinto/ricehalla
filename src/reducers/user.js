import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions/user';

const initialState = {
  byId: {},
  isFetching: false,
  error: null,
};

export function showUser(state, id) {
  return state.byId[id] || {};
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_USER_SUCCESS: {
      const user = action.user;
      // let user = {};
      // for (let k in action.user) {
      //   if (k !== 'Rice') {
      //     user[k] = action.user[k];
      //   }
      // }
      return {
        ...state,
        isFetching: false,
        byId: {
          ...state.byId,
          [user.id]: user,
        },
      };
    }
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
