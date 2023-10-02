// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const client = require('../services/pgClient');
const APIError = require('../services/APIError');
const debug = require('debug')('datamapper');

const dataMapper = {
    async create (newArtwork) {
        const sqlQuery = `
        select * from create_artwork($1)
        ;`;
        const values = [newArtwork];
        let artwork, error;

        debug(values);

        try {
            const response = await client.query(sqlQuery, values);

            artwork = response.rows[0].create_artwork;

            debug(artwork);
            if (!artwork) {
                error = new APIError('Informations erronnées', 403);
            }
        } catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, artwork};

    },
};

module.exports = dataMapper;
