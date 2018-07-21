/**
 * @description webpack general config
 * @author Ranjay
 */
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const _mode = argv.mode || "development";
let _mergeConfig = "";
if (argv.env == "server") {
  _mergeConfig = require(`./config/webpack.server.js`);
} else {
  _mergeConfig = require(`./config/webpack.${_mode}.js`);
  _mergeConfig.plugins.push(new CleanWebpackPlugin(['dist/assets/scripts', 'dist/assets/styles'], {
    root: __dirname,
    verbose: true,
    dry: false
  }))
}

const _modeflag = (_mode == "production" ? true : false);
let generalConfig = {
  mode: _mode,
  entry: path.join(__dirname, './src/client/app.js'),
  output: {
    path: path.join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    extensions: [".js", ".css", ".vue"]
  },
  watch: false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: file => (
        /node_modules/.test(file) &&
        !/\.vue\.js/.test(file)
      )
    }, {
      test: /\.css$/,
      use: [
        _modeflag ? MiniCssExtractPlugin.loader : 'vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss'
          }
        }
      ]
    }, {
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: _modeflag ? 'images/[name]-[hash:5].[ext]' : 'images/[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      filename: 'index.html',
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[hash:5].css',
      chunkFilename: "styles/[id]-[hash:5].css"
    })
  ]
}

module.exports = merge(generalConfig, _mergeConfig)