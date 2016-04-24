Recipe Book on ReactJS
======================
The objective of this app is to built a recipe cookbook web app on React Js from scratch.
Some properties it will have will be:

* Add your own recipe
* Have a library of all recipes you have created
* Edit a recipe
* Search based on ingredients

Each recipe will have the next characteristics:
* Name
* Preparation time
* Categories
* Ingredients and quantities(for 4 people)
* Steps
* Level of difficulty

At the beggining, the recipe will be saved in a json file.

The server will be build on Node + Express

This Readme will give a tutorial on the steps I took to built it
#Installation
Based on [egghead.io](babel-loader babel-core babel-preset-es2015 babel-preset-react)
##Packages
The server is built upon Node. After having initalized a npm project in the working folder, the following modules are needed:
* react, react-dom: To be able to use react from the server side
````
npm install react react-dom --save
````
*webpack: Creates statics files from different modules allowing
````
npm install webpack --save
````
*webpack-dev-server: for an easy configuration of the server
````
npm install webpack-dev-server --save
````
* babel babel-loader babel-core babel-preset-es2015 babel-preset-react: to be able to use the latest write with the lastest JS features
````
npm install babel --save
npm install babel-loader babel-core babel-preset-es2015 babel-preset-react --save
````
##Js and JSX compiler and server
Webpack was meant to compile modules to static js files. Also, it will launch our server. To set it up, there needs to be a config file called webpack.config.js in the main folder:
````
module.exports = {
	entry: './main.js',
	output: {
		path: './',
		filename: 'index.js'
	},
	devServer: {
		inline: true,
		port: 8080
	},
	module: {

	}
}
````




