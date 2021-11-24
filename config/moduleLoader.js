/* eslint-disable @typescript-eslint/no-var-requires */
const insertStyleHandler = require('./insertStyleHandler');

module.exports = {
  rules: [
    {
      // *.vue
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.ts$/,
      use: [{
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        }
      }]
    },
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            insert: insertStyleHandler
          },
        },
        {
          loader: 'css-loader'
        }
      ]
    },
    {
      test: /\.s[ac]ss$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            insert: insertStyleHandler
          },
        },
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: '@import "@/assets/scss/helper/index.scss";',
          }
        }
      ]
    },
  ],
};
