const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  // mode: 'development',
  target: 'web',
  entry: path.join(__dirname,'src/index.js'),
  output: {
    filename: 'boundle.js',
    path: path.join(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(gif|jpg|png|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader/',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true, //直接使用前面的Loader中生成的sourceMap
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true //热加载，组件如果修改，html局部渲染
    //自动打开浏览器
    // open: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin() //减少不需要的信息展示的问题
  )
}

module.exports = config