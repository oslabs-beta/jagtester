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
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['babel-loader', '@svgr/webpack', 'file-loader'],
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
                }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html',
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
            '/api': 'http://localhost:5000',
            '/socket.io/': {
                target: 'http://localhost:5000',
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
