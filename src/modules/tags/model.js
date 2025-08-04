// vim: foldlevel=1:foldnestmax=2
import debugFactory from 'debug';

import client from '../../interfaces/db/pgClient.js';
import APIError from '../../shared/APIError.js';
const debug = debugFactory('datamapper');

const dataMapper = {
  async read(id) {
    const sqlQuery = 'select * from get_tag($1)';
    const values = [id];
    let tag, error;

    try {
      const response = await client.query(sqlQuery, values);

      tag = response.rows.map((e) => e.get_tag);

      if (!tag) {
        error = new APIError('error', 404);
      }
    } catch (err) {
      error = new APIError(err.message, 500, err);
    }

    return { error, tag };
  },

  async getTags() {
    const sqlQuery = 'select * from get_tags()';
    let tags, error;

    try {
      const response = await client.query(sqlQuery);

      tags = response.rows;

      if (!tags) {
        error = new APIError('error', 404);
      }
    } catch (err) {
      error = new APIError(err.message, 500, err);
    }
    debug(tags);

    return { error, tags };
  },

  async getTags2() {
    const sqlQuery = 'select * from get_tags()';
    let tags, error;

    try {
      const response = await client.query(sqlQuery);

      const result = response.rows;

      if (!result) {
        error = new APIError('error', 404);
      }

      const typeTags = result.filter((t) => t.category === 'type');
      const supportTags = result.filter((t) => t.category === 'support');
      const styleTags = result.filter((t) => t.category === 'style');

      tags = { style: styleTags, support: supportTags, type: typeTags };
    } catch (err) {
      error = new APIError(err.message, 500, err);
    }
    debug(tags);

    return { error, tags };
  },
};

export default dataMapper;
