'use strict';

const dataMapper = require('../models/dataMapper');
const debug = require('debug')('controller');

const userController = {
    creators: async (req, res, next) => {
        const { error, creators } = await dataMapper.getCreators();

        if (error) {
            next(error);
        }
        else {
            res.json(creators);
        }
    },
};

module.exports = userController;
