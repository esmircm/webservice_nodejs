

var express = require("express"),
        app = express(),
        bodyParser = require("body-parser");
        methodOverride = require("method-override");
////pg = require('pg');
////conString = "postgres://postgres:2712@localhost:5432/siim_evaluacion";
////client = new pg.Client(conString);
//
//
//var pg = require("pg");
//var http = require("http");
//var port = 3000;
//var host = '127.0.0.1';
//
//var conString = "postgres://postgres:2712@localhost:5432/siim_evaluacion";
//var client = new pg.Client(conString);
//client.connect();
//
////        mongoose = require('mongoose');
//
//// Connection to DB
////client.connect('postgres://localhost/tvshows', function (err, res) {
////    if (err)
////        throw err;
////    console.log('Connected to Database');
////});
//
//
//
////var ss = client.query('select id_poa from poa.poa', result);
////    console.log(result.row);
//
////var query = client.query("select id_poa from poa.poa");
////    console.log(query);
////query.on('row', function (row) {
////    console.log(row);
////});
//
//
////mongoose.connect('mongodb://localhost/tvshows', function (err, res) {
////    if (err)
////        throw err;
////    console.log('Connected to Database');
////});
//
//
////client.connect(function(err) {
//// 
////    if (err)
////        throw err;
////    console.log('Connected to Database');
////  
////});
////    console.log(client);
//
//
//
//// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
//
//// Import Models and controllers
////var models = require('./models/tvshow')(app, client);
//var TVShowCtrl = require('./controllers/tvshows')(app, client);
//
//// Example Route
//var router = express.Router();
//router.get('/', function (req, res) {
//    res.send("Hello world!");
//});
//app.use(router);
//
//// API routes
//var tvshows = express.Router();
//
////tvshows.route('/tvshows')
////        .get(TVShowCtrl.findAllTVShows)
////        .post(TVShowCtrl.addTVShow);
//
//tvshows.route('/tvshows/:id')
//        .get(TVShowCtrl.findById);
////        .put(TVShowCtrl.updateTVShow)
////        .delete(TVShowCtrl.deleteTVShow);
//
//app.use('/api', tvshows);
//
//// Start server
//app.listen(3000, function () {
//    console.log("Node server running on http://localhost:3000");
//});









////var express = require("express"),  
//    app = express(),
//    bodyParser  = require("body-parser"),
//    methodOverride = require("method-override");
////    mongoose = require('mongoose');
//    pg = require('pg');
////var pg = require('pg');
//
//app.use(bodyParser.urlencoded({ extended: false }));  
//app.use(bodyParser.json());  
//app.use(methodOverride());
//
//var router = express.Router();
//
//router.get('/', function(req, res) {  
//   res.send("Hello World!");
//});
//
//app.use(router);
//
//app.listen(3000, function() {  
//  console.log("Node server running on http://localhost:3000");
//});












//
//var express = require('express')
//var app = express()
//
//app.get('/', function (req, res) {
//  res.send('Hello World')
//})
//
//app.listen(3000);
//
//
//
//var pg = require('pg');
//
//var conString = "postgres://postgres:2712@localhost:5432/siim_evaluacion";
//
//var client = new pg.Client(conString);
//
//client.connect(function(err) {
//  if(err) {
//    return console.error('could not connect to postgres', err);
//  }
//  
//    client.query('select id_poa from poa.poa', function(err, result) {
//        
//    if(err) {
//      return console.error('error running query', err);
//    }
//    
//    console.log(result.rows[0]);
//    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//    client.end();
//  });
//});



//
var pg = require("pg")
var http = require("http")
var port = 3000;
var host = '127.0.0.1';

var conString = "postgres://postgres:2712@localhost:5432/siim_evaluacion";
var client = new pg.Client(conString);
client.connect();

http.createServer(function (req, res) {
    if (req.method == 'POST') {
        insert_records(req, res);
    }
    else if (req.method == 'GET') {
        list_records(req, res);
    }
    else if (req.method == 'PUT') {
        update_record(req, res);
    }
    else if (req.method == 'DELETE') {
        delete_record(req, res);
    }
}).listen(port, host);
console.log("Connected to " + port + "   " + host);



var list_records = app.get('/saludo', function (req, res) {
    
    
    var parametro = req.url;
    console.log(parametro);false;
    
    console.log("In listing records");
// Select all rows in the table
    var query = client.query("select * from poa.poa");
    query.on("row", function (row, result) {
        result.addRow(row);

//        console.log(result.rows);

    });
    
//    exports.findById = function(req, res) {
//	row(req.params.id, function(err, tvshow) {
//    if(err) return res.send(500, err.message);
//
//    console.log('GET /tvshow/' + req.params.id);
//		res.status(200).jsonp(tvshow);
//	});
//};

    query.on("end", function (result) {
// On end JSONify and write the results to console and to HTML output
        console.log(JSON.stringify(result.rows, null, "    "));
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(result.rows) + "\n");
        res.end();
    });

});




