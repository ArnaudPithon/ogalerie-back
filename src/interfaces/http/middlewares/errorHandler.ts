import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';

import type { RequestHandler, ErrorRequestHandler } from 'express';

import debugFactory from 'debug';

import APIError from '@/infrastructure/shared/APIError.js';
import type { ApiError } from '@/types/APIError.js';

const debug = debugFactory('errorHandler');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface errorHandlerInterface {
  manage: ErrorRequestHandler;
  log: ErrorRequestHandler;
  notFound: RequestHandler;
}
const errorHandler: errorHandlerInterface = {
  async manage(err, _req, res, next) {
    // j'écris dans le fichier de logs
    await errorHandler.log(err, _req, res, next);

    debug(err.error);

    res.status(err.code).json({ error: err.message });
  },
  /**
   * Méthode pour enregistrer les fichiers de logs
   * @param {*} err
   */
  async log(err: ApiError) {
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
  notFound(req, _res, next) {
    const message = `Url ${req.url} not found !`;
    const err = new APIError(message, 404);

    next(err);
  },
};

export default errorHandler;
