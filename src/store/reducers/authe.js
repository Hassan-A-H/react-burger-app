import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  token: null,
  userId: null,
  authRedirectPath: '/',
};

const autheStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const autheSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId,
  });
};

const autheFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHE_START:
      return autheStart(state, action);
    case actionTypes.AUTHE_SUCCESS:
      return autheSuccess(state, action);
    case actionTypes.AUTHE_FAIL:
      return autheFail(state, action);
    case actionTypes.AUTHE_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
