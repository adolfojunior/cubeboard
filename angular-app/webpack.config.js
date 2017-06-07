const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const productionEnv = nodeEnv === 'production'

const buildPath = path.join(__dirname, './dist/client')
const sourcePath = path.join(__dirname, './src/client')
const publicPath = path.join(__dirname, './src/public')
const htmlTemplatePath = path.join(sourcePath, 'index.html')

// Common plugins
const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor-[hash].js',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    path: buildPath,
    template: htmlTemplatePath,
    filename: 'index.html',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: [
            'last 3 version',
            'ie >= 10',
          ],
        }),
      ],
      context: sourcePath,
    },
  }),
  new ExtractTextPlugin('style-[hash].css'),
]

// Common rules
const rules = [
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.html$/,
    use: 'raw-loader'
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'url-loader'
  },
  {
    test: /\.(css|sass|scss)$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    })
  }
]

if (productionEnv) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  )
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  devtool: productionEnv ? 'eval' : 'source-map',
  context: sourcePath,
  entry: {
    js: './index.js',
    vendor: [
      'babel-polyfill',
      'angular',
      '@uirouter/angularjs',
    ],
  },
  output: {
    path: buildPath,
    publicPath: '/',
    filename: '[name]-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  plugins,
  devServer: {
    port: 3000,
    contentBase: productionEnv ? buildPath : sourcePath,
    historyApiFallback: true,
    compress: productionEnv,
    inline: !productionEnv,
    hot: !productionEnv,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
}
