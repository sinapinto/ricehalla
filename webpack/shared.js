import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

export const DEV = process.env.NODE_ENV !== 'production';
export const HOST = process.env.HOST || 'localhost';
export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const ROOT_PATH = path.resolve(__dirname, '..');
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
  }
];

export function POSTCSS() {
  return [
    autoprefixer({ browsers: ['last 2 versions', 'IE > 8'] })
  ];
}
