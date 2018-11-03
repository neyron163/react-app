import reducer from './postReducer';
import * as types from '../actions/types';

describe('authorization reducer', () => {

  it('should return the initial state', () => {
    const state = undefined;
    const action = {};

    expect(reducer(state, action)).toEqual({
      items: [],
      item: {}
    });
  });

  it('should handle POST_FORM action', () => {
    const state = {
      items: [],
      item: {}
    };
    const action = {
      type: types.POST_FORM,
      payload: []
    };
    expect(reducer(state, action)).toEqual(
      {
        items: [],
        item: {}
      }
    )

  });

});