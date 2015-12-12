/**
 * Manage responses
 */

'use strict';

var db  = require('./db/dbConnection');
var giveMeData = {};

giveMeData.getGastoSanitario = function(callback){

    db.consultaGastoSanitario(function(err,res){

        if(err === null){
            callback(null,res);
        } else {
            callback("error en gastoSanitario",err)
        }

    });

};
giveMeData.getInfeccionSanitaria = function(callback){

    db.consultaInfeccionSanitaria(function(err,res){

        if(err === null){
            callback(null,res);
        } else {
            callback("error en Infección sanitaria",err)
        }

    });

};


module.exports = giveMeData;