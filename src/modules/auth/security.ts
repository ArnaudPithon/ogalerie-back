// vim: foldlevel=1:foldnestmax=2
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import debugFactory from 'debug';

import type { RequestHandler } from 'express';

import APIError from '../../infrastructure/shared/APIError.js';

const debug = debugFactory('service:security');

type UserJwtPayload = JwtPayload & { id: number };

interface securityServiceInterface {
  isBearerToken: (authHeader: unknown) => authHeader is string,
  isConnected: RequestHandler,
  getToken: (user: string) => string | void,
  checkToken: (token: string) => UserJwtPayload,
  isUser: RequestHandler,
  isArtworkOwner: RequestHandler,
  isCollectionOwner: RequestHandler,
  isCommentOwner: RequestHandler,
}
const securityService: securityServiceInterface = {
  isBearerToken(authHeader): authHeader is string {
    return typeof authHeader === 'string' && authHeader.startsWith('Bearer ');
  },
  /**
   * @summary Vérification d'une session active
   * @returns boolean
   */
  isConnected(req, _res, next) {
    const authHeader = req.headers.authorization;

    if (!securityService.isBearerToken(authHeader)) {
      next(new APIError('Authorization header is missing or invalid', 401));

      return;
    }
    const token = authHeader.split(' ')[1];

    if (securityService.checkToken(token)) {
      req.isConnected = true;
    } else {
      req.isConnected = false;
    }
    debug(`token valide : ${req.isConnected.toString()}`);
    next();
  },

  /**
   * Token generation
   */
  getToken(user) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new APIError('No JWT secret defined', 500);
    }

    return jwt.sign(user, jwtSecret, {
      expiresIn: '12h',
    });

  },

  /**
   * Token validation
   */
  checkToken(token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new APIError('No JWT secret defined', 401);
      }

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (typeof decoded !== 'object' || decoded === null || typeof decoded.id !== 'number') {
        throw new APIError('Invalid token payload', 401);
      }

      return decoded as UserJwtPayload;
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        const message = err.message ?? 'Token invalide';

        throw new APIError(message, 401, err);
      } else {
        throw new APIError('Invalid or expired token', 401);
      }
    }
  },

  /**
   * @summary Vérification de l'identité
   * @returns boolean
   */
  isUser(req, _res, next) {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!securityService.isBearerToken(authHeader)) {
      next(new APIError('Authorization header is missing or invalid', 401));

      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = securityService.checkToken(token);

    if (Number(id) === decoded.id) {
      req.isUser = true;
    } else {
      req.isUser = false;
    }
    debug(`isUser : ${req.isUser.toString()}`);
    next();
  },

  /**
   * @summary Vérification de la propriété d'un artwork
   * @returns boolean
   */
  async isArtworkOwner(req, _res, next) {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!securityService.isBearerToken(authHeader)) {
      next(new APIError('Authorization header is missing or invalid', 401));

      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = securityService.checkToken(token);

    const dataMapper = require('@/models/artworks.js');
    const { ownerId } = await dataMapper.getOwner(id);

    if (!ownerId) {
      next(new APIError('Artwork not found', 404));

      return;
    } else if (ownerId === decoded.id) {
      req.isOwner = true;
    } else {
      req.isOwner = false;
    }
    debug(`isOwner : ${req.isOwner.toString()}`);
    next();
  },

  /**
   * @summary Vérification de la propriété d'une collection
   * @returns boolean
   */
  async isCollectionOwner(req, _res, next) {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!securityService.isBearerToken(authHeader)) {
      next(new APIError('Authorization header is missing or invalid', 401));

      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = securityService.checkToken(token);

    const dataMapper = require('@/models/collections.js');
    const { ownerId } = await dataMapper.getOwner(id);

    if (!ownerId) {
      next(new APIError('Collection not found', 404));

      return;
    } else if (ownerId === decoded.id) {
      req.isOwner = true;
    } else {
      req.isOwner = false;
    }
    debug(`isOwner : ${req.isOwner.toString()}`);
    next();
  },

  /**
   * @summary Vérification de la propriété d'un commentaire
   * @returns boolean
   */
  async isCommentOwner(req, _res, next) {
    const { id } = req.params;
    const authHeader = req.headers.authorization;

    if (!securityService.isBearerToken(authHeader)) {
      next(new APIError('Authorization header is missing or invalid', 401));

      return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = securityService.checkToken(token);

    const dataMapper = require('@/models/comments.js');
    const { ownerId } = await dataMapper.getOwner(id);

    if (!ownerId) {
      next(new APIError('Comment not found', 404));

      return;
    } else if (ownerId === decoded.id) {
      req.isOwner = true;
    } else {
      req.isOwner = false;
    }
    debug(`isOwner : ${req.isOwner.toString()}`);
    next();
  },
};

export default securityService;
