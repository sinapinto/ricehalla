import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import customProps from 'postcss-custom-props';
import atImport from 'postcss-import';
import colorFunction from 'postcss-color-function';

export const DEV = process.env.NODE_ENV !== 'production';
export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const ROOT_PATH = path.resolve(__dirname, '..', '..');
export const ASSETS_PATH = path.resolve(ROOT_PATH, './static/dist');

export const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(DEV ? 'development' : 'production')
    },
    __DEV__: DEV,
    __HOST__: JSON.stringify(HOST),
    __PORT__: PORT,
  }),
];

export const LOADERS = [
  {
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'url',
    query: {
      limit: 8192,
    },
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  }, {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  }, {
    test: /\.json$/,
    loader: 'json-loader'
  }
];

export function POSTCSS() {
  return [
    atImport({ addDependencyTo: webpack }),
    customProps(),
    colorFunction(),
    autoprefixer({ browsers: ['last 2 versions'] })
  ];
}
