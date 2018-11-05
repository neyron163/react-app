import reducer from './errorReducer';
import * as types from '../actions/types';

describe('authorization reducer', () => {

  it('should return the initial state', () => {
    const state = undefined;
    const action = {}
    expect(reducer(state, action)).toEqual({});
  });

  it('should handle GET_ERRORS action', () => { 
    const state = {};
    const action = {
      type: types.GET_ERRORS,
      payload: {
        title: 'Title is empty',
        description: 'Description is empty'
      } 
    };


    expect(reducer(state, action)).toEqual({
        title: 'Title is empty',
        description: 'Description is empty'
    });


    expect(reducer(state, {
      type: types.GET_ERRORS,
      payload:{
        login: 'Login is empty',
        password: 'Password is empty'
      } 
    })).toEqual({
        login: 'Login is empty',
        password: 'Password is empty'
    });

  });

});