const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
	],
});
