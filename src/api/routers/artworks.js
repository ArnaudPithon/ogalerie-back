'use strict';

const router = require('express').Router();
const { artworksController } = require('../controllers');

/**
 * GET /v1/artworks
 * @summary Respond with an artwork list
 */
router.get('/', artworksController.artworks);

router.post('/', artworksController.artworks);

router.get('/:id', artworksController.getArtwork);

router.patch('/:id', artworksController.patchArtwork);

router.delete('/:id', artworksController.deleteArtworks);

module.exports = router;
