require('dotenv').config();
const express = require('express');
const path = require('path');
const sessionHandler = require('./middleware/session-handler');
const logger = require('./middleware/logger');
const httpProxy = require('http-proxy');

// Establishes connection to the database on server start
const db = require('./db');

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));

/****
 *
 *
 * Other routes here....
 *
 *
 */

const proxy = httpProxy.createProxyServer();

const devServerProxy = (request, response, next) => {
  if (request.url.startsWith('/client/dist/')) {
    proxy.web(request, response, {
      target: 'http://localhost:8080',
    });
  } else {
    next();
  }
};

app.use(devServerProxy);

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
