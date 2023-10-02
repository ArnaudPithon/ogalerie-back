// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const client = require('../services/pgClient');
const APIError = require('../services/APIError');
const debug = require('debug')('datamapper');

const dataMapper = {
    async create ({ title, ownerId }) {
        const newCollection = {title, ownerId};
        const sqlQuery = `
        select * from create_collection($1)
        ;`;
        const values = [newCollection];
        let collection, error;

        debug(values);

        try {
            const response = await client.query(sqlQuery, values);

            collection = response.rows[0].create_collection;

            debug(collection);
            if (!collection) {
                error = new APIError('Informations erronnées', 403);
            }
        } catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, collection};
    },



};

module.exports = dataMapper;
