// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/artworks');
const securityService = require('../services/security');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const artworksController = {
    create: async (req, res, next) => {
        const { id } = req.params;
        const newArtwork = req.body;

        if (!req.isOwner) {
            next(new APIError('Forbidden', 403));

            return;
        }
        newArtwork.ownerId = Number(id);

        debug(newArtwork);
        const { error, artwork } = await dataMapper.create(newArtwork);

        debug(artwork);

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(artwork);
        }
    },
};

module.exports = artworksController;
