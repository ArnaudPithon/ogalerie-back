'use strict';

const mainRouter = require('express').Router();

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

module.exports = mainRouter;
