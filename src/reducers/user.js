import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions/user';

const initialState = {
  isFetching: false,
  username: '',
  email: '',
  about: '',
  createdAt: '',
  error: null,
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
        ...action.user,
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
