import axios from 'axios';
import {
    POST_FORM,
} from './types';

export const getPosts = () => dispatch => {
    axios.post('/api/form/posts')
        .then(res => res.data)
        .then(posts => dispatch({
            type: POST_FORM,
            payload: posts
        }));
};