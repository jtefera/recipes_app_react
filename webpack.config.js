var CopyWebpackPlugin = require('copy-webpack-plugin');
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