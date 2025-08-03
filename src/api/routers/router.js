'use strict';

import Router from 'express';
const mainRouter = Router();

import artworksRouter from './artworks.js';
import collectionsRouter from './collections.js';
import tagsRouter from './tags.js';
import usersRouter from './users.js';
import commentsRouter from './comments.js';
import docsRouter from './documentation.js';

mainRouter.use('/artworks', artworksRouter);
mainRouter.use('/collections', collectionsRouter);
mainRouter.use('/tags', tagsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/comments', commentsRouter);
mainRouter.use('/docs', docsRouter);

export default mainRouter;
