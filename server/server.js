"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _babelMiddleware = require("babel-middleware");

var _babelMiddleware2 = _interopRequireDefault(_babelMiddleware);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var routes = require("routes");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//Server
var app = (0, _express2.default)();

var PATHS = {
	recipejson: "./public/json/recipe_library.json",
	deleteRecipe: "/recipes/delete",
	addRecipe: "/recipes/add",
	getRecipes: "/recipes/get",
	editRecipe: "/recipes/edit",
	searchRecipes: "/recipes/search"
};

//logger

app.use((0, _morgan2.default)('combined'));
//Static pages
app.use(_express2.default.static('public'));

//Parses json files so they can be usable
app.use(_bodyParser2.default.json());

//parses url files spliting the url in its different categoriesssss
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.get(PATHS.getRecipes, function (req, res) {
	console.log("---------------");
	console.log("Geting recipes");
	_fs2.default.readFile(PATHS.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data),
		    numTotalRecipes = recipes.length,
		    startingRecipe = Number(req.query.startingRecipe) || 0,
		    numRecipes = Number(req.query.numRecipes || numTotalRecipes);

		if (startingRecipe > numTotalRecipes) {
			res.send("The starting point is higher than the total number of recipes");
		} else {
			var endingRecipe = startingRecipe + numRecipes,
			    response = {
				'numTotalRecipes': numTotalRecipes,
				'nums': {
					numRecipes: numRecipes,
					endingRecipe: endingRecipe,
					startingRecipe: startingRecipe
				},
				'recipes': recipes.slice(startingRecipe, endingRecipe)
			};
			console.log(req.query);
			res.json(response);
		}
	});
});

app.get(PATHS.searchRecipes, function (req, res) {
	_fs2.default.readFile(PATHS.recipejson, function (err, data) {
		var arrayRecipesByNumber = [];
		if (err) {
			console.error(err);
		}
		var query = req.query.query ? req.query.query.toLowerCase().trim() : "",
		    searchWords = query.split(" "),
		    recipes = JSON.parse(data),
		    recipesSearched = recipes.reduce(function (arrRecipesByRelevance, recipe) {
			var numWordsOnRecipe = searchWords.filter(function (word) {
				return recipe.basicInfo.name.toLowerCase().indexOf(word) !== -1;
			}).length;
			if (numWordsOnRecipe !== 0) {
				var recipesWithThisRelevance = arrayRecipesByNumber[numWordsOnRecipe] || [];
				recipesWithThisRelevance.push(recipe), arrayRecipesByNumber[numWordsOnRecipe] = recipesWithThisRelevance;
			}
			return arrayRecipesByNumber;
		}, []).reverse().filter(function (value) {
			return value; //filters null values
		}).reduce(function (concatenade, val) {
			return concatenade.concat(val);
		}, []);
		/*recipesSearched = recipes.filter((recipe) => {
  	let recipeName = recipe.basicInfo.name.toLowerCase();
  	return recipeName.indexOf(query) !== -1;
  });*/
		//console.log(query, recipesSearched);
		var numTotalRecipes = recipesSearched.length,
		    startingRecipe = Number(req.query.startingRecipe) || 0,
		    numRecipes = Number(req.query.numRecipes || numTotalRecipes);

		if (startingRecipe > numTotalRecipes) {
			res.send("The starting point is higher than the total number of recipes");
		} else {
			var endingRecipe = startingRecipe + numRecipes,
			    response = {
				'numTotalRecipes': numTotalRecipes,
				'nums': {
					numRecipes: numRecipes,
					endingRecipe: endingRecipe,
					startingRecipe: startingRecipe
				},
				'recipes': recipesSearched.slice(startingRecipe, endingRecipe)
			};
			//console.log(req.query);
			res.json(response);
		}
	});
});

app.post(PATHS.addRecipe, function (req, res) {
	//Read the recipe_library.json file, add data to library
	//Reupload file
	console.log(".....ADDING RECIPE...............");
	console.log(req.body);
	console.log("...................");
	_fs2.default.readFile(PATHS.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data);
		var newrecipe = req.body;
		recipes.push(newrecipe);
		_fs2.default.writeFile(PATHS.recipejson, JSON.stringify(recipes, null, 4), function (err) {
			if (err) {
				console.error(err);
			}
			res.json(recipes);
		});
	});
});

app.post(PATHS.deleteRecipe, function (req, res) {
	console.log("--------------Deleting Recipe------------");
	_fs2.default.readFile(PATHS.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data);
		var idOfRecipeToDelete = req.body.idRecipe;
		recipes.splice(idOfRecipeToDelete, 1);
		_fs2.default.writeFile(PATHS.recipejson, JSON.stringify(recipes, null, 4), function (err) {
			if (err) {
				console.error(err);
			}
			res.json(recipes);
		});
	});
});

app.post(PATHS.editRecipe, function (req, res) {
	console.log("--------------Editing Recipe------------");
	console.log(PATHS);
	_fs2.default.readFile(PATHS.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data),
		    idToModify = req.body.idRecipe,
		    newRecipe = req.body.recipe;
		console.log("---ID---->", idToModify);
		console.log("----NewRecipe---->", newRecipe);
		recipes[idToModify] = newRecipe;
		_fs2.default.writeFile(PATHS.recipejson, JSON.stringify(recipes, null, 4), function (err) {
			if (err) {
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

app.listen(server_port, server_ip_address, function () {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on" + server_ip_address + ":" + server_port);
	console.log("----------------------------");
});