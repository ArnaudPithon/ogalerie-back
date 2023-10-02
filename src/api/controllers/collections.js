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

        if (!title) {
            next({
                message: 'Collection need a title',
                code: 400,
            });
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
    },

    update: async (req, res, next) => {
    },

    delete: async (req, res, next) => {
    },

    getArtworks: async (req, res, next) => {
    },

    getCollections: async (req, res, next) => {
    },
};

module.exports = collectionsController;
