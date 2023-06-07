const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add CSS loaders and babel to webpack.
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const BabelLoader = require('babel-loader');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'JATE',
            favicon:'./favicon.ico',
        }),
        new WebpackPwaManifest({
            fingerprints: false,
            name: 'Just Another Text Editor',
            short_name: 'JATE',
            description: 'Javascript progress web app text editor',
            background_color: '#ffffff',
            publicPath: './',
            start_url: './',
            //crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            icons: [
                {
                    src: path.resolve('src/images/logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                    destination: path.join('assets', 'icons')
                },
            ],
        }),
        new InjectManifest({
            swSrc: './src-sw.js',
            swDest: 'src-sw.js',
        }),
    ],

    module: {
      rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        },
      ],
    },
  };
};
