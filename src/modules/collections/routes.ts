import Router from 'express';

const router = Router();

import collectionsController from './controller.js';

import { securityService } from '@/modules/auth/security.js';

/**
 * @swagger
 * /v1/collections/{id}:
 *   get:
 *      summary: Return a collection
 *      tags:
 *          - collections
 *      responses:
 *          200:
 */
router.get(
  '/:id',
  securityService.connectionRequired,
  securityService.checkOwner('collection'),
  collectionsController.read,
);

/**
 * @swagger
 * /v1/collections/{id}:
 *   patch:
 *      summary: Update a collection
 *      tags:
 *          - collections
 *      responses:
 *          200:
 */
router.patch(
  '/:id',
  securityService.connectionRequired,
  securityService.checkOwner('collection'),
  collectionsController.update,
);

/**
 * @swagger
 * /v1/collections/{id}:
 *   delete:
 *      summary: Delete a collection
 *      tags:
 *          - collections
 *      responses:
 *          200:
 * @return string 200 - confirmation
 */
router.delete(
  '/:id',
  securityService.connectionRequired,
  securityService.checkOwner('collection'),
  collectionsController.delete,
);

export default router;
