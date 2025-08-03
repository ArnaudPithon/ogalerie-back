'use strict';

import 'dotenv/config';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import session from 'express-session';
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const PORTS = process.env.PORTS || 8443;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sslDir = path.resolve(__dirname, '../ssl');
const keyPath = path.join(sslDir, 'privkey.pem');
const certPath = path.join(sslDir, 'fullchain.pem');

const app = express();

app.use(cors());

import routers from './api/routers/index.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      // options pour le cookie
    },
  }),
);

app.use(routers);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT} …`);
});

try {
  const server = https.createServer(
    {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
    app,
  );

  (async () => {
    server.listen(PORTS);
  })();
} catch (err) {
  console.error(err);
}
