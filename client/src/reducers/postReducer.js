import {
    POST_FORM,
    SEND_POST,
} from '../actions/types';

const initialState = {
    items: [],
    item: {}
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
                item: action.payload
            }
        default: 
            return state;
        }
}