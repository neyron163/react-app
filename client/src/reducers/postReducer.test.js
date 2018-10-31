import reducer from './postReducer';
import * as types from '../actions/types';

describe('post reducer', () => {
  it('reducer for POST_FORM', () => {
    let state = {
      items: [{
          'title1': 'des1'
        },
        {
          'title2': 'des2'
        },
      ],
      item: {
        'titleNew': 'desNew'
      }
    };

    state = reducer(state, types.POST_FORM)

    expect(state).toEqual({
      items: [{
          'title1': 'des1'
        },
        {
          'title2': 'des2'
        },
      ],
      item: {
        'titleNew': 'desNew'
      }
    })
  })
})