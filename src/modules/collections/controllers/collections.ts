import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Path,
  Patch,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';

import dataMapper from '../model.js';
import APIError from '../../../infrastructure/shared/APIError.js';
import { assert } from '@/infrastructure/shared/utils.js';
import type { Collection } from '../types.js';
import { securityService } from '@/modules/auth/security.js';
import { validateNumericId } from '@/modules/users/validator.js';

@Route('v2/collections')
@Tags('Collections')
export class CollectionsController extends Controller {
  /**
  * Get a collection by its ID
  * @summary Retrieve a collection
  * @param {number} id - The ID of the collection to retrieve
  * @returns {Promise<Collection>} The collection object
  */
  @Get('{id}')
  @Middlewares(validateNumericId)
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkOwner('collections'))
  @Response<APIError>(403, 'Forbidden')
  @Response<APIError>(404, 'Collection not found')
  public async read(@Path() id: number): Promise<Collection> {
    const { error, collection } = await dataMapper.read(Number(id));

    if (error) throw error;

    return collection;
  }

  /**
  * Update a specific collection
  * @summary Update a collection
  * @param {number} id - The ID of the collection to be updated
  * @param {object} body - The updated collection data
  * @returns {Promise<Collection>} - A promise that resolves to the updated collection
  */
  @Patch('{id}')
  @Middlewares(validateNumericId)
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkOwner('collections'))
  @Response<APIError>(403, 'Forbidden')
  @Response<APIError>(404, 'Collection not found')
  public async patch(@Path() id: number, @Body() body: { title: string }): Promise<Collection> {
    const { error, collection } = await dataMapper.update({ id, ...body });

    if (error) throw error;
    assert(collection, `Collection with ID ${id} not updated`);

    return collection;
  }

  /**
   * Delete a specific collection
   * @summary Delete a collection
   * @param {number} id - The ID of the collection to be deleted
   */
  @Delete('{id}')
  @Middlewares(validateNumericId)
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkOwner('collections'))
  @Response<APIError>(403, 'Forbidden')
  @Response<APIError>(404, 'Collection not found')
  @SuccessResponse('204', 'No Content')
  public async delete(@Path() id: number): Promise<void> {
    const { error } = await dataMapper.delete(Number(id));

    if (error) throw error;

    this.setStatus(204); // Set HTTP status to 204 - No Content
  }
}
