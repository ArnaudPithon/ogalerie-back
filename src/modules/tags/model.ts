import client from '@/interfaces/db/pgClient.js';
import APIError from '@/infrastructure/shared/APIError.js';
import type { TTags } from './types.js';
import type { Artwork } from '@/types/artwork.js';

const dataMapper = {
  async read(id: number) {
    const sqlQuery = 'select * from get_tag($1)';
    const values = [id];
    let artworks, error;

    try {
      const response = await client.query(sqlQuery, values);

      artworks = response.rows.map((e: { get_tag: Artwork }) => e.get_tag);

      if (!artworks) {
        error = new APIError('error', 404);
      }
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }

    return { error, artworks };
  },

  async getTags() {
    const sqlQuery = 'select * from get_tags()';
    let tags: TTags | undefined, error: Error | undefined;

    try {
      const response = await client.query(sqlQuery);

      const result = response.rows;

      if (!result) {
        error = new APIError('error', 404);
      }

      const typeTags = result.filter((t: { category: string }) => t.category === 'type');
      const supportTags = result.filter((t: { category: string }) => t.category === 'support');
      const styleTags = result.filter((t: { category: string }) => t.category === 'style');

      tags = { style: styleTags, support: supportTags, type: typeTags };
    } catch (err) {
      error = new APIError('Error server', 500, err as Error);
    }

    return { error, tags };
  },
};

export default dataMapper;
