'use strict';

const mainRouter = require('express').Router();
const { usersController } = require('../controllers');

const validationService = require('../services/validation');

const artworksRouter = require('./artworks');
const collectionsRouter = require('./collections');
const tagsRouter = require('./tags');
const usersRouter = require('./users');

mainRouter.use('/artworks', artworksRouter);
mainRouter.use('/collections', collectionsRouter);
mainRouter.use('/tags', tagsRouter);
mainRouter.use('/users', usersRouter);

/**
 * Respond with a user identified by its email
 * @route POST /login
 * @returns {User} 200 - An identified user
 */
mainRouter.post('/login', validationService.checkLoginData, usersController.signIn);

module.exports = mainRouter;
