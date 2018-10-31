import reducer from './authReducer';
import * as types from '../actions/types';


describe('authorization reducer', () => {
  it('  reducer for SET_CURRENT_USER  ', () => {
    let state = {
      isAuthenticated: true,
      user: {
        'login': 'admin',
        'password': 'admin'
      }
    }
    state = reducer(state, types.SET_CURRENT_USER)
    expect(state).toEqual({
      isAuthenticated: true,
      user: {
        'login': 'admin',
        'password': 'admin'
      }
    })
  })
})