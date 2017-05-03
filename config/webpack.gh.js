var path = require('path')
var webpack = require('webpack')
var iPackage = require('../package.json')

module.exports = require('./webpack.config')({
    entry: ['./example/dev'],
    devtool: 'source-map',
    externals: {},
    lastPlugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
           fromString: true,
           compress: {
               warnings: false,
               screw_ie8: false
           },
           mangle: {
               screw_ie8: false
           },
           output: {
               screw_ie8: false
           }
        })
    ],
    output: {
        path: path.join(__dirname, '../output'),
        filename: 'example/dev.js',
        chunkFilename: '/chunk/[id]-[name]-[chunkhash].js',
        publicPath: '/' + iPackage.gitRepository + '/' + iPackage.version
    }
})
