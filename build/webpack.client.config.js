const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const {GenerateSW} = require('workbox-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const mode = process.env.NODE_ENV || 'development';

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },

  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // auto generate service worker
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cacheId: 'vue-hn',
      inlineWorkboxRuntime: true,
      swDest: 'service-worker.js',
      exclude: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /\/(top|new|show|ask|jobs)/,
          handler: 'NetworkFirst'
        },
        {
          urlPattern: '/item/:id',
          handler: 'NetworkFirst'
        },
        {
          urlPattern: '/user/:id',
          handler: 'NetworkFirst'
        }
      ]
    })
  )
}

module.exports = config