'use strict';

const router = require('express').Router();
const { collectionsController } = require('../controllers');

/**
 * GET /v1/collections
 * @summary 
 */
router.get('/', collectionsController.getCollections);

/**
 * POST /v1/collections
 * @summary 
 */
router.post('/', collectionsController.createCollection);

router.get('/:id', collectionsController.getCollection);
router.patch('/:id', collectionsController.getCollection);
router.delete('/:id', collectionsController.getCollection);

router.get('/:id/artworks', collectionsController.getCollection);

module.exports = router;
