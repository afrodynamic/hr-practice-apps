import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import httpProxy from 'http-proxy';
import path from 'path';
import Glossary, { GlossaryType } from './db';

dotenv.config();

const app = express();
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));

const port = process.env.PORT || 3000;

const proxy = httpProxy.createProxyServer();

const devServerProxy = (request: Request, response: Response, next: NextFunction) => {
  if (request.url.startsWith('/client/dist/')) {
    proxy.web(request, response, {
      target: 'http://localhost:8080',
    });
  } else {
    next();
  }
};

app.use(devServerProxy);

app.get('/api/glossary', (request: Request, response: Response) => {
  console.log('Retrieving glossary from database');

  Glossary.find({}, (error: Error, results: GlossaryType[]) => {
    if (error) {
      console.log('Error retrieving glossary from database:', error);
      response.sendStatus(500);
    } else {
      response.json(results);
    }
  });
});

app.post('/api/glossary', (request: Request, response: Response) => {
  console.log('Creating glossary entry:', request.body);

  Glossary.create(request.body, (error: Error, results: GlossaryType) => {
    if (error) {
      console.log('Error creating glossary entry:', error);
      response.sendStatus(500);
    } else {
      console.log('Created glossary entry:', results);
      response.json(results);
    }
  });
});

app.put('/api/glossary/:id', (request: Request, response: Response) => {
  console.log('Updating glossary term:', request.body);

  Glossary.findByIdAndUpdate(
    request.params.id,
    { $set: { term: request.body.term, description: request.body.description } },
    { new: true },
    (error: Error | null, results: GlossaryType | null) => {
      if (error) {
        console.log('Error updating glossary term:', error);
        response.sendStatus(500);
      } else {
        console.log('Updated glossary term:', results);
        response.json(results);
      }
    });
});

app.delete('/api/glossary/:id', (request: Request, response: Response) => {
  console.log('Deleting glossary term:', request.params.id);

  Glossary.findByIdAndDelete(request.params.id, (error: Error, results: GlossaryType | null) => {
    if (error) {
      console.log('Error deleting glossary term:', error);
      response.sendStatus(500);
    } else {
      console.log('Deleted glossary term:', results);
      response.json(results);
    }
  });
});

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
