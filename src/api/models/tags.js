// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const client = require('../services/pgClient');
const APIError = require('../services/APIError');
const debug = require('debug')('datamapper');

const dataMapper = {
    async read ( id ) {
        const sqlQuery = 'select * from get_tag($1)';
        const values = [id];
        let tag, error;

        try {
            const response = await client.query(sqlQuery, values);

            tag = response.rows.map(e => e.get_tag);

            if (!tag) {
                error = new APIError('error', 404);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, tag };
    },

    async getTags () {
        const sqlQuery = 'select * from get_tags()';
        let tags, error;

        try {
            const response = await client.query(sqlQuery);

            tags = response.rows;

            if (!tags) {
                error = new APIError('error', 404);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return { error, tags };
    },
};

module.exports = dataMapper;
