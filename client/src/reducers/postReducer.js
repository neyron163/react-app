// @flow


type State = {
  items: Array<{
    _id: string,
    title: string,
    description: string,
    image: string,
    likes: number,
  }>,
  item: Object
};

type TYPE_POST = { type: POST_FORM, items: Array<{
  _id: string,
  title: string,
  description: string,
  image: string,
  likes: number,
}> };
type TYPE_SEND = { type: SEND_POST, item: Object };
type TYPE_DELETE = { type: DELETE_POST, items: Array<{
  _id: string,
  title: string,
  description: string,
  image: string,
  likes: number,
}> };

type Action = TYPE_POST | TYPE_SEND | TYPE_DELETE;


import {
    POST_FORM,
    SEND_POST,
    DELETE_POST,
} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default (state: State = initialState, action: Action) => {
    switch (action.type) {
        case POST_FORM:
        return {
            ...state,
            items: action.payload
        }
        case SEND_POST:
        return {
            ...state,
            item: action.payload,
        }
        case DELETE_POST:
        return {
            ...state,
            items: action.payload,
        }
        default: 
            return state;
        }
}