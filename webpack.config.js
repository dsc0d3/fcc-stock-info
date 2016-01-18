var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'build/bundle': path.resolve(__dirname, 'app', 'app.js')
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['./plugins/babelRelayPlugin']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$super', '$']
      }
    }),
  ],
}
