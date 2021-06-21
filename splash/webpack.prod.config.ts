import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const config: webpack.Configuration = {
	mode: 'production',
	entry: path.join(__dirname, 'index.tsx'),
	output: {
		path: path.resolve(__dirname, 'bundle'),
		filename: '[name].[contenthash].js',
		publicPath: '',
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
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
				test: /\.(jpe?g|png|gif)$/i,
				type: 'asset',
			},
			{
				test: /\.svg$/,
				use: ['babel-loader', '@svgr/webpack', 'file-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, './splash')],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			favicon: path.join(__dirname, 'img/favicon.svg'),
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			typescript: {
				configFile: path.join(__dirname, 'tsconfig.json'),
			},
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
		}),
		new CleanWebpackPlugin(),

		new ImageMinimizerPlugin({
			minimizerOptions: {
				// Lossless optimization with custom option
				// Feel free to experiment with options for better result for you
				plugins: [
					['gifsicle', { interlaced: true, optimizationLevel: 3, color: 16 }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
				],
			},
		}),
	],
};

export default config;
