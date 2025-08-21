// vim: foldlevel=1:foldnestmax=2
import debugFactory from 'debug';
import type { Request, Response, NextFunction } from 'express';

import dataMapper from './model.js';
import APIError from '@/infrastructure/shared/APIError.js';

const debug = debugFactory('controller');

const collectionsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }
    if (!title) {
      next(new APIError('Collection need a title', 400));

      return;
    }

    const newCollection = { title, ownerId: Number(id) };

    debug(newCollection);
    const { error, collection } = await dataMapper.create(newCollection);

    if (error) {
      next(error);
    } else {
      return res.status(201).json(collection);
    }
  },

  read: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { error, collection } = await dataMapper.read(Number(id));

    if (error) {
      next(error);
    } else {
      return res.status(200).json(collection);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.isOwner) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error, collection } = await dataMapper.update({ id, ...req.body });

    if (error) {
      next(error);
    } else {
      return res.json(collection);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.isOwner) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error } = await dataMapper.delete(Number(id));

    if (error) {
      next(error);
    } else {
      return res.json('Collection deleted');
    }
  },

  getArtworks: async (_req: Request, _res: Response, _next: NextFunction) => { },
};

export default collectionsController;
