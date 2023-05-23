import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAutheTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './authe';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchedOrdersSaga } from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTHE_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAutheTimeoutSaga);
  yield takeEvery(actionTypes.AUTHE_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchedOrdersSaga);
}
