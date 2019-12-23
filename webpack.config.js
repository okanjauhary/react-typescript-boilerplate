const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// apsolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);  

module.exports = {
    // webpack will take the files from ./src/index
    entry: './src/index',

    // and output it into /build as index.js
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index.js'
	},
	
	// dev server config
	devServer: {
		port: 3000, // change port here

		// serve index.html as base
		contentBase: resolveAppPath('public'),

		// enable compression
		compress: true,

		// enable hot reload
		hot: true,

		// public path is root of  content base
		publicPath: '/'
	},

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },

            // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
			inject: true,
            template: './src/public/index.html'
        })
    ]
};