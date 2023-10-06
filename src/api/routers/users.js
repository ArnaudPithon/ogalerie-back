// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

// URL préfixée par /users

const router = require('express').Router();
const {
    usersController,
    collectionsController,
    artworksController,
} = require('../controllers');
const validationService = require('../services/validation');
const securityService = require('../services/security.js');

/**
 * POST /v1/users
 * @summary Respond with a newly registered user
 * @returns {User} 201 - A newly registered user
 */
router.post('/',
    validationService.checkSignUpData,
    usersController.signUp);

/**
 * GET /v1/users
 * @summary Respond with list of registered users
 */
router.get('/:role((?:creator|admin)?)', usersController.users);

/**
 * GET /v1/users/:id
 * @summary Respond with an user
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    usersController.getUser);

/**
 * PATCH /v1/users/:id
 * @summary Modify an user profil
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    validationService.checkUpdateData,
    usersController.update);

/**
 * DELETE /v1/users/:id
 * @summary Delete an user profil
 * @return string 200 - confirmation
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    securityService.isUser,
    usersController.delete);

/**
 * GET /v1/users/:id/collections
 * @summary Respond with a list completed of a user's collections
 * @return [Collections] 200 - 
 */
router.get('/:id(\\d+)/collections', usersController.getCollections);

/**
 * POST /v1/users/:id/collections
 * @summary Create a collection
 * @return {Collection} 201 - 
 */
router.post('/:id(\\d+)/collections',
    securityService.isConnected,
    securityService.isUser,
    collectionsController.create);

/**
 * GET /v1/users/:id/artworks
 * @summary Respond with a user's artworks list
 * @return [Artworks] 200 - 
 */
router.get('/:id(\\d+)/artworks', usersController.getArtworks);

/**
 * POST /v1/users/:id/artworks
 * @summary Create an artwork
 * @return {Artwork} 201 - 
 */
router.post('/:id(\\d+)/artworks',
    securityService.isConnected,
    securityService.isUser,
    artworksController.create);

router.get('/:id(\\d+)/favorites', usersController.getFavorites);

/**
 * POST /v1/users/:id/favorites
 * @summary Create a favorite
 * @return {Int} 201 - 
 */
router.post('/:id(\\d+)/favorites',
    securityService.isConnected,
    securityService.isUser,
    artworksController.setFavorite);

/**
 * DELETE /v1/users/:id/favorites
 * @summary Retire a favorite
 * @return {Int} 201 - 
 */
router.delete('/:id(\\d+)/favorites',
    securityService.isConnected,
    securityService.isUser,
    artworksController.deleteFavorite);

module.exports = router;
