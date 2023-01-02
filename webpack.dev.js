const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		compress: true,
		historyApiFallback: true,
	},
	devtool: "eval-source-map",
	plugins: [
		new DefinePlugin({
			API_URL: JSON.stringify("http://localhost:8080/api"),
		}),
	],
});
