import { Controller, Get, Route, Path, Response, Tags } from 'tsoa';

import { assert } from '@/infrastructure/shared/utils.js';
import dataMapper from './model.js';
import type { TagsCollection } from './types.js';
import type { Artwork } from '../../types/artwork.js';

@Route('v2/tags')
@Tags('Tags')
export class TagsController extends Controller {

  /**
  * @summary Get artworks by tag ID
  * @param {number} id - The ID of the tag
  * @returns {Promise<Artwork[]>} - A promise that resolves to an array of artworks associated with the tag
  * @throws {Error} - Throws an error if the tag is not found or if there is a server error
  */
  @Get('{id}')
  @Response<Error>(404, 'Tag not found')
  public async read(@Path() id: number): Promise<Artwork[]> {
    const { error, artworks } = await dataMapper.read(Number(id));

    if (error) {
      throw error;
    }
    assert(artworks, `Tag with ID ${id} not found`);

    return artworks;
  }

  /**
  * @summary Get all tags
  * @returns {Promise<Tags>} - A promise that resolves to an object containing arrays of tags categorized by style, support, and type
  * @throws {Error} - Throws an error if no tags are found or if there is a server error
  */
  @Get()
  public async getTags(): Promise<TagsCollection> {
    const { error, tags } = await dataMapper.getTags();

    if (error) {
      throw error;
    }
    assert(tags, 'No tags found');

    return tags;
  }
}

