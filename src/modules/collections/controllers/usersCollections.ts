import {
  Body,
  Controller,
  Middlewares,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';

import dataMapper from '../model.js';
import APIError from '../../../infrastructure/shared/APIError.js';
import { assert } from '@/infrastructure/shared/utils.js';
import { securityService } from '@/modules/auth/security.js';
import { validateNumericId } from '@/modules/users/validator.js';

@Route('v2/users')
@Tags('Collections')
export class UserCollectionsController extends Controller {
  /**
   * Create a new collection for a specific owner
   * @summary Create a new collection
   * @abstract ypee kai
   * @param {number} id - The ID of the owner
   * @param {string} title - The collection data to be created
   * @returns {Promise<Collection>} - A promise that resolves to the created collection
   */
  @Post('{id}/collections')
  @Middlewares(validateNumericId)
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkIdentity)
  @SuccessResponse('201', 'Created')
  @Response<APIError>(403, 'Forbidden')
  public async create(@Path() id: number, @Body() title: string)
    : Promise<{ id: number; title: string; ownerId: number }> {
    const { error, collection } = await dataMapper.create({ ownerId: Number(id), title });

    if (error) throw error;
    assert(collection, 'Collection not created');

    this.setStatus(201); // Set HTTP status to 201 - Created

    return collection;
  }
}
