'use strict';

const router = require('express').Router();
const { collectionsController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * GET /v1/collections
 * @summary 
 */
router.get('/', collectionsController.getCollections);

/**
 * POST /v1/collections
 * @summary 
 */
router.post('/',
    securityService.isConnected,
    securityService.checkToken,
    collectionsController.create);

router.get('/:id', collectionsController.read);
router.patch('/:id', collectionsController.update);
router.delete('/:id', collectionsController.delete);

router.get('/:id/artworks', collectionsController.getArtworks);

module.exports = router;
