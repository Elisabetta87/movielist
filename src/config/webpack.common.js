var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var helpers = require('./helpers');
var path = require('path');

module.exports = {
    entry: {
        'polyfills' : './src/polyfills.ts',
        'vendor'    : './src/vendor.ts',
        'app'       : './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
        root: 'src',
        alias: {
            'services'  : 'app/services',
            'shared'    : 'app/shared',
            'directives': 'app/directives',
            'components': 'app/components',
            'models'    : 'app/models',
            'test-helpers': 'app/test-helpers'
        }
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            {
                test    : /\.html$/,
                loader  : 'raw',
                exclude: [ path.resolve(__dirname, "src/index.html") ]
                //exculde : helpers.root('src')
                //loader: 'html'
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },

            {
                test    : /\.scss$/,
                loaders : ["raw-loader", "sass-loader"],
                //loaders : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass'),
                //loaders : 'raw!postcss!sass',
                exclude : [/node_modules/]
            },

            {
                test    : /node_modules\/bootstrap\/dist\/css\/bootstrap\.css/,
                loaders : ['style-loader', 'css-loader']//, 'css-loader', 'postcss']
                //exclude : [/node_modules\/(?!bootstrap)/]
            },
            
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};
