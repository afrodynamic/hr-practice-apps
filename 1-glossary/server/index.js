require('dotenv').config();
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const Glossary = require('./db');

const app = express();
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));

const port = process.env.PORT || 3000;

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

app.get('/api/glossary', (request, response) => {
  console.log('Retrieving glossary from database');

  Glossary.find({}, (error, results) => {
    if (error) {
      console.log('Error retrieving glossary from database:', error);
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

app.post('/api/glossary', (request, response) => {
  console.log('Creating glossary entry:', request.body);

  Glossary.create(request.body, (error, results) => {
    if (error) {
      console.log('Error creating glossary entry:', error);
      response.sendStatus(500);
    } else {
      console.log('Created glossary entry:', results);
      response.json(results);
    }
  });
});

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
