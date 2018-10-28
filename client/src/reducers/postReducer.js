import {
    POST_FORM,
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
        default: 
            return state
        }
}