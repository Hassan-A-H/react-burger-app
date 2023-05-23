import reducer from './authe';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      loading: false,
      token: null,
      userId: null,
      authRedirectPath: '/',
    });
  });

  it('should return the token upon login', () => {
    expect(
      reducer(
        {
          error: null,
          loading: false,
          token: null,
          userId: null,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTHE_SUCCESS,
          idToken: 'some-token',
          userId: 'some-user-id',
        }
      )
    ).toEqual({
      error: null,
      loading: false,
      token: 'some-token',
      userId: 'some-user-id',
      authRedirectPath: '/',
    });
  });
});
