import type http from 'node:http';
import type https from 'node:https';

import { dbDisconnect } from '@/interfaces/db/pgClient.js';
import { logEvent, logger } from '@/interfaces/logger/logger.js';

let shuttingDown: boolean = false;

/**
 * @description Ferme un serveur HTTP ou HTTPS
 */
function closeServer(server: http.Server | https.Server) {
  return new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
};

/**
 * @description Ferme les serveurs HTTP et HTTPS de manière asynchrone
 */
async function closeAllServers(signal: string, httpServer: http.Server, httpsServer: https.Server) {
  logEvent('Shutting down servers gracefully…', { signal });

  await Promise.all([
    closeServer(httpServer).then(() => logger.info('HTTP server shut down gracefully')),
    closeServer(httpsServer).then(() => logger.info('HTTPS server shut down gracefully')),
  ])
    .catch(err => {
      logger.error({ err }, 'Error during servers shutdown');
    });
}

/**
 * @description Gère la fermeture des serveurs HTTP et HTTPS ainsi que
 * la déconnexion de la base de données
 */
export default function shutdown(signal: string, httpServer: http.Server, httpsServer: https.Server) {
  if (shuttingDown) return;
  shuttingDown = true;

  closeAllServers(signal, httpServer, httpsServer)
    .catch((err: Error) => {
      logger.fatal({ err }, 'Error during shutdown');
    })
    .finally(() => {
      dbDisconnect()
        .catch((err: Error) => {
          logger.error({ err }, 'Error disconnecting from database');
        })
        .finally(() => {
          logger.info('See u soon old boy');
          logger.flush();
        });
    });
}
