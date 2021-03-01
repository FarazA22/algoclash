const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { spawn } = require('child_process');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
// const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './client/index.tsx',
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              postcssOptions: {
                plugins() {
                  'autoprefixer';
                },
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          // turn off type checking in loader. Type checking is done in parallel but forkts plugin
          transpileOnly: true,
        },
      },
      {
        test: /\.(jpg|jpeg|png|ttf|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 10,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.scss',
      '.less',
      '.css',
      '.tsx',
      '.ts',
    ],
  },
  devServer: {
    // contentBase: path.resolve(__dirname, '/tsCompiled/frontend'),
    contentBase: path.resolve(__dirname, '/dist/'),
    proxy: {
      '/': 'http://localhost:3000',
    },
    host: 'localhost',
    port: '8080',
    hot: true,
    compress: true,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};