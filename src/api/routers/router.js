'use strict';

const mainRouter = require('express').Router();
const { usersController } = require('../controllers');

const validationService = require('../services/validation');

const artworksRouter = require('./artworks');
const collectionsRouter = require('./collections');
const tagsRouter = require('./tags');
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const docsRouter = require('./documentation');

mainRouter.use('/artworks', artworksRouter);
mainRouter.use('/collections', collectionsRouter);
mainRouter.use('/tags', tagsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/comments', commentsRouter);
mainRouter.use('/docs', docsRouter);

/**
 * @swagger
 * /v1/login:
 *   post:
 *      summary: Sign in
 *      description: Respond with a user identified by its email
 *      responses:
 *          200:
 *              description: An identified user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The user ID
 *                                  example: 1
 *                              nickname:
 *                                  type: text
 *                                  description: The user nickname
 *                                  example: tux
 *                              situation:
 *                                  type: text
 *                                  description: The user role. One of user, creator or admin
 *                                  example: admin
 *                              token:
 *                                  type: text
 *                                  description: The user token for identification
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJ1bml4Iiwic2l0dWF0aW9uIjoiYWRtaW4iLCJpYXQiOjE2OTY5NDI3NTIsImV4cCI6MTY5Njk4NTk1Mn0.Zsd4U4KJ9DD28_JF-l6RZPN4AXnIXF5tcYTgKJdI5eI
 *                              logged:
 *                                  type: boolean
 *                                  example: true
 */
mainRouter.post('/login', validationService.checkLoginData, usersController.signIn);

module.exports = mainRouter;
