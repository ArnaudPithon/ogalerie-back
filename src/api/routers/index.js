'use strict';

const router = require('express').Router();
const errorHandler = require('../services/errorHandler');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routerAPI = require('./router.js');

const swaggerDefinition = {
    openapi: '3.1.0',
    info: {
        title: 'Express API for Ogalerie',
        version: '1.0.0',
    },
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./api/routers/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Les urls préfixées par /v1 rentrent dans routerAPI
router.use('/v1', routerAPI);

// Levée d'une erreur 404
router.use(errorHandler.notFound);

// Gestion globale des erreurs
router.use(errorHandler.manage);

module.exports = router;
