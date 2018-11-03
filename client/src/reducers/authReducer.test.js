import reducer from './authReducer';
import * as types from '../actions/types';

describe('authorization reducer', () => {

  it('should return the initial state', () => {
    const state = undefined;
    const action = {
      payload: {}
    };
    expect(reducer(state, {})).toEqual(
      {
        ...state,
        isAuthenticated: false,
        user: action.payload
      }
    );
  });

  it('should handle SET_CURRENT_USER action', () => {
    const state = {
      isAuthenticated: false,
      user: null
    };
    const action = {
      type: types.SET_CURRENT_USER,
      payload:{
        'login': 'admin',
        'password': 'admin'
      } 
    };
    expect(reducer(state, action)).toEqual({
      isAuthenticated: true,
      user: {
        'login': 'admin',
        'password': 'admin'
      }
    })

  });

});