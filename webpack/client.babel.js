/* eslint-disable max-len */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import postcss from './postcss.js';

const __DEV__ = process.env.NODE_ENV !== 'production';
const __HOST__ = process.env.HOST || 'localhost';
const __PORT__ = parseInt(process.env.PORT, 10) || 3000;
const rootPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(rootPath, './static/dist');

export default {
  context: rootPath,
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : 'source-map',
  entry: __DEV__ ? [
    `webpack-hot-middleware/client?path=http://localhost:${__PORT__}/__webpack_hmr`,
    './src/client.js'
  ] : [
    './src/client.js'
  ],
  output: {
    filename: 'bundle.js',
    path: assetsPath,
    publicPath: __DEV__ ? `http://localhost:${__PORT__}/dist/` : '/dist/'
  },
  target: 'web',
  plugins: __DEV__ ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      __DEV__,
      __HOST__: JSON.stringify(__HOST__),
      __PORT__,
    }),
  ] : [ // prod
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __DEV__,
      __HOST__: JSON.stringify(__HOST__),
      __PORT__,
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(rootPath, './src'),
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
        loader: __DEV__
          ? 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!postcss'
          : ExtractTextPlugin.extract('style', 'css?minimize&modules&localIdentName=[hash:base64:4]!postcss')
      }, {
        test: /\.global\.css$/,
        loader: __DEV__
          ? 'style!css!less'
          : ExtractTextPlugin.extract('style', 'css?minimize!less')
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url',
        query: {
          limit: 8192,
        },
      },
    ]
  },
  postcss
};
