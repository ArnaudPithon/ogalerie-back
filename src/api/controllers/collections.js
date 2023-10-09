// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/collections');
const securityService = require('../services/security');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const collectionsController = {
    create: async (req, res, next) => {
        const { id } = req.params;
        const { title } = req.body;

        if (!req.isUser) {
            next(new APIError('Forbidden', 403));

            return;
        }
        if (!title) {
            next(new APIError('Collection need a title', 400));

            return;
        }

        const newCollection = { title, ownerId: Number(id) };

        debug(newCollection);
        const { error, collection } = await dataMapper.create(newCollection);

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(collection);
        }
    },

    read: async (req, res, next) => {
        const { id } = req.params;

        const { error, collection } = await dataMapper.read(id);

        if (error) {
            next(error);
        }
        else {
            res.status(200).json(collection);
        }
    },

    update: async (req, res, next) => {
        const { id } = req.params;

        if (!req.isOwner) {
            next(new APIError('Forbidden', 403));

            return;
        }

        const { error, collection } = await dataMapper.update({ id, ...req.body });

        if (error) {
            next(error);
        }
        else {
            res.json(collection);
        }
    },

    delete: async (req, res, next) => {
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
            res.json('Collection deleted');
        }
    },

    getArtworks: async (req, res, next) => {
    },

};

module.exports = collectionsController;
