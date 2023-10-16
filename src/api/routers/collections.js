'use strict';

const router = require('express').Router();
const { collectionsController } = require('../controllers');
const securityService = require('../services/security.js');

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
router.get('/:id(\\d+)',
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
router.patch('/:id(\\d+)',
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
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isCollectionOwner,
    collectionsController.delete);

module.exports = router;
