var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    login: path.resolve(__dirname, "../src/js/login.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath:"/dist/",
    filename: "js/[name].js"
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets:['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders:{
            scss:'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.scss$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader',options:{sourceMap: true}},
          {loader:'sass-loader',options:{sourceMap: true}}
        ]
      },
      {
        test:/\.(jpg|png|svg|gif)$/,
        loader:'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
		    loader: 'file-loader'
      }
    ]
  },
  resolve:{
    alias: {
      jQuery:"jquery/dist/jquery.min.js",
      "vue$":"vue/dist/vue.runtime.esm.js"
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname,'../'),
    port: 8090,
    compress: true,
    inline: true
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
