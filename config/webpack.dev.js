const { merge } = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require ('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8083,
        host: 'theandrewgrass.dev.com',
        allowedHosts: [
            'theandrewgrass.dev.com',
        ],
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync('cert.key'),
                cert: fs.readFileSync('cert.crt'),
                ca: fs.readFileSync('ca.crt'),
            },
        },
        // fix CORS issues with Gatsby
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        hot: true,
        open: true,
        watchFiles: [ 'src/**/*' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public', 'index.html'),
            favicon: path.resolve(__dirname, '../public/images', 'ag_icon.svg'),
            inject: 'head',
        }),
        new ModuleFederationPlugin({
            name: 'projectpalette',
            filename: 'remoteEntry.js',
            exposes: {
                './projectPalette': './src/bootstrap',
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, devConfig);