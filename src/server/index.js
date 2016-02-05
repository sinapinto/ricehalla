#!/usr/bin/env node

// Use babel's require hook to transpile required files.
require('babel-register');

// keep in sync with .eslintrc
global.__PORT__ = parseInt(process.env.PORT, 10) || 3000;
global.__DEV__ = process.env.NODE_ENV !== 'production';
global.__DISABLE_SSR__ = false;

require('./server.js');
