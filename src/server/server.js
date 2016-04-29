
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

const PATHS = {
	recipejson: "./public/json/recipe_library.json",
	deleteRecipe: "/recipes/delete",
	addRecipe: "/recipes/add",
	getAllRecipes: "/recipes/get",
	editRecipe: "/recipes/edit"
};

//logger

app.use(morgan('combined'));
//Static pages
app.use(express.static('public'));

//Parses json files so they can be usable
app.use(bodyParser.json());

//parses url files spliting the url in its different categoriesssss
app.use(bodyParser.urlencoded({extended: true}));

app.post(PATHS.addRecipe, function(req, res){
	//Read the recipe_library.json file, add data to library
	//Reupload file
	console.log(".....ADDING RECIPE...............");
	console.log(req.body);
	console.log("...................");
	fs.readFile(PATHS.recipejson, (err, data) => {
		if(err) {
			console.error(err);
		}
		let recipes = JSON.parse(data);
		let newrecipe = req.body;
		recipes.push(newrecipe);
		fs.writeFile(PATHS.recipejson, JSON.stringify(recipes, null, 4), (err) => {
			if(err) {
				console.error(err);
			}
			res.json(recipes);
		});
	});
});

app.post(PATHS.deleteRecipe, (req, res) => {
	console.log("--------------Deleting Recipe------------");
	fs.readFile(PATHS.recipejson, (err, data) => {
		if(err) {
			console.error(err);
		}
		let recipes = JSON.parse(data);
		let idOfRecipeToDelete = req.body.idRecipe;
		recipes.splice(idOfRecipeToDelete, 1);
		fs.writeFile(PATHS.recipejson, JSON.stringify(recipes, null, 4), (err) => {
			if(err) {
				console.error(err);
			}
			res.json(recipes);
		});
	} )
});

app.post(PATHS.editRecipe, (req, res) => {
	console.log("--------------Editing Recipe------------");
	console.log(PATHS);
	fs.readFile(PATHS.recipejson, (err, data) => {
		if(err) {
			console.error(err);
		}
		let recipes = JSON.parse(data),
				idToModify = req.body.idRecipe,
				newRecipe = req.body.recipe;
		console.log("---ID---->", idToModify);
		console.log("----NewRecipe---->", newRecipe);
		recipes[idToModify] = newRecipe;
		fs.writeFile(PATHS.recipejson, JSON.stringify(recipes, null, 4), (err) => {
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
