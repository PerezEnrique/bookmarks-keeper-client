const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
	plugins: [
		new DefinePlugin({
			API_URL: JSON.stringify("https://bookmark-keeper-api.herokuapp.com/api"),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src", "public", "_redirects"),
					to: "./",
				},
			],
		}),
	],
});
