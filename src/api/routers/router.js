'use strict';

const mainRouter = require('express').Router();

import artworksRouter from './artworks';
import collectionsRouter from './collections';
import tagsRouter from './tags';
import usersRouter from './users';
import commentsRouter from './comments';
import docsRouter from './documentation';

mainRouter.use('/artworks', artworksRouter);
mainRouter.use('/collections', collectionsRouter);
mainRouter.use('/tags', tagsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/comments', commentsRouter);
mainRouter.use('/docs', docsRouter);

export default mainRouter;
