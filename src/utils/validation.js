export function validateEmail(email) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? null : 'Please use a valid email address.';
}

export function validateUsername(username) {
  if (username.length < 2 || username.length > 16) {
    return 'Username should be 2-16 characters.';
  }
  if (/[^a-zA-Z0-9_]/.test(username)) {
    return 'Username should only contain [a-zA-Z0-9_]';
  }
  return null;
}

export function validatePassword(password) {
  if (password.length < 8) {
    return 'Password is too short.';
  }
  return null;
}
