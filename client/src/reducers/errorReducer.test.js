import reducer from './errorReducer';
import * as types from '../actions/types';


describe('error reducer', () => {
  it(' reducer for GET_ERRORS ', () => {
    let state = {
      error: {
        errors: 'errors'
      }
    }
    state = reducer(state, types.GET_ERRORS)
    expect(state).toEqual({
      error: {
        errors: 'errors'
      }
    })
  })
})