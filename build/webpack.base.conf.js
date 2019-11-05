var path = require('path')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: resolve('src/core/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),

    filename: 'loser.js', //打包之后生成的文件名，可以随意写。

    library: 'loser', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)

    libraryExport: 'default', // 对外暴露default属性，就可以直接调用default里的属性

    globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况

    libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
  },
  mode: 'production',
  resolve: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-runtime'],
              [
                // 笔者为了兼容IE8才用了这个插件，代价是不能tree shaking
                // 没有IE8兼容需求的同学可以把这个插件去掉
                '@babel/plugin-transform-modules-commonjs'
              ]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ie8: true
        }
      })
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // ProvidePlugin 可以将模块作为一个变量，被webpack在其他每个模块中引用。只有你需要使用此变量的时候，这个模块才会被 require 进来。

      _: ['lodash']
    })
  ],

  externals: {
    // 从输出的bundle中排除依赖

    lodash: {
      // 可以在各模块系统(Commonjs/Commonjs2/AMD)中通过'lodash'访问，但在全局变量形式下用'_'访问

      commonjs: 'lodash',

      commonjs2: 'lodash',

      amd: 'lodash',

      root: '_' // 指向全局变量
    }
  }
}
