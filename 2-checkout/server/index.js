require('dotenv').config();
const express = require('express');
const path = require('path');
const sessionHandler = require('./middleware/session-handler');
const logger = require('./middleware/logger');
const httpProxy = require('http-proxy');

// Establishes connection to the database on server start
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));

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

app.post('/api/session', async(request, response, next) => {
  const session_id = request.session_id;
  const checkoutData = request.body;
  console.log('checkoutData: ', checkoutData);

  try {
    const [rows] = await db.queryAsync(
      'SELECT * FROM sessions WHERE session_id = ? LIMIT 1',
      [session_id]
    );

    if (rows.length) {
      const result = await db.queryAsync(
        'UPDATE sessions SET checkout_data = ? WHERE session_id = ?',
        [JSON.stringify(checkoutData), session_id]
      );

      response.json({ success: true, id: result.insertId });
    } else {
      const result = await db.queryAsync(
        'INSERT INTO sessions (session_id, checkout_data) VALUES (?, ?)',
        [session_id, JSON.stringify(checkoutData)]
      );

      response.json({ success: true, id: result.insertId });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, error: 'An error occurred saving session data' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
