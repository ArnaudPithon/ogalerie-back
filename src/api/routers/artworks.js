'use strict';

const router = require('express').Router();
const { artworksController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * @swagger
 * /v1/artworks/{id}:
 *   get:
 *      summary: Return an artwork
 *      tags:
 *          - artworks
 *      responses:
 *          201:
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isArtworkOwner,
    artworksController.getArtwork);

/**
 * @swagger
 * /v1/artworks/{id}:
 *   patch:
 *      summary: Update an artwork
 *      tags:
 *          - artworks
 *      responses:
 *          200:
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isArtworkOwner,
    artworksController.update);

/**
 * @swagger
 * /v1/artworks/{id}:
 *   delete:
 *      summary: Delete an artwork
 *      tags:
 *          - artworks
 *      responses:
 *          200:
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isArtworkOwner,
    artworksController.delete);

/**
 * @swagger
 * /v1/artworks/random:
 *   get:
 *      summary: Return a random artworks list
 *      tags:
 *          - artworks
 *      responses:
 *          200:
 */
router.get('/random', artworksController.random);

/**
 * @swagger
 * /v1/artworks:
 *   get:
 *      summary: Return an artworks list
 *      tags:
 *          - artworks
 *      responses:
 *          200:
 */
router.get('/', artworksController.getAllArtworks);

/**
 * @swagger
 * /v1/artworks/filter:
 *   get:
 *      tags:
 *          - artworks
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
