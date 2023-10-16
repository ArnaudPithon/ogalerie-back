'use strict';

const router = require('express').Router();
const { commentsController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * @swagger
 * /v1/comments/{id}:
 *   patch:
 *      summary: Modify a comment
 *      tags:
 *          - comments
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isCommentOwner,
    commentsController.update);

/**
 * @swagger
 * /v1/comments/{id}:
 *   delete:
 *      summary: Delete a comment
 *      tags:
 *          - comments
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isCommentOwner,
    commentsController.delete);

module.exports = router;
