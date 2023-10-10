// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/comments');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const commentsController = {
    create: async (req, res, next) => {
        const { id } = req.params;
        const newComment = req.body;

        if (!req.isUser) {
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
        const { id } = req.params;

        const { error, comments } = await dataMapper.getAll(id);

        if (error) {
            next(error);
        }
        else {
            debug(comments);
            res.status(200).json(comments);
        }
    },

    update: async (req, res, next) => {
        const { id } = req.params;
        const newComment = req.body;

        if (!req.isOwner) {
            return next(new APIError('Forbidden', 403));
        }

        const { error, comment } = await dataMapper.update({ id, ...newComment });

        if (error) {
            next(error);
        }
        else {
            debug(comment);
            res.status(200).json(comment);
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
            res.json('Comment deleted');
        }
    },
};

module.exports = commentsController;
