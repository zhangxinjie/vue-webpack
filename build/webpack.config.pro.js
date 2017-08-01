var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BabiliPlugin = require('babili-webpack-plugin');
var OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry:{
    login: path.resolve(__dirname,"../src/js/login.js")
  },
  output:{
    path: path.resolve(__dirname, "../dist"),
    publicPath: '../',
    filename:'js/[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_moudles/,
        query:{
          presets: ['es2015']
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
					use:'css-loader',
					fallback:'style-loader'
        })
      },
      {
		      test: /\.scss$/,
		      use: ExtractTextPlugin.extract([
    				{loader:'style-loader'},
    				{loader:'css-loader',options:{sourceMap:true}},
    				{loader:'sass-loader',options:{sourceMap:true}}
    			])
      },
      {
        test:/\.(jpg|png|svg|gif)$/,
        loader:'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
		    loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      jQuery:"jquery/dist/jquery.min.js",
      'vue$':"vue/dist/vue.runtime.esm.js"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename:'vendor.bundle.js'
    }),
    new BabiliPlugin({}),
    new ExtractTextPlugin({
			filename:'css/[name].[ext]',
			allChunks:true
		}),
    new OptimizeCssPlugin({
      assetNameRegExp:/\.css$/,
			cssProcessorOptions:{
				discardComments:{
					removeAll:true
				}
			},
			canPrint:true
    })
  ]
}
