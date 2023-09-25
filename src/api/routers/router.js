'use strict';

const router = require('express').Router();
const { authController } = require('../controllers');

/**
 * Respond with a user identified by its email
 * @route POST /login
 * @returns {User} 200 - An identified user
 */
router.post('/login', authController.signIn);

/**
 * Respond with a newly registered user
 * @route PUT /signUp
 * @returns {User} 200 - A newly registered user
 */
router.post('/signup', authController.signUp);

module.exports = router;
