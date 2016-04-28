
import http from "http";
import express from "express";
import babel from "babel-middleware";
import bodyParser from "body-parser";
import fs from  'fs';
import path from 'path'
import morgan from 'morgan'
//var routes = require("routes");

//Server
let app = express();

let paths = {
	recipejson: "/json/recipe_library.json"
};

//logger

app.use(morgan('combined'));
//Static pages
app.use(express.static('public'));

//Parses json files so they can be usable
app.use(bodyParser.json());

//parses url files spliting the url in its different categories
app.use(bodyParser.urlencoded({extended: true}));

app.post(paths.recipejson, function(req, res){
	//Read the recipe_library.json file, add data to library
	//Reupload file
	fs.readFile("./public" + paths.recipejson, (err, data) => {
		if(err) {
			console.error(err);
		}
		let recipes = JSON.parse(data);
		let newrecipe = req.body;
		recipes.push(newrecipe);
		fs.writeFile("./public" + paths.recipejson, JSON.stringify(recipes, null, 4), (err) => {
			if(err) {
				console.error(err);
			}
			res.json(recipes);
		});
	});
});


/*app.use('/js/', babel({
	srcPath: 'js/src',
	cachePath: __dirname + '/_cache',
	babelOptions: {
		presets: ['es2015', 'react']
	},
	debug: true
}));*/


app.listen(3000, () => {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on port 3000!");
	console.log("----------------------------");
});
