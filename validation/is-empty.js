// The below function was created in order to minimize the use of libraries.  Otherwise the Lodash library would help with validation.
// is Empty checks if the input fields is an empty.

const isEmpty = (value) =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;