// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
'use strict';

const APIError = require('./APIError');
const jwt = require('jsonwebtoken');
const debug = require('debug')('service:security');

const securityService = {
    /**
     * @summary Vérification d'une session active
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns boolean
     */
    isConnected (req, res, next) {
        if (req.headers?.authorization) {
            const token = req.headers.authorization?.split(' ')[1];

            if (securityService.checkToken(token)) {
                req.isConnected = true;
            }
            else {
                req.isConnected = false;
            }
        }
        debug(`token valide : ${req.isConnected}`);
        next();
    },

    /**
     * Token generation
     * @param {*} user
     * @returns
     */
    getToken (user) {
        return jwt.sign(user,
            process.env.JWT_SECRET,
            {
                expiresIn: '12h',
            },
        );
    },

    /**
     * Token validation
     * @param {*} req
     * @param {int} id
     */
    checkToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        catch (err) {
            const error = new APIError(err.message, 403);

            return(error);
        }
    },

    /**
     * @summary Vérification de l'identité
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns boolean
     */
    isUser (req, res, next) {
        const { id } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = securityService.checkToken(token);

        if (Number(id) === decoded.id) {
            req.isUser = true;
        }
        else {
            req.isUser = false;
        }
        debug(`isUser : ${req.isUser}`);
        next();
    },

    /**
     * @summary Vérification de la propriété d'un artwork
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns boolean
     */
    async isArtworkOwner (req, res, next) {
        const { id } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = securityService.checkToken(token);

        const dataMapper = require('../models/artworks');
        const { ownerId } = await dataMapper.getOwner(id);

        if (!ownerId) {
            const error = new APIError('Artwork not found', 404);

            next(error);
        }
        else if (ownerId === decoded.id) {
            req.isOwner = true;
        }
        else {
            req.isOwner = false;
        }
        debug(`isOwner : ${req.isOwner}`);
        next();
    },

    /**
     * @summary Vérification de la propriété d'une collection
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns boolean
     */
    async isCollectionOwner (req, res, next) {
        const { id } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = securityService.checkToken(token);

        const dataMapper = require('../models/collections');
        const { ownerId } = await dataMapper.getOwner(id);

        if (!ownerId) {
            const error = new APIError('Collection not found', 404);

            next(error);
        }
        else if (ownerId === decoded.id) {
            req.isOwner = true;
        }
        else {
            req.isOwner = false;
        }
        debug(`isOwner : ${req.isOwner}`);
        next();
    },

    /**
     * @summary Vérification de la propriété d'un commentaire
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns boolean
     */
    async isCommentOwner (req, res, next) {
        const { id } = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = securityService.checkToken(token);

        const dataMapper = require('../models/comments');
        const { ownerId } = await dataMapper.getOwner(id);

        console.log(ownerId, decoded);
        if (!ownerId) {
            const error = new APIError('Comment not found', 404);

            next(error);
        }
        else if (ownerId === decoded.id) {
            req.isOwner = true;
        }
        else {
            req.isOwner = false;
        }
        debug(`isOwner : ${req.isOwner}`);
        next();
    },
};

module.exports = securityService;
