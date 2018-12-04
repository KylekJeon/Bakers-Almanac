const Validator = require('validator');
const isEmpty = require('./is-empty');

// Use Validator to validate email, use isEmpty to convert email and password into empty strings
// using ternary, since Validator's isEmpty only checks for empty strings, and not null, undefined
// or empty objects.
module.exports = function validateEducationInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}