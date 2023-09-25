'use strict';

const router = require('express').Router();
const errorService = require('../services/error');

const { authController } = require('../controllers');

// Routes

router.post('/api/v1/login', authController.signIn);
router.post('/api/v1/signup', authController.signUp);

// 

router.use(errorService.notFound);

module.exports = router;
