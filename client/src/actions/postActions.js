import axios from 'axios';
import {
    POST_FORM,
    SEND_POST,
} from './types';

export const getPosts = () => dispatch => {
    axios.post('/api/form/posts')
        .then(res => res.data)
        .then(posts => dispatch({
            type: POST_FORM,
            payload: posts
        }));
};


export const sendPost = (data) => dispatch => {
    axios.post('/api/form/post', data)
        .then(res => res.data)
        .then(post => dispatch({
            type: SEND_POST,
            payload: post
        }));
};
