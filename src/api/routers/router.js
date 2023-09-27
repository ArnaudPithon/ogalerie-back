'use strict';

const router = require('express').Router();
const { authController, userController } = require('../controllers');
const validationService = require('../services/validation');

/**
 * Respond with a user identified by its email
 * @route POST /login
 * @returns {User} 200 - An identified user
 */
router.post('/login', validationService.checkLoginData, authController.signIn);

/**
 * Respond with a newly registered user
 * @route PUT /signUp
 * @returns {User} 200 - A newly registered user
 */
router.post('/signup', validationService.checkSignUpData, authController.signUp);
router.post('/users', validationService.checkSignUpData, authController.signUp);

router.get('/users', userController.creators);


module.exports = router;
