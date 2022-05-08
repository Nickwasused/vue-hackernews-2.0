const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'
const mode = process.env.NODE_ENV || 'development';
// https://www.namecheap.com/blog/production-ready-vue-ssr-in-5-simple-steps/
module.exports = {
  devtool: isProd
    ? false
    : 'eval-source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/'
  },
  mode,
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  //https://stackoverflow.com/questions/49017682/webpack-4-migration-commonschunkplugin
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors"
        }
      }
    },
    // mimimize default in production
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
          name: '[name].[ext]?[contenthash]'
        }
      },
      {
        test: /\.(styl(us))?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        //exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("postcss-import"),
                //require("tailwindcss"),
                require("autoprefixer")
              ]
            }
          } 
        ],
      }

    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({})
      ]
}