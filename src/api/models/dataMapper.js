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

        const values = [loginInformations];
        let user;
        let error;

        try {
            const response = await client.query(sqlQuery, values);

            user = response.rows[0].get_user_by_email;

            debug(user);
            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },

    /**
     * Récupération des infos de connection d'un utilisateur
     * @param {object} loginInformations
     * @returns
     */
    async signIn (loginInformations) {
        const sqlQuery = `
        select * from sign_in($1)
        ;`;

        const values = [loginInformations];
        let user;
        let error;

        try {
            const response = await client.query(sqlQuery, values);

            user = response.rows[0].sign_in;

            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },

    /**
     * Ajout d'un utilisateur à la base de données
     * @param {object} user
     * @returns
     */
    async signUp (signInformations) {
        const sqlQuery = `
        select * from insert_user($1)
        ;`;
        const values = [signInformations];
        let user;
        let error;

        try {
            const response = await client.query(sqlQuery, values);

            user = response.rows[0].insert_user;

            debug(user);
            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },

    /**
     * Récupère la liste des utilisateurs en fonction de leur rôle
     */
    async getUsers (role) {
        const sqlQuery = `
        select * from get_users($1)
        ;`;
        const values = [role];
        let error;
        let users;

        try {
            const response = await client.query(sqlQuery, values);

            users = response.rows.map(e => {
                return e.get_users;
            });

            debug(users);
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, users };
    },

    async getUserById (id) {
        const sqlQuery = `
        select * from get_user_by_id($1)
        ;`;
        const values = [id];
        let error;
        let user;

        try {
            const response = await client.query(sqlQuery, values);

            user = response.rows[0].get_user_by_id;

            debug(user);
            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },

    async updateUser (newInfos) {
        const sqlQuery = `
        select * from update_person($1)
        ;`;
        const values = [newInfos];
        let error;
        let user;

        try {
            const response = await client.query(sqlQuery, values);

            user = response.rows[0];

            // TODO: ce serait mieux de ne pas le remonter
            // alors autant ne pas le faire suivre.
            delete user.hash;

            debug(user);
            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },

    async delete (id) {
        const sqlQuery = `
        select * from delete_person($1)
        ;`;
        const values = [id];
        let error;
        let result;

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0].delete_person;

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
