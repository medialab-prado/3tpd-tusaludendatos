var mysql = require('mysql');

/* GET home page. */

var db = {};

var connection = mysql.createConnection({
    host     : 'localhost',
    port : 3306,
    user     : 'root',
    password : 'bridget',
    database: 'tdp'
});

db.consultaGastoSanitario = function(done){

    var query = "select i.nombre as 'indicador', i.fuente as 'fuente' ,p.nombre as 'symbol',s.nombre as sexo ,d.value as 'price' ,a.nombre as 'date' from datos d" +
        " inner join indicadores i on i.id = d.id_indicadores " +
        "inner join provincias p on p.id = d.id_provincia " +
        "inner join anios a on d.id_anio = a.id " +
        "inner join sexo s on s.id = d.id_sexo " +
        "where i.nombre = 'Gasto sanitario público territorializado,por habitante protegido' " +
        "and a.id > 19 and s.nombre='total'";

    connection.query(query,function(err,rows){

        if(err){
            done("error en la busqueda de gasto sanitario",err)
        }
        else {
            done(null,rows);
        }
    });

};

db.consultaInfeccionSanitaria = function(done){

    var query = "select i.nombre as 'indicador', i.fuente as 'fuente' ,p.nombre as 'letter',s.nombre as sexo ,d.value as 'frequency' ,a.nombre as 'fecha' from datos d " +
        "inner join indicadores i on i.id = d.id_indicadores " +
        "inner join provincias p on p.id = d.id_provincia " +
        "inner join anios a on d.id_anio = a.id " +
        "inner join sexo s on s.id = d.id_sexo " +
        "where i.nombre = 'Tasa de infección hospitalaria por cada 100 altas hospitalarias' " +
        "and a.id > 19 and s.nombre='total' and a.nombre='2013'";

    connection.query(query,function(err,rows){

        if(err){
            done("error en la busqueda de Infeccion Sanitaria",err)
        }
        else {
            done(null,rows);
        }
    });

};
module.exports = db;