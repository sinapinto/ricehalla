var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var port = parseInt(process.env.PORT) + 1 || 3001;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('Webpack dev server listening on port %s', port);
  }
});
