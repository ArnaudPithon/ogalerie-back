'use strict';

const router = require('express').Router();
const { artworksController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * @swagger
 * /v1/artworks/{id}:
 *   get:
 *      summary: Return an artwork
 *      responses:
 *          200:
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isArtworkOwner,
    artworksController.getArtwork);

/**
 * PATCH /v1/artworks/:id
 * @summary Update an artwork
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isArtworkOwner,
    artworksController.update);

/**
 * DELETE /v1/artworks/:id
 * @summary Delete an artwork
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isArtworkOwner,
    artworksController.delete);

/**
 * GET /v1/artworks/random
 * @summary Return a random artworks list
 */
router.get('/random', artworksController.random);

/**
 * GET /v1/artworks
 * @summary Respond with an artworks list
 * @return [Artworks] 200 - 
 */
router.get('/', artworksController.getAllArtworks);

/**
 * @swagger
 * /v1/artworks/filter:
 *   get:
 *      parameters:
 *        - in: query
 *          name: type
 *          schema:
 *              type: int
 *              example: 3
 *        - in: query
 *          name: support
 *          schema:
 *              type: int
 *              example: 7
 *        - in: query
 *          name: style
 *          schema:
 *              type: int
 *              example: 9
 */
router.get('/filter', artworksController.filter);

module.exports = router;
