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
        // Utilisée sur une route dynamique avec un id d'utilisateur en paramètre
        debug('url', req.url);

        securityService.checkToken(req);

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
    checkToken (req) {
        try {
            if (!req.headers.authorization) {
                const error = new APIError('Missing token', 403);

                throw (error);
            }
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET);

            return;
        }
        catch (err) {
            const error = new APIError(err.message, 403);

            throw (error);
        }
    },
};

module.exports = securityService;
