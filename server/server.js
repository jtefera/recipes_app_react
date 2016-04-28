"use strict";

var http = require("http");
var express = require("express");
var babel = require("babel-middleware");
//var routes = require("routes");

//Server
var app = express();

//Static pages
app.use(express.static('public'));

app.use(function (req, res) {
	res.write("esto es la caña!");
});

/*app.use('/js/', babel({
	srcPath: 'js/src',
	cachePath: __dirname + '/_cache',
	babelOptions: {
		presets: ['es2015', 'react']
	},
	debug: true
}));*/

app.get("/", function (req, res) {
	res.send("Hola mundo!");
});

console.log("Server!");
app.listen(3000);