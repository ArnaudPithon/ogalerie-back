'use strict';

const router = require('express').Router();
const { artworksController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * GET /v1/artworks/:id
 * @summary Return an artwork
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isOwner,
    artworksController.getArtwork);

/**
 * PATCH /v1/artworks/:id
 * @summary Update an artwork
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isOwner,
    artworksController.update);

/**
 * DELETE /v1/artworks/:id
 * @summary Delete an artwork
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isOwner,
    artworksController.delete);

module.exports = router;
