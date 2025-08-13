import Router from 'express';

import artworksRouter from '../../modules/artworks/routes.js';
import collectionsRouter from '../../modules/collections/routes.js';
import tagsRouter from '../../modules/tags/routes.js';
import usersRouter from '../../modules/users/routes.js';
import commentsRouter from '../../modules/comments/routes.js';

const router = Router();

const routerAPI = Router();

routerAPI.use('/artworks', artworksRouter);
routerAPI.use('/collections', collectionsRouter);
routerAPI.use('/tags', tagsRouter);
routerAPI.use('/users', usersRouter);
routerAPI.use('/comments', commentsRouter);

/**
  * @desciption Les urls préfixées par /v1 rentrent dans routerAPI
  */
router.use('/v1', routerAPI);

export default router;
