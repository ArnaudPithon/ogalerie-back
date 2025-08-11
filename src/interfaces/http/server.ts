import fs from 'fs';
import https from 'https';

import express from 'express';
import session from 'express-session';
import cors from 'cors';

import { credentials, sslPath } from '@/config/http.js';

import router from './router.js';

export const startServer = () => {
  const { PORT_HTTP, PORT_HTTPS, SESSION_SECRET } = credentials;

  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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

  app.use(router);

  app.listen(PORT_HTTP, () => {
    console.log(`listening at http://localhost:${PORT_HTTP} …`);
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
    console.log(`listening at https://localhost:${PORT_HTTPS} …`);

  } catch (err) {
    console.error(err);
  }
};
