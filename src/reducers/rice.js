import {
  POST_RICE_REQUEST,
  POST_RICE_SUCCESS,
  POST_RICE_FAILURE,
  SHOW_RICE_REQUEST,
  SHOW_RICE_SUCCESS,
  SHOW_RICE_FAILURE,
  LIST_RICE_REQUEST,
  LIST_RICE_SUCCESS,
  LIST_RICE_FAILURE,
} from '../actions/rice';

const initialState = {
  isFetching: false,
  errors: [],
  detail: {},
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case POST_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: state.list.concat(action.submitted),
      };
    case SHOW_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHOW_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        detail: action.detail,
      };
    case LIST_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
        list: [],
      };
    case LIST_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.list,
      };
    case POST_RICE_FAILURE:
    case SHOW_RICE_FAILURE:
    case LIST_RICE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}
