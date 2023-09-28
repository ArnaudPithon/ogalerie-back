'use strict';

const router = require('express').Router();
const { tagsController } = require('../controllers');

/**
 * GET /v1/tags
 * @summary 
 */
router.get('/:id/artwork', tagsController.getArtworkByTag);

router.get('/', tagsController.getTags);

module.exports = router;
