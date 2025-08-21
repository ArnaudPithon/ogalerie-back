import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';

import type express from 'express';

import { credentials, sslPath } from '@/config/http.js';
import { logEvent } from '@/interfaces/logger/logger.js';

export function startServers(app: express.Express) {
  const { PORT_HTTP, PORT_HTTPS } = credentials;

  /**
    * @description Démarre les serveurs HTTP et HTTPS
    */
  const { keyPath, certPath } = sslPath;

  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    app,
  );

  httpServer.listen(PORT_HTTP, () => {
    logEvent('listening on HTTP …', { port: PORT_HTTP });
  });

  httpsServer.listen(PORT_HTTPS, () => {
    logEvent('listening on HTTPS …', { port: PORT_HTTPS });
  });

  return { httpServer, httpsServer };
}
