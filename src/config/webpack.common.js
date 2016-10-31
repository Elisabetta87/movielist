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
            
            // {
            //     test: /\.(png|jpg|jp(e)g|gif|svg|woff|woff2|ttf|eot)$/,
            //     loader: 'file',
            //     exclude: /node_modules|bower_components/
            // }



            // {
            //     test    : /.css$/,
            //     loader  : 'raw',
            //     exclude : [/nodule_modules/]
            // }
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            // }

            // Support for CSS as raw text
            // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // all css in src/style will be bundled in an external css file
            // {
            //     test: /\.css$/,
            //     exclude: helpers.root('src', 'app'),
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            // },
            // // all css required in src/app files will be merged in js files
            // {
            //     test: /\.css$/,
            //     include: helpers.root('src', 'app'),
            //     loader: 'raw!postcss'
            // },
            //
            // // support for .scss files
            // // use 'null' loader in test mode (https://github.com/webpack/null-loader)
            // // all css in src/style will be bundled in an external css file
            // {
            //     test: /\.scss$/,
            //     exclude: helpers.root('src', 'app'),
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
            // },
            //
            // // all css required in src/app files will be merged in js files
            // {
            //     test: /\.scss$/,
            //     exclude: helpers.root('src', 'style'),
            //     loader: 'raw!postcss!sass'
            // }
            
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
