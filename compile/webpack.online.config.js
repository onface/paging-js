var path = require('path')
var iPackage = require('../package.json')
var webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var webpackConfig = require('./webpack.config.js')
Object.keys(webpackConfig.entry).forEach(function (key, index) {
    webpackConfig.entry[key] = webpackConfig.entry[key].filter(function (item) {
        return item !== 'webpack-hot-middleware/client'
    })
})

webpackConfig.plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
]
webpackConfig.output.publicPath = '/' + iPackage.$repository + '/' + iPackage.version
module.exports = webpackConfig
