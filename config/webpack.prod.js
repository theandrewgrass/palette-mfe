const { merge } = require('webpack-merge');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require ('../package.json');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js', // ensures when building, uses this naming convention as a template -- prevents caching issues
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'projectpalette',
            filename: 'remoteEntry.js',
            exposes: {
                './projectPalette': './src/bootstrap',
            },
            shared: packageJson.dependencies
        }),
        new webpack.ProvidePlugin({
          process: 'process/browser'
        }),
    ]
};

module.exports = merge(commonConfig, prodConfig);