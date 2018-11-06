import axios from 'axios';
import {
    POST_FORM,
    SEND_POST,
    GET_ERRORS,
    DELETE_POST,
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


export function deletePost(id) {
    return dispatch => {
        return axios.post('/api/form/delete/post', id)
            .then(res => res.data)
            .then(res => dispatch({
                type: DELETE_POST,
                payload: res
            }))
            .catch(err => {
                console.error(err)
            });
    }
};