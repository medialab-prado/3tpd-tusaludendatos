/**
 * Main application routes
 */

'use strict';

var path = require('path');
var giveMeData = require('./giveMeData');


module.exports = function(app) {


    app.get(['/','/index'], function(req,res){
        res.sendFile(path.resolve('../index.html'));
    });

    app.get('/gastosanitario',function(req,res){
        giveMeData.getGastoSanitario(function(err,response){

            if (err=== null){
                res.send(response);
            }
            else {
                res.send(err);
            }
        })

    });

    app.get('/infeccion',function(req,res){
        giveMeData.getInfeccionSanitaria(function(err,response){

            if (err=== null){
                res.send(response);
            }
            else {
                res.send(err);
            }
        })

    });
    app.get('/mortalidad',function(req,res){
        giveMeData.getMortalidad(function(err,response){

            if (err=== null){
                res.send(response);
            }
            else {
                res.send(err);
            }
        })

    })
    app.get('/especialistas',function(req,res){
        giveMeData.getMortalidad(function(err,response){

            if (err=== null){
                res.send(response);
            }
            else {
                res.send(err);
            }
        })

    })
};
