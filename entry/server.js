#!/usr/bin/env node
var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('Error parsing .babelrc', err);
}

// enable runtime transpilation
require('babel-core/register')(config);

require('../devServer');
