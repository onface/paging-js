var path = require('path')
var webpack = require('webpack')
module.exports = require('./webpack.config')({
    entry: ['webpack-hot-middleware/client', './example/dev'],
    devtool: 'cheap-module-eval-source-map',
    firstJsLoader: ['react-hot'],
    firstPlugins: [new webpack.HotModuleReplacementPlugin()],
    externals: {},
    output: {
        path: path.join(__dirname, '../output'),
        filename: 'example/dev.js',
        publicPath: '/'
    }
})
