import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAutheTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.checkAutheTimeout());
}

export function* authUserSaga(action) {
  yield put(actions.autheStart());
  const autheData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-zv2gprJ_rYgst7pnw9egm4mUId1fr60';

  if (!action.isSignUp) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-zv2gprJ_rYgst7pnw9egm4mUId1fr60';
  }

  try {
    const response = yield axios.post(url, autheData);
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(
      actions.autheSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAutheTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.autheFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      yield localStorage.getItem('expirationDate')
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.autheSuccess(token, userId));
      yield put(
        actions.checkAutheTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
