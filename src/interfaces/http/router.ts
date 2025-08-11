import Router from 'express';

import errorHandler from './middlewares/errorHandler.js';
import routerAPI from './routesAPI.js';

const router = Router();

// Les urls préfixées par /v1 rentrent dans routerAPI
router.use('/v1', routerAPI);

// Levée d'une erreur 404
router.use(errorHandler.notFound);

// Gestion globale des erreurs
router.use(errorHandler.manage);

export default router;
