import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions/user';

const initialState = {
  isFetching: false,
  error: null,
  users: {}, // username: { id: 1, username: '', ... }, ...
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: {
          ...state.users,
          [action.user.username]: action.user,
        },
      };
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
