// vim: foldlevel=1:foldnestmax=2
import jwt from 'jsonwebtoken';

import type { RequestHandler } from 'express';

import APIError from '@/infrastructure/shared/APIError.js';

import type { Entity, User } from '@/types/auth.js';

import { findOwner, getJwtSecret, checkSignedIn, getUserId } from './helpers.js';

interface securityServiceInterface {
  connectionRequired: (required?: boolean) => RequestHandler,
  getToken: (user: User) => string,
  checkIdentity: RequestHandler,
  checkOwner: (entity: Entity) => RequestHandler,
}
export const securityService: securityServiceInterface = {
  /**
   * @summary Génération d'un token JWT
   */
  getToken(user) {
    const jwtSecret = getJwtSecret();

    return jwt.sign(user, jwtSecret, {
      expiresIn: '12h',
    });
  },

  /**
   * @summary Middleware to check if the user is connected
   */
  connectionRequired(required = true) {
    return (req, _res, next) => {
      req.isConnected = false;
      try {
        req.isConnected = checkSignedIn(req.headers.authorization);
      } catch { }

      if (required && !req.isConnected) {
        next(new APIError('You must be connected to access this resource', 401));

        return;
      }

      next();
    };
  },

  /**
   * @summary Middleware to confirm user identity
   */
  checkIdentity(req, _res, next) {
    req.isUser = false;

    try {
      const pretendId = Number(req.params.id);

      const realId = getUserId(req.headers.authorization);

      req.isUser = pretendId === realId;
    } catch { }

    next();
  },

  /**
  * @summary Middleware to check if the user is the owner of an entity
  */
  checkOwner(entity) {
    return async (req, _res, next) => {
      req.isOwner = false;

      try {
        const entityId = req.params.id;

        if (typeof entityId === 'undefined') {
          throw new APIError('Entity ID is required', 400);
        }

        const identity = getUserId(req.headers.authorization);

        const owner = await findOwner(entity, entityId);

        req.isOwner = identity === owner;
      } catch { }

      next();
    };
  },
};
