'use strict';

const router = require('express').Router();
const { commentsController } = require('../controllers');
const securityService = require('../services/security.js');

/**
 * GET /v1/comments/:id
 * @summary Return a comment
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isCommentOwner,
    commentsController.read);

/**
 * PATCH /v1/comments/:id
 * @summary Update a comment
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isCommentOwner,
    commentsController.update);

/**
 * DELETE /v1/comments/:id
 * @summary Delete a comment
 * @return string 200 - confirmation
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isCommentOwner,
    commentsController.delete);

module.exports = router;
