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

        if (!req.session.users) {
            req.session.users = {};
        }
        if (req.session.users[id]) {
            const recordedToken = req.session.users[id];

            securityService.checkToken(req, recordedToken);

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
     * @param {int} id
     */
    checkToken (req, recordedToken) {
        try {
            if (!req.headers.authorization) {
                const error = new APIError('Missing token', 403);

                throw (error);
            }
            const token = req.headers.authorization.split(' ')[1];

            // Je vérifie qu'il ne s'agit pas d'un token enregistré lors
            // d'une précédente session.
            // Si le serveur a redémarré, je veux que l'utilisateur se
            // reconnecte.
            if (recordedToken !== token) {
                const error = new APIError('Bad token', 403);

                throw (error);
            }
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
