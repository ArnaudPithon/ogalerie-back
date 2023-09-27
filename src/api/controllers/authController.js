'use strict';

const dataMapper = require('../models/dataMapper');
const bcrypt = require('bcrypt');
const securityService = require('../services/security');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const authController = {
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
        delete newUser.password;

        // Add user to DB
        const { error, user } = await dataMapper.signUp(newUser);

        if (error) {
            next(error);
        }
        else {
            // Record in user's session
            req.session.user = user;

            const token = securityService.getToken(user);

            res.json({ token });
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
                // Record in user's session while delete password hash
                delete user.hash;
                req.session.user = user;

                const token = securityService.getToken(user);

                /*
                 * Le token pourra être déchifré avec :
                 * const jwt = require('jsonwebtoken');
                 * debug(jwt.verify(token, process.env.JWT_SECRET));
                 */

                const response = { ...user, token, 'logged': true };

                res.json(response);
            }
            else {
                // Mot de passe incorrect
                const error = new APIError('Incorrect password', 403);

                next(error);
            }
        }
    },
};

module.exports = authController;
