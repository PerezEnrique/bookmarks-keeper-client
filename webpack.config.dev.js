/** @type {import('webpack').Configuration} */
const path = require('path');
const { DefinePlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		compress: true,
		historyApiFallback: true,
	},
	devtool: 'eval-source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(ico)$/,
				type: 'assets/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/public/index.html',
			filename: './index.html',
			favicon: './src/public/favicon.ico',
		}),
		new DefinePlugin({
			API_URL: JSON.stringify('http://localhost:5000/api'),
		}),
	],
};
