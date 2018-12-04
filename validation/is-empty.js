// Custom written function to check for empty values
// Created to not clutter libraries and have to use lodash

const isEmpty = (value) => (
        value === undefined || 
        value === null || 
        (typeof value === 'object' && Object.keys(value).length === 0) || 
        (typeof value === 'string' && value.trim().length === 0)
    )

module.exports = isEmpty;