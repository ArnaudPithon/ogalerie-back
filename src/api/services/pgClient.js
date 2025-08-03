'use strict';

import { Client } from 'pg';

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

const client = new Client(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
);

client.connect();

export default client;
