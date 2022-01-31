/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const moduleLoader = require('./config/moduleLoader');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const config = {
  mode,
  entry: './src/main.ts',
  externals: { vue: "Vue" },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'VueContentSelector',
    libraryTarget: 'umd'
  },
  // loaders
  module: moduleLoader,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      // tree shake (vue feature toggle)
      __VUE_OPTIONS_API__: false,
      // inject enviroment variable -> need strinfy
      'process.env.SDK_MODE': JSON.stringify(mode),
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new VueLoaderPlugin(),
    ...(mode === 'development' ? [new webpack.HotModuleReplacementPlugin()] : []),
    // new BundleAnalyzerPlugin(),
  ],
  // used in production
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })],
  },
};
module.exports = config;
