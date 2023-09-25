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

        // Password hash
        newUser.hash = await bcrypt.hash(newUser.password, Number(process.env.SALT));
        delete newUser.password;

        // Add user to DB
        const { error, result } = await dataMapper.signUp(newUser);

        if (error) {
            next(error);
        }
        else {
            // Record in user's session
            req.session.user = result;

            const token = securityService.getToken(result);

            debug('token', token);
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
        const { password, nickname } = req.body;

        const { error, result } = await dataMapper.getUserByNickName({ nickname });

        if (error) {
            next(error);
        }
        else {
            const isPasswordOk = await bcrypt.compare(password, result.hash);

            if (isPasswordOk) {
                // Record in user's session while delete password hash
                delete result.hash;
                req.session.user = result;

                const token = securityService.getToken(result);

                debug('token', token);
                res.json({ token });
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
