var path = require('path');
var webpack = require('webpack');

var port = parseInt(process.env.PORT) + 1 || 3001;

module.exports = {
  // cheap: no column-mappings in the source-map
  // module: source-maps from loaders are simplified to a single mapping per line.
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:' + port + '/__webpack_hmr',
    './src/client.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:' + port + '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
