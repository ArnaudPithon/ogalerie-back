import type { Request, Response, NextFunction } from 'express';

import APIError from '@/infrastructure/shared/APIError.js';

/**
 * @description Middleware pour gérer les erreurs dans l'API.
  */
export function errorHandler(err: APIError, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof APIError) {
    // Si l'erreur n'est pas dans la plage des 500, on attribue 500 par
    // défaut
    const status = Number.isInteger(err.code)
      && err.code >= 100
      && err.code < 600
      ? err.code
      : 500;

    if (status >= 500) {
      req.log.error({ err, cause: err.cause }, 'Erreur serveur connue');
    } else {
      req.log.warn({ err, cause: err.cause }, 'Erreur métier');
    }

    return res.status(status).json({
      error: err.expose ? err.message : 'Erreur interne du serveur',
    });
  }

  // Erreur inconnue → crash possible
  req.log.error({ err }, 'Erreur non gérée');
  res.status(500).json({ error: 'Erreur interne du serveur' });
}
