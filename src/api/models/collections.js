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

    async read ( id ) {
        const queryCollection= 'select * from get_collection($1);';
        const queryArtworks = 'select * from get_collection_artworks($1);';
        const values = [id];
        let collection, error;

        try {
            const response = await client.query(queryCollection, values);

            collection = response.rows[0].get_collection;

            if (!collection) {
                error = new APIError('Informations erronnées', 403);
            }
            const artworks = await client.query(queryArtworks, values);

            collection.artworks = artworks.rows;
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }
        debug(collection);

        return {error, collection};
    },

    async getOwner (id) {
        const sqlQuery = `
        select * from get_collection_owner($1)
        ;`;
        const values = [id];
        let error, ownerId;

        try {
            const response = await client.query(sqlQuery, values);

            ownerId = response.rows[0].get_collection_owner;

            if (!ownerId) {
                error = new APIError("Can't define owner", 400);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, ownerId };
    },

    async update (newInfos) {
        const sqlQuery = `
        select * from update_collection($1)
        ;`;
        const values = [newInfos];
        let error, collection;

        try {
            const response = await client.query(sqlQuery, values);

            collection = response.rows[0];

            if (!collection) {
                error = new APIError('Bad Request', 400);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, collection };
    },

    async delete (id) {
        const sqlQuery = `
        select * from delete_collection($1)
        ;`;
        const values = [id];
        let error, result;

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0].delete_collection;

            debug(response);
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
