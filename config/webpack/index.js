require('babel-register');
const client = require('./client.babel.js').default;
const server = require('./server.babel.js').default;

module.exports = [client, server];
