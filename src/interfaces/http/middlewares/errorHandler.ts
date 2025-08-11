import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';

import type { Response, NextFunction } from 'express';
import debugFactory from 'debug';

import APIError from '@/infrastructure/shared/APIError.js';
import type { apiError } from '@/types/APIError.js';

const debug = debugFactory('errorHandler');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorHandler = {
  /**
   * Méthode de gestion d'erreur
   * @param {*} err
   * @param {*} res
   */
  async manage(err: apiError, res: Response) {
    // j'écris dans le fichier de logs
    await errorHandler.log(err);

    debug(err.error);

    res.status(err.code).json({ error: err.message });
  },
  /**
   * Méthode pour enregistrer les fichiers de logs
   * @param {*} err
   */
  async log(err: apiError) {
    debug(err);

    const fileName = `${err.date.toISOString().slice(0, 10)}.log`;
    const path = join(__dirname, `../../log/${fileName}`);

    /*
     * Nous allons logguer le moment où est
     * survenue l'erreur, le message de celle-ci, la
     * stacktrace ainsi que le contexte (par exemple le
     * endpoint de notre API qui a conduit à l'erreur)
     */
    const time = err.date.toISOString().slice(11, -1);
    let errorMessage;

    if (err.error) {
      errorMessage = err.error.message;
    } else {
      errorMessage = err.message;
    }
    const text = `${time};${errorMessage};${err.stack}\r\n`;

    await appendFile(path, text);
  },
  notFound({ url }: { url: string }, next: NextFunction) {
    const message = `Url ${url} not found !`;
    const err = new APIError(message, 404);

    next(err);
  },
};

export default errorHandler;
