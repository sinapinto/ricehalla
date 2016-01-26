#!/usr/bin/env node

// all subsequent files required will be transpiled
// configuration comes from .babelrc
require("babel-register");

require("../src/server.js");
