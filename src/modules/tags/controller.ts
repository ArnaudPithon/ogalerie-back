// vim: foldlevel=1:foldnestmax=2
import type { Request, Response, NextFunction } from 'express';
import dataMapper from './model.js';

const tagsController = {
  read: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { error, tag } = await dataMapper.read(Number(id));

    if (error) {
      next(error);
    } else {
      return res.status(200).json(tag);
    }
  },

  getTags: async (_req: Request, res: Response, next: NextFunction) => {
    const { error, tags } = await dataMapper.getTags();

    if (error) {
      next(error);
    } else {
      return res.status(200).json(tags);
    }
  },

  getTags2: async (_req: Request, res: Response, next: NextFunction) => {
    const { error, tags } = await dataMapper.getTags2();

    if (error) {
      next(error);
    } else {
      return res.status(200).json(tags);
    }
  },
};

export default tagsController;
