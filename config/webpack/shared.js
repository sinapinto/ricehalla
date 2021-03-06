import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import customProps from 'postcss-custom-props';
import atImport from 'postcss-import';
import colorGray from 'postcss-color-gray';
import colorFunction from 'postcss-color-function';
import nesting from 'postcss-nesting';
import calc from 'postcss-calc';

export const ROOT_PATH = path.resolve(__dirname, '..', '..');
export const ASSETS_PATH = path.resolve(ROOT_PATH, './static/dist');

export const DEV = process.env.NODE_ENV !== 'production';

let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(ROOT_PATH, 'config/index.json'), 'utf8'));
} catch (e) {
  console.error('unable to parse config/index.json');
  process.exit(1);
}

export const HOST = config.host || 'localhost';
export const PORT = config.port;
export const APIport = config.APIport;

export const PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(DEV ? 'development' : 'production')
    },
    __DEV__: DEV,
    __HOST__: JSON.stringify(HOST),
    __PORT__: JSON.stringify(PORT),
    __APIPORT__: JSON.stringify(APIport),
  }),
];

export const LOADERS = [
  {
    test: /\.(jpe?g|png|gif)$/i,
    loader: 'url',
    query: {
      limit: 8192,
    },
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
];

export function CSS_TEST(absPath) {
  if (/global\.css$/.test(absPath)) {
    return false;
  }
  if (absPath.indexOf('node_modules/react-select') > -1) {
    return false;
  }
  return /\.css$/.test(absPath);
}

export const CSS_EXCLUDE = [
  path.resolve(ROOT_PATH, './node_modules/react-select'),
];

export function POSTCSS() {
  return [
    atImport({ addDependencyTo: webpack }),
    customProps(),
    nesting(),
    calc(),
    colorGray(),
    colorFunction(),
    autoprefixer({ browsers: ['last 2 versions'] })
  ];
}
