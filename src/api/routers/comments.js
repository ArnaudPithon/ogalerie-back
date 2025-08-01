'use strict';

const router = require('express').Router();
import { commentsController } from '../controllers';
import securityService from '../services/security.js';

/**
 * @swagger
 * /v1/comments/{id}:
 *   patch:
 *      summary: Modify a comment
 *      tags:
 *          - comments
 */
router.patch('/:id',
  securityService.isConnected,
  securityService.isCommentOwner,
  commentsController.update);

/**
 * @swagger
 * /v1/comments/{id}:
 *   delete:
 *      summary: Delete a comment
 *      tags:
 *          - comments
 */
router.delete('/:id',
  securityService.isConnected,
  securityService.isCommentOwner,
  commentsController.delete);

export default router;
