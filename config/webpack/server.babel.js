import fs from 'fs';
import webpack from 'webpack';
import * as shared from './shared';

const nodeModules = fs
  .readdirSync('node_modules')
  .filter(file => file !== '.bin')
  .map(mod => ({ [mod]: `commonjs ${mod}` }));

export default {
  context: shared.ROOT_PATH,
  entry: ['babel-polyfill', './src/server/'],
  devtool: 'eval',
  output: {
    path: shared.ASSETS_PATH,
    filename: 'server.js'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    ...shared.PLUGINS
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react', 'stage-1'] }
      }, {
        test: /\.css$/,
        loader: shared.DEV
          ? 'css/locals?modules&localIdentName=[hash:3]_[local]!postcss'
          : 'css/locals?minimize&modules&localIdentName=[hash:base64:4]!postcss'
      },
      ...shared.LOADERS
    ]
  },
  postcss: shared.POSTCSS
};
