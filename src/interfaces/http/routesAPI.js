import Router from 'express';
const mainRouter = Router();

import artworksRouter from '../../modules/artworks/router.js';
import collectionsRouter from '../../modules/collections/router.js';
import tagsRouter from '../../modules/tags/router.js';
import usersRouter from '../../modules/users/router.js';
import commentsRouter from '../../modules/comments/router.js';
// import docsRouter from './documentation.js';

mainRouter.use('/artworks', artworksRouter);
mainRouter.use('/collections', collectionsRouter);
mainRouter.use('/tags', tagsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/comments', commentsRouter);
// mainRouter.use('/docs', docsRouter);

export default mainRouter;
