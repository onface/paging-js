var path = require('path')
var iPackage = require('../package.json')
var webpackConfig = require('./webpack.online.config.js')
webpackConfig.output.path = path.join(__dirname, '../output', iPackage.version)
module.exports = webpackConfig
