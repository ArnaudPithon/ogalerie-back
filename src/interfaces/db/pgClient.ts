import { Client } from 'pg';

import { logEvent, logger } from '@/interfaces/logger/logger.js';

import credentials from '@/config/db.js';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = credentials;

const client = new Client(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
);

await client.connect()
  .then(() => {
    logEvent('Connected to PostgreSQL database', { host: PGHOST, db: PGDATABASE });
  })
  .catch(err => {
    logger.error('Database connection failed', err);
  });

export async function dbDisconnect() {
  await client.end()
    .then(() => {
      logEvent('Disconnected from PostgreSQL database', { host: PGHOST, db: PGDATABASE });
    });
};

export default client;
