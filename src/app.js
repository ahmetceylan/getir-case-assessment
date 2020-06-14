
const winston = require('winston');
const express = require('express');
require('dotenv').config();
const router = require('./api/router');
const app = express();
const DatabaseConnection = require('./datastore/db-connection');
require('./api/helpers/logger'); // for logging

// initialize database connection
DatabaseConnection();

// init router configs
router(app);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;