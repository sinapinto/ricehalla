import {
  UPLOAD_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
} from '../actions/upload';

const initialState = {
  fileNames: {},
  percentages: {},
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_PROGRESS:
      return {
        ...state,
        percentages: {
          ...state.percentages,
          [action.uid]: action.percentage,
        },
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        fileNames: {
          ...state.fileNames,
          [action.uid]: action.response.name,
        },
      };
    case UPLOAD_FAILURE:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.uid]: action.error,
        },
      };
    default:
      return state;
  }
}
