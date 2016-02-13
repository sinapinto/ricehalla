import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import postcss from './postcss.js';

const rootPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(rootPath, './static/dist');
const PORT = parseInt(process.env.PORT, 10) || 3000;
const DEV = process.env.NODE_ENV !== 'production';

export default {
  context: rootPath,
  devtool: DEV ? 'cheap-module-eval-source-map' : 'source-map',
  entry: DEV ? [
    `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
    './src/client.js'
  ] : [
    './src/client.js'
  ],
  output: {
    filename: 'bundle.js',
    path: assetsPath,
    publicPath: DEV ? `http://localhost:${PORT}/dist/` : '/dist/'
  },
  target: 'web',
  plugins: DEV ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      __DEVTOOLS__: true, // rebuild after changing
      __DEV__: true,
      __PORT__: PORT,
    }),
  ] : [ // prod
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      __DEVTOOLS__: true,
      __DEV__: false,
      __PORT__: PORT,
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
          presets: ['react', 'es2015', 'stage-1'],
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
        loader: DEV
          ? 'style!css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:3]!postcss'
          : ExtractTextPlugin.extract('style', 'css?minimize&modules&localIdentName=[hash:base64:4]!postcss')
      }, {
        test: /\.global\.css$/,
        loader: DEV
          ? 'style!css!less'
          : ExtractTextPlugin.extract('style', 'css?minimize!less')
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ]
  },
  postcss
};
