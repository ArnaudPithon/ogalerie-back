import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { httpLogger, logger } from '@/interfaces/logger/logger.js';
import { errorHandler } from '@/interfaces/http/middlewares/errorHandler.js';
import { credentials } from '@/config/http.js';

import router from './interfaces/http/router.js';
import { startServers } from './interfaces/http/server.js';
import shutdown from './interfaces/http/shutdown.js';

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
const { SESSION_SECRET } = credentials;

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
  * @description Middleware global de gestion d'erreur
  */
app.use(errorHandler);

/**
 * @description Démarre les serveurs HTTP et HTTPS
 */
const { httpServer, httpsServer } = startServers(app);

/**
 * @description Gère les signaux d'arrêt du processus
 */
process.on('SIGINT', () => shutdown('SIGINT', httpServer, httpsServer));
process.on('SIGTERM', () => shutdown('SIGTERM', httpServer, httpsServer));

/**
  * @description Attrape les erreurs non gérées
  */
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Rejection non gérée');
  shutdown('SIGTERM', httpServer, httpsServer);
  process.exit(1);
});

/**
  * @description Attrape les exceptions non gérées
  */
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Exception non gérée');
  shutdown('SIGTERM', httpServer, httpsServer);
  process.exit(1);
});
