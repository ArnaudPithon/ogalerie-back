// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const client = require('../services/pgClient');
const APIError = require('../services/APIError');
const debug = require('debug')('datamapper');

const dataMapper = {
    async create (newComment) {
        const sqlQuery = `
        select * from post_comment($1)
        ;`;
        const values = [newComment];
        let error, comment;

        try {
            const response = await client.query(sqlQuery, values);

            debug(response.rows);
            comment = response.rows[0].post_comment;
            if (!comment) {
                error = new APIError('Fail', 403);
            }
        } catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, comment };
    },

    async getFavorites (id) {
        const sqlQuery = `
        select * from get_user_favorites($1)
        ;`;
        const values = [id];
        let error, favorites;

        try {
            const response = await client.query(sqlQuery, values);

            favorites = response.rows.map(e => {
                return e.get_user_favorites;
            });
            if (!favorites) {
                error = new APIError('informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        debug(favorites);

        return { error, favorites };
    },
};

module.exports = dataMapper;
