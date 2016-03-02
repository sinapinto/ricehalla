/* eslint-disable max-len */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as shared from './shared';

export default {
  context: shared.ROOT_PATH,
  devtool: shared.DEV ? 'cheap-module-eval-source-map' : 'source-map',
  entry: shared.DEV ? [
    `webpack-hot-middleware/client?path=http://localhost:${shared.PORT}/__webpack_hmr`,
    './src/client.js'
  ] : [
    './src/client.js'
  ],
  output: {
    filename: 'bundle.js',
    path: shared.ASSETS_PATH,
    publicPath: shared.DEV ? `http://localhost:${shared.PORT}/dist/` : '/dist/'
  },
  target: 'web',
  plugins: shared.DEV ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    ...shared.PLUGINS
  ] : [ // prod
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    ...shared.PLUGINS
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(shared.ROOT_PATH, './src'),
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          env: {
            development: {
              plugins: [['react-transform', {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react'],
                  },
                ]
              }]]
            }
          }
        }
      }, {
        test: /^((?!\.global).)*\.css$/,
        loader: shared.DEV
          ? 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!postcss'
          : ExtractTextPlugin.extract('style', 'css?minimize&modules&localIdentName=[hash:base64:4]!postcss')
      }, {
        test: /\.global\.css$/,
        loader: shared.DEV
          ? 'style!css!less'
          : ExtractTextPlugin.extract('style', 'css?minimize!less')
      },
      ...shared.LOADERS
    ]
  },
  postcss: shared.POSTCSS
};
