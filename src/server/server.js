
import http from "http";
import express from "express";
import babel from "babel-middleware";
//var routes = require("routes");

//Server
var app = express();

//Static pages
app.use(express.static('public'));

app.use(function(req, res) {
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

app.get("/", function(req, res){
	res.send("Hola mundo!");
});

app.listen(3000, () => {
	console.log("----------------------------");
	console.log("Server started on ports 3000!");
	console.log("----------------------------");
});
