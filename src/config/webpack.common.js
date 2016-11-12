var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            {
                test: /\.html$/,
                loader: 'html'
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },

            {
                test    : /\.scss$/,
                //loaders : ["raw-loader", "style-loader", "css-loader", "sass-loader"],
                loaders : ["raw-loader", "sass-loader"],
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
