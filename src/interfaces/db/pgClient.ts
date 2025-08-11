import { Client } from 'pg';

import credentials from '@/config/db.js';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = credentials;

const client = new Client(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
);

client.connect();

export default client;
