'use strict';

const router = require('express').Router();
const { tagsController } = require('../controllers');

/**
 * @swagger
 * /v1/tags/newversion:
 *   get:
 *      summary: Return a list of tags (version2)
 *      tags:
 *          - tags
 *      responses:
 *          200:
 */
router.get('/newversion', tagsController.getTags2);

/**
 * @swagger
 * /v1/tags/{id}:
 *   get:
 *      summary: Return a list of tag artworks
 *      tags:
 *          - tags
 *      responses:
 *          200:
 */
router.get('/:id', tagsController.read);

/**
 * @swagger
 * /v1/tags:
 *   get:
 *      summary: Return a list of tags (old version1)
 *      tags:
 *          - tags
 *      responses:
 *          200:
 */
router.get('/', tagsController.getTags);

module.exports = router;
