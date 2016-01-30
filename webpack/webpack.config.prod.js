var path = require('path');
var webpack = require('webpack');

var rootPath = path.resolve(__dirname, '..');
var assetsPath = path.resolve(rootPath, './static/dist');

module.exports = {
  devtool: 'source-map',
  context: rootPath,
  entry: [
    './src/client.js'
  ],
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.resolve(rootPath, './src'),
      loaders: ['babel']
    }]
  }
};
