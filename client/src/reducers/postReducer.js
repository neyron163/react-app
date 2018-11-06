import {
    POST_FORM,
    SEND_POST,
    DELETE_POST,
} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    response: false
}

export default (state = initialState, action) => {
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
            response: action.payload,
        }
        default: 
            return state;
        }
}