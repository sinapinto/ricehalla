import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';

import handleRender from './handleRender';

const app = express();

app.use(favicon(path.resolve(__dirname, '../../static/favicon.ico')));

app.use(express.static(path.join(__dirname, '../../static')));

app.get('/api/counter', (req, res) => {
  setTimeout(() => res.status(200).send({ response: 420 }), 400);
});

app.all('*', handleRender);

app.listen(__PORT__, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server is listening at http://localhost:%s', __PORT__);
});
