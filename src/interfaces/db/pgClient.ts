import { Client } from 'pg';

import credentials from '@/config/db.js';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = credentials;

const client = new Client(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
);

await client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });

export default client;
