'use strict';
// eslint-disable-next-line no-undef
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line no-undef
const path = require('path');
/* eslint-disable */
module.exports = defineConfig({
    transpileDependencies: true,
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                // eslint-disable-next-line no-undef
                '@': path.resolve(__dirname, './src'),
                // eslint-disable-next-line no-undef
                '@assets': path.resolve(__dirname, './src/assets')
            },
            extensions: ['.js', '.vue', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    include: [
                        // eslint-disable-next-line no-undef
                        path.resolve(__dirname, './src'),
                        // eslint-disable-next-line no-undef
                        path.resolve(__dirname, './test')
                    ]
                }
            ]
        }
    }
});
