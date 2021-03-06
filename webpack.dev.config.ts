import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
	mode: 'development',
	output: {
		publicPath: '/',
	},
	entry: './src/client/index.tsx',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/i,
				exclude: [/node_modules/, __dirname + './splash'],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.(png|jp(e*)g|gif)$/,
				exclude: __dirname + './splash',
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.svg$/,
				exclude: __dirname + './splash',
				use: ['babel-loader', '@svgr/webpack', 'file-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/client/index.html',
			favicon: './src/client/img/favicon.svg',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			typescript: {
				configFile: './src/client/tsconfig.json',
			},
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
		}),
	],
	devtool: 'inline-source-map',
	devServer: {
		proxy: {
			'/api': 'http://localhost:15000',
			'/socket.io/': {
				target: 'http://localhost:15000',
				ws: true,
			},
		},
		contentBase: path.join(__dirname, 'build'),
		historyApiFallback: true,
		port: 8080,
		open: false,
		hot: true,
	},
};

export default config;
