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

//Server
var app = (0, _express2.default)();

var paths = {
	recipejson: "/public/json/recipe_library.json",
	deleteRecipe: "/recipes/delete",
	addRecipe: "/recipes/add",
	getRecipes: "/recipes/get",
	editRecipes: "/recipes/edit"
};

//logger

app.use((0, _morgan2.default)('combined'));
//Static pages
app.use(_express2.default.static('public'));

//Parses json files so they can be usable
app.use(_bodyParser2.default.json());

//parses url files spliting the url in its different categoriesssss
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.post(paths.addRecipe, function (req, res) {
	//Read the recipe_library.json file, add data to library
	//Reupload file
	_fs2.default.readFile(paths.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data);
		var newrecipe = req.body;
		recipes.push(newrecipe);
		_fs2.default.writeFile(paths.recipejson, JSON.stringify(recipes, null, 4), function (err) {
			if (err) {
				console.error(err);
			}
			res.json(recipes);
		});
	});
});

app.post(paths.deleteRecipe, function (req, res) {
	_fs2.default.readFile(paths.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data);
		var idOfRecipeToDelete = req.body.id;
		recipes.splice(idOfRecipeToDelete, 1);
		_fs2.default.writeFile(paths.recipejson, JSON.stringify(recipes, null, 4), function (err) {
			if (err) {
				console.error(err);
			}
			res.json(recipes);
		});
	});
});

app.post("/recipes/edit", function (req, res) {
	_fs2.default.readFile(paths.recipejson, function (err, data) {
		if (err) {
			console.error(err);
		}
		var recipes = JSON.parse(data),
		    idToModify = req.body.id,
		    newRecipe = req.body.recipe;
		console.log(newRecipe);
		recipes[idToModify] = newRecipe;
		_fs2.default.writeFile(paths.recipejson, JSON.stringify(recipes, null, 4), function (err) {
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

app.listen(3000, function () {
	console.log("dirname is " + __dirname);
	console.log("----------------------------");
	console.log("Server started on port 3000!");
	console.log("----------------------------");
});
