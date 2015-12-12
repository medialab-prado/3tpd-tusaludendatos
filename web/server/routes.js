/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {


    app.get(['/','/index'], function(req,res){
        res.sendFile(path.resolve('../index.html'));
    });

};
