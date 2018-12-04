const Validator = require('validator');
const isEmpty = require('./is-empty');

// Use Validator to validate email, use isEmpty to convert email and password into empty strings
// using ternary, since Validator's isEmpty only checks for empty strings, and not null, undefined
// or empty objects.
module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}