'use strict';

const usersController = require('./users.js');
const artworksController = require('./artworks.js');
const collectionsController = require('./collections.js');
const tagsController = require('./tags.js');
const commentsController = require('./comments.js');

module.exports = {
    usersController,
    collectionsController,
    artworksController,
    tagsController,
    commentsController,
};
