'use strict';

const router = require('express').Router();
const { collectionsController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * GET /v1/collections/:id
 * @summary Return a collection
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isOwner,
    collectionsController.read);

/**
 * PATCH /v1/collections/:id
 * @summary Update a collection
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isOwner,
    collectionsController.update);

/**
 * DELETE /v1/collections/:id
 * @summary Delete a collection
 * @return string 200 - confirmation
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isOwner,
    collectionsController.delete);

module.exports = router;
