// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

import dataMapper from '../models/tags';
import APIError from '../services/APIError';
import debugFactory from 'debug';
const debug = debugFactory('controller');

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

    getTags2: async (req, res, next) => {
        const { error, tags } = await dataMapper.getTags2();

        if (error) {
            next(error);
        }
        else {
            res.status(201).json(tags);
        }
    },

};

export default tagsController;
