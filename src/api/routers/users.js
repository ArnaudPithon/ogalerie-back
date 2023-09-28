'use strict';

// URL préfixée par /users

const router = require('express').Router();
const { usersController } = require('../controllers');
const validationService = require('../services/validation');

/**
 * POST /v1/users
 * @summary Respond with a newly registered user
 * @route PUT /signUp
 * @returns {User} 200 - A newly registered user
 */
router.post('/', validationService.checkSignUpData, usersController.signUp);

/**
 * GET /v1/users
 * @summary Respond with list of registered creators
 */
router.get('/', usersController.creators);


module.exports = router;
