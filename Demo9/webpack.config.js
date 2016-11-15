var path = require('path');
module.exports = {
	context: path.join(__dirname, 'lib'),
	entry: './entry.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	}
};