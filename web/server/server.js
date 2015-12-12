/**
 * Main application file
 */

'use strict';

var express = require('express');
// Setup server
var app = express();
var server = require('http').createServer(app);
var path = require('path');
require('./routes')(app);
var config = {
    port: '1337',
    ip : '127.0.0.1'
};
// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in', config.port);
});

app.use(express.static(path.resolve('../../web')));

module.exports = app;
