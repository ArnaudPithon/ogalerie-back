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
        debug(req.url);
        debug(req.session.users);

        const { id } = req.params;
        // TODO Manque la vérification du token

        if (!req.session.users) {
            req.session.users = {};
        }
        if (req.session.users[id]) {
            next();
        }
        else {
            const error = new APIError('Vous devez être connecté', 401);

            next(error);
        }
    },

    /**
     * Token generation
     * @param {*} user
     * @returns
     */
    getToken (user) {
        return jwt.sign(user, process.env.JWT_SECRET);
    },

    /**
     * Token validation
     * @param {*} user
     * @param {*} token
     * @return {boolean}
     */
    checkToken (user, token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return user.nickname === decoded.nickname
            && user.mail === decoded.mail
            && user.role === decoded.role;
    },
};

module.exports = securityService;
