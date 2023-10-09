// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const dataMapper = require('../models/tags');
const APIError = require('../services/APIError');
const debug = require('debug')('controller');

const tagsController = {
    read: async (req, res, next) => {
        const { id } = req.params;
        const { error, tag } = await dataMapper.read(id);

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(tag);
        }
    },

    getTags: async (req, res, next) => {
        const { error, tags } = await dataMapper.getTags();

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(tags);
        }
    },
};

module.exports = tagsController;
