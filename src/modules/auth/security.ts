import jwt from 'jsonwebtoken';

import type { RequestHandler } from 'express';

import APIError from '@/infrastructure/shared/APIError.js';
import { assert } from '@/infrastructure/shared/utils.js';

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
      req.isConnected = checkSignedIn(req.headers.authorization);

      if (required && !req.isConnected) {
        throw new APIError('You must be connected to access this resource', 401);
      }

      next();
    };
  },

  /**
   * @summary Middleware to confirm user identity
   */
  checkIdentity(req, _res, next) {
    req.isUser = false;
    let pretendId: number;

    try {
      pretendId = Number(req.params.id);
      assert(pretendId);
    } catch {
      throw new APIError('Cannot confirm identity', 400);
    }

    const realId = getUserId(req.headers.authorization);

    req.isUser = pretendId === realId;
    next();
  },

  /**
  * @summary Middleware to check if the user is the owner of an entity
  */
  checkOwner(entity) {
    return async (req, _res, next) => {
      req.isOwner = false;
      let entityId: number;

      try {
        entityId = Number(req.params.id);
        assert(entityId);
      } catch {
        throw new APIError('Cannot identify the entity', 400);
      }

      const identity = getUserId(req.headers.authorization);
      const owner = await findOwner(entity, entityId);

      req.isOwner = identity === owner;
      next();
    };
  },
};
