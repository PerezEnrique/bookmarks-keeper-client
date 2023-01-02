/** @type {import('webpack').Configuration} */
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "assets/[hash][ext]",
		publicPath: "/",
		clean: true,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader"
				}
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(jpg|ico)$/,
				type: "asset/resource",
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/i,
				type: "asset/resource",
			}
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/public/index.html",
			filename: "./index.html",
			favicon: "./src/public/favicon.ico",
		}),
		new MiniCssExtractPlugin({
			filename: "assets/styles/[name].[contenthash].css",
		}),
	],
};
