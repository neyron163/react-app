// @flow

import { GET_ERRORS } from '../actions/types';


type State = Object;
  
  type TYPE_ERROR = { type: GET_ERRORS, payload: Array<{
    title: string,
    description: string,
  }> };
  
  type Action = TYPE_ERROR;


const initialState = {};

export default function(state: State = initialState, action: Action) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        default: 
            return state;
    }
}