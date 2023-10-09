// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/comments');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const commentsController = {
    create: async (req, res, next) => {
        const { id } = req.params;
        const newComment = req.body;

        if (req.isUser) {
            return next(new APIError('Forbidden', 403));
        }

        const { error, comment } = await dataMapper.create({ id, ...newComment });

        if (error) {
            next(error);
        }
        else {
            debug(comment);
            res.status(201).json(comment);
        }
    },

    getAll: async (req, res, next) => {
    },

    update: async (req, res, next) => {
    },

    delete: async (req, res, next) => {
    },
};

module.exports = commentsController;
