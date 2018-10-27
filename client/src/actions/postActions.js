import {
    POST_FORM,
} from './types';

export const fetchPosts = () => dispatch => {
    fetch('/api/form/posts')
        .then(res => res.json())
        .then(posts => dispatch({
            type: POST_FORM,
            payload: posts
        }));
};