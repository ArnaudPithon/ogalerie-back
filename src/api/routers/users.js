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
 * /v1/users/login:
 *   post:
 *      summary: Sign in
 *      tags:
 *          - users
 *      description: Respond with a user identified by its email
 *      responses:
 *          200:
 *              description: An identified user
 *              content:
 *                  application/json:
 *                      schema:
 *                            $ref: '#/components/schemas/UserNew'
 */
router.post('/login', validationService.checkLoginData, usersController.signIn);

/**
 * @swagger
 * /v1/users:
 *   post:
 *      summary: Create a user
 *      tags:
 *          - users
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
 *      tags:
 *          - users
 *      parameters:
 *        - in: path
 *          name: role
 *          required: false
 *          description: description of the users situation.
 *          schema:
 *              type: string
 *              enum: ['user', 'creator', 'admin']
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
 *      tags:
 *          - users
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
 *      tags:
 *          - users
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
 *      tags:
 *          - users
 *      responses:
 *          200:
 *              description: Confirmation
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    usersController.delete);

/**
 * @swagger
 * /v1/users/{id}/collections:
 *   get:
 *      summary: Return a list completed of a user's collections
 *      tags:
 *          - users
 *          - collections
 *      responses:
 *          200:
 * @return [Collections] 200 - 
 */
router.get('/:id(\\d+)/collections', usersController.getCollections);

/**
 * @swagger
 * /v1/users/{id}/collections:
 *   post:
 *      summary: Create a collection
 *      tags:
 *          - users
 *          - collections
 *      responses:
 *          201:
 * @return {Collection} 201 - 
 */
router.post('/:id(\\d+)/collections',
    securityService.isConnected,
    securityService.isUser,
    collectionsController.create);

/**
 * @swagger
 * /v1/users/{id}/artworks:
 *   get:
 *      summary: Return user's artworks list
 *      tags:
 *          - users
 *          - artworks
 *      responses:
 *          200:
 * @return [Artworks] 200 - 
 */
router.get('/:id(\\d+)/artworks', usersController.getArtworks);

/**
 * @swagger
 * /v1/users/{id}/artworks:
 *   post:
 *      summary: Create an artwork
 *      tags:
 *          - users
 *          - artworks
 *      responses:
 *          201:
 * @return {Artwork} 201 - 
 */
router.post('/:id(\\d+)/artworks',
    securityService.isConnected,
    securityService.isUser,
    artworksController.create);

/**
 * @swagger
 * /v1/users/{id}/comments:
 *   post:
 *      summary: Add an comment
 *      tags:
 *          - users
 *          - comments
 *      responses:
 *          201:
 */
router.post('/:id(\\d+)/comments',
    securityService.isConnected,
    securityService.isUser,
    commentsController.create);

/**
 * @swagger
 * /v1/users/{id}/comments:
 *   get:
 *      summary: Return all user comments
 *      tags:
 *          - users
 *          - comments
 *      responses:
 *          200:
 */
router.get('/:id(\\d+)/comments',
    commentsController.getAll);

router.get('/:id(\\d+)/favorites', usersController.getFavorites);

/**
 * @swagger
 * /v1/users/{id}/favorites:
 *   post:
 *      summary: Create a favorite
 *      tags:
 *          - users
 *          - favorites
 *      responses:
 *          201:
 */
router.post('/:id(\\d+)/favorites',
    securityService.isConnected,
    securityService.isUser,
    artworksController.setFavorite);

/**
 * @swagger
 * /v1/users/{id}/favorites:
 *   delete:
 *      summary: Retire a favorite
 *      tags:
 *          - users
 *          - favorites
 *      responses:
 *          200:
 */
router.delete('/:id(\\d+)/favorites',
    securityService.isConnected,
    securityService.isUser,
    artworksController.deleteFavorite);

/**
 * @swagger
 * /v1/users/{id}/likes:
 *   post:
 *      summary: Add a like
 *      tags:
 *          - users
 *          - likes
 *      responses:
 *          201:
 */
router.post('/:id(\\d+)/likes',
    securityService.isConnected,
    securityService.isUser,
    artworksController.setAppraise);

/**
 * @swagger
 * /v1/users/{id}/likes:
 *   delete:
 *      summary: Retire a like
 *      tags:
 *          - users
 *          - likes
 *      responses:
 *          200:
 */
router.delete('/:id(\\d+)/likes',
    securityService.isConnected,
    securityService.isUser,
    artworksController.deleteAppraise);

module.exports = router;

/**
 * Définit l'ordre de tri des catégories/tags
 * @swagger
 * tags:
 *  - name: users
 *  - name: collections
 *  - name: artworks
 *  - name: tags
 *  - name: comments
 */

/**
 * Schemas Definitions
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

