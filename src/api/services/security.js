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
     * @returns boolean
     */
    isConnected (req, res, next) {
        debug(req.headers);

        if (req.headers?.authorization) {
            const token = req.headers?.authorization.split(' ')[1];

            if (securityService.checkToken(token)) {
                req.isConnected = true;
            }
            else {
                req.isConnected = false;
            }
        }

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

    /**
     * @summary Vérification de la propriété
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns boolean
     */
    isOwner (req, res, next) {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = securityService.checkToken(token);

        if (Number(id) === decoded.id) {
            req.isOwner = true;
        }
        else {
            req.isOwner = false;
        }
        next();
    },
};

module.exports = securityService;
