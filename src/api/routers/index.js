'use strict';

const router = require('express').Router();
const errorHandler = require('../services/errorHandler');

const routerAPI = require('./router.js');

// Les urls préfixées par /v1 rentrent dans routerAPI
router.use('/v1', routerAPI);

// Levée d'une erreur 404
router.use(errorHandler.notFound);

// Gestion globale des erreurs
router.use(errorHandler.manage);

module.exports = router;
