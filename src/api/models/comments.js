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

            comment = response.rows[0].post_comment;
            if (!comment) {
                error = new APIError('Fail', 403);
            }
        } catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, comment };
    },

    async getAll (id) {
        const sqlQuery = `
        select * from get_user_comments($1)
        ;`;
        const values = [id];
        let error, comments;

        try {
            const response = await client.query(sqlQuery, values);

            comments = response.rows.map(e => {
                return e.get_user_comments;
            });
            if (!comments) {
                error = new APIError('Fail', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }
        debug(comments);

        return { error, comments };
    },

    async update (newComment) {
        const sqlQuery = `
        select * from update_comment($1)
        ;`;
        const values = [newComment];
        let error, comment;

        try {
            const response = await client.query(sqlQuery, values);

            comment = response.rows[0].update_comment;
            if (!comment) {
                error = new APIError('Fail', 403);
            }
        } catch (err) {
            error = new APIError(err.message, 500, err);
        }
        debug(comment);

        return { error, comment };
    },

    async getOwner (id) {
        const sqlQuery = `
        select * from get_comment_owner($1)
        ;`;
        const values = [id];
        let error, ownerId;

        try {
            const response = await client.query(sqlQuery, values);

            ownerId = response.rows[0].get_comment_owner;

            if (!ownerId) {
                error = new APIError("Can't define owner", 400);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, ownerId };
    },

    async delete (id) {
        const sqlQuery = `
        select * from delete_comment($1)
        ;`;
        const values = [id];
        let error, result;

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0].delete_comment;

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
