// vim: foldlevel=1:foldnestmax=2
import bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from 'express';
import debugFactory from 'debug';

import dataMapper from './model.js';
import type { Situation } from '@/types/auth.js';

import APIError from '@/infrastructure/shared/APIError.js';
import { securityService } from '@/modules/auth/security.js';

const debug = debugFactory('controller');

const usersController = {
  /**
   * Add a user in DB
   */
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    debug('body', req.body);

    // Password hash
    newUser.hash = await bcrypt.hash(
      newUser.password,
      Number(process.env.SALT),
    );
    delete req.body.password;

    debug('body', req.body);

    // Add user to DB
    const { error, user } = await dataMapper.signUp(newUser);

    if (error) {
      next(error);
    } else {
      const token = securityService.getToken(user);
      const response = { ...user, token, logged: true };

      return res.status(201).json(response);
    }
  },
  /**
   * Authenticating a user
   */
  signIn: async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    const { error, user } = await dataMapper.signIn({ email });

    if (error) {
      next(error);
    } else {
      const isPasswordOk = await bcrypt.compare(password, user.hash);

      if (isPasswordOk) {
        delete user.hash;

        const token = securityService.getToken(user);

        /*
         * Le token pourra être déchifré avec :
         * const jwt = require('jsonwebtoken');
         * debug(jwt.verify(token, process.env.JWT_SECRET));
         */

        const response = { ...user, token, logged: true };

        return res.json(response);
      } else {
        // Mot de passe incorrect
        const error = new APIError('Incorrect password', 403);

        next(error);
      }
    }
  },
  users: async (req: Request, res: Response, next: NextFunction) => {
    const role = <Situation>req.params.role ?? 'user';

    const { error, users } = await dataMapper.getUsers(role);

    if (error) {
      next(error);
    } else {
      return res.json(users);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let request;

    if (req.isUser) {
      request = dataMapper.getUser;
    } else {
      request = dataMapper.getProfilPublic;
    }

    const { error, user } = await request(Number(id));

    if (error) {
      next(error);
    } else {
      let response;

      if (req.isUser) {
        response = { ...user, logged: true };
      } else {
        response = { ...user, logged: false };
      }

      return res.json(response);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error, user } = await dataMapper.update({ id, ...req.body });

    if (error) {
      next(error);
    } else {
      return res.json(user);
    }
  },

  /**
   * Remove a user from DB
   */
  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error } = await dataMapper.delete(Number(id));

    if (error) {
      next(error);
    } else {
      return res.json('User deleted');
    }
  },

  getCollections: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { error, collections } = await dataMapper.getCollections(Number(id));

    if (error) {
      next(error);
    } else {
      return res.json(collections);
    }
  },

  getArtworks: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { error, artworks } = await dataMapper.getArtworks(Number(id));

    if (error) {
      next(error);
    } else {
      debug(artworks);

      return res.json(artworks);
    }
  },

  getFavorites: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { error, favorites } = await dataMapper.getFavorites(Number(id));

    if (error) {
      next(error);
    } else {
      debug(favorites);

      return res.json(favorites);
    }
  },
};

export default usersController;
