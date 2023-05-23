import * as actionTypes from './actionTypes';

export const autheStart = () => {
  return {
    type: actionTypes.AUTHE_START,
  };
};

export const autheSuccess = (token, id) => {
  return {
    type: actionTypes.AUTHE_SUCCESS,
    idToken: token,
    userId: id,
  };
};

export const autheFail = (error) => {
  return {
    type: actionTypes.AUTHE_FAIL,
    error: error,
  };
};

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTHE_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTHE_LOGOUT,
  };
};

export const checkAutheTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const authe = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTHE_USER,
    email: email,
    password: password,
    isSignUp: isSignUp,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
};
