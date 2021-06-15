import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: webpack.Configuration = {
    mode: 'production',
    entry: './src/client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/client'),
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
                test: /\.(png|jp(e*)g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: ['babel-loader', '@svgr/webpack', 'file-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html',
            favicon: './src/client/img/favicon.svg',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                configFile: './src/client/tsconfig.json',
            },
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
        new CleanWebpackPlugin(),
    ],
};

export default config;
