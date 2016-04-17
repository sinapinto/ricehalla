import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import * as shared from './shared';

export default {
  context: shared.ROOT_PATH,
  devtool: shared.DEV ? 'cheap-module-eval-source-map' : 'source-map',
  entry: shared.DEV ? [
    `webpack-hot-middleware/client?path=http://localhost:${shared.PORT}/__webpack_hmr`,
    './src/client.jsx'
  ] : [
    './src/client.jsx'
  ],
  output: {
    filename: shared.DEV ? 'bundle.js' : 'bundle.[hash].js',
    path: shared.ASSETS_PATH,
    publicPath: shared.DEV ? `http://localhost:${shared.PORT}/dist/` : '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  target: 'web',
  plugins: shared.DEV ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin(),
    ...shared.PLUGINS
  ] : [ // prod
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new AssetsPlugin(),
    ...shared.PLUGINS
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
        test: /\.css$/,
        loader: shared.DEV
          ? 'style!css?modules&importLoaders=1&localIdentName=[hash:3]_[local]!postcss'
          : ExtractTextPlugin.extract('style',
            'css?minimize&modules&localIdentName=[hash:base64:4]!postcss')
      },
      ...shared.LOADERS
    ]
  },
  postcss: shared.POSTCSS
};
