'use strict';

const router = require('express').Router();
import { collectionsController } from '../controllers';
import securityService from '../services/security.js';

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
router.get('/:id',
  securityService.isConnected,
  securityService.isCollectionOwner,
  collectionsController.read);

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
router.patch('/:id',
  securityService.isConnected,
  securityService.isCollectionOwner,
  collectionsController.update);

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
router.delete('/:id',
  securityService.isConnected,
  securityService.isCollectionOwner,
  collectionsController.delete);

export default router;
