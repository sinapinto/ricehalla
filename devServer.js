import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import config from './webpack.config.dev';

const app = Express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  quiet: true,
  hot: true,
  inline: true,
  lazy: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Development server listening at http://%s:%s', host, port);
});
