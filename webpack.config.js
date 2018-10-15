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
const CopyWebpackPlugin = require('copy-webpack-plugin');

// webpack构建性能监控
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const _mode = argv.mode || "development";
let _mergeConfig = "";
if (argv.env == "server") {
  _mergeConfig = require(`./config/webpack.server.js`);
  _mergeConfig.plugins.push(new CleanWebpackPlugin(['dist/assets/vue-ssr-server-bundle.json'], {
    root: __dirname,
    verbose: true,
    dry: false
  }))
} else {
  _mergeConfig = require(`./config/webpack.${_mode}.js`);
  _mergeConfig.plugins.push(new CleanWebpackPlugin(['dist/assets/scripts', 'dist/assets/styles', 'dist/assets/images', 'dist/assets/vue-ssr-client-manifest.json'], {
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
  // webpack-dev-server配置
  // 此插件底层是基于express启动的服务
  // devServer: {
  //   port: 8081,
  //   before: function (app) {
  //     // mock请求
  //     app.get('/api/test', function (req, res) {
  //       res.json({ custom: 'response' });
  //     });
  //   }
  // },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        // 多核执行压缩
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    extensions: [".js", ".css", ".vue"],
    alias: {
      '@': path.resolve('src/client')
    }
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
      test: /\.(png|jpg|gif|webp)$/,
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
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'favicon.ico'),
      to: path.join(__dirname, '/dist/assets/images')
    }]),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new ProgressBarPlugin(),
  ]
}

const webpackConfig = smp.wrap(merge(generalConfig, _mergeConfig))

module.exports = webpackConfig