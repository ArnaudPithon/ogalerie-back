import Router from 'express';

import artworksRouter from '../../modules/artworks/routes.js';
import collectionsRouter from '../../modules/collections/routes.js';
import tagsRouter from '../../modules/tags/routes.js';
import usersRouter from '../../modules/users/routes.js';
import commentsRouter from '../../modules/comments/routes.js';

const router = Router();

// sous-routeur manuels
const routerAPI = Router();

routerAPI.use('/artworks', artworksRouter);
routerAPI.use('/collections', collectionsRouter);
routerAPI.use('/tags', tagsRouter);
routerAPI.use('/users', usersRouter);
routerAPI.use('/comments', commentsRouter);

// Les urls préfixées par /v1 rentrent dans routerAPI
router.use('/v1', routerAPI);

import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '@/routes/routes.js';
// routes auto-générées par tsoa
RegisterRoutes(router);

/**
  * @description Route pour la documentation Swagger
  */
import swaggerDoc from '@/../build/swagger.json' with { type: 'json' };
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default router;
