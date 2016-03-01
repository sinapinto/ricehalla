import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import postcss from './postcss.js';

const __DEV__ = process.env.NODE_ENV !== 'production';
const __HOST__ = process.env.HOST || 'localhost';
const __PORT__ = parseInt(process.env.PORT, 10) || 3000;
const rootPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(rootPath, './static/dist');

const nodeModules = fs
  .readdirSync('node_modules')
  .filter(file => file !== '.bin')
  .map(mod => ({ [mod]: `commonjs ${mod}` }));

export default {
  context: rootPath,
  entry: ['babel-polyfill', './src/server/'],
  devtool: 'eval',
  output: {
    path: assetsPath,
    filename: 'server.js'
  },
  externals: nodeModules,
  target: 'node',
  node: {
    __dirname: true,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: __DEV__ ? JSON.stringify('development') : JSON.stringify('production')
      },
      __DEV__,
      __HOST__: JSON.stringify(__HOST__),
      __PORT__,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react', 'stage-1'] }
      }, {
        test: /\.css$/,
        loader: __DEV__
          ? 'css/locals?modules&localIdentName=[name]_[local]_[hash:base64:3]!postcss'
          : 'css/locals?minimize&modules&localIdentName=[hash:base64:4]!postcss'
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url',
        query: {
          limit: 8192,
        },
      }
    ]
  },
  postcss
};
