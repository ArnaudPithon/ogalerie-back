// vim: foldlevel=1:foldnestmax=2
import debugFactory from 'debug';

import client from '@/interfaces/db/pgClient.js';
import APIError from '@/infrastructure/shared/APIError.js';
import type { UserComment } from './types.js';

const debug = debugFactory('datamapper');

const dataMapper = {
  async create(newComment: { content: string, artworkId: number, ownerId: number }) {
    const sqlQuery = `
        select * from post_comment($1)
        ;`;
    const values = [newComment];
    let error, comment;

    try {
      const response = await client.query(sqlQuery, values);

      comment = response.rows[0].post_comment;

      if (!comment) {
        error = new APIError('Fail', 400);
      }
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }

    return { error, comment };
  },

  async getAll(id: number) {
    const sqlQuery = `
        select * from get_user_comments($1)
        ;`;
    const values = [id];
    let error, comments;

    try {
      const response = await client.query(sqlQuery, values);

      comments = response.rows.map((e: UserComment) => {
        return e.get_user_comments;
      });

      if (!comments) {
        error = new APIError('Fail', 400);
      }
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }
    debug(comments);

    return { error, comments };
  },

  async update(newComment: { content: string, id: number }) {
    const sqlQuery = `
        select * from update_comment($1)
        ;`;
    const values = [newComment];
    let error, comment;

    try {
      const response = await client.query(sqlQuery, values);

      comment = response.rows[0].update_comment;

      if (!comment) {
        error = new APIError('Fail', 400);
      }
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }
    debug(comment);

    return { error, comment };
  },

  async getOwner(id: number) {
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
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }

    return { error, ownerId };
  },

  async delete(id: number) {
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
        error = new APIError('Informations erronnées', 400);
      }
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }

    return { error, result };
  },
};

export default dataMapper;
