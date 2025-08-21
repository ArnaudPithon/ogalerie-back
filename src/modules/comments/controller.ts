// vim: foldlevel=1:foldnestmax=2
import debugFactory from 'debug';
import type { Request, Response, NextFunction } from 'express';

import dataMapper from './model.js';
import APIError from '../../infrastructure/shared/APIError.js';

const debug = debugFactory('controller');

const commentsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const newComment = req.body.data;

    debug(newComment);

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error, comment } = await dataMapper.create({ ownerId: Number(id), ...newComment });

    if (error) {
      next(error);
    } else {
      debug(comment);

      return res.status(201).json(comment);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { error, comments } = await dataMapper.getAll(Number(id));

    if (error) {
      next(error);
    } else {
      debug(comments);

      return res.status(200).json(comments);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const newComment = req.body;

    if (!req.isOwner) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error, comment } = await dataMapper.update({ id, ...newComment });

    if (error) {
      next(error);
    } else {
      debug(comment);

      return res.status(200).json(comment);
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
      return res.json('Comment deleted');
    }
  },
};

export default commentsController;
