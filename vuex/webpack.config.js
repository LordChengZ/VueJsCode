var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

var config = {
	entry : {
		main : './main'
	},
	output : {
		publicPath : '/dist/',
		filename : '[name].js',
		chunkFilename : '[name].chunk.js'
	},
	module : {
		rules : [
			{
				test : /\.vue$/,
				loader : 'vue-loader',
				options : {
					loaders : {
						css : ExtractTextPlugin.extract({
							use : 'css-loader',
							fallback : 'vue-style-loader'
						})
					}
				}
			},
			{
				test : /\.js$/,
				loader : 'babel-loader',
				exclude : /node_modules/
			},
			{
				test : /\.css$/,
				// use 选项的值可以是数组或者字符串，如果是数组，编译顺序由后往前
				use : ExtractTextPlugin.extract({
					use : 'css-loader',
					fallback : 'style-loader'
				})
			},
			{
				test : /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader : 'url-loader?limit=1024'
			}
		]
	},
	plugins : [
		new ExtractTextPlugin({
			filename : '[name].css',
			allChunks : true
		}),
		new VueLoaderPlugin()
	]
}

// module.exports = config; 相当于 export default config;
module.exports = config;