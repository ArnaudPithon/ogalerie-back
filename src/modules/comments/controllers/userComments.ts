import { Body, Controller, Get, Route, Middlewares, Path, Post, Response, Tags, SuccessResponse } from 'tsoa';

import dataMapper from '../model.js';
import APIError from '../../../infrastructure/shared/APIError.js';
import { assert } from '@/infrastructure/shared/utils.js';
import type { Comment, NewComment } from '../types.js';
import { securityService } from '@/modules/auth/security.js';
import { validateNumericId } from '@/modules/users/validator.js';

@Route('v2/users')
@Tags('Comments')
export class UserCommentsController extends Controller {
  /**
   * Create a new comment for a specific owner
   * @param {number} id - The ID of the owner
   * @param {NewComment} newComment - The comment data to be created
   * @returns {Promise<Comment>} - A promise that resolves to the created comment
   */
  @Post('{id}/comments')
  @Middlewares(validateNumericId)
  @Middlewares(securityService.connectionRequired)
  @Middlewares(securityService.checkIdentity)
  @SuccessResponse('201', 'Created')
  @Response<APIError>(403, 'Forbidden')
  public async create(@Path() id: number, @Body() newComment: NewComment): Promise<Comment> {
    const { error, comment } = await dataMapper.create({ ownerId: Number(id), ...newComment });

    if (error) throw error;
    assert(comment, 'Comment not created');

    this.setStatus(201); // Set HTTP status to 201 - Created

    return comment;
  }

  /**
   * Get all comments for a specific owner
   * @param {number} id - The ID of the owner
   * @returns {Promise<Comment[]>} - A promise that resolves to an array of comments
   */
  @Get('{id}/comments')
  @Middlewares(validateNumericId)
  @Response<APIError>(500, 'Internal Server Error')
  public async getAll(@Path() id: number): Promise<Comment[]> {
    const { error, comments } = await dataMapper.getAll(Number(id));

    if (error) throw error;
    assert(comments, `No comments found for owner with ID ${id}`);

    return comments;
  }
}
