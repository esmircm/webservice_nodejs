var express = require('express');
var body_parser = require('body-parser');
var app = express();
app.use(body_parser.urlencoded({extended: true}));
var pg = require("pg")
var http = require("http")
//var port = 3000;
//var host = '127.0.0.1';

var conString = "postgres://postgres:2712@localhost:5432/siim_evaluacion";
var client = new pg.Client(conString);
client.connect();


var formulario = '<form method="post" action="/saludo">'
        + '<label for="nombre">¿ID?</label>'
        + '<input type="text" name="nombre" id="nombre">'
        + '<input type="submit" value="Enviar"/>'
        + '</form>';

var cabecera = '<h1>WebService</h1>';

app.get('/saludo', function (req, res) {

//        console.log(result.rows);

    res.send('<html><body>'
            + cabecera
            + formulario
            + '</html></body>'
            );

});

app.post('/saludo', function (req, res) {




    var nombre = req.body.nombre || '';
//    var saludo = '';
    
    var query = client.query("select * from poa.poa where id_poa ="+nombre);
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    
     query.on("end", function (result) {
// On end JSONify and write the results to console and to HTML output
        console.log(result.rows);
//        console.log(JSON.stringify(result.rows, null, "    "));
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(result.rows) + "\n");
        res.end();
    });
    
    res.send('<html><body>'
            + cabecera
            
            + formulario
            + '</html></body>'
            );
    

//    if (nombre != '')
////        row = "Hola " + nombre;
//
//    res.send('<html><body>'
//            + cabecera
//            + '<p>' + row + '</p>'
//            + formulario
//            + '</html></body>'
//            );

});

//app.get('/saludo' , function (req, res) {
// 
//	res.send('<html><body>'
//			+ cabecera
//			+ formulario
//			+ '</html></body>'
//	);
// 
//});

var server = app.listen(8000, function () {
    console.log('Servidor ejecutandose en localhost:8000');
});