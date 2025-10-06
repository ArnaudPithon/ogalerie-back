import { Body, Controller, Delete, Route, Path, Put, Response, Tags, SuccessResponse, Middlewares } from 'tsoa';

import dataMapper from '../model.js';
import APIError from '../../../infrastructure/shared/APIError.js';
import { assert } from '../../../infrastructure/shared/utils.js';
import type { Comment } from '../types.js';
import { securityService } from '@/modules/auth/security.js';

@Route('v2/comments')
@Tags('Comments')
export class CommentsController extends Controller {
  /**
   * Update a specific comment
   * @summary Update a comment
   * @param {number} id - The ID of the comment to be updated
   * @param {string} content - The updated comment data
   * @returns {Promise<Comment>} - A promise that resolves to the updated comment
   */
  @Put('{id}')
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkOwner('comments'))
  @Response<APIError>(403, 'Forbidden')
  @Response<APIError>(404, 'Comment not found')
  public async update(@Path() id: number, @Body() content: string): Promise<Comment> {
    const { error, comment } = await dataMapper.update({ id, content });

    if (error) throw error;
    assert(comment, `Comment with ID ${id} not updated`);

    return comment;
  }

  /**
   * Delete a specific comment
   * @summary Delete a comment
   * @param {number} id - The ID of the comment to be deleted
   */
  @Delete('{id}')
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkOwner('comments'))
  @Response<APIError>(403, 'Forbidden')
  @Response<APIError>(404, 'Comment not found')
  @SuccessResponse('204', 'No Content')
  public async delete(@Path() id: number): Promise<void> {
    const { error } = await dataMapper.delete(Number(id));

    if (error) throw error;

    this.setStatus(204); // Set HTTP status to 204 - No Content
  }
}
