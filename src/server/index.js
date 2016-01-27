#!/usr/bin/env node

// Use babel's require hook to transpile all subsequent required files.
require('babel-register');

require('./server.js');
