'use strict';

const authController = require('./authenticate.js');
const usersController = require('./users.js');
//const artworksController = require('./artworks.js');
//const collectionsController = require('./collections.js');
//const tagsController = require('./tags.js');

module.exports = { authController, usersController };
