const paths = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const $ = require('jquery')

module.exports = {
    entry: './src/entry.js',

    output: {
        path: paths.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        // publicPath: "/build"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.ProvidePlugin({ $: 'jquery' })
    ],

    devServer: {
        contentBase: paths.resolve(__dirname, "build/assets"),
    }
};