// vim: foldlevel=0:foldnestmax=2
import Router from 'express';

import collectionsController from '../collections/controller.js';
import artworksController from '../artworks/controller.js';
import commentsController from '../comments/controller.js';
import { securityService } from '../auth/security.js';

import usersController from './controller.js';
import {
  checkLoginData,
  checkSignUpData,
  checkUpdateData,
  validateRole,
  validateNumericId,
} from './validator.js';

const router = Router();

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
router.post('/login', checkLoginData, usersController.signIn);

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
router.post('/', checkSignUpData, usersController.signUp);

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
router.get('/:role', validateRole, usersController.users);

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
router.get(
  '/:id',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  usersController.getUser,
);

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
router.patch(
  '/:id',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  checkUpdateData,
  usersController.update,
);

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
router.delete(
  '/:id',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  usersController.delete,
);

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
router.get(
  '/:id/collections',
  validateNumericId,
  usersController.getCollections,
);

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
router.post(
  '/:id/collections',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  collectionsController.create,
);

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
router.get('/:id/artworks', validateNumericId, usersController.getArtworks);

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
router.post(
  '/:id/artworks',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  artworksController.create,
);

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
router.post(
  '/:id/comments',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  commentsController.create,
);

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
router.get('/:id/comments', validateNumericId, commentsController.getAll);

router.get('/:id/favorites', validateNumericId, usersController.getFavorites);

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
router.post(
  '/:id/favorites',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  artworksController.setFavorite,
);

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
router.delete(
  '/:id/favorites',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  artworksController.deleteFavorite,
);

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
router.post(
  '/:id/likes',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  artworksController.setAppraise,
);

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
router.delete(
  '/:id/likes',
  validateNumericId,
  securityService.connectionRequired,
  securityService.checkIdentity,
  artworksController.deleteAppraise,
);

export default router;

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
