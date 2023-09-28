'use strict';

const { Client } = require('pg');

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

const client = new Client(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
);

client.connect();

module.exports = client;
