import * as ActionTypes from '../actions/upload';

const initialState = {
  fileNames: {},
  percentages: {},
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPLOAD_START:
      return state;
    case ActionTypes.UPLOAD_PROGRESS:
      return {
        ...state,
        percentages: {
          ...state.percentages,
          [action.uid]: action.percentage,
        },
      };
    case ActionTypes.UPLOAD_SUCCESS:
      return {
        ...state,
        fileNames: {
          ...state.fileNames,
          [action.uid]: action.response.name,
        },
      };
    case ActionTypes.UPLOAD_FAILURE:
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
