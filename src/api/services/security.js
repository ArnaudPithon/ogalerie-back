'use strict';

const APIError = require('./APIError');
const jwt = require('jsonwebtoken');
const debug = require('debug')('service:security');

const securityService = {
    /**
     * @summary Vérification d'une session active
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    isConnected (req, res, next) {
        if (!req.headers.authorization) {
            const error = new APIError('Missing token', 403);

            next(error);
        }
        const token = req.headers.authorization.split(' ')[1];

        securityService.checkToken(token);

        next();
    },

    /**
     * Token generation
     * @param {*} user
     * @returns
     */
    getToken (user) {
        return jwt.sign(user,
            process.env.JWT_SECRET,
            {
                expiresIn: '2h',
            },
        );
    },

    /**
     * Token validation
     * @param {*} req
     * @param {int} id
     */
    checkToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            const error = new APIError(err.message, 403);

            throw (error);
        }
    },

    isOwner (ownerId, token) {
        const decoded = securityService.checkToken(token);

        return (Number(ownerId) === decoded.id);
    },
};

module.exports = securityService;
