import { xhrUpload } from '../utils/XHR';
import API_BASE from '../utils/APIBase';

export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export function uploadFile(file) {
  return async dispatch => {
    try {
      const uid = file.uid;
      const res = await xhrUpload({
        url: `${API_BASE}/api/v1/upload`,
        file,
        headers: {
          Accept: 'application/json',
        },
        onProgress: (percentage) => {
          dispatch({
            type: UPLOAD_PROGRESS,
            uid,
            percentage,
          });
        },
      });
      if (res.error) {
        throw new Error(res.error);
      }
      dispatch({
        type: UPLOAD_SUCCESS,
        uid,
        response: res.response,
      });
    } catch (err) {
      dispatch({
        type: UPLOAD_FAILURE,
        uid: file.uid,
        error: err.message || err,
      });
    }
  };
}
