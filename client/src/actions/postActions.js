import axios from 'axios';
import {
    POST_FORM,
    SEND_POST,
    GET_ERRORS,
} from './types';

export function getPosts() {
    return dispatch => {
        return axios.get('/api/form/posts')
        .then(res => res.data)
        .then(posts => dispatch({
            type: POST_FORM,
            payload: posts
        }))
        .catch(err => {
            console.error(err)
        });
    }
};


export function sendPost(data) {
    return dispatch => {
        return axios.post('/api/form/post', data)
            .then(res => res.data)
            .then(post => dispatch({
                type: SEND_POST,
                payload: post
            }))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
    }
};
