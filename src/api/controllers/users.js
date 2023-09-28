// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/dataMapper');
const bcrypt = require('bcrypt');
const securityService = require('../services/security');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const usersController = {
    /**
     * Add a user in DB
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    signUp: async (req, res, next) => {
        const newUser = req.body;

        debug('body', req.body);

        // Password hash
        newUser.hash = await bcrypt.hash(newUser.password, Number(process.env.SALT));
        delete req.body.password;

        debug('body', req.body);

        // Add user to DB
        const { error, user } = await dataMapper.signUp(newUser);

        if (error) {
            next(error);
        }
        else {
            const token = securityService.getToken(user);
            const response = { ...user, token, 'logged': true };

            // Enregistre l'user comme connecté avec son token.
            if (!req.session.users) {
                req.session.users = {};
            }
            req.session.users[user.id] = token;

            res.json(response);
        }
    },
    /**
     * Authenticating a user
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    signIn: async (req, res, next) => {
        const { password, email } = req.body;
        const { error, user } = await dataMapper.signIn({ email });

        if (error) {
            next(error);
        }
        else {
            const isPasswordOk = await bcrypt.compare(password, user.hash);

            if (isPasswordOk) {
                delete user.hash;

                const token = securityService.getToken(user);

                /*
                 * Le token pourra être déchifré avec :
                 * const jwt = require('jsonwebtoken');
                 * debug(jwt.verify(token, process.env.JWT_SECRET));
                 */

                const response = { ...user, token, 'logged': true };

                // Enregistre l'user comme connecté avec son token.
                if (!req.session.users) {
                    req.session.users = {};
                }
                req.session.users[user.id] = token;
                debug(req.session.users);

                res.json(response);
            }
            else {
                // Mot de passe incorrect
                const error = new APIError('Incorrect password', 403);

                next(error);
            }
        }
    },
    creators: async (req, res, next) => {
        const { error, creators } = await dataMapper.getCreators();

        if (error) {
            next(error);
        }
        else {
            res.json(creators);
        }
    },

    getUserById: async (req, res, next) => {
        const { id } = req.params;
        const { error, user } = await dataMapper.getUserById(id);

        if (error) {
            next(error);
        }
        else {
            res.json(user);
        }
    },

    update: async (req, res, next) => {
        const { id } = req.params;
        const { error, user } = await dataMapper.updateUser({ id, ...req.body });

        if (error) {
            next(error);
        }
        else {
            res.json(user);
        }
    },
};

module.exports = usersController;
