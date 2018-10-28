const isEmpty = require('../is-empty');
const Validator = require('validator');

module.exports = function validatePost(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(isEmpty(data.title)) {
        errors.title = 'Title is empty';
    }

    if(isEmpty(data.description)) {
        errors.description = 'Description is empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}