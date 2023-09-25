'use strict';

/**
 * My own error type
 * @typedef {object} ApiError
 * @property {string} message - Error message
 * @property {string} name - Error name
 * @property {object} infos - Additionnal informations
 */
class APIError extends Error {
    constructor (message, code, err) {
        // Parent constructor
        super(message);

        if (err) {
            this.error = err;
        }

        this.code = code;
        this.date = new Date();
    }
}

module.exports = APIError;
