const path = require('path');
const webpack = require('webpack');
const envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
	envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
	//context: path.resolve(__dirname, './src'),
	entry: [
		'script-loader!jquery/dist/jquery.min.js',
		'script-loader!foundation-sites/dist/js/foundation.min.js',
		'./src/app.js',
	],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, './src/components'),
			path.resolve(__dirname, './src/api')
		],
		alias: {
			'src': path.resolve(__dirname, 'src'),
			'applicationStyles': path.resolve(__dirname, 'src/styles/app.scss'),
			'actions': path.resolve(__dirname, 'src/actions/'),
			'reducers': path.resolve(__dirname, 'src/reducers/'),
			'configureStore': path.resolve(__dirname, './src/store/configureStore')
		}
	},
	externals: {
		jquery: 'jQuery'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				API_KEY: JSON.stringify(process.env.API_KEY),
				AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
				DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
				PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
				STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
				MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
				GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN)
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { 
						presets: ['es2015', 'stage-0', 'react']
					}
				}]
			}, {
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}]
			}, {
				test: /\.scss$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, { 
					loader: 'sass-loader',
					options: {
						includePaths: [
							path.resolve(__dirname, './node_modules/foundation-sites/scss')
						]
					}
				}]
			}
		],
	},
	devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-eval-source-map'
};