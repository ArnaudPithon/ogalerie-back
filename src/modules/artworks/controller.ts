// vim: foldlevel=1:foldnestmax=2
import debugFactory from 'debug';
import type { Request, Response, NextFunction } from 'express';

import APIError from '@/infrastructure/shared/APIError.js';
import dataMapper from '@/modules/artworks/model.js';
import userDataMapper from '@/modules/users/model.js';
import { getUserId } from '@/modules/auth/helpers.js';

const debug = debugFactory('controller');

const artworksController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const newArtwork = req.body;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const response = await userDataMapper.getCollections(Number(id));
    const userCollections = response.collections;

    // Confirme que l'artwork appartient bien à une collection de l'utilisateur
    if (
      !userCollections?.filter((c) => c.id === Number(newArtwork.collection_id))
        .length
    ) {
      next(
        new APIError(
          "La collection cible n'appartient pas à l'utilisateur",
          403,
        ),
      );

      return;
    }

    newArtwork.ownerId = Number(id);

    debug(newArtwork);
    const { error, artwork } = await dataMapper.create(newArtwork);

    if (error) {
      next(error);
    } else {
      debug(artwork);

      return res.status(201).json(artwork);
    }
  },

  getArtwork: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    // On affecte par défaut une id qui ne peut exister en BDD pour un utilisateur
    // qui n'est pas connecté.
    let viewverId = 0;

    if (req.isConnected) {
      viewverId = getUserId(req.headers.authorization);
    }

    const { error, artwork } = await dataMapper.getArtwork(Number(id), viewverId);

    if (error) {
      next(error);
    } else {
      return res.json(artwork);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.isOwner) {
      next(new APIError('Forbidden', 403));

      return;
    }

    const { error, artwork } = await dataMapper.update({ id, ...req.body });

    if (error) {
      next(error);
    } else {
      return res.json(artwork);
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
      return res.json('Artwork deleted');
    }
  },

  setFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { artworkId } = req.body;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }
    const { error, result } = await dataMapper.setFavorite({
      artworkId,
      userId: Number(id),
    });

    if (error) {
      next(error);
    } else {
      return res.status(201).json(result);
    }
  },

  deleteFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { artworkId } = req.body;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }
    const { error, result } = await dataMapper.deleteFavorite({
      artworkId,
      userId: Number(id),
    });

    if (error) {
      next(error);
    } else {
      return res.json(result);
    }
  },

  setAppraise: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { artworkId } = req.body;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }
    const { error, result } = await dataMapper.setAppraise({
      artworkId,
      userId: Number(id),
    });

    if (error) {
      next(error);
    } else {
      return res.status(201).json(result);
    }
  },

  deleteAppraise: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { artworkId } = req.body;

    if (!req.isUser) {
      next(new APIError('Forbidden', 403));

      return;
    }
    const { error, result } = await dataMapper.deleteAppraise({
      artworkId,
      userId: Number(id),
    });

    if (error) {
      next(error);
    } else {
      return res.json(result);
    }
  },

  random: async (_req: Request, res: Response, next: NextFunction) => {
    const { error, result } = await dataMapper.random();

    if (error) {
      next(error);
    } else {
      return res.json(result);
    }
  },

  getAllArtworks: async (_req: Request, res: Response, next: NextFunction) => {
    const { error, artworks } = await dataMapper.getAllArtworks();

    if (error) {
      next(error);
    } else {
      debug(artworks);

      return res.json(artworks);
    }
  },

  filter: async (req: Request, res: Response, next: NextFunction) => {
    const { error, artworks } = await dataMapper.filter(req.query);

    if (error) {
      next(error);
    } else {
      return res.status(200).json(artworks);
    }
  },
};

export default artworksController;
