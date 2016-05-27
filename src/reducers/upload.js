import {
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from '../actions/upload';
import { SUBMIT_POST_SUCCESS } from '../actions/post';

const initialState = {
  filesByUid: {},
  progressByUid: {},
  errorsByUid: {},
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progressByUid: {
          ...state.progressByUid,
          [action.uid]: action.percentage,
        },
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        filesByUid: {
          ...state.filesByUid,
          [action.uid]: {
            name: action.response.name,
            mimetype: action.response.mimetype,
          },
        },
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        errorsByUid: {
          ...state.errorsByUid,
          [action.uid]: action.error,
        },
      };
    case SUBMIT_POST_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
