'use strict';

const client = require('../services/pgClient');
const APIError = require('../services/APIError');
const debug = require('debug')('datamapper');

const dataMapper = {
    /**
     * Récupération d'un utilisateur via son email
     * @param {object} loginInformations
     * @returns
     */
    async getUserByEmail(loginInformations) {
        const sqlQuery = `
        select * from get_user_by_email($1)
        ;`;

        const values = [loginInformations.email];
        let result;
        let error;

        debug(sqlQuery, values);

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0];

            debug(result);
            if (!result) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, result};
    },
    /**
     * Ajout d'un utilisateur à la base de données
     * @param {object} user
     * @returns
     */
    async signUp (user) {
        const sqlQuery = `
        select * from insert_user($1)
        ;`;
        const values = [user];
        let result;
        let error;

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0];

            debug(result);
            if (!result) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, result};
    },
};

module.exports = dataMapper;
