var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
module.exports = [{
        entry: {
            './public/js/index': './src/app/main.js',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
        },
        devtool: 'source-map',
        module: {
            loaders: [{
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                },
            }],
        },
        plugins: [
            new CopyWebpackPlugin([{
                context: 'src/static/',
                from: '**/*',
                to: 'public/',
            }]),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,
                },
                compress: {
                    'warnings': false,
                    'screw_ie8': true,
                },
            }),
            new webpack.DefinePlugin({
                'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                },
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(true),
        ],
    },
    {
        entry: {
            './server/server': './src/server/server.js',
            './server/serverApp': ['./src/server/serverApp.js'],
        },
        output: {
            path: __dirname,
            filename: '[name].js',
        },
        target: 'node',
        module: {
            loaders: [{
                    test: /.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015'],
                    },
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
            ],
        }
    }
];