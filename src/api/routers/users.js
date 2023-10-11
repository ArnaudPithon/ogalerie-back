// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

// URL préfixée par /users

const router = require('express').Router();
const {
    usersController,
    collectionsController,
    artworksController,
    commentsController,
} = require('../controllers');
const validationService = require('../services/validation');
const securityService = require('../services/security.js');

/**
 * @swagger
 * /v1/users:
 *   post:
 *      summary: Create a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *      responses:
 *          201:
 *              description: A newly registered user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserNew'
 */
router.post('/',
    validationService.checkSignUpData,
    usersController.signUp);

/**
 * @swagger
 * /v1/users/{role}:
 *   get:
 *      summary: Respond with a list of users
 *      parameters:
 *        - in: path
 *          name: role
 *          required: false
 *          description: description of the users situation.
 *          schema:
 *              type: string
 *              example: creator
 *      responses:
 *          200:
 *              description: A list of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: The user ID
 *                                      example: 1
 *                                  nickname:
 *                                      type: string
 *                                      description: The user nickname
 *                                      example: tux
 */
router.get('/:role((?:creator|admin)?)', usersController.users);

/**
 * @swagger
 * /v1/users/{id}:
 *   get:
 *      summary: Respond with user informations
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the user to retrieve.
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: A single user
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    usersController.getUser);

/**
 * @swagger
 * /v1/users/{id}:
 *   patch:
 *      summary: Modify an user profil
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID of the user to retrieve.
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *      responses:
 *          200:
 *              description: User informations
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    validationService.checkUpdateData,
    usersController.update);

/**
 * @swagger
 * /v1/users/{id}:
 *   delete:
 *      summary: delete an user profil
 *      responses:
 *          200:
 *              description: Confirmation
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    usersController.delete);

/**
 * GET /v1/users/:id/collections
 * @summary Respond with a list completed of a user's collections
 * @return [Collections] 200 - 
 */
router.get('/:id(\\d+)/collections', usersController.getCollections);

/**
 * POST /v1/users/:id/collections
 * @summary Create a collection
 * @return {Collection} 201 - 
 */
router.post('/:id(\\d+)/collections',
    securityService.isConnected,
    securityService.isUser,
    collectionsController.create);

/**
 * GET /v1/users/:id/artworks
 * @summary Respond with a user's artworks list
 * @return [Artworks] 200 - 
 */
router.get('/:id(\\d+)/artworks', usersController.getArtworks);

/**
 * POST /v1/users/:id/artworks
 * @summary Create an artwork
 * @return {Artwork} 201 - 
 */
router.post('/:id(\\d+)/artworks',
    securityService.isConnected,
    securityService.isUser,
    artworksController.create);

/**
 * POST /v1/users/:id/comments
 * @summary Add a comment
 */
router.post('/:id(\\d+)/comments',
    securityService.isConnected,
    securityService.isUser,
    commentsController.create);

/**
 * GET /v1/users/:id/comments
 * @summary Return all user comments
 */
router.get('/:id(\\d+)/comments',
    commentsController.getAll);

router.get('/:id(\\d+)/favorites', usersController.getFavorites);

/**
 * POST /v1/users/:id/favorites
 * @summary Create a favorite
 * @return {Int} 201 - 
 */
router.post('/:id(\\d+)/favorites',
    securityService.isConnected,
    securityService.isUser,
    artworksController.setFavorite);

/**
 * DELETE /v1/users/:id/favorites
 * @summary Retire a favorite
 * @return {Int} 200 - 
 */
router.delete('/:id(\\d+)/favorites',
    securityService.isConnected,
    securityService.isUser,
    artworksController.deleteFavorite);

/**
 * POST /v1/users/:id/like
 * @summary Add a like
 * @return {Int} 201 - 
 */
router.post('/:id(\\d+)/likes',
    securityService.isConnected,
    securityService.isUser,
    artworksController.setAppraise);

/**
 * DELETE /v1/users/:id/like
 * @summary Retire a like
 * @return {Int} 200 - 
 */
router.delete('/:id(\\d+)/likes',
    securityService.isConnected,
    securityService.isUser,
    artworksController.deleteAppraise);

module.exports = router;

// Schemas Definitions
/**
 * @swagger
 * components:
 *   schemas:
 *      UserShort:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The user ID
 *                  example: 1
 *              nickname:
 *                  type: string
 *                  description: The user nickname
 *                  example: tux
 *              situation:
 *                  type: string
 *                  description: The user role. One of user, creator or admin
 *                  example: admin
 *      UserNew:
 *          allOf:
 *            - $ref: '#/components/schemas/UserShort'
 *            - type: object
 *              properties:
 *                  token:
 *                      type: string
 *                      description: The user token for identification
 *                      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJ1bml4Iiwic2l0dWF0aW9uIjoiYWRtaW4iLCJpYXQiOjE2OTY5NDI3NTIsImV4cCI6MTY5Njk4NTk1Mn0.Zsd4U4KJ9DD28_JF-l6RZPN4AXnIXF5tcYTgKJdI5eI
 *      User:
 *          allOf:
 *            - $ref: '#/components/schemas/UserShort'
 *            - type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                      description: The user firstname.
 *                      example: Leonard
 *                  lastname:
 *                      type: string
 *                      description: The user lastname.
 *                      example: De Vinci
 */

