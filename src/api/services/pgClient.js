'use strict';

const { Pool } = require('pg');
const client = new Pool();

client.connect();

module.exports = client;
