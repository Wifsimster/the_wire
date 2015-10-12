// Packages
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// Singleton of Express app instance
GLOBAL.app = app;

// Configure template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Configure paths
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Declare routes to use
require('./app/routes/generic.js');

// Start the server
app.listen(80);

console.log("Server start up !");
