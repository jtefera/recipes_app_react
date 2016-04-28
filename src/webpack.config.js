module.exports = {
	entry: './main.js', //Where we will do our pre-compiled js
	output: {
		path: './',
		filename: 'index.js' //where our compiled js will go
	},
	devServer: {
		inline: true,
		port: 8080
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}

		]
	
	}
}