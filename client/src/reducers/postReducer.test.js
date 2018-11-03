// import reducer from './postReducer';
// import * as types from '../actions/types';

// describe('post reducer', () => {
//   it('reducer for POST_FORM', () => {
//     let state = {
//       items: [{
//           'title1': 'des1'
//         },
//         {
//           'title2': 'des2'
//         },
//       ],
//       item: {
//         'titleNew': 'desNew'
//       }
//     };

//     state = reducer(state, types.POST_FORM)

//     expect(state).toEqual({
//       items: [{
//           'title1': 'des1'
//         },
//         {
//           'title2': 'des2'
//         },
//       ],
//       item: {
//         'titleNew': 'desNew'
//       }
//     })
//   })
// })



import reducer from './authReducer';
import * as types from '../actions/types';

describe('authorization reducer', () => {

  it('should return the initial state', () => {
    const state = undefined;
    const action = {};

    expect(reducer(state, action)).toEqual(
      {
        isAuthenticated: false,
        user: {}
      }
    );
  });

  it('should handle POST_FORM action', () => {
    const state = {
      items: [],
      item: {}
    };
    const action = {
      type: types.POST_FORM,
      payload: {
        items: 'array',
        item: 'object'
      } 
    };
    expect(reducer(state, action)).toEqual(
      {
        items: [],
        item: {}
      }
    )

  });

});