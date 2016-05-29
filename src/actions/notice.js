export const SET_NOTICE = 'SET_NOTICE';
export const CLEAR_NOTICE = 'CLEAR_NOTICE';

export function setNotice(level, message) {
  return {
    type: SET_NOTICE,
    level,
    message,
  };
}

export function clearNotice() {
  return {
    type: CLEAR_NOTICE,
  };
}
