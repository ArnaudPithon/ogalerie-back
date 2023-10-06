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

    async getArtwork (artworkId, viewverId) {
        const queryArtwork = 'select * from get_artwork($1, $2);';
        const queryTags = 'select * from get_artwork_tags($1);';
        const queryComments = 'select * from get_artwork_comment($1);';
        const valuesArtwork = [artworkId, viewverId];
        const valuesOther = [artworkId];
        let error, artwork;

        try {
            const artworkRes = await client.query(queryArtwork, valuesArtwork);

            artwork = artworkRes.rows[0].get_artwork;

            if (!artwork) {
                error = new APIError('Artwork not found', 404);
            }

            const tagsRes = await client.query(queryTags, valuesOther);

            if (tagsRes.rowCount) {
                artwork.tags = tagsRes.rows.map(e => e.get_artwork_tags);
            }

            const commentsRes = await client.query(queryComments, valuesOther);

            if (commentsRes.rowCount) {
                artwork.comment = commentsRes.rows.map(e => e.get_artwork_comment);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }
        debug(artwork);

        return {error, artwork};
    },

    async update (newInfos) {
        const sqlQuery = `
        select * from update_artwork($1)
        ;`;
        const values = [newInfos];
        let error, artwork;

        try {
            const response = await client.query(sqlQuery, values);

            artwork = response.rows[0];

            if (!artwork) {
                error = new APIError('Bad Request', 400);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, artwork };
    },

    async delete (id) {
        const sqlQuery = `
        select * from delete_artwork($1)
        ;`;
        const values = [id];
        let error, result;

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0].delete_artwork;

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

    async getOwner (id) {
        const sqlQuery = `
        select * from get_artwork_owner($1)
        ;`;
        const values = [id];
        let error, ownerId;

        try {
            const response = await client.query(sqlQuery, values);

            ownerId = response.rows[0].get_artwork_owner;

            if (!ownerId) {
                error = new APIError("Can't define owner", 400);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, ownerId };
    },

    async setFavorite (infos) {
        const sqlQuery = `
        select * from set_user_favorite($1)
        ;`;
        const values = [infos];
        let error, result;

        try {
            const response = await client.query(sqlQuery, values);

            result = response.rows[0].set_user_favorite;

            debug(response.rows[0]);
            if (!result) {
                error = new APIError("Can't set as favorite", 400);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, result };
    },
};

module.exports = dataMapper;
