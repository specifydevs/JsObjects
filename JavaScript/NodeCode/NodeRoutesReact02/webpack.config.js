'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'whatwg-fetch',
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                "presets": ["react", "es2015", "stage-0", "react-hmre"]
            }
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        }]
    }
};