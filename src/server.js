'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const PORTS = process.env.PORTS || 8443;

const fs = require('fs');
const https = require('https');
const express = require('express');
const session = require('express-session');

const cors = require('cors');

const app = express();

app.use(cors());

const routers = require('./api/routers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        // options pour le cookie
    },
}));

app.use(routers);

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT} …`);
});

try {
    const server = https.createServer({
        key: fs.readFileSync(`${__dirname}/../ssl/privkey.pem`),
        cert: fs.readFileSync(`${__dirname}/../ssl/fullchain.pem`),
    }, app);

    (async () => {
        await server.listen(PORTS);
    })();
} catch (err) {
    console.error(err);
}
