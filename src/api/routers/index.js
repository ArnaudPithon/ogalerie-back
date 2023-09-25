'use strict';

const router = require('express').Router();
const errorService = require('../services/error');

const { authController } = require('../controllers');

// Routes

router.post('/login', authController.signIn);
router.post('/signup', authController.signUp);

// 

router.use(errorService.notFound);

module.exports = router;
