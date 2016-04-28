"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _babelMiddleware = require("babel-middleware");

var _babelMiddleware2 = _interopRequireDefault(_babelMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var routes = require("routes");

//Server
var app = (0, _express2.default)();

//Static pages
app.use(_express2.default.static('public'));

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

app.listen(3000, function () {
	console.log("----------------------------");
	console.log("Server started on portss En serio! 3000!");
	console.log("----------------------------");
});