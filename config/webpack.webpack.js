var path = require('path')
var webpack = require('webpack')
module.exports = require('./webpack.config')({
    entry: ['./example/dev'],
    devtool: '#inline-source-map',
    externals: {},
    output: {
        path: path.join(__dirname, '../output'),
        filename: 'example/dev.js',
        publicPath: '/'
    }
})
