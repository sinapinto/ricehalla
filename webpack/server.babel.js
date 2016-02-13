import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import postcss from './postcss.js';

const rootPath = path.resolve(__dirname, '..');
const assetsPath = path.resolve(rootPath, './static/dist');
const PORT = parseInt(process.env.PORT, 10) || 3000;
const DEV = process.env.NODE_ENV !== 'production';
const cssLoader = DEV ?
  'css/locals?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!postcss' :
  'css/locals?minimize&modules&localIdentName=[hash:base64:4]!postcss';

const nodeModules = fs.readdirSync('node_modules')
  .filter(file => !file.includes('.bin'))
  .map(mod => ({ [mod]: `commonjs ${mod}` }))
  .reduce((prev, curr) => ({ ...prev, ...curr }));

export default {
  context: rootPath,
  entry: './src/server/server.js',
  devtool: 'cheap-eval-source-map',
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
        NODE_ENV: DEV ? JSON.stringify('development') : JSON.stringify('production')
      },
      __PORT__: PORT,
      __DEV__: DEV,
      __DISABLE_SSR__: false,
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['react', 'es2015', 'stage-1'] }
      }, {
        test: /\.css$/,
        loader: cssLoader
      },
    ]
  },
  postcss
};
