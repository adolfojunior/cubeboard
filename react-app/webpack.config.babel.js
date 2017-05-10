import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'development'
const production = (env === 'production')

const buildDir = path.resolve(__dirname, './dist')
const sourceDir = path.resolve(__dirname, './src')
const htmlTemplate = path.join(sourceDir, 'index.html')
const applicationEntry = './index.js'

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
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
      context: sourceDir,
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
  }),
  // common-chunk CSS file
  new ExtractTextPlugin({
    filename: '[name]-[hash].bundle.css',
  }),
  // common-chunk JS file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name]-[hash].bundle.js',
  }),
  // main html
  new HtmlWebpackPlugin({
    path: buildDir,
    template: htmlTemplate,
    filename: 'index.html',
  }),
]

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'file-loader'
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
  // Loaders for other file types can go here
]

if (!production) {
    // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else {
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
}

module.exports = {
  context: sourceDir,
  entry: {
    app: applicationEntry
  },
  output: {
    path: buildDir,
    filename: '[name]-[hash].bundle.js',
  },
  plugins,
  module: {
    rules
  },
  resolve: {
    modules: [sourceDir, 'node_modules']
  },
  devServer: {
    port,
    contentBase: production ? buildDir : sourceDir,
    historyApiFallback: true,
    compress: production,
    inline: !production,
    hot: !production,
    host: '0.0.0.0',
  }
}
