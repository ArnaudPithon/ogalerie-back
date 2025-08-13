import fs from 'fs';
import https from 'https';

import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { credentials, sslPath } from '@/config/http.js';
import { httpLogger, logEvent, logger } from '@/interfaces/logger/logger.js';
import { errorHandler } from '@/interfaces/http/middlewares/errorHandler.js';

import router from './router.js';

export const startServer = () => {
  const { PORT_HTTP, PORT_HTTPS, SESSION_SECRET } = credentials;

  const app = express();

  /**
   * @description Middleware de journalisation HTTP
   */
  app.use(httpLogger);

  /**
   * @description Middleware CORS
   */
  app.use(cors());

  /**
   * @description Middleware pour parser le JSON et les données URL-encodées
   */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /**
   * @description Middleware de session
   */
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        // options pour le cookie
      },
    }),
  );

  /**
   * @description Routeur principal de l'application
   */
  app.use(router);

  /**
   * @description Middleware global d'erreur
   */
  app.use(errorHandler);

  /**
    * @description Démarre le serveur HTTP et HTTPS
    */
  app.listen(PORT_HTTP, () => {
    logEvent('listening on HTTP …', { port: PORT_HTTP });
  });

  try {
    const { keyPath, certPath } = sslPath;
    const server = https.createServer(
      {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
      app,
    );

    server.listen(PORT_HTTPS);
    logEvent('listening on HTTPS …', { port: PORT_HTTPS });

  } catch (err) {
    logger.error(err);
  }

  /**
    * @description Gère les signaux d'arrêt du processus
    */
  process.on('exit', (code) => {
    logger.info({ code }, 'See u soon old boy');
  });

  /**
    * @description Gère les erreurs non gérées
    */
  process.on('unhandledRejection', (reason) => {
    throw reason; // Passe au suivant
  });

  /**
    * @description Gère les exceptions non gérées
    */
  process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Exception non gérée');
    process.exit(1);
  });
};
