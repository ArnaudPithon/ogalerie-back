// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/artworks');
const userDataMapper = require('../models/users');
const securityService = require('../services/security');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const artworksController = {
    create: async (req, res, next) => {
        const { id } = req.params;
        const newArtwork = req.body;

        if (!req.isOwner) {
            return next(new APIError('Forbidden', 403));
        }

        const response = await userDataMapper.getCollections(id);
        const userCollections = response.collections;

        // Confirme que l'artwork appartient bien à une collection de l'utilisateur
        if (!userCollections
            .filter(c => c.id === Number(newArtwork.collection_id)).length)
        {
            next(new APIError("La collection cible n'appartient pas à l'utilisateur", 403));

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

    getArtwork: async (req, res, next) => {
        const { id } = req.params;
        // On affecte par défaut une id qui ne peut exister en BDD pour un utilisateur
        // qui n'est pas connecté.
        let viewverId = 0;

        if (req.isConnected) {
            const token = req.headers?.authorization.split(' ')[1];
            const decoded = securityService.checkToken(token);

            viewverId = decoded.id;
        }

        const { error, artwork } = await dataMapper.getArtwork(id, viewverId);

        if (error) {
            next(error);
        }
        else {
            res.json(artwork);
        }
    },

    update:  async (req, res, next) => {
        const { id } = req.params;

        if (!req.isOwner) {
            next(new APIError('Forbidden', 403));

            return;
        }

        const { error, artwork } = await dataMapper.update({ id, ...req.body });

        if (error) {
            next(error);
        }
        else {
            res.json(artwork);
        }
    },

    delete:  async (req, res, next) => {
        const { id } = req.params;

        if (!req.isOwner) {
            next(new APIError('Forbidden', 403));

            return;
        }

        const { error } = await dataMapper.delete({ id });

        if (error) {
            next(error);
        }
        else {
            res.json('Artwork deleted');
        }
    },

    setFavorite: async (req, res, next) => {
        const { id } = req.params;
        const { artworkId } = req.body;

        if (!req.isUser) {
            next(new APIError('Forbidden', 403));

            return;
        }
        const { error, result } = await dataMapper.setFavorite({ artworkId, userId: id });

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(result);
        }
    },

    deleteFavorite: async (req, res, next) => {
        const { id } = req.params;
        const { artworkId } = req.body;

        if (!req.isUser) {
            next(new APIError('Forbidden', 403));

            return;
        }
        const { error, result } = await dataMapper.deleteFavorite({ artworkId, userId: id });

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },

    setAppraise: async (req, res, next) => {
        const { id } = req.params;
        const { artworkId } = req.body;

        if (!req.isUser) {
            next(new APIError('Forbidden', 403));

            return;
        }
        const { error, result } = await dataMapper.setAppraise({ artworkId, userId: id });

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(result);
        }
    },

    deleteAppraise: async (req, res, next) => {
        const { id } = req.params;
        const { artworkId } = req.body;

        if (!req.isUser) {
            next(new APIError('Forbidden', 403));

            return;
        }
        const { error, result } = await dataMapper.deleteAppraise({ artworkId, userId: id });

        if (error) {
            next(error);
        }
        else {
            res.json(result);
        }
    },
};

module.exports = artworksController;
