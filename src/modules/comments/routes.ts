import Router from 'express';

const router = Router();

import { securityService } from '../auth/security.js';

import commentsController from './controller.js';

/**
 * @swagger
 * /v1/comments/{id}:
 *   patch:
 *      summary: Modify a comment
 *      tags:
 *          - comments
 */
router.patch(
  '/:id',
  securityService.connectionRequired,
  securityService.checkOwner('comments'),
  commentsController.update,
);

/**
 * @swagger
 * /v1/comments/{id}:
 *   delete:
 *      summary: Delete a comment
 *      tags:
 *          - comments
 */
router.delete(
  '/:id',
  securityService.connectionRequired,
  securityService.checkOwner('comments'),
  commentsController.delete,
);

export default router;
