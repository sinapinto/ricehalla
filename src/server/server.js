/* eslint-disable no-console */

import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';

import render from './render';
import battle from './battles';

const app = express();

app.use(compression());
app.use(favicon(path.resolve(__dirname, '../../static/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../static')));

app.get('/api/battles', battle);

app.all('*', render);

app.listen(__PORT__, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server is listening at http://localhost:%s', __PORT__);
});
