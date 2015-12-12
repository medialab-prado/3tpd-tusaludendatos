var mysql = require('mysql');
var moment = require('moment');

/* GET home page. */

var connection = mysql.createConnection({
    host     : 'localhost',
    port : 3306,
    user     : 'root',
    password : 'bridget',
    database: 'tdp'
});