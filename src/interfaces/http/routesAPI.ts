import Router from 'express';
const mainRouter = Router();

import artworksRouter from '../../modules/artworks/routes.js';
import collectionsRouter from '../../modules/collections/routes.js';
import tagsRouter from '../../modules/tags/routes.js';
import usersRouter from '../../modules/users/routes.js';
import commentsRouter from '../../modules/comments/routes.js';

mainRouter.use('/artworks', artworksRouter);
mainRouter.use('/collections', collectionsRouter);
mainRouter.use('/tags', tagsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/comments', commentsRouter);

export default mainRouter;
