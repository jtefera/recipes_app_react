'use strict';
const http = require("http");
const express = require("express");
const babel = require("babel-middleware");
const bodyParser = require("body-parser");
const fs = require( 'fs');
const path = require('path');
const morgan = require('morgan');
//var routes = require("routes");



//Server
let app = express();





let publicFolder, PATHS;

if (require.main === module) {
	//This app is being called from console
	PATHS = {
		recipejson: "./public/json/recipe_library.json",
		deleteRecipe: "/recipes/delete",
		addRecipe: "/recipes/add",
		getRecipes: "/recipes/get",
		editRecipe: "/recipes/edit",
		searchRecipes: "/recipes/search"
	};
	publicFolder = "public";
} else {
	// this is called from app.router in another server
	PATHS = {
		recipejson: "./src/projects/recipes_app_react/public/json/recipe_library.json",
		deleteRecipe: "/delete",
		addRecipe: "/add",
		getRecipes: "/get",
		editRecipe: "/edit",
		searchRecipes: "/search"
	};
	publicFolder = "./src/projects/recipes_app_react/public";
}

console.log('public folder is', publicFolder);



//logger

app.use(function(req, res, next) {
	console.log(req.url)
	next();
})
app.use(morgan('combined'));
//Static pages
app.use(express.static(publicFolder));

//Parses json files so they can be usable
app.use(bodyParser.json());

//parses url files spliting the url in its different categoriesssss
app.use(bodyParser.urlencoded({extended: true}));

app.get(PATHS.getRecipes, (req, res) => {
	console.log("---------------");
	console.log("Geting recipes")
	fs.readFile(PATHS.recipejson, (err, data) => {
		if(err){
			console.error(err);
		}
		let recipes = JSON.parse(data),
				numTotalRecipes = recipes.length,
				startingRecipe = Number(req.query.startingRecipe) || 0,
				numRecipes = Number(req.query.numRecipes || numTotalRecipes);

		if(startingRecipe > numTotalRecipes) {
			res.send("The starting point is higher than the total number of recipes");
		} else {
			let endingRecipe = startingRecipe + numRecipes,
					response = {
						'numTotalRecipes': numTotalRecipes,
						'nums': {
							numRecipes,
							endingRecipe,
							startingRecipe
						},
						'recipes': recipes.slice(startingRecipe, endingRecipe)
					};
					console.log(req.query);
			res.json(response);
		}
	});

});

app.get(PATHS.searchRecipes, (req, res) => {
	fs.readFile(PATHS.recipejson, (err, data) => {
		let arrayRecipesByNumber = [];
		if(err) {
			console.error(err);
		}
		let query = (req.query.query)?
									req.query.query.toLowerCase().trim() : "",
				searchWords = query.split(" "),
				recipes = JSON.parse(data),
				recipesSearched = recipes.reduce((arrRecipesByRelevance, recipe) => {
					let numWordsOnRecipe = searchWords.filter((word) => {
						return recipe.basicInfo.name.toLowerCase().indexOf(word) !== -1;
					}).length;
					if(numWordsOnRecipe !== 0) {
						let recipesWithThisRelevance = arrayRecipesByNumber[numWordsOnRecipe] || [];
						recipesWithThisRelevance.push(recipe),
						arrayRecipesByNumber[numWordsOnRecipe] = recipesWithThisRelevance;
					}
					return arrayRecipesByNumber;
				}, [])
				.reverse()
				.filter((value) => {
					return value; //filters null values
				})
				.reduce((concatenade, val) => concatenade.concat(val), []);
				/*recipesSearched = recipes.filter((recipe) => {
					let recipeName = recipe.basicInfo.name.toLowerCase();
					return recipeName.indexOf(query) !== -1;
				});*/
		//console.log(query, recipesSearched);
		let numTotalRecipes = recipesSearched.length,
				startingRecipe = Number(req.query.startingRecipe) || 0,
				numRecipes = Number(req.query.numRecipes || numTotalRecipes);

		if(startingRecipe > numTotalRecipes) {
			res.send("The starting point is higher than the total number of recipes");
		} else {
			let endingRecipe = startingRecipe + numRecipes,
					response = {
						'numTotalRecipes': numTotalRecipes,
						'nums': {
							numRecipes,
							endingRecipe,
							startingRecipe
						},
						'recipes': recipesSearched.slice(startingRecipe, endingRecipe)
					};
					//console.log(req.query);
			res.json(response);
		}

	});
});

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

const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080	;
//const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

/*app.listen(server_port, () => {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on"  + ":" + server_port);
	console.log("----------------------------");
});*/

var exports = module.exports = {};
exports.app = app;
