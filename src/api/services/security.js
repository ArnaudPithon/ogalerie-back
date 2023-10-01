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
            const error = new APIError('You must be connected', 401);

            next(error);
        }
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
     * @param {*} res
     * @param {*} next
     */
    checkToken (req, res, next) {
        try {
            const { id } = req.params;
            const token = req.headers.authorization.split(' ')[1];

            // Je vérifie qu'il ne s'agit pas d'un token enregistré lors
            // d'une précédente session.
            // Si le serveur a redémarré, je veux que l'utilisateur se
            // reconnecte.
            if (req.session.users[id] !== token) {
                throw {message: 'Bad token'};
            }

            debug('HEADERS : ', req.headers);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            debug('DECODED : ', decoded);
            next();
        }
        catch (err) {
            const error = new APIError(err.message, 403);

            next(error);
        }
    },
};

module.exports = securityService;
