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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    // 外部造訪用的路由（非實際檔案，為記憶體空間）
    publicPath: '/sdk/',
    compress: true,
    port: 3000,
    https: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
    // cors
    headers: {
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
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
      // 環境變數注入
      // ! 注入都需要 stringfy
      'process.env.SDK_MODE': JSON.stringify(mode),
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new VueLoaderPlugin(),
    ...(mode === 'development' ? [new webpack.HotModuleReplacementPlugin()] : [])
    // new BundleAnalyzerPlugin(),
  ],
  // production 才會觸發
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
